"use client";

import { useState, useRef, useCallback } from "react";
import { ChatMessage, ChatOptions, StreamEvent } from "./types";

interface UseChatOptions {
  apiUrl?: string;
  initialMessages?: ChatMessage[];
  options?: ChatOptions;
}

interface UseChatReturn {
  messages: ChatMessage[];
  input: string;
  isStreaming: boolean;
  error: string | null;
  setInput: (input: string) => void;
  send: (text?: string) => Promise<void>;
  clearError: () => void;
}

/**
 * Hook for managing chat state and streaming lifecycle.
 * Handles optimistic updates, SSE streaming, and error states.
 */
export function useChat({
  apiUrl = `${
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
  }/api/chat`,
  initialMessages = [],
  options = {},
}: UseChatOptions = {}): UseChatReturn {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const send = useCallback(
    async (text?: string) => {
      const messageText = text ?? input;

      if (!messageText.trim() || isStreaming) {
        return;
      }

      // Clear previous errors
      setError(null);

      // Create user message
      const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        role: "user",
        content: messageText.trim(),
      };

      // Optimistically add user message
      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      setIsStreaming(true);

      // Create assistant message placeholder
      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: "",
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // Prepare abort controller
      abortControllerRef.current = new AbortController();

      try {
        // Prepare request payload
        const requestPayload = {
          messages: [...messages, userMessage],
          options: {
            temperature: options.temperature ?? 0.7,
            max_tokens: options.maxTokens ?? 1024,
            system_prompt: options.systemPrompt,
          },
        };

        // Make streaming request
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestPayload),
          signal: abortControllerRef.current.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        if (!response.body) {
          throw new Error("No response body");
        }

        // Read SSE stream
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        let assistantContent = "";

        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            break;
          }

          // Decode chunk and add to buffer
          buffer += decoder.decode(value, { stream: true });

          // Process complete SSE events
          const lines = buffer.split("\n");
          buffer = lines.pop() || ""; // Keep incomplete line in buffer

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6); // Remove 'data: ' prefix

              try {
                const event: StreamEvent = JSON.parse(data);

                if (event.error) {
                  throw new Error(event.error.message);
                }

                if (event.delta) {
                  // Append token to assistant message
                  assistantContent += event.delta;
                  setMessages((prev) => {
                    const updated = [...prev];
                    const lastMessage = updated[updated.length - 1];
                    if (lastMessage.role === "assistant") {
                      lastMessage.content = assistantContent;
                    }
                    return updated;
                  });
                }

                if (event.done) {
                  break;
                }
              } catch (e) {
                console.error("Failed to parse SSE event:", e);
              }
            }
          }
        }
      } catch (err: any) {
        // Handle errors
        if (err.name === "AbortError") {
          setError("Request cancelled");
        } else {
          setError(err.message || "An error occurred while sending message");
        }

        // Remove incomplete assistant message on error
        setMessages((prev) => {
          const updated = [...prev];
          const lastMessage = updated[updated.length - 1];
          if (lastMessage.role === "assistant" && !lastMessage.content) {
            updated.pop();
          }
          return updated;
        });

        console.error("Chat error:", err);
      } finally {
        setIsStreaming(false);
        abortControllerRef.current = null;
      }
    },
    [input, messages, isStreaming, apiUrl, options]
  );

  return {
    messages,
    input,
    isStreaming,
    error,
    setInput,
    send,
    clearError,
  };
}
