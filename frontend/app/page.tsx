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

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleVideoEnd = () => {
      if (videoPlayState === "first") {
        // After first play, enter looping mode
        setVideoPlayState("looping");
        // Jump to 2 seconds and play forward
        video.currentTime = 2;
        video.playbackRate = 1;
        video.play();
      } else {
        // In looping mode, alternate direction
        if (video.playbackRate === 1) {
          // Was playing forward, now reverse
          video.playbackRate = -1;
          video.currentTime = video.duration;
          video.play();
        } else {
          // Was playing backward, now forward
          video.playbackRate = 1;
          video.currentTime = 2;
          video.play();
        }
      }
    };

    const handleTimeUpdate = () => {
      // When reversing, stop at 2 seconds
      if (video.playbackRate === -1 && video.currentTime <= 2) {
        video.pause();
        handleVideoEnd();
      }
    };

    video.addEventListener("ended", handleVideoEnd);
    video.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      video.removeEventListener("ended", handleVideoEnd);
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [videoPlayState]);

  const handleClick = () => {
    // Phase 1: Fade out landing.png and text (0-600ms)
    setAnimationPhase(1);

    setTimeout(() => {
      // Phase 2: Render macbook off-screen (600ms)
      setAnimationPhase(2);
    }, 600);

    setTimeout(() => {
      // Phase 3: Start sliding macbook up (650-1850ms)
      setAnimationPhase(3);
    }, 650);

    setTimeout(() => {
      // Phase 4: Macbook pauses centered on screen (1850-2350ms)
      setAnimationPhase(4);
    }, 1850);

    setTimeout(() => {
      // Phase 5: Zoom into macbook screen (2350-4350ms)
      setAnimationPhase(5);
    }, 2350);

    setTimeout(() => {
      // Phase 6: Navigate to /poc (4350ms)
      router.push("/poc");
    }, 4350);
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
          <img className="w-[600px] h-[600px] object-cover absolute" src="/landing_mask.png" alt="" />
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
          className="fixed inset-0 z-20 flex items-center justify-center"
          style={{
            transform:
              animationPhase === 2
                ? "translateY(100%)"
                : animationPhase === 3 || animationPhase === 4
                ? "translateY(0)"
                : animationPhase >= 5
                ? "translateY(0) scale(6)"
                : "translateY(100%)",
            transition:
              animationPhase >= 3 && animationPhase < 5
                ? "transform 1.2s cubic-bezier(0.4, 0, 0.2, 1)"
                : animationPhase >= 5
                ? "transform 2s cubic-bezier(0.65, 0, 0.35, 1)"
                : "none",
          }}
        >
          <div className="relative w-screen">
            <Image
              src="/macbook.png"
              alt="MacBook"
              width={1920}
              height={1200}
              className="w-full h-auto"
              priority
            />

            {/* Loading spinner in the laptop screen */}
            {animationPhase >= 4 && (
              <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2">
                <div
                  className="w-16 h-16 border-4 border-[#4ade80] border-t-transparent rounded-full animate-spin"
                  style={{
                    opacity: animationPhase >= 5 ? 1 : 0,
                    transition: "opacity 500ms ease-in",
                  }}
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Ambient glow effect */}
      <div className="absolute inset-0 bg-gradient-radial from-[#1a2942] via-transparent to-transparent opacity-30" />
    </div>
  );
}
