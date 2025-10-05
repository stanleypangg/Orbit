"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const router = useRouter();
  const [animationPhase, setAnimationPhase] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const glowingVideoRef = useRef<HTMLVideoElement>(null);
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

  // Handle glowing video animation sequence
  useEffect(() => {
    const glowingVideo = glowingVideoRef.current;
    if (!glowingVideo || animationPhase !== 2) return;

    // Pause video immediately on first frame
    glowingVideo.pause();

    // Phase 3: Start glow effect (immediately)
    setAnimationPhase(3);

    // After 2 seconds, start zoom
    const zoomTimeout = setTimeout(() => {
      setAnimationPhase(4);
    }, 2000);

    // After zoom completes (2s zoom + 2s pause = 4s total), fade to /poc bg
    const fadeTimeout = setTimeout(() => {
      setAnimationPhase(5);
    }, 4000);

    // Navigate to /poc after fade
    const navTimeout = setTimeout(() => {
      router.push("/poc");
    }, 4500);

    return () => {
      clearTimeout(zoomTimeout);
      clearTimeout(fadeTimeout);
      clearTimeout(navTimeout);
    };
  }, [animationPhase, router]);

  const handleClick = () => {
    // Phase 1: Fade out landing content (0-600ms)
    setAnimationPhase(1);

    setTimeout(() => {
      // Phase 2: Show glowing.mp4 fullscreen (600ms)
      setAnimationPhase(2);
      // Video will play and trigger phase 3 when it ends
    }, 600);
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

      {/* Glowing video animation */}
      {animationPhase >= 2 && (
        <div
          className="fixed inset-0 z-20 bg-[#0F1922] flex items-center justify-center"
          style={{
            opacity: animationPhase === 2 ? 0 : animationPhase >= 5 ? 0 : 1,
            transition:
              animationPhase === 2
                ? "none"
                : animationPhase === 3
                ? "opacity 600ms ease-out"
                : animationPhase >= 5
                ? "opacity 500ms ease-out"
                : "none",
          }}
        >
          <div
            className="relative w-screen h-screen overflow-hidden flex items-center justify-center"
            style={{
              transform: animationPhase >= 4 ? "scale(8)" : "scale(1)",
              transition:
                animationPhase >= 4
                  ? "transform 2s cubic-bezier(0.65, 0, 0.35, 1)"
                  : "none",
            }}
          >
            <video
              ref={glowingVideoRef}
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover"
              style={{
                filter:
                  animationPhase >= 3 && animationPhase < 4
                    ? "drop-shadow(0 0 80px rgba(103, 182, 139, 0.8)) drop-shadow(0 0 120px rgba(74, 222, 128, 0.6))"
                    : "none",
                transition: "filter 800ms ease-out",
              }}
            >
              <source src="/glowing.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      )}

      {/* /poc background color transition layer */}
      {animationPhase >= 5 && (
        <div
          className="fixed inset-0 z-30 bg-[#161924]"
          style={{
            opacity: animationPhase >= 5 ? 1 : 0,
            transition: "opacity 500ms ease-out",
          }}
        />
      )}

      {/* Ambient glow effect */}
      <div className="absolute inset-0 bg-gradient-radial from-[#1a2942] via-transparent to-transparent opacity-30" />
    </div>
  );
}
