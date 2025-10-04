"use client";

import { Chat } from "@/components/Chat";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import PresetCard from "@/components/PresetCard";

interface Message {
  role: "user" | "assistant";
  content: string;
  id: string;
}

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isChatMode, setIsChatMode] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [animationPhase, setAnimationPhase] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [animatedMessageIds, setAnimatedMessageIds] = useState<Set<string>>(
    new Set()
  );

  const presets = [
    {
      icon: "/turtle.svg",
      title: "Generate a fashion accessory",
      description: "from recycled ocean plastic...",
      text: "Generate a fashion accessory from recycled ocean plastic...",
    },
    {
      icon: "/glass.svg",
      title: "Make home decor from recycled",
      description: "glass bottles...",
      text: "Make home decor from recycled glass bottles...",
    },
    {
      icon: "/plastic.svg",
      title: "Help me make something from",
      description: "plastic bottles....",
      text: "Help me make something from plastic bottles....",
    },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);

    const initialMessage = prompt;

    // Animation sequence
    // Phase 1: Fade out examples (0-300ms)
    setAnimationPhase(1);

    setTimeout(() => {
      // Phase 2: Fade out title and button (300-600ms)
      setAnimationPhase(2);
    }, 300);

    setTimeout(() => {
      // Phase 3: Clear input, slide to top (600-1000ms)
      setAnimationPhase(3);
      setPrompt("");
    }, 600);

    setTimeout(() => {
      // Phase 4: Expand box (1000-1800ms)
      setAnimationPhase(4);
    }, 1000);

    setTimeout(() => {
      // Phase 5: Prepare for transition (1800ms) - wait for grow to finish
      setAnimationPhase(5);
    }, 1800);

    setTimeout(() => {
      // Phase 6: Switch to chat mode and show first message (1900ms)
      const messageId = Date.now().toString();
      setMessages([
        {
          role: "user",
          content: initialMessage,
          id: messageId,
        },
      ]);
      setAnimatedMessageIds(new Set([messageId]));
      setIsChatMode(true);
      setAnimationPhase(6);
    }, 1900);

    setTimeout(() => {
      // Phase 7: Animation complete, fetch AI response
      setAnimationPhase(7);
      setIsGenerating(false);

      // TODO: Call API and add assistant response
      // For now, mock response
      setTimeout(() => {
        const assistantId = (Date.now() + 1).toString();
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "I understand you want to create something from waste materials. Let me help you with that!",
            id: assistantId,
          },
        ]);
        setAnimatedMessageIds((prev) => new Set([...prev, assistantId]));
      }, 500);
    }, 2400);
  };

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;

    const userMessageId = Date.now().toString();
    const userMessage: Message = {
      role: "user",
      content: chatInput,
      id: userMessageId,
    };

    setMessages((prev) => [...prev, userMessage]);
    setAnimatedMessageIds((prev) => new Set([...prev, userMessageId]));
    setChatInput("");

    // TODO: Call API for response
    setTimeout(() => {
      const assistantId = (Date.now() + 1).toString();
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "This is a mock response. Integration with Gemini API pending.",
          id: assistantId,
        },
      ]);
      setAnimatedMessageIds((prev) => new Set([...prev, assistantId]));
    }, 1000);
  };

  const handleExampleClick = (text: string) => {
    setPrompt(text);
  };

  if (isChatMode) {
    // Chat Interface
    return (
      <div className="min-h-screen bg-[#181A25] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-[#1E2433] border-b border-[#2A3142] flex items-center gap-4">
          <Image
            src="/logo_text.svg"
            alt="Orbit"
            width={80}
            height={27}
            className="opacity-90 mr-auto"
          />
          <Link
            href="/poc/trellis"
            className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
          >
            Try Trellis 3D Generator →
          </Link>
          <Link
            href="/poc/magic-pencil"
            className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
          >
            Try Magic Pencil ✨ →
          </Link>
        </div>

        {/* Chat Container */}
        <div className="flex-1 flex flex-col max-w-8xl px-16 mx-auto w-full py-8">
          {/* Messages Area - This is the grown textarea transformed */}
          <div className="flex-1 bg-[#232937] border border-[#4ade80] p-6 mb-4 overflow-y-auto">
            <div className="space-y-4">
              {animationPhase >= 6 &&
                messages.map((message) => {
                  const shouldAnimate = animatedMessageIds.has(message.id);
                  return (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.role === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[70%] px-4 py-3 rounded-lg ${
                          message.role === "user"
                            ? "bg-[#4ade80] text-black"
                            : "bg-[#2A3142] text-white"
                        }`}
                        style={
                          shouldAnimate
                            ? {
                                animation:
                                  "popIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards",
                              }
                            : undefined
                        }
                      >
                        {message.content}
                      </div>
                    </div>
                  );
                })}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Chat Input */}
          <div
            className={`transition-all duration-500 ease-out ${
              animationPhase >= 6
                ? "translate-y-0 scale-100 opacity-100"
                : "translate-y-full scale-95 opacity-0"
            }`}
          >
            <div className="flex gap-3 items-end">
              <textarea
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Continue the conversation..."
                className="flex-1 bg-[#232937] text-white text-base border border-[#4ade80] p-4 resize-none focus:outline-none focus:border-[#3bc970] transition-colors placeholder:text-gray-500 rounded"
                rows={2}
              />
              <button
                onClick={handleSendMessage}
                disabled={!chatInput.trim()}
                className="px-8 py-4 bg-[#4ade80] hover:bg-[#3bc970] disabled:bg-gray-600 disabled:cursor-not-allowed text-black font-semibold transition-colors uppercase rounded"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Initial Form UI
  return (
    <div className="min-h-screen bg-[#181A25] overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-[#1E2433] border-b border-[#2A3142] flex items-center gap-4">
        <Image
          src="/logo_text.svg"
          alt="Orbit"
          width={80}
          height={27}
          className="opacity-90 mr-auto"
        />
        <Link
          href="/poc/trellis"
          className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
        >
          Try Trellis 3D Generator →
        </Link>
        <Link
          href="/poc/magic-pencil"
          className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
        >
          Try Magic Pencil ✨ →
        </Link>
      </div>

      {/* Main Content */}
      <div
        className="mx-auto transition-all duration-500 ease-out"
        style={{
          maxWidth: animationPhase >= 3 ? "100%" : "var(--max-width-8xl)",
          paddingLeft: animationPhase >= 3 ? "4rem" : "4rem",
          paddingRight: animationPhase >= 3 ? "4rem" : "4rem",
          paddingTop: animationPhase >= 3 ? "2rem" : "4rem",
          paddingBottom: animationPhase >= 3 ? "0" : "0",
        }}
      >
        {/* Title */}
        <div className="overflow-hidden">
          <h1
            className="text-5xl font-light text-white mb-2 transition-all duration-500 ease-out"
            style={{
              transform:
                animationPhase >= 2 ? "translateY(-150%)" : "translateY(0)",
              opacity: animationPhase >= 2 ? 0 : 1,
            }}
          >
            Turn Waste into Products
          </h1>
        </div>

        {/* Input Section */}
        <div
          className="transition-all duration-500 ease-out"
          style={{
            marginTop: animationPhase >= 3 ? "0" : "3rem",
            marginBottom: animationPhase >= 3 ? "0" : "2rem",
            transform:
              animationPhase >= 3 ? "translateY(-50px)" : "translateY(0)",
          }}
        >
          <div className="overflow-hidden">
            {animationPhase < 2 && (
              <label
                className="block text-[#4ade80] text-base mb-4 font-mono transition-all duration-500 ease-out"
                style={{
                  transform:
                    animationPhase >= 2 ? "translateY(-150%)" : "translateY(0)",
                  opacity: animationPhase >= 2 ? 0 : 1,
                }}
              >
                Describe your waste material
              </label>
            )}
          </div>
          <div className="relative">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.ctrlKey) {
                  handleGenerate();
                }
              }}
              placeholder={
                animationPhase < 3
                  ? "Describe what you want to make and what materials you have."
                  : ""
              }
              style={{
                height: animationPhase >= 4 ? "60vh" : "10rem",
                transition: "height 800ms cubic-bezier(0.4, 0, 0.2, 1)",
              }}
              className="w-full bg-[#232937] text-white text-base border p-5 resize-none focus:outline-none border-[#4ade80] placeholder:text-gray-500"
            />
          </div>
        </div>

        {/* Generate Button */}
        <div className="overflow-hidden">
          <div
            className="transition-all duration-500 ease-out"
            style={{
              transform:
                animationPhase >= 2 ? "translateY(150%)" : "translateY(0)",
              opacity: animationPhase >= 2 ? 0 : 1,
            }}
          >
            <button
              onClick={handleGenerate}
              disabled={!prompt.trim() || isGenerating}
              className="w-full bg-[#4ade80] hover:bg-[#3bc970] disabled:bg-gray-600 disabled:cursor-not-allowed text-black py-3 transition-all duration-300 uppercase text-base"
            >
              {isGenerating ? "GENERATING..." : "GENERATE"}
            </button>
          </div>
        </div>
      </div>

      {/* Examples Section */}
      <div className="overflow-hidden">
        <div
          className="max-w-8xl px-16 mx-auto pb-16 transition-all duration-500 ease-out"
          style={{
            transform:
              animationPhase >= 1 ? "translateY(100%)" : "translateY(0)",
            opacity: animationPhase >= 1 ? 0 : 1,
          }}
        >
          <h2 className="text-[#4ade80] text-base mb-4 font-mono">
            Try these examples
          </h2>
          <div className="flex justify-between">
            {presets.map((example, index) => (
              <div key={index} onClick={() => handleExampleClick(example.text)}>
                <PresetCard
                  title={example.title}
                  description={example.description}
                  image={example.icon}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
