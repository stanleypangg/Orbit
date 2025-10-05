"use client";

import { useEffect, useRef, KeyboardEvent } from 'react';
import { useChat } from '@/lib/chat/useChat';
import { ChatMessage as ChatMessageType } from '@/lib/chat/types';

interface ChatProps {
  initialMessages?: ChatMessageType[];
  onSend?: (text: string) => void;
  systemPrompt?: string;
}

/**
 * Terminal-style chat UI component with streaming support.
 * Features:
 * - Message list with user/assistant bubbles
 * - Textarea input with Enter to send, Shift+Enter for newline
 * - Loading state and error handling
 * - Auto-scroll as tokens arrive
 * - Accessible with proper ARIA labels
 * - Monospace font and rigid corners for terminal aesthetic
 */
export function Chat({ initialMessages, onSend, systemPrompt }: ChatProps) {
  const { messages, input, isStreaming, error, setInput, send, clearError } = useChat({
    initialMessages,
    options: { systemPrompt },
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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
    if (input.trim() && !isStreaming) {
      const text = input;
      await send(text);
      onSend?.(text);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto bg-[#161924] font-menlo">
      {/* Header */}
      <div className="flex-none px-6 py-4 border-b-[0.5px] border-[#67b68b]">
        <h1 className="text-2xl font-semibold text-white tracking-wider uppercase font-mono">Chat</h1>
        <p className="text-sm text-[#B1AFAF] mt-1 tracking-wide font-mono">Ask me anything</p>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-[#B1AFAF] mt-12">
            <p className="text-lg tracking-wide font-mono">Start a conversation</p>
            <p className="text-sm mt-2 tracking-wide font-mono">Type a message below to begin</p>
          </div>
        )}

        {messages.map((message, index) => (
          <MessageBubble
            key={message.id || index}
            message={message}
            isStreaming={isStreaming && index === messages.length - 1}
          />
        ))}

        {error && (
          <div className="flex justify-center">
            <div className="bg-[#2a3038] border-[0.5px] border-[#ef4444] text-[#ef4444] px-4 py-3 max-w-lg">
              <div className="flex items-start">
                <span className="text-sm tracking-wide font-mono">{error}</span>
                <button
                  onClick={clearError}
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
              disabled={isStreaming}
              placeholder="Type your message... (Enter to send, Shift+Enter for new line)"
              className="w-full bg-[#232937] text-white border-[0.5px] border-[#4ade80] px-4 py-3 resize-none focus:outline-none focus:border-[#3bc970] transition-colors placeholder:text-[#B1AFAF] placeholder:font-menlo disabled:bg-[#1a1f2e] disabled:text-[#666] disabled:cursor-not-allowed tracking-wide"
              rows={3}
              aria-label="Chat message input"
            />
          </div>
          <button
            onClick={handleSend}
            disabled={!input.trim() || isStreaming}
            className="px-8 py-3 bg-[#4ade80] text-black font-semibold hover:bg-[#3bc970] focus:outline-none disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors uppercase tracking-wider font-mono"
            aria-label="Send message"
          >
            {isStreaming ? (
              <span className="flex items-center gap-2">
                <Spinner />
                Sending
              </span>
            ) : (
              'Send'
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
  isStreaming: boolean;
}

function MessageBubble({ message, isStreaming }: MessageBubbleProps) {
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
        {/* Role label */}
        <div className={`text-xs font-semibold mb-1 uppercase tracking-wider font-mono ${isUser ? 'text-[#4ade80]' : 'text-[#67b68b]'}`}>
          {message.role === 'user' ? 'You' : 'Assistant'}
        </div>

        {/* Message content */}
        <div
          className="whitespace-pre-wrap break-words tracking-wide font-mono"
          aria-live={isStreaming ? 'polite' : 'off'}
        >
          {message.content || (isStreaming && <Spinner />)}
        </div>
      </div>
    </div>
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

