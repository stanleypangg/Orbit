"use client";

import { useState, useRef } from "react";
import Image from "next/image";

interface Material {
  name: string;
  image: string;
}

interface MaterialsCarouselProps {
  materials: Material[];
}

export default function MaterialsCarousel({
  materials,
}: MaterialsCarouselProps) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!containerRef.current) return;

    const scrollAmount = 300;
    const newPosition =
      direction === "left"
        ? Math.max(0, scrollPosition - scrollAmount)
        : Math.min(
            containerRef.current.scrollWidth - containerRef.current.clientWidth,
            scrollPosition + scrollAmount
          );

    containerRef.current.scrollTo({
      left: newPosition,
      behavior: "smooth",
    });
    setScrollPosition(newPosition);
  };

  const handleScroll = () => {
    if (containerRef.current) {
      setScrollPosition(containerRef.current.scrollLeft);
    }
  };

  return (
    <div className="bg-[#232937] border border-[#3a4560] p-6">
      <h3 className="text-[#4ade80] text-base mb-6 uppercase tracking-wide">
        Tools & Materials
      </h3>

      <div className="relative">
        {/* Left Arrow */}
        {scrollPosition > 0 && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-[#2A3142] hover:bg-[#3a4560] border border-[#4ade80] flex items-center justify-center transition-colors"
            aria-label="Scroll left"
          >
            <span className="text-[#4ade80] text-xl">‹</span>
          </button>
        )}

        {/* Materials Container */}
        <div
          ref={containerRef}
          onScroll={handleScroll}
          className="flex gap-8 overflow-x-auto scrollbar-hide px-12"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {materials.map((material, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-3 shrink-0"
            >
              <div className="w-24 h-24 bg-[#2A3142] border border-[#3a4560] flex items-center justify-center p-4">
                <Image
                  src={material.image}
                  alt={material.name}
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>
              <span className="text-white text-sm text-center whitespace-nowrap">
                {material.name}
              </span>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        {containerRef.current &&
          scrollPosition <
            containerRef.current.scrollWidth -
              containerRef.current.clientWidth && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-[#2A3142] hover:bg-[#3a4560] border border-[#4ade80] flex items-center justify-center transition-colors"
              aria-label="Scroll right"
            >
              <span className="text-[#4ade80] text-xl">›</span>
            </button>
          )}
      </div>
    </div>
  );
}
