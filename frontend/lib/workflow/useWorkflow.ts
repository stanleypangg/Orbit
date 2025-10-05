"use client";

import { useState, useRef, useCallback, useEffect } from 'react';
import { Ingredient } from '@/lib/chat/types';

interface WorkflowOption {
  option_id: string;
  title: string;
  description: string;
  category?: string;
  materials_used: string[];
  construction_steps?: string[];
  tools_required?: string[];
  estimated_time?: string;
  difficulty_level?: 'beginner' | 'intermediate' | 'advanced';
  innovation_score?: number;
  practicality_score?: number;
}

interface WorkflowConcept {
  concept_id: string;
  title: string;
  image_url: string;
  description?: string;
  style?: string;
}

interface WorkflowState {
  phase: 'idle' | 'starting' | 'ingredient_discovery' | 'goal_formation' | 'choice_selection' | 'concept_generation' | 'concept_selection' | 'packaging' | 'complete' | 'error';
  threadId: string | null;
  currentNode: string | null;
  ingredients: Ingredient[];
  question: string | null;
  needsInput: boolean;
  needsSelection: boolean;
  selectionType: 'option' | 'concept' | null;
  projectOptions: WorkflowOption[];
  concepts: WorkflowConcept[];
  selectedOption: WorkflowOption | null;
  selectedConcept: WorkflowConcept | null;
  finalPackage: any | null;
  error: string | null;
  progress: number;
  isLoading: boolean;
  loadingMessage: string | null;
}

interface UseWorkflowOptions {
  apiUrl?: string;
  onPhaseChange?: (phase: string) => void;
}

interface UseWorkflowReturn {
  state: WorkflowState;
  startWorkflow: (userInput: string) => Promise<void>;
  resumeWorkflow: (userInput: string) => Promise<void>;
  selectOption: (optionId: string) => Promise<void>;
  selectConcept: (conceptId: string) => Promise<void>;
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
    needsSelection: false,
    selectionType: null,
    projectOptions: [],
    concepts: [],
    selectedOption: null,
    selectedConcept: null,
    finalPackage: null,
    error: null,
    progress: 0,
    isLoading: false,
    loadingMessage: null,
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
            const currentNode = data.data.current_node;
            const loadingMessages: Record<string, string> = {
              'P1a_extract': '🔍 Analyzing your materials with AI...',
              'P1b_null_check': '🤔 Checking for missing details...',
              'P1c_categorize': '📦 Organizing ingredients...',
              'G1_goal_formation': '🎯 Understanding your goals...',
              'O1_choice_generation': '💡 Generating creative options...',
              'O1_detailed': '📝 Creating detailed plan for your selection...',
              'E1_evaluation': '✨ Evaluating feasibility...',
              'PR1_prompt_builder': '🎨 Crafting concept prompts...',
              'IMG_hero': '🖼️ Generating your concept image...',
              'IMG_generation': '🖼️ Generating concept images...',
            };
            
            setState(prev => ({
              ...prev,
              currentNode: currentNode,
              phase: mapBackendPhaseToUI(data.data.current_phase),
              isLoading: true,
              loadingMessage: loadingMessages[currentNode] || '⚙️ Processing...',
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
              // DON'T clear loading state here - keep it active until we reach a stopping point
              // (user_question, choices_generated, etc.)
            }));
            break;

          case 'user_question':
            const questions = Array.isArray(data.data) ? data.data : [data.data];
            const firstQuestion = typeof questions[0] === 'string' ? questions[0] : String(questions[0]);
            console.log('Received clarification question:', firstQuestion);
            setState(prev => ({
              ...prev,
              question: firstQuestion,
              needsInput: true,
              isLoading: false,
              loadingMessage: null,
            }));
            break;

          case 'choices_generated':
            const options = data.data.viable_options || [];
            setState(prev => ({
              ...prev,
              projectOptions: options,
              phase: 'choice_selection',
              needsSelection: true,
              selectionType: 'option',
              isLoading: false,
              loadingMessage: null,
            }));
            break;

          case 'concept_progress':
            // PROGRESSIVE UPDATE: Single concept with image just completed!
            const progressConcept = {
              concept_id: data.data.concept_id || `concept_${Date.now()}`,
              title: data.data.title || 'Concept',
              image_url: data.data.image_url || data.data.url || '',
              description: data.data.description,
              style: data.data.style,
            };
            
            console.log('Progressive concept update:', {
              id: progressConcept.concept_id,
              title: progressConcept.title,
              hasImage: !!progressConcept.image_url
            });
            
            // Add or update this specific concept in the array
            setState(prev => {
              const existingIndex = prev.concepts.findIndex(c => c.concept_id === progressConcept.concept_id);
              const updatedConcepts = existingIndex >= 0
                ? prev.concepts.map((c, i) => i === existingIndex ? progressConcept : c)
                : [...prev.concepts, progressConcept];
              
              return {
                ...prev,
                concepts: updatedConcepts,
                phase: 'concept_selection',
                isLoading: true, // Keep loading until all arrive
                loadingMessage: `🎨 Generated ${updatedConcepts.length} of 3 concepts...`,
              };
            });
            break;
          
          case 'concepts_generated':
            // ALL CONCEPTS COMPLETE - final batch update
            const concepts = data.data.concepts || data.data.concept_variants || [];
            const mappedConcepts = concepts.map((c: any, idx: number) => ({
              concept_id: c.concept_id || `concept_${idx}`,
              title: c.title || c.style || `Concept ${idx + 1}`,
              image_url: c.image_url || c.url || '',
              description: c.description,
              style: c.style,
            }));
            
            const allHaveImages = mappedConcepts.every((c: any) => c.image_url && c.image_url !== '');
            console.log('All concepts complete:', {
              count: mappedConcepts.length,
              allHaveImages,
              concepts: mappedConcepts.map((c: any) => ({
                title: c.title,
                hasImage: !!c.image_url,
                imageUrl: c.image_url?.substring(0, 50) + '...'
              }))
            });
            
            setState(prev => ({
              ...prev,
              concepts: mappedConcepts,
              phase: 'concept_selection',
              needsSelection: allHaveImages, // Enable selection now
              selectionType: allHaveImages ? 'concept' : null,
              isLoading: false, // Done loading!
              loadingMessage: null,
            }));
            break;

          case 'package_ready':
          case 'project_package':
            setState(prev => ({
              ...prev,
              finalPackage: data.data,
              phase: 'complete',
              isLoading: false,
              loadingMessage: null,
            }));
            break;

          case 'workflow_complete':
            setState(prev => ({
              ...prev,
              phase: 'complete',
              isLoading: false,
              loadingMessage: null,
            }));
            disconnect();
            break;

          case 'error':
            setState(prev => ({
              ...prev,
              error: data.data?.error || data.message || 'An error occurred',
              phase: 'error',
              isLoading: false,
              loadingMessage: null,
            }));
            break;

          case 'timeout':
            setState(prev => ({
              ...prev,
              error: 'Workflow timeout',
              phase: 'error',
              isLoading: false,
              loadingMessage: null,
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
      isLoading: true,
      loadingMessage: '🚀 Starting workflow...',
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
        isLoading: true,
        loadingMessage: '🔍 Analyzing your materials...',
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
      isLoading: true,
      loadingMessage: '💭 Processing your answer...',
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

  const selectOption = useCallback(async (optionId: string) => {
    if (!state.threadId) {
      console.error('No thread ID available');
      return;
    }

    setState(prev => ({
      ...prev,
      needsSelection: false,
      isLoading: true,
      loadingMessage: '✨ Evaluating your choice...',
      selectedOption: prev.projectOptions.find(o => o.option_id === optionId) || null,
    }));

    try {
      // Call backend to proceed with selected option
      const response = await fetch(`${apiUrl}/workflow/select-option/${state.threadId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ option_id: optionId }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // The SSE stream will handle updates
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        error: error.message || 'Failed to select option',
        phase: 'error',
        isLoading: false,
      }));
    }
  }, [apiUrl, state.threadId]);

  const selectConcept = useCallback(async (conceptId: string) => {
    if (!state.threadId) {
      console.error('No thread ID available');
      return;
    }

    setState(prev => ({
      ...prev,
      needsSelection: false,
      isLoading: true,
      loadingMessage: '📦 Packaging your project...',
      selectedConcept: prev.concepts.find(c => c.concept_id === conceptId) || null,
    }));

    try {
      // Use existing select-concept endpoint
      const conceptIndex = state.concepts.findIndex(c => c.concept_id === conceptId);
      const response = await fetch(`${apiUrl}/workflow/select-concept/${state.threadId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ concept_id: conceptIndex }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // The SSE stream will handle updates
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        error: error.message || 'Failed to select concept',
        phase: 'error',
        isLoading: false,
      }));
    }
  }, [apiUrl, state.threadId, state.concepts]);

  return {
    state,
    startWorkflow,
    resumeWorkflow,
    selectOption,
    selectConcept,
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

