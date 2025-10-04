"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/poc");
  };

  return (
    <div className="min-h-screen bg-[#181A25] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Logo at top left */}
      <div className="absolute top-8 left-8 z-10">
        <Image
          src="/logo_text.svg"
          alt="Orbit"
          width={120}
          height={40}
          className="opacity-90"
        />
      </div>

      {/* Main content container */}
      <div className="flex flex-col items-center justify-center space-y-12 z-10">
        {/* Isometric room illustration */}
        <div className="relative cursor-pointer" onClick={handleClick}>
          <Image
            src="/landing.png"
            alt="Isometric room"
            width={500}
            height={500}
            priority
          />
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
