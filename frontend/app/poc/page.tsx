"use client";

import { Chat } from "@/components/Chat";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import PresetCard from "@/components/PresetCard";
import { useWorkflow } from "@/lib/workflow/useWorkflow";
import { Idea, Ingredient } from "@/lib/chat/types";

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

interface Message {
  role: "user" | "assistant";
  content: string;
  id: string;
  ingredients?: Ingredient[];
  needsClarification?: boolean;
  clarifyingQuestions?: string[];
  projectOptions?: WorkflowOption[];
  concepts?: WorkflowConcept[];
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
  const [extractedIngredients, setExtractedIngredients] = useState<
    Ingredient[]
  >([]);

  const { state: workflowState, startWorkflow, resumeWorkflow, selectOption, selectConcept } = useWorkflow({
    apiUrl: 'http://localhost:8000',
  });

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
      // Phase 6.5: Show chat input after chat interface renders (2200ms)
      setAnimationPhase(7);
    }, 2200);

    setTimeout(async () => {
      // Phase 8: Start workflow
      setAnimationPhase(8);
      setIsGenerating(false);

      // Start workflow with the initial message
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

    setMessages((prev) => [...prev, userMessage]);
    setAnimatedMessageIds((prev) => new Set([...prev, userMessageId]));
    setChatInput("");

    // Resume workflow with clarification
    await resumeWorkflow(chatInput);
  };

  // Handle workflow state changes
  useEffect(() => {
    if (workflowState.phase === 'ingredient_discovery' && workflowState.ingredients.length > 0) {
      // Update messages with ingredient data
      const hasNewIngredients = !messages.some(m => m.ingredients && m.ingredients.length > 0);
      
      if (hasNewIngredients) {
        const assistantId = `assistant-${Date.now()}`;
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
        setExtractedIngredients(workflowState.ingredients);
      }
    }
  }, [workflowState.phase, workflowState.ingredients.length]); // Only re-run when phase or ingredient count changes

  useEffect(() => {
    if (workflowState.needsInput && workflowState.question) {
      console.log('Workflow needs input, question:', workflowState.question);
      console.log('Current messages:', messages);
      
      // Add clarification question to messages if not already present
      const hasQuestion = messages.some(m => 
        m.clarifyingQuestions?.includes(workflowState.question!) || 
        m.content === workflowState.question ||
        m.content.includes(workflowState.question!)
      );
      
      console.log('Has question already?', hasQuestion);
      
      if (!hasQuestion) {
        const questionId = `question-${Date.now()}`;
        const newMessage = {
          role: "assistant" as const,
          content: workflowState.question!, // Use the question as the main content
          id: questionId,
          needsClarification: true,
          clarifyingQuestions: [workflowState.question!],
        };
        console.log('Adding question message:', newMessage);
        setMessages(prev => [...prev, newMessage]);
        setAnimatedMessageIds(prev => new Set([...prev, questionId]));
      }
    }
  }, [workflowState.question, workflowState.needsInput]); // Only re-run when question changes

  useEffect(() => {
    if (workflowState.error) {
      // Check if this error is already displayed
      const hasError = messages.some(m => m.content === `Error: ${workflowState.error}`);
      
      if (!hasError) {
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
    }
  }, [workflowState.error]); // Only re-run when error changes

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

  const handleOptionSelect = async (optionId: string) => {
    await selectOption(optionId);
  };

  const handleConceptSelect = async (conceptId: string) => {
    await selectConcept(conceptId);
  };

  // Handle workflow option selection - Add options to messages
  useEffect(() => {
    if (workflowState.needsSelection && workflowState.selectionType === 'option' && workflowState.projectOptions.length > 0) {
      const hasOptions = messages.some(m => m.projectOptions && m.projectOptions.length > 0);
      
      if (!hasOptions) {
        const optionsId = `options-${Date.now()}`;
        setMessages(prev => [
          ...prev,
          {
            role: "assistant",
            content: "I've generated creative project ideas based on your materials! Choose one to continue:",
            id: optionsId,
            projectOptions: workflowState.projectOptions,
          },
        ]);
        setAnimatedMessageIds(prev => new Set([...prev, optionsId]));
      }
    }
  }, [workflowState.needsSelection, workflowState.selectionType, workflowState.projectOptions.length]);

  // Handle workflow concept selection - Add concepts to messages
  useEffect(() => {
    if (workflowState.needsSelection && workflowState.selectionType === 'concept' && workflowState.concepts.length > 0) {
      const hasConcepts = messages.some(m => m.concepts && m.concepts.length > 0);
      
      if (!hasConcepts) {
        const conceptsId = `concepts-${Date.now()}`;
        setMessages(prev => [
          ...prev,
          {
            role: "assistant",
            content: "Here are 3 concept visualizations for your project! Choose your favorite:",
            id: conceptsId,
            concepts: workflowState.concepts,
          },
        ]);
        setAnimatedMessageIds(prev => new Set([...prev, conceptsId]));
      }
    }
  }, [workflowState.needsSelection, workflowState.selectionType, workflowState.concepts.length]);

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
          {/* Messages Area - This is the grown textarea transformed */}
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

                        {/* Clarifying Questions - Always show if needsClarification is true */}
                        {message.needsClarification && (
                          <div className="bg-yellow-900/20 border-[0.5px] border-yellow-700/50 rounded-lg p-4 mt-2">
                            <h3 className="text-yellow-400 text-lg font-semibold mb-2">
                              ❓ Please Answer
                            </h3>
                            {message.clarifyingQuestions && message.clarifyingQuestions.length > 0 ? (
                              <ul className="space-y-2">
                                {message.clarifyingQuestions.map((question, idx) => (
                                  <li key={idx} className="text-yellow-200 text-sm">
                                    • {question}
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-yellow-200 text-sm">Please provide the requested information in the input below.</p>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Render Project Options if present */}
                    {message.projectOptions && message.projectOptions.length > 0 && (
                      <div className="mt-4">
                        <div className="grid grid-cols-1 gap-3">
                          {message.projectOptions.map((option) => (
                            <div
                              key={option.option_id}
                              onClick={() => handleOptionSelect(option.option_id)}
                              className="bg-[#1a2030] border-[0.5px] border-[#3a4560] hover:border-[#4ade80] rounded-lg p-4 cursor-pointer transition-all hover:scale-[1.02]"
                              style={{ animation: "fadeIn 0.5s ease-out forwards" }}
                            >
                              <div className="flex items-start justify-between mb-2">
                                <h4 className="text-white font-semibold text-lg">{option.title}</h4>
                                {option.difficulty_level && (
                                  <span className={`text-xs px-2 py-1 rounded ${
                                    option.difficulty_level === 'beginner' ? 'bg-green-900 text-green-200' :
                                    option.difficulty_level === 'intermediate' ? 'bg-yellow-900 text-yellow-200' :
                                    'bg-red-900 text-red-200'
                                  }`}>
                                    {option.difficulty_level}
                                  </span>
                                )}
                              </div>
                              <p className="text-gray-400 text-sm mb-3">{option.description}</p>
                              <div className="flex flex-wrap gap-3 text-xs text-gray-400 mb-2">
                                {option.estimated_time && <span>⏱️ {option.estimated_time}</span>}
                                {option.materials_used && <span>🔧 {option.materials_used.length} materials</span>}
                                {option.tools_required && option.tools_required.length > 0 && (
                                  <span>🛠️ {option.tools_required.slice(0, 2).join(', ')}</span>
                                )}
                              </div>
                              {option.construction_steps && option.construction_steps.length > 0 && (
                                <div className="text-xs text-gray-500 mt-2">
                                  <strong>{option.construction_steps.length} steps</strong> • Innovation: {Math.round((option.innovation_score || 0) * 100)}%
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Render Concept Images if present */}
                    {message.concepts && message.concepts.length > 0 && (
                      <div className="mt-4">
                        <div className="grid grid-cols-3 gap-4">
                          {message.concepts.map((concept) => (
                            <div
                              key={concept.concept_id}
                              onClick={() => handleConceptSelect(concept.concept_id)}
                              className="bg-[#1a2030] border-[0.5px] border-[#3a4560] hover:border-[#4ade80] rounded-lg overflow-hidden cursor-pointer transition-all hover:scale-[1.05]"
                              style={{ animation: "fadeIn 0.5s ease-out forwards" }}
                            >
                              {concept.image_url && (
                                <div className="w-full h-48 bg-[#232937] flex items-center justify-center">
                                  <img src={concept.image_url} alt={concept.title} className="w-full h-full object-cover" />
                                </div>
                              )}
                              <div className="p-3">
                                <h4 className="text-white font-medium text-sm">{concept.title}</h4>
                                {concept.description && (
                                  <p className="text-gray-400 text-xs mt-1">{concept.description}</p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
              
              {/* Loading Indicator */}
              {workflowState.isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[70%] px-4 py-3 rounded-lg bg-[#2A3142] text-white">
                    <div className="flex items-center gap-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-[#4ade80] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-[#4ade80] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-[#4ade80] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                      <span className="text-sm text-gray-300">
                        {workflowState.loadingMessage || 'Processing...'}
                      </span>
                    </div>
                  </div>
                </div>
              )}
              
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
                placeholder="Continue the conversation..."
                className="flex-1 bg-[#232937] text-white text-base border-[0.5px] border-[#4ade80] p-4 resize-none focus:outline-none focus:border-[#3bc970] transition-colors placeholder:text-[#B1AFAF] placeholder:font-menlo rounded"
                rows={2}
              />
              <button
                onClick={handleSendMessage}
                disabled={!chatInput.trim() || workflowState.isLoading}
                className="px-8 py-4 bg-[#4ade80] hover:bg-[#3bc970] disabled:bg-gray-600 disabled:cursor-not-allowed text-black font-semibold transition-colors uppercase rounded"
              >
                {workflowState.isLoading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    Processing
                  </span>
                ) : (
                  'Send'
                )}
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
            Turn Waste into Products
          </h1>
          <h2 className="text-[#67B68B] text-base mt-2 mb-4 font-mono">
            Describe your waste material
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
                  ? "Describe what you want to make and what materials you have."
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
