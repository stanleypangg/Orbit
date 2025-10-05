"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import PresetCard from "@/components/PresetCard";
import { useWorkflow } from "@/lib/workflow/useWorkflow";
import { Ingredient } from "@/lib/chat/types";

interface Message {
  role: "user" | "assistant";
  content: string;
  id: string;
  ingredients?: Ingredient[];
  needsClarification?: boolean;
  clarifyingQuestions?: string[];
}

export default function PhaseWorkflowPage() {
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

  const { state: workflowState, startWorkflow, resumeWorkflow } = useWorkflow({
    apiUrl: 'http://localhost:8000',
  });

  const presets = [
    {
      icon: "/turtle.svg",
      title: "Generate a fashion accessory",
      description: "from recycled ocean plastic...",
      text: "I have ocean plastic waste. Generate a fashion accessory.",
    },
    {
      icon: "/glass.svg",
      title: "Make home decor from recycled",
      description: "glass bottles...",
      text: "I have glass bottles. Make home decor.",
    },
    {
      icon: "/plastic.svg",
      title: "Help me make something from",
      description: "plastic bottles....",
      text: "I have plastic bottles. Help me make something useful.",
    },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle workflow state changes
  useEffect(() => {
    if (workflowState.phase === 'ingredient_discovery' && workflowState.ingredients.length > 0) {
      // Update messages with ingredient data
      const assistantId = `assistant-${Date.now()}`;
      const hasNewIngredients = !messages.some(m => m.ingredients && m.ingredients.length > 0);
      
      if (hasNewIngredients) {
        setMessages(prev => [
          ...prev,
          {
            role: "assistant",
            content: "I've analyzed your materials! Here's what I found:",
            id: assistantId,
            ingredients: workflowState.ingredients,
            needsClarification: workflowState.needsInput,
            clarifyingQuestions: workflowState.question ? [workflowState.question] : [],
          },
        ]);
        setAnimatedMessageIds(prev => new Set([...prev, assistantId]));
      }
    }

    if (workflowState.needsInput && workflowState.question) {
      // Add clarification question to messages if not already present
      const hasQuestion = messages.some(m => 
        m.clarifyingQuestions?.includes(workflowState.question!)
      );
      
      if (!hasQuestion) {
        const questionId = `question-${Date.now()}`;
        setMessages(prev => [
          ...prev,
          {
            role: "assistant",
            content: workflowState.question!,
            id: questionId,
            needsClarification: true,
          },
        ]);
        setAnimatedMessageIds(prev => new Set([...prev, questionId]));
      }
    }

    if (workflowState.error) {
      const errorId = `error-${Date.now()}`;
      setMessages(prev => [
        ...prev,
        {
          role: "assistant",
          content: `Error: ${workflowState.error}`,
          id: errorId,
        },
      ]);
      setAnimatedMessageIds(prev => new Set([...prev, errorId]));
      setIsGenerating(false);
    }
  }, [workflowState, messages]);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);

    const initialMessage = prompt;

    // Animation sequence
    setAnimationPhase(1);
    setTimeout(() => setAnimationPhase(2), 300);
    setTimeout(() => {
      setAnimationPhase(3);
      setPrompt("");
    }, 600);
    setTimeout(() => setAnimationPhase(4), 1000);
    setTimeout(() => setAnimationPhase(5), 1800);

    setTimeout(() => {
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
      setAnimationPhase(7);
    }, 2200);

    setTimeout(async () => {
      setAnimationPhase(8);
      setIsGenerating(false);

      // Start workflow
      await startWorkflow(initialMessage);
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

    setMessages(prev => [...prev, userMessage]);
    setAnimatedMessageIds(prev => new Set([...prev, userMessageId]));
    setChatInput("");

    // Resume workflow with clarification
    await resumeWorkflow(chatInput);
  };

  const handleExampleClick = (text: string) => {
    setPrompt(text);
  };

  if (isChatMode) {
    // Chat Interface
    return (
      <div className="min-h-screen bg-[#161924] flex flex-col overflow-hidden font-menlo">
        {/* Header */}
        <div className="p-4 bg-[#1E2433] border-b-[0.5px] border-[#2A3142] flex items-center gap-4">
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
          <Link
            href="/poc/storyboard"
            className="text-green-400 hover:text-green-300 font-semibold transition-colors"
          >
            Try Storyboard Generator 📋 →
          </Link>
        </div>

        {/* Chat Container */}
        <div className="flex-1 flex flex-col max-w-8xl px-16 mx-auto w-full py-8">
          {/* Workflow Status Bar */}
          {workflowState.threadId && (
            <div className="mb-4 bg-[#1a2030] border-[0.5px] border-[#3a4560] rounded-lg p-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">
                  Phase: <span className="text-[#4ade80]">{workflowState.phase}</span>
                </span>
                <span className="text-gray-400">
                  Thread: <span className="text-blue-400">{workflowState.threadId.slice(0, 12)}...</span>
                </span>
              </div>
            </div>
          )}

          {/* Messages Area */}
          <div
            className="bg-[#232937] border-[0.5px] border-[#4ade80] p-6 overflow-y-auto"
            style={{
              height:
                animationPhase >= 7
                  ? "calc(100vh - 280px)"
                  : "calc(100vh - 200px)",
              transition: "height 300ms ease-out",
            }}
          >
            <div className="space-y-4">
              {messages.map((message) => {
                const shouldAnimate = animatedMessageIds.has(message.id);
                return (
                  <div key={message.id}>
                    <div
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

                    {/* Render Ingredients if present */}
                    {message.ingredients && message.ingredients.length > 0 && (
                      <div className="mt-4 space-y-4">
                        {/* Ingredients Section */}
                        <div className="bg-[#1a2030] border-[0.5px] border-[#3a4560] rounded-lg p-4">
                          <h3 className="text-[#4ade80] text-lg font-semibold mb-3">
                            📦 Extracted Materials
                          </h3>
                          <div className="space-y-2">
                            {message.ingredients.map((ingredient, idx) => (
                              <div
                                key={idx}
                                className="bg-[#232937] rounded p-3 border-[0.5px] border-[#2A3142]"
                              >
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <span className="text-white font-medium">
                                      {ingredient.name || "Unknown"}
                                    </span>
                                    <div className="text-sm text-gray-400 mt-1 flex flex-wrap gap-3">
                                      <span>
                                        Material: {ingredient.material || "N/A"}
                                      </span>
                                      {ingredient.size && (
                                        <span>Size: {ingredient.size}</span>
                                      )}
                                      {ingredient.category && (
                                        <span>Category: {ingredient.category}</span>
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
                        {message.needsClarification && message.clarifyingQuestions && message.clarifyingQuestions.length > 0 && (
                          <div className="bg-yellow-900/20 border-[0.5px] border-yellow-700/50 rounded-lg p-4">
                            <h3 className="text-yellow-400 text-lg font-semibold mb-2">
                              ❓ Need More Information
                            </h3>
                            <ul className="space-y-2">
                              {message.clarifyingQuestions.map((question, idx) => (
                                <li key={idx} className="text-yellow-200 text-sm">
                                  • {question}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
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
            className="mt-4 transition-all duration-500 ease-out"
            style={{
              transform:
                animationPhase >= 7 ? "translateY(0)" : "translateY(100px)",
              opacity: animationPhase >= 7 ? 1 : 0,
              pointerEvents: animationPhase >= 7 ? "auto" : "none",
            }}
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
                placeholder={
                  workflowState.needsInput
                    ? "Answer the question above..."
                    : "Continue the conversation..."
                }
                className="flex-1 bg-[#232937] text-white text-base border-[0.5px] border-[#4ade80] p-4 resize-none focus:outline-none focus:border-[#3bc970] transition-colors placeholder:text-[#B1AFAF] placeholder:font-menlo rounded"
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
    <div className="min-h-screen bg-[#161924] overflow-hidden font-menlo">
      {/* Header */}
      <div className="p-4 bg-[#1E2433] border-b-[0.5px] border-[#2A3142] flex items-center gap-4">
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
        <Link
          href="/poc/storyboard"
          className="text-green-400 hover:text-green-300 font-semibold transition-colors"
        >
          Try Storyboard Generator 📋 →
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
            className="text-3xl text-white mb-2 transition-all duration-500 ease-out"
            style={{
              transform:
                animationPhase >= 2 ? "translateY(-150%)" : "translateY(0)",
              opacity: animationPhase >= 2 ? 0 : 1,
            }}
          >
            Turn Waste into Products with AI Workflow
          </h1>
          <h2 className="text-[#67B68B] text-base mt-2 mb-4 font-mono">
            Describe your waste material (powered by LangGraph)
          </h2>
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
          <div className="relative placeholder:text-[#B1AFAF] placeholder:font-menlo placeholder:tracking-widest">
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
                  ? "Describe what materials you have and what you want to make."
                  : ""
              }
              style={{
                height: animationPhase >= 4 ? "60vh" : "10rem",
                transition: "height 800ms cubic-bezier(0.4, 0, 0.2, 1)",
              }}
              className="w-full bg-[#232937] text-white text-base border-[0.5px] p-5 resize-none focus:outline-none border-[#4ade80] placeholder:text-[#B1AFAF]"
            />
          </div>
        </div>

        {/* Generate Button */}
        <div className="overflow-hidden mb-20">
          <div
            className="transition-all duration-500 ease-out"
            style={{
              transform:
                animationPhase >= 1 ? "translateY(150%)" : "translateY(0)",
              opacity: animationPhase >= 1 ? 0 : 1,
            }}
          >
            <button
              onClick={handleGenerate}
              disabled={!prompt.trim() || isGenerating}
              className="w-full bg-[#4ade80] hover:bg-[#3bc970] disabled:bg-gray-600 disabled:cursor-not-allowed text-black py-3 transition-all duration-300 uppercase text-base"
            >
              {isGenerating ? "STARTING WORKFLOW..." : "START WORKFLOW"}
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
          <h2 className="text-[#67B68B] text-base mb-4 font-mono">
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
