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
      // Phase 2: Clear input and start transform (300-600ms)
      setAnimationPhase(2);
      setPrompt("");
    }, 300);

    setTimeout(() => {
      // Phase 3: Expand box (600-1000ms)
      setAnimationPhase(3);
    }, 600);

    setTimeout(() => {
      // Phase 4: Switch to chat mode and show chat input (1000ms)
      setIsChatMode(true);
      setMessages([
        {
          role: "user",
          content: initialMessage,
          id: Date.now().toString(),
        },
      ]);
      setAnimationPhase(4);
    }, 1000);

    setTimeout(() => {
      // Phase 5: First message animation complete
      setAnimationPhase(5);
      setIsGenerating(false);

      // TODO: Call API and add assistant response
      // For now, mock response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "I understand you want to create something from waste materials. Let me help you with that!",
            id: (Date.now() + 1).toString(),
          },
        ]);
      }, 500);
    }, 1400);
  };

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: chatInput,
      id: Date.now().toString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setChatInput("");

    // TODO: Call API for response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "This is a mock response. Integration with Gemini API pending.",
          id: (Date.now() + 1).toString(),
        },
      ]);
    }, 1000);
  };

  const handleExampleClick = (text: string) => {
    setPrompt(text);
  };

  if (isChatMode) {
    // Chat Interface
    return (
      <div className="min-h-screen bg-[#181A25] flex flex-col">
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
          <h1 className="text-5xl font-light text-white mb-8">
            Turn Waste into Products
          </h1>

          {/* Messages Area */}
          <div
            className={`flex-1 bg-[#232937] border border-[#4ade80] p-6 mb-4 overflow-y-auto transition-all duration-700 ease-out ${
              animationPhase >= 4 ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  } animate-slideIn`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <div
                    className={`max-w-[70%] px-4 py-3 rounded-lg ${
                      message.role === "user"
                        ? "bg-[#4ade80] text-black"
                        : "bg-[#2A3142] text-white"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Chat Input */}
          <div
            className={`transition-all duration-500 ease-out ${
              animationPhase >= 4
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
      <div className="max-w-8xl px-16 mx-auto py-16">
        {/* Title */}
        <h1 className="text-5xl font-light text-white mb-2">
          Turn Waste into Products
        </h1>

        {/* Input Section */}
        <div className="mt-12 mb-8">
          {animationPhase < 2 && (
            <label className="block text-[#4ade80] text-base mb-4 font-mono transition-opacity duration-300">
              Describe your waste material
            </label>
          )}
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
                animationPhase < 2
                  ? "Describe what you want to make and what materials you have."
                  : ""
              }
              style={{
                height: animationPhase >= 3 ? "60vh" : "10rem",
                transition: "height 700ms ease-out",
              }}
              className="w-full bg-[#232937] text-white text-base border p-5 resize-none focus:outline-none border-[#4ade80] placeholder:text-gray-500"
            />
          </div>
        </div>

        {/* Generate Button */}
        {animationPhase < 2 && (
          <button
            onClick={handleGenerate}
            disabled={!prompt.trim() || isGenerating}
            className="w-full bg-[#4ade80] hover:bg-[#3bc970] disabled:bg-gray-600 disabled:cursor-not-allowed text-black py-3 transition-all duration-300 uppercase text-base"
          >
            {isGenerating ? "GENERATING..." : "GENERATE"}
          </button>
        )}
      </div>

      {/* Examples Section */}
      {animationPhase < 1 && (
        <div className="max-w-8xl px-16 mx-auto pb-16 transition-all duration-300 ease-out">
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
      )}
    </div>
  );
}
