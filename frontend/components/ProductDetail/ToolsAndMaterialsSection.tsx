"use client";

import { useState, useRef } from "react";
import * as LucideIcons from "lucide-react";

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

  // Helper to get Lucide icon component
  const getIcon = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName];
    return IconComponent || LucideIcons.Wrench; // Fallback to Wrench
  };

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
    <div className="mb-8 bg-[#2A3038] border-[0.5px] border-[#67B68B] rounded p-6">
      <h3 className="text-[#67B68B] text-base mb-6 uppercase tracking-wide">
        Tools & Materials
      </h3>

      <div className="relative">
        {/* Left Arrow */}
        {canGoPrevious && (
          <button
            onClick={handlePrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-[#2A3142] hover:bg-[#3a4560] border-[0.5px] border-[#67B68B] flex items-center justify-center transition-colors"
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
            className="flex gap-6"
            style={{
              width: `${(items.length / itemsPerPage) * 100}%`,
            }}
          >
            {items.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center"
                style={{
                  minWidth: `${100 / items.length}%`,
                  flex: `0 0 ${100 / items.length}%`,
                }}
              >
                {/* Square card */}
                <div className="w-[160px] h-[160px] bg-gradient-to-br from-[#2A3038] to-[#161924] border border-[#67B68B]/30 rounded hover:border-[#67B68B] transition-all group relative overflow-hidden flex flex-col items-center justify-center p-4">
                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#67B68B] opacity-40 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#67B68B] opacity-40 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#67B68B] opacity-40 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#67B68B] opacity-40 group-hover:opacity-100 transition-opacity" />

                  {/* Icon */}
                  <div className="w-16 h-16 mb-3 opacity-80 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    {(() => {
                      const Icon = getIcon(item.icon_name);
                      return (
                        <Icon
                          size={48}
                          strokeWidth={2}
                          className={item.category === "tool" ? "text-[#67B68B]" : "text-[#5BA3D0]"}
                        />
                      );
                    })()}
                  </div>

                  {/* Category badge */}
                  <div
                    className={`text-[8px] font-mono uppercase tracking-wider mb-2 px-2 py-0.5 rounded ${
                      item.category === "tool"
                        ? "bg-[#67B68B]/10 text-[#67B68B] border border-[#67B68B]/30"
                        : "bg-[#5BA3D0]/10 text-[#5BA3D0] border border-[#5BA3D0]/30"
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
            ))}
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
          <div className="w-3 h-3 bg-[#67B68B]/20 border border-[#67B68B]/50 rounded" />
          <span className="text-gray-400">TOOL</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-[#5BA3D0]/20 border border-[#5BA3D0]/50 rounded" />
          <span className="text-gray-400">MATERIAL</span>
        </div>
        <div className="ml-auto text-gray-500">
          → Icons from Lucide library
        </div>
      </div>
    </div>
  );
}

