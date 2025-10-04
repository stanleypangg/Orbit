"use client";

import { useState, useEffect, useRef, KeyboardEvent } from 'react';
import { ChatMessage as ChatMessageType, Phase1Response, Idea, Ingredient } from '@/lib/chat/types';
import { handlePhase1 } from '@/lib/chat/validator-and-calls';

interface Phase1ChatProps {
  onIdeaSelect?: (idea: Idea, ingredients: Ingredient[]) => void;
}

/**
 * Phase 1 Chat component for material extraction and idea generation.
 * Features:
 * - Material description input
 * - Ingredient extraction display
 * - Idea cards for user selection
 * - Clarifying questions if needed
 */
export function Phase1Chat({ onIdeaSelect }: Phase1ChatProps) {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [phase1Result, setPhase1Result] = useState<Phase1Response | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, phase1Result]);

  // Focus textarea on mount
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessageType = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: input.trim(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      // Call Phase 1 API
      const result = await handlePhase1(userMessage.content);
      
      // Create assistant message with Phase 1 data
      const assistantMessage: ChatMessageType = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: 'I\'ve analyzed your materials and generated some project ideas!',
        phase1Data: result,
      };

      setMessages(prev => [...prev, assistantMessage]);
      setPhase1Result(result);

    } catch (err: any) {
      setError(err.message || 'An error occurred while processing your request');
      console.error('Phase 1 error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearError = () => {
    setError(null);
  };

  const handleSelectIdea = (idea: Idea) => {
    if (phase1Result && onIdeaSelect) {
      onIdeaSelect(idea, phase1Result.ingredients);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex-none px-6 py-4 border-b border-gray-200">
        <h1 className="text-2xl font-semibold text-gray-900">Describe Your Materials</h1>
        <p className="text-sm text-gray-500 mt-1">
          Tell me what recyclable materials you have, and I&apos;ll suggest creative upcycling ideas
        </p>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-400 mt-12">
            <p className="text-lg">What materials do you have?</p>
            <p className="text-sm mt-2">Examples: &quot;3 plastic bottles&quot;, &quot;aluminum cans and cardboard&quot;</p>
          </div>
        )}

        {messages.map((message, index) => (
          <div key={message.id || index}>
            <MessageBubble message={message} isLoading={isLoading && index === messages.length - 1} />
            
            {/* Render Phase 1 results after assistant message */}
            {message.role === 'assistant' && message.phase1Data && (
              <Phase1Results
                data={message.phase1Data}
                onIdeaSelect={handleSelectIdea}
              />
            )}
          </div>
        ))}

        {error && (
          <div className="flex justify-center">
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg max-w-lg">
              <div className="flex items-start">
                <span className="text-sm">{error}</span>
                <button
                  onClick={handleClearError}
                  className="ml-auto pl-3 text-red-500 hover:text-red-700"
                  aria-label="Dismiss error"
                >
                  ×
                </button>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="flex-none border-t border-gray-200 px-6 py-4">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              placeholder="Describe your materials... (e.g., '3 plastic bottles and 5 aluminum cans')"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
              rows={3}
              aria-label="Materials description input"
            />
          </div>
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            aria-label="Analyze materials"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Spinner />
                Analyzing...
              </span>
            ) : (
              'Analyze'
            )}
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-2">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}

interface MessageBubbleProps {
  message: ChatMessageType;
  isLoading: boolean;
}

function MessageBubble({ message, isLoading }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[70%] rounded-lg px-4 py-3 ${
          isUser
            ? 'bg-green-600 text-white'
            : 'bg-gray-100 text-gray-900'
        }`}
        role="article"
        aria-label={`${message.role} message`}
      >
        <div className={`text-xs font-semibold mb-1 ${isUser ? 'text-green-100' : 'text-gray-500'}`}>
          {message.role === 'user' ? 'You' : 'Assistant'}
        </div>
        <div className="whitespace-pre-wrap break-words">
          {message.content || (isLoading && <Spinner />)}
        </div>
      </div>
    </div>
  );
}

interface Phase1ResultsProps {
  data: Phase1Response;
  onIdeaSelect: (idea: Idea) => void;
}

function Phase1Results({ data, onIdeaSelect }: Phase1ResultsProps) {
  return (
    <div className="mt-4 space-y-4">
      {/* Ingredients Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Extracted Materials</h3>
        <div className="space-y-2">
          {data.ingredients.map((ingredient, idx) => (
            <div key={idx} className="bg-white rounded p-3 border border-blue-100">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-medium text-gray-900">{ingredient.name || 'Unknown'}</span>
                  <div className="text-sm text-gray-600 mt-1">
                    <span>Material: {ingredient.material || 'N/A'}</span>
                    {ingredient.size && <span className="ml-3">Size: {ingredient.size}</span>}
                    {ingredient.condition && <span className="ml-3">Condition: {ingredient.condition}</span>}
                  </div>
                </div>
                <ConfidenceBadge confidence={ingredient.confidence} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Clarifying Questions */}
      {data.needs_clarification && data.clarifying_questions && data.clarifying_questions.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-yellow-900 mb-2">Need More Information</h3>
          <ul className="space-y-2">
            {data.clarifying_questions.map((question, idx) => (
              <li key={idx} className="text-sm text-yellow-800">• {question}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Ideas Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Project Ideas</h3>
        <div className="grid grid-cols-1 gap-3">
          {data.ideas.map((idea) => (
            <IdeaCard
              key={idea.id}
              idea={idea}
              onSelect={() => onIdeaSelect(idea)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface IdeaCardProps {
  idea: Idea;
  onSelect: () => void;
}

function IdeaCard({ idea, onSelect }: IdeaCardProps) {
  return (
    <div
      onClick={onSelect}
      className="bg-white border border-gray-200 rounded-lg p-4 hover:border-green-500 hover:shadow-md transition-all cursor-pointer"
      role="button"
      tabIndex={0}
      aria-label={`Select idea: ${idea.title}`}
    >
      <h4 className="font-semibold text-gray-900 mb-1">{idea.title}</h4>
      <p className="text-sm text-gray-600">{idea.one_liner}</p>
    </div>
  );
}

function ConfidenceBadge({ confidence }: { confidence: number }) {
  const percentage = Math.round(confidence * 100);
  const colorClass = 
    confidence >= 0.8 ? 'bg-green-100 text-green-800' :
    confidence >= 0.6 ? 'bg-yellow-100 text-yellow-800' :
    'bg-red-100 text-red-800';

  return (
    <span className={`text-xs px-2 py-1 rounded ${colorClass}`}>
      {percentage}%
    </span>
  );
}

function Spinner() {
  return (
    <svg
      className="animate-spin h-4 w-4 inline-block"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

