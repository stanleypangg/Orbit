"use client";

import { useState, useRef, useEffect } from "react";
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsPerPage = 5;
  const maxIndex = Math.max(0, materials.length - itemsPerPage);

  const scrollToIndex = (index: number) => {
    if (!containerRef.current) return;

    const itemWidth = containerRef.current.scrollWidth / materials.length;
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
    <div className="bg-[#2A3038] border-[0.5px] border-[#67B68B] p-6">
      <h3 className="text-[#67B68B] text-base mb-6 uppercase tracking-wide">
        Tools & Materials
      </h3>

      <div className="relative">
        {/* Left Arrow */}
        {canGoPrevious && (
          <button
            onClick={handlePrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-[#2A3142] hover:bg-[#3a4560] border-[0.5px] border-[#67B68B] flex items-center justify-center transition-colors"
            aria-label="Previous materials"
          >
            <span className="text-[#67B68B] text-xl">‹</span>
          </button>
        )}

        {/* Materials Container */}
        <div
          ref={containerRef}
          className="overflow-hidden pr-12"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div
            className="flex gap-8"
            style={{
              width: `${(materials.length / itemsPerPage) * 100}%`,
            }}
          >
            {materials.map((material, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-3"
                style={{
                  minWidth: `${100 / materials.length}%`,
                  flex: `0 0 ${100 / materials.length}%`,
                }}
              >
                <div className="w-[132px] h-[132px] flex items-center justify-center">
                  <Image
                    src={material.image}
                    alt={material.name}
                    width={132}
                    height={108}
                    className="object-contain"
                    style={{ height: "108px", width: "auto" }}
                  />
                </div>
                <span className="text-[#67B68B] text-md tracking-wider text-center whitespace-nowrap">
                  {material.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        {canGoNext && (
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-[#2A3142] hover:bg-[#3a4560] border-[0.5px] border-[#67B68B] flex items-center justify-center transition-colors"
            aria-label="Next materials"
          >
            <span className="text-[#67B68B] text-xl">›</span>
          </button>
        )}
      </div>
    </div>
  );
}
