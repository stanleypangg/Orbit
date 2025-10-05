"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const router = useRouter();
  const [animationPhase, setAnimationPhase] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoPlayState, setVideoPlayState] = useState<"first" | "looping">(
    "first"
  );

  // Prefetch /poc page on mount for faster navigation
  useEffect(() => {
    router.prefetch("/poc");
  }, [router]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleVideoEnd = () => {
      if (videoPlayState === "first") {
        // After first play, enter looping mode
        setVideoPlayState("looping");
        // Jump to 2 seconds and play forward
        video.currentTime = 2;
        video.play();
      } else {
        // In looping mode, just loop from 2 seconds to end
        video.currentTime = 2;
        video.play();
      }
    };

    video.addEventListener("ended", handleVideoEnd);

    return () => {
      video.removeEventListener("ended", handleVideoEnd);
    };
  }, [videoPlayState]);

  const handleClick = () => {
    // Phase 1: Fade out landing content (0-600ms)
    setAnimationPhase(1);

    setTimeout(() => {
      // Phase 2: Show MacBook fitted to screen (600ms)
      setAnimationPhase(2);
    }, 600);

    setTimeout(() => {
      // Phase 3: Start zooming into MacBook (800-3300ms)
      setAnimationPhase(3);
    }, 800);

    setTimeout(() => {
      // Phase 4: Fade out (3300-3800ms)
      setAnimationPhase(4);
    }, 3300);

    setTimeout(() => {
      // Phase 5: Navigate to /poc (3800ms)
      router.push("/poc");
    }, 3800);
  };

  return (
    <div className="min-h-screen bg-[#0F1922] flex flex-col items-center justify-center relative overflow-hidden font-menlo">
      {/* Logo at top left */}
      <div
        className="absolute top-8 left-8 z-10 transition-opacity duration-500"
        style={{
          opacity: animationPhase >= 1 ? 0 : 1,
        }}
      >
        <Image
          src="/logo_text.svg"
          alt="Orbit"
          width={120}
          height={40}
          className="opacity-90"
        />
      </div>

      {/* Main content container - Landing image and text */}
      <div
        className="flex flex-col items-center justify-center space-y-12 z-10 transition-opacity duration-500"
        style={{
          opacity: animationPhase >= 1 ? 0 : 1,
          pointerEvents: animationPhase >= 1 ? "none" : "auto",
        }}
      >
        {/* Isometric room video */}
        <div className="relative cursor-pointer" onClick={handleClick}>
          <img
            className="w-[600px] h-[600px] object-cover absolute"
            src="/landing_mask.png"
            alt=""
          />
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="w-[600px] h-[600px] object-cover"
          >
            <source src="/landing.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Click instruction text */}
        <div className="text-center">
          <p className="text-[#4ade80] text-xl font-mono tracking-wider animate-pulse">
            CLICK ON THE LAPTOP
          </p>
        </div>
      </div>

      {/* MacBook animation */}
      {animationPhase >= 2 && (
        <div
          className="fixed inset-0 z-20 flex items-center justify-center bg-[#0F1922]"
          style={{
            opacity: animationPhase >= 4 ? 0 : 1,
            transition: animationPhase >= 4 ? "opacity 500ms ease-out" : "none",
          }}
        >
          <div
            className="relative w-screen h-screen flex items-center justify-center"
            style={{
              transform: animationPhase >= 3 ? "scale(6)" : "scale(1)",
              transition:
                animationPhase >= 3
                  ? "transform 2.5s cubic-bezier(0.65, 0, 0.35, 1)"
                  : "none",
            }}
          >
            <Image
              src="/greenbook.png"
              alt="MacBook"
              width={1920}
              height={1200}
              className="max-w-full max-h-full w-auto h-auto object-contain"
              priority
            />

            {/* Loading spinner in the laptop screen */}
            <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2">
              <div
                className="w-16 h-16 border-4 border-[#4ade80] border-t-transparent rounded-full animate-spin"
                style={{
                  opacity: animationPhase >= 3 ? 1 : 0,
                  transition: "opacity 300ms ease-in",
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Ambient glow effect */}
      <div className="absolute inset-0 bg-gradient-radial from-[#1a2942] via-transparent to-transparent opacity-30" />
    </div>
  );
}
