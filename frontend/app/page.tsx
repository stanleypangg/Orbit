"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoPlayState, setVideoPlayState] = useState<"first" | "looping">(
    "first"
  );
  const [isFadingOut, setIsFadingOut] = useState(false);

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
    // Fade out landing page
    setIsFadingOut(true);

    // Navigate after fade completes
    setTimeout(() => {
      router.push("/poc");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#0F1922] flex flex-col items-center justify-center relative overflow-hidden font-menlo">
      {/* Logo at top left */}
      <div
        className="absolute top-8 left-8 z-10 transition-opacity duration-500"
        style={{
          opacity: isFadingOut ? 0 : 1,
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
          opacity: isFadingOut ? 0 : 1,
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

      {/* Ambient glow effect */}
      <div className="absolute inset-0 bg-gradient-radial from-[#1a2942] via-transparent to-transparent opacity-30" />
    </div>
  );
}
