"use client";

import { useState, useRef } from "react";
import { getToolImage } from "@/lib/toolImages";

interface ToolOrMaterial {
  name: string;
  category: "tool" | "material";
  purpose: string;
  is_optional: boolean;
  icon_name: string;
  alternatives?: string[];
}

interface ToolsAndMaterialsSectionProps {
  items: ToolOrMaterial[];
}

export default function ToolsAndMaterialsSection({
  items,
}: ToolsAndMaterialsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsPerPage = 5;
  const maxIndex = Math.max(0, items.length - itemsPerPage);

  const scrollToIndex = (index: number) => {
    if (!containerRef.current) return;

    const itemWidth = containerRef.current.scrollWidth / items.length;
    const scrollPosition = index * itemWidth;

    containerRef.current.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
    });

    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < maxIndex) {
      scrollToIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      scrollToIndex(currentIndex - 1);
    }
  };

  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex < maxIndex;

  return (
    <div className="mb-8 bg-[#2A3038] border-[0.5px] border-[#67B68B] p-6">
      <h3 className="text-[#67B68B] text-base mb-6 uppercase tracking-wide font-menlo">
        Tools & Materials
      </h3>

      <div className="relative">
        {/* Left Arrow */}
        {canGoPrevious && (
          <button
            onClick={handlePrevious}
            className="absolute top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-[#2A3142] hover:bg-[#3a4560] border-[0.5px] border-[#67B68B] flex items-center justify-center transition-colors"
            aria-label="Previous items"
          >
            <span className="text-[#67B68B] text-xl">‹</span>
          </button>
        )}

        {/* Items Container */}
        <div
          ref={containerRef}
          className="overflow-hidden px-12"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div
            className="flex gap-6 justify-between"
            style={{
              width:
                items.length <= itemsPerPage
                  ? "100%"
                  : `${(items.length / itemsPerPage) * 100}%`,
            }}
          >
            {items.map((item, index) => {
              const toolImage = getToolImage(item.name, item.category);

              return (
                <div
                  key={index}
                  className="flex flex-col items-center flex-shrink-0"
                  style={{
                    width:
                      items.length <= itemsPerPage
                        ? `calc((100% - ${
                            (itemsPerPage - 1) * 24
                          }px) / ${Math.min(items.length, itemsPerPage)})`
                        : `calc((100% - ${
                            (itemsPerPage - 1) * 24
                          }px) / ${itemsPerPage})`,
                  }}
                >
                  {/* Square card */}
                  <div className="w-[160px] h-[160px] bg-gradient-to-br from-[#2A3038] to-[#161924] border border-[#67B68B]/30 hover:border-[#67B68B] transition-all group relative overflow-hidden flex flex-col items-center justify-center p-4">
                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#67B68B] opacity-40 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#67B68B] opacity-40 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#67B68B] opacity-40 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#67B68B] opacity-40 group-hover:opacity-100 transition-opacity" />

                    {/* Image/Emoji Display */}
                    <div className="w-20 h-20 mb-3 opacity-80 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      {toolImage.image ? (
                        // If we have an image URL, display it
                        <img
                          src={toolImage.image}
                          alt={item.name}
                          className="w-full h-full object-contain"
                          style={{
                            filter: `drop-shadow(0 0 8px ${toolImage.color}40)`,
                          }}
                        />
                      ) : (
                        // Otherwise use emoji with styled background
                        <div
                          className="text-6xl relative"
                          style={{
                            filter: `drop-shadow(0 0 12px ${toolImage.color}60)`,
                          }}
                        >
                          {toolImage.emoji}
                        </div>
                      )}
                    </div>

                    {/* Category badge */}
                    <div
                      className={`text-[8px] font-mono uppercase tracking-wider mb-2 px-2 py-0.5 border-[0.5px] ${
                        item.category === "tool"
                          ? "bg-[#67B68B]/10 text-[#67B68B] border-[#67B68B]/30"
                          : "bg-[#5BA3D0]/10 text-[#5BA3D0] border-[#5BA3D0]/30"
                      }`}
                    >
                      {item.category}
                    </div>

                    {/* Name */}
                    <div className="text-sm font-semibold text-white text-center font-mono">
                      {item.name}
                    </div>
                  </div>

                  {/* Purpose below card */}
                  <div className="mt-3 text-center">
                    <div className="text-[11px] text-gray-400 font-mono leading-relaxed max-w-[160px]">
                      {item.purpose}
                    </div>
                    {item.is_optional && (
                      <div className="mt-1 text-[9px] text-gray-600 font-mono uppercase tracking-wider">
                        Optional
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Arrow */}
        {canGoNext && (
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-[#2A3142] hover:bg-[#3a4560] border-[0.5px] border-[#67B68B] flex items-center justify-center transition-colors"
            aria-label="Next items"
          >
            <span className="text-[#67B68B] text-xl">›</span>
          </button>
        )}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-[#67B68B]/20 flex items-center gap-6 text-xs font-mono">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-[#67B68B]/20 border-[0.5px] border-[#67B68B]/50" />
          <span className="text-gray-400">TOOL</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-[#5BA3D0]/20 border-[0.5px] border-[#5BA3D0]/50" />
          <span className="text-gray-400">MATERIAL</span>
        </div>
        <div className="ml-auto text-gray-500">→ Visual representations</div>
      </div>
    </div>
  );
}
