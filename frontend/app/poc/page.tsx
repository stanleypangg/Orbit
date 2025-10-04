"use client";

import { Chat } from "@/components/Chat";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import PresetCard from "@/components/PresetCard";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

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

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    // TODO: Implement generation logic
    setTimeout(() => setIsGenerating(false), 2000);
  };

  const handleExampleClick = (text: string) => {
    setPrompt(text);
  };

  return (
    <div className="min-h-screen bg-[#181A25]">
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
          <label className="block text-[#4ade80] text-base mb-4 font-mono">
            Describe your waste material
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe what you want to make and what materials you have."
            className="w-full bg-[#232937] text-white text-base border p-5 h-40 resize-none focus:outline-none border-[#4ade80] transition-colors placeholder:text-gray-500"
          />
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={!prompt.trim() || isGenerating}
          className="w-full bg-[#4ade80] hover:bg-[#3bc970] disabled:bg-gray-600 disabled:cursor-not-allowed text-black py-3 transition-colors uppercase text-base"
        >
          {isGenerating ? "GENERATING..." : "GENERATE"}
        </button>
      </div>

      {/* Examples Section */}
      <div className="pb-16 max-w-8xl px-16 mx-auto">
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
  );
}
