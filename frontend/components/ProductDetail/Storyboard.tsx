"use client";

import { useState } from "react";
import Image from "next/image";

interface Step {
  image: string;
  title: string;
  description: string;
}

interface StoryboardProps {
  steps: Step[];
}

export default function Storyboard({ steps }: StoryboardProps) {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className="bg-[#2A3038] border-[0.5px] border-[#67B68B] p-6">
      <h3 className="text-[#67B68B] text-base mb-6 uppercase tracking-wide">
        How to Build
      </h3>

      {/* Step Display */}
      <div className="border-[0.5px] border-[#67B68B] p-6 mb-6 min-h-[400px] flex max-w-5xl items-center gap-6 mx-auto">
        {/* Step Image */}
        <div className="w-1/2 bg-[#2A3142] aspect-video relative flex items-center justify-center">
          {steps[currentStep].image ? (
            <Image
              src={steps[currentStep].image}
              alt={steps[currentStep].title}
              fill
              className="object-cover"
            />
          ) : (
            <span className="text-gray-500">Image placeholder</span>
          )}
        </div>

        {/* Step Content */}
        <div className="w-1/2">
          <h4 className="text-[#67B68B] text-xl font-semibold mb-3">
            {steps[currentStep].title}
          </h4>
          <p className="text-gray-300 text-base leading-relaxed">
            {steps[currentStep].description}
          </p>
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-center gap-2">
        {steps.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentStep(index)}
            className={`w-10 h-10 border-[0.5px] transition-all ${
              currentStep === index
                ? "bg-[#67B68B] border-[#67B68B] text-black font-semibold"
                : "bg-[#2A3142] border-[#67B68B] text-gray-400 hover:border-[#67B68B] hover:text-white"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
