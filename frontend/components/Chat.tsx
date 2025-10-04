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
 * Minimal chat UI component with streaming support.
 * Features:
 * - Message list with user/assistant bubbles
 * - Textarea input with Enter to send, Shift+Enter for newline
 * - Loading state and error handling
 * - Auto-scroll as tokens arrive
 * - Accessible with proper ARIA labels
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
    <div className="flex flex-col h-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex-none px-6 py-4 border-b border-gray-200">
        <h1 className="text-2xl font-semibold text-gray-900">Chat</h1>
        <p className="text-sm text-gray-500 mt-1">Ask me anything</p>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-400 mt-12">
            <p className="text-lg">Start a conversation</p>
            <p className="text-sm mt-2">Type a message below to begin</p>
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
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg max-w-lg">
              <div className="flex items-start">
                <span className="text-sm">{error}</span>
                <button
                  onClick={clearError}
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
              disabled={isStreaming}
              placeholder="Type your message... (Enter to send, Shift+Enter for new line)"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
              rows={3}
              aria-label="Chat message input"
            />
          </div>
          <button
            onClick={handleSend}
            disabled={!input.trim() || isStreaming}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            aria-label="Send message"
          >
            {isStreaming ? (
              <span className="flex items-center gap-2">
                <Spinner />
                Sending...
              </span>
            ) : (
              'Send'
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
  isStreaming: boolean;
}

function MessageBubble({ message, isStreaming }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[70%] rounded-lg px-4 py-3 ${
          isUser
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-900'
        }`}
        role="article"
        aria-label={`${message.role} message`}
      >
        {/* Role label */}
        <div className={`text-xs font-semibold mb-1 ${isUser ? 'text-blue-100' : 'text-gray-500'}`}>
          {message.role === 'user' ? 'You' : 'Assistant'}
        </div>

        {/* Message content */}
        <div
          className="whitespace-pre-wrap break-words"
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

