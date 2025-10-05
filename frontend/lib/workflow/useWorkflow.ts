"use client";

import { useState, useRef, useCallback, useEffect } from 'react';
import { Ingredient } from '@/lib/chat/types';

interface WorkflowIdea {
  id: string;
  title: string;
  one_liner: string;
}

interface WorkflowState {
  phase: 'idle' | 'starting' | 'ingredient_discovery' | 'goal_formation' | 'concept_generation' | 'complete' | 'error';
  threadId: string | null;
  currentNode: string | null;
  ingredients: Ingredient[];
  question: string | null;
  needsInput: boolean;
  ideas: WorkflowIdea[];
  concepts: any[];
  error: string | null;
  progress: number;
}

interface UseWorkflowOptions {
  apiUrl?: string;
  onPhaseChange?: (phase: string) => void;
}

interface UseWorkflowReturn {
  state: WorkflowState;
  startWorkflow: (userInput: string) => Promise<void>;
  resumeWorkflow: (userInput: string) => Promise<void>;
  disconnect: () => void;
}

/**
 * Hook for managing LangGraph workflow state with SSE streaming.
 * Replaces the chat-based approach with deterministic workflow orchestration.
 */
export function useWorkflow({
  apiUrl = 'http://localhost:8000',
  onPhaseChange,
}: UseWorkflowOptions = {}): UseWorkflowReturn {
  const [state, setState] = useState<WorkflowState>({
    phase: 'idle',
    threadId: null,
    currentNode: null,
    ingredients: [],
    question: null,
    needsInput: false,
    ideas: [],
    concepts: [],
    error: null,
    progress: 0,
  });

  const eventSourceRef = useRef<EventSource | null>(null);

  const disconnect = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
  }, []);

  const connectToStream = useCallback((threadId: string) => {
    disconnect();

    const eventSource = new EventSource(`${apiUrl}/workflow/stream/${threadId}`);
    eventSourceRef.current = eventSource;

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        
        switch (data.type) {
          case 'state_update':
            setState(prev => ({
              ...prev,
              currentNode: data.data.current_node,
              phase: mapBackendPhaseToUI(data.data.current_phase),
            }));
            if (onPhaseChange && data.data.current_phase) {
              onPhaseChange(data.data.current_phase);
            }
            break;

          case 'ingredients_update':
            const ingredients = data.data.ingredients || [];
            setState(prev => ({
              ...prev,
              ingredients: ingredients.map((ing: any) => ({
                name: ing.name,
                size: ing.size,
                material: ing.material,
                category: ing.category,
                condition: ing.condition,
                confidence: ing.confidence || 0.8,
              })),
              phase: 'ingredient_discovery',
            }));
            break;

          case 'user_question':
            const questions = Array.isArray(data.data) ? data.data : [data.data];
            setState(prev => ({
              ...prev,
              question: questions[0],
              needsInput: true,
            }));
            break;

          case 'concepts_generated':
            setState(prev => ({
              ...prev,
              concepts: data.data.concepts || [],
              phase: 'concept_generation',
            }));
            break;

          case 'workflow_complete':
            setState(prev => ({
              ...prev,
              phase: 'complete',
            }));
            disconnect();
            break;

          case 'error':
            setState(prev => ({
              ...prev,
              error: data.data?.error || data.message || 'An error occurred',
              phase: 'error',
            }));
            break;

          case 'timeout':
            setState(prev => ({
              ...prev,
              error: 'Workflow timeout',
              phase: 'error',
            }));
            disconnect();
            break;
        }
      } catch (error) {
        console.error('Failed to parse SSE event:', error);
      }
    };

    eventSource.onerror = (error) => {
      console.error('SSE error:', error);
      setState(prev => ({
        ...prev,
        error: 'Connection error',
        phase: 'error',
      }));
      disconnect();
    };
  }, [apiUrl, disconnect, onPhaseChange]);

  const startWorkflow = useCallback(async (userInput: string) => {
    setState(prev => ({
      ...prev,
      phase: 'starting',
      error: null,
    }));

    try {
      const response = await fetch(`${apiUrl}/workflow/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_input: userInput }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const threadId = data.thread_id;

      setState(prev => ({
        ...prev,
        threadId,
        phase: 'ingredient_discovery',
      }));

      // Connect to SSE stream
      connectToStream(threadId);

      // Also fetch initial ingredients immediately
      setTimeout(async () => {
        try {
          const ingredientsResponse = await fetch(`${apiUrl}/workflow/ingredients/${threadId}`);
          if (ingredientsResponse.ok) {
            const ingredientsData = await ingredientsResponse.json();
            if (ingredientsData.ingredients) {
              setState(prev => ({
                ...prev,
                ingredients: ingredientsData.ingredients.map((ing: any) => ({
                  name: ing.name,
                  size: ing.size,
                  material: ing.material,
                  category: ing.category,
                  condition: ing.condition,
                  confidence: ing.confidence || 0.8,
                })),
              }));
            }
          }
        } catch (error) {
          console.error('Failed to fetch initial ingredients:', error);
        }
      }, 1000);

    } catch (error: any) {
      setState(prev => ({
        ...prev,
        error: error.message || 'Failed to start workflow',
        phase: 'error',
      }));
    }
  }, [apiUrl, connectToStream]);

  const resumeWorkflow = useCallback(async (userInput: string) => {
    if (!state.threadId) {
      console.error('No thread ID available');
      return;
    }

    setState(prev => ({
      ...prev,
      needsInput: false,
      question: null,
    }));

    try {
      const response = await fetch(`${apiUrl}/workflow/resume/${state.threadId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_input: userInput }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // The SSE stream will handle updates
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        error: error.message || 'Failed to resume workflow',
        phase: 'error',
      }));
    }
  }, [apiUrl, state.threadId]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return {
    state,
    startWorkflow,
    resumeWorkflow,
    disconnect,
  };
}

/**
 * Map backend workflow phase to frontend UI phase
 */
function mapBackendPhaseToUI(backendPhase: string): WorkflowState['phase'] {
  const phaseMap: Record<string, WorkflowState['phase']> = {
    'ingredient_discovery': 'ingredient_discovery',
    'INGREDIENT_DISCOVERY': 'ingredient_discovery',
    'goal_formation': 'goal_formation',
    'GOAL_FORMATION': 'goal_formation',
    'concept_generation': 'concept_generation',
    'CONCEPT_GENERATION': 'concept_generation',
    'output_assembly': 'complete',
    'OUTPUT_ASSEMBLY': 'complete',
    'completed': 'complete',
    'COMPLETED': 'complete',
  };

  return phaseMap[backendPhase] || 'ingredient_discovery';
}

