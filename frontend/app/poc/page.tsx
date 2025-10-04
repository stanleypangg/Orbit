"use client";

import { Chat } from "@/components/Chat";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import PresetCard from "@/components/PresetCard";
import { handlePhase1 } from "@/lib/chat/validator-and-calls";
import { Phase1Response, Idea, Ingredient } from "@/lib/chat/types";

interface Message {
  role: "user" | "assistant";
  content: string;
  id: string;
  phase1Data?: Phase1Response;
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
  const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null);
  const [extractedIngredients, setExtractedIngredients] = useState<Ingredient[]>([]);

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
      // Phase 4: Prepare for transition (1300ms) - wait for grow to finish
      setAnimationPhase(4);
    }, 1300);

    setTimeout(() => {
      // Phase 5: Switch to chat mode and show first message (1400ms)
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
      setAnimationPhase(5);
    }, 1400);

    setTimeout(async () => {
      // Phase 6: Animation complete, fetch AI response from Phase 1 API
      setAnimationPhase(6);
      setIsGenerating(false);

      // Call Phase 1 API with the initial message
      try {
        const phase1Response = await handlePhase1(initialMessage);
        const assistantId = (Date.now() + 1).toString();
        
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "I've analyzed your materials! Here's what I found:",
            id: assistantId,
            phase1Data: phase1Response,
          },
        ]);
        setAnimatedMessageIds((prev) => new Set([...prev, assistantId]));
        setExtractedIngredients(phase1Response.ingredients);
      } catch (error) {
        console.error("Phase 1 API error:", error);
        const assistantId = (Date.now() + 1).toString();
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "I'm sorry, I encountered an error analyzing your materials. Please try again.",
            id: assistantId,
          },
        ]);
        setAnimatedMessageIds((prev) => new Set([...prev, assistantId]));
      }
    }, 1900);
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

    // Call Phase 1 API with the follow-up message
    try {
      const phase1Response = await handlePhase1(chatInput);
      const assistantId = (Date.now() + 1).toString();
      
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Here's an updated analysis based on your input:",
          id: assistantId,
          phase1Data: phase1Response,
        },
      ]);
      setAnimatedMessageIds((prev) => new Set([...prev, assistantId]));
      setExtractedIngredients(phase1Response.ingredients);
    } catch (error) {
      console.error("Phase 1 API error:", error);
      const assistantId = (Date.now() + 1).toString();
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I'm sorry, I encountered an error. Please try again.",
          id: assistantId,
        },
      ]);
      setAnimatedMessageIds((prev) => new Set([...prev, assistantId]));
    }
  };

  const handleIdeaSelect = (idea: Idea) => {
    setSelectedIdea(idea);
    const assistantId = Date.now().toString();
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: `Great choice! You selected "${idea.title}". Ready to visualize this project? (Phase 2 coming soon)`,
        id: assistantId,
      },
    ]);
    setAnimatedMessageIds((prev) => new Set([...prev, assistantId]));
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
          <h1 className="text-5xl font-light text-white mb-8">
            Turn Waste into Products
          </h1>

          {/* Messages Area - This is the grown textarea transformed */}
          <div className="flex-1 bg-[#232937] border border-[#4ade80] p-6 mb-4 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((message) => {
                const shouldAnimate = animatedMessageIds.has(message.id);
                return (
                  <div key={message.id}>
                    <div
                      className={`flex ${
                        message.role === "user" ? "justify-end" : "justify-start"
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
                    
                    {/* Render Phase 1 data if present */}
                    {message.phase1Data && (
                      <div className="mt-4 space-y-4">
                        {/* Ingredients Section */}
                        <div className="bg-[#1a2030] border border-[#3a4560] rounded-lg p-4">
                          <h3 className="text-[#4ade80] text-lg font-semibold mb-3">
                            📦 Extracted Materials
                          </h3>
                          <div className="space-y-2">
                            {message.phase1Data.ingredients.map((ingredient, idx) => (
                              <div key={idx} className="bg-[#232937] rounded p-3 border border-[#2A3142]">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <span className="text-white font-medium">
                                      {ingredient.name || "Unknown"}
                                    </span>
                                    <div className="text-sm text-gray-400 mt-1 flex flex-wrap gap-3">
                                      <span>Material: {ingredient.material || "N/A"}</span>
                                      {ingredient.size && <span>Size: {ingredient.size}</span>}
                                      {ingredient.condition && (
                                        <span>Condition: {ingredient.condition}</span>
                                      )}
                                    </div>
                                  </div>
                                  <span
                                    className={`text-xs px-2 py-1 rounded ml-2 ${
                                      ingredient.confidence >= 0.8
                                        ? "bg-green-900 text-green-200"
                                        : ingredient.confidence >= 0.6
                                        ? "bg-yellow-900 text-yellow-200"
                                        : "bg-red-900 text-red-200"
                                    }`}
                                  >
                                    {Math.round(ingredient.confidence * 100)}%
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Clarifying Questions */}
                        {message.phase1Data.needs_clarification &&
                          message.phase1Data.clarifying_questions &&
                          message.phase1Data.clarifying_questions.length > 0 && (
                            <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-4">
                              <h3 className="text-yellow-400 text-lg font-semibold mb-2">
                                ❓ Need More Information
                              </h3>
                              <ul className="space-y-2">
                                {message.phase1Data.clarifying_questions.map((question, idx) => (
                                  <li key={idx} className="text-yellow-200 text-sm">
                                    • {question}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                        {/* Ideas Section */}
                        <div>
                          <h3 className="text-[#4ade80] text-lg font-semibold mb-3">
                            💡 Project Ideas
                          </h3>
                          <div className="grid grid-cols-1 gap-3">
                            {message.phase1Data.ideas.map((idea) => (
                              <div
                                key={idea.id}
                                onClick={() => handleIdeaSelect(idea)}
                                className="bg-[#1a2030] border border-[#3a4560] hover:border-[#4ade80] rounded-lg p-4 cursor-pointer transition-all hover:scale-[1.02]"
                                style={{
                                  animation: "fadeIn 0.5s ease-out forwards",
                                }}
                              >
                                <h4 className="text-white font-semibold mb-1">{idea.title}</h4>
                                <p className="text-gray-400 text-sm">{idea.one_liner}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Chat Input */}
          <div
            className={`transition-all duration-500 ease-out ${
              animationPhase >= 5
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
                transition: "height 800ms cubic-bezier(0.4, 0, 0.2, 1)",
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
