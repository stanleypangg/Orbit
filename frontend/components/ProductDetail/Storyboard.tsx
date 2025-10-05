"use client";

import { useState } from "react";
import Image from "next/image";
import { useStepImages } from "@/lib/workflow/useStepImages";

interface Step {
  step_number?: number;
  image?: string;
  title: string;
  description: string;
}

interface StoryboardProps {
  steps: Step[];
  threadId?: string | null; // NEW: For fetching generated images
  apiUrl?: string;
}

export default function Storyboard({
  steps,
  threadId,
  apiUrl,
}: StoryboardProps) {
  const [currentStep, setCurrentStep] = useState(0);

  // Fetch step images if threadId provided
  const { progress, isLoading } = useStepImages({
    threadId: threadId || null,
    apiUrl,
    enabled: !!threadId,
  });

  // Merge static steps with generated images
  const enrichedSteps = steps.map((step, index) => {
    const generatedImage = progress?.step_images.find(
      (img) =>
        img.step_number === step.step_number || img.step_number === index + 1
    );

    return {
      ...step,
      generatedImageUrl: generatedImage?.image_url,
      imageStatus: generatedImage?.status || "pending",
      // Use generated image if available, otherwise fall back to static
      finalImageUrl: generatedImage?.image_url || step.image,
    };
  });

  const currentStepData = enrichedSteps[currentStep];

  return (
    <div className="bg-[#2A3038] border-[0.5px] border-[#67B68B] p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[#67B68B] text-base uppercase tracking-wide">
          How to Build
        </h3>

        {/* Progress indicator */}
        {threadId && progress && progress.status === "generating" && (
          <div className="text-sm text-gray-400">
            Generating images: {progress.completed_steps}/{progress.total_steps}
            <span className="ml-2">
              ({Math.round(progress.progress * 100)}%)
            </span>
          </div>
        )}
      </div>

      {/* Step Display */}
      <div className="border-[0.5px] border-[#67B68B] p-6 mb-6 min-h-[400px] flex max-w-5xl items-center gap-6 mx-auto">
        {/* Step Image */}
        <div className="w-1/2 bg-[#2A3142] aspect-video relative flex items-center justify-center">
          {currentStepData.finalImageUrl ? (
            <Image
              src={currentStepData.finalImageUrl}
              alt={currentStepData.title}
              fill
              className="object-cover"
            />
          ) : currentStepData.imageStatus === "generating" ||
            currentStepData.imageStatus === "pending" ? (
            <div className="flex flex-col items-center justify-center gap-3">
              <div className="w-12 h-12 border-4 border-[#67B68B] border-t-transparent rounded-full animate-spin" />
              <span className="text-gray-400 text-sm">
                {currentStepData.imageStatus === "generating"
                  ? "Generating..."
                  : "Waiting..."}
              </span>
            </div>
          ) : currentStepData.imageStatus === "failed" ? (
            <span className="text-red-400">Failed to generate image</span>
          ) : (
            <span className="text-gray-500">Image placeholder</span>
          )}
        </div>

        {/* Step Content */}
        <div className="w-1/2">
          <h4 className="text-[#67B68B] text-xl font-semibold mb-3">
            {currentStepData.title}
          </h4>
          <p className="text-gray-300 text-base leading-relaxed">
            {currentStepData.description}
          </p>
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-center gap-2">
        {enrichedSteps.map((step, index) => {
          const hasImage = !!step.finalImageUrl;
          const isGenerating =
            step.imageStatus === "generating" || step.imageStatus === "pending";

          return (
            <button
              key={index}
              onClick={() => setCurrentStep(index)}
              className={`w-10 h-10 border-[0.5px] transition-all relative ${
                currentStep === index
                  ? "bg-[#67B68B] border-[#67B68B] text-black font-semibold"
                  : "bg-[#2A3142] border-[#67B68B] text-gray-400 hover:border-[#67B68B] hover:text-white"
              }`}
              title={
                isGenerating
                  ? `Step ${index + 1} - Generating...`
                  : hasImage
                  ? `Step ${index + 1} - Ready`
                  : `Step ${index + 1}`
              }
            >
              {index + 1}

              {/* Status indicator dot */}
              {isGenerating && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
              )}
              {hasImage && !isGenerating && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-green-400 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
