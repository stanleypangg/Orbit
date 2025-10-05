"use client";

import { useState, useEffect, useRef, KeyboardEvent } from 'react';
import { ChatMessage as ChatMessageType, Phase1Response, Idea, Ingredient } from '@/lib/chat/types';
import { handlePhase1 } from '@/lib/chat/validator-and-calls';

interface Phase1ChatProps {
  onIdeaSelect?: (idea: Idea, ingredients: Ingredient[]) => void;
}

/**
 * Phase 1 Chat component for material extraction and idea generation - Terminal style.
 * Features:
 * - Material description input
 * - Ingredient extraction display
 * - Idea cards for user selection
 * - Clarifying questions if needed
 * - Monospace font and rigid corners for terminal aesthetic
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
    <div className="flex flex-col h-full max-w-4xl mx-auto bg-[#161924] font-menlo">
      {/* Header */}
      <div className="flex-none px-6 py-4 border-b-[0.5px] border-[#67b68b]">
        <h1 className="text-2xl font-semibold text-white tracking-wider uppercase font-mono">Describe Your Materials</h1>
        <p className="text-sm text-[#B1AFAF] mt-1 tracking-wide font-mono">
          Tell me what recyclable materials you have, and I&apos;ll suggest creative upcycling ideas
        </p>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-[#B1AFAF] mt-12">
            <p className="text-lg tracking-wide font-mono">What materials do you have?</p>
            <p className="text-sm mt-2 tracking-wide font-mono">Examples: &quot;3 plastic bottles&quot;, &quot;aluminum cans and cardboard&quot;</p>
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
            <div className="bg-[#2a3038] border-[0.5px] border-[#ef4444] text-[#ef4444] px-4 py-3 max-w-lg">
              <div className="flex items-start">
                <span className="text-sm tracking-wide font-mono">{error}</span>
                <button
                  onClick={handleClearError}
                  className="ml-auto pl-3 text-[#ef4444] hover:text-[#dc2626] transition-colors"
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
      <div className="flex-none border-t-[0.5px] border-[#67b68b] px-6 py-4">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              placeholder="Describe your materials... (e.g., '3 plastic bottles and 5 aluminum cans')"
              className="w-full bg-[#232937] text-white border-[0.5px] border-[#4ade80] px-4 py-3 resize-none focus:outline-none focus:border-[#3bc970] transition-colors placeholder:text-[#B1AFAF] placeholder:font-menlo disabled:bg-[#1a1f2e] disabled:text-[#666] disabled:cursor-not-allowed tracking-wide"
              rows={3}
              aria-label="Materials description input"
            />
          </div>
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="px-8 py-3 bg-[#4ade80] text-black font-semibold hover:bg-[#3bc970] focus:outline-none disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors uppercase tracking-wider font-mono"
            aria-label="Analyze materials"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Spinner />
                Analyzing
              </span>
            ) : (
              'Analyze'
            )}
          </button>
        </div>
        <p className="text-xs text-[#B1AFAF] mt-2 tracking-wide font-mono">
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
        className={`max-w-[70%] px-4 py-3 border-[0.5px] ${
          isUser
            ? 'bg-[#2a3038] border-[#4ade80] text-white'
            : 'bg-[#2A3142] border-[#67b68b] text-white'
        }`}
        role="article"
        aria-label={`${message.role} message`}
      >
        <div className={`text-xs font-semibold mb-1 uppercase tracking-wider font-mono ${isUser ? 'text-[#4ade80]' : 'text-[#67b68b]'}`}>
          {message.role === 'user' ? 'You' : 'Assistant'}
        </div>
        <div className="whitespace-pre-wrap break-words tracking-wide font-mono">
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
    <div className="mt-4 space-y-4 font-menlo">
      {/* Ingredients Section */}
      <div className="bg-[#2a3038] border-[0.5px] border-[#67b68b] p-4">
        <h3 className="text-base font-semibold text-[#67b68b] mb-3 uppercase tracking-wide font-mono">Extracted Materials</h3>
        <div className="space-y-2">
          {data.ingredients.map((ingredient, idx) => (
            <div key={idx} className="bg-[#232937] p-3 border-[0.5px] border-[#67b68b]/30">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-medium text-white tracking-wide font-mono">{ingredient.name || 'Unknown'}</span>
                  <div className="text-sm text-[#B1AFAF] mt-1 tracking-wide font-mono">
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
        <div className="bg-[#2a3038] border-[0.5px] border-[#fbbf24] p-4">
          <h3 className="text-base font-semibold text-[#fbbf24] mb-3 uppercase tracking-wide font-mono">Need More Information</h3>
          <ul className="space-y-2">
            {data.clarifying_questions.map((question, idx) => (
              <li key={idx} className="text-sm text-[#B1AFAF] tracking-wide font-mono">• {question}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Ideas Section */}
      <div>
        <h3 className="text-base font-semibold text-white mb-3 uppercase tracking-wide font-mono">Project Ideas</h3>
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
      className="bg-[#2a3038] border-[0.5px] border-[#67b68b]/30 p-4 hover:border-[#4ade80] transition-all cursor-pointer"
      role="button"
      tabIndex={0}
      aria-label={`Select idea: ${idea.title}`}
    >
      <h4 className="font-semibold text-white mb-1 tracking-wide font-mono">{idea.title}</h4>
      <p className="text-sm text-[#B1AFAF] tracking-wide font-mono">{idea.one_liner}</p>
    </div>
  );
}

function ConfidenceBadge({ confidence }: { confidence: number }) {
  const percentage = Math.round(confidence * 100);
  const colorClass = 
    confidence >= 0.8 ? 'bg-[#4ade80]/10 text-[#4ade80] border-[#4ade80]/30' :
    confidence >= 0.6 ? 'bg-[#fbbf24]/10 text-[#fbbf24] border-[#fbbf24]/30' :
    'bg-[#ef4444]/10 text-[#ef4444] border-[#ef4444]/30';

  return (
    <span className={`text-xs px-2 py-1 border-[0.5px] font-mono ${colorClass}`}>
      {percentage}%
    </span>
  );
}

function Spinner() {
  return (
    <div className="flex space-x-1">
      <div
        className="w-2 h-2 bg-[#4ade80] animate-bounce"
        style={{ animationDelay: "0ms" }}
      ></div>
      <div
        className="w-2 h-2 bg-[#4ade80] animate-bounce"
        style={{ animationDelay: "150ms" }}
      ></div>
      <div
        className="w-2 h-2 bg-[#4ade80] animate-bounce"
        style={{ animationDelay: "300ms" }}
      ></div>
    </div>
  );
}
