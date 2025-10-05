"use client";

import { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { Suspense } from "react";

interface ModelViewerProps {
  modelUrl?: string;
  isLoading?: boolean;
  error?: string | null;
}

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

function LoadingPlaceholder() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#4ade80" wireframe />
    </mesh>
  );
}

function LoadingSkeleton() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#2A3038]">
      <div className="text-center">
        <div className="mb-4">
          <div className="w-16 h-16 border-4 border-[#4ade80] border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
        <p className="text-[#67B68B] text-lg font-semibold mb-2">
          Generating 3D Model
        </p>
        <p className="text-gray-400 text-sm">This may take a few moments...</p>
      </div>
    </div>
  );
}

function ErrorDisplay({ message }: { message: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#2A3038]">
      <div className="text-center px-8">
        <div className="mb-4">
          <svg
            className="w-16 h-16 text-red-500 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <p className="text-red-400 text-lg font-semibold mb-2">Error</p>
        <p className="text-gray-400 text-sm">{message}</p>
      </div>
    </div>
  );
}

export default function ModelViewer({
  modelUrl,
  isLoading,
  error,
}: ModelViewerProps) {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const [contrast, setContrast] = useState(3.0);
  const [exposure, setExposure] = useState(2.0);

  // Show loading skeleton while generating
  if (isLoading) {
    return (
      <div className="bg-[#2A3038] border-[0.5px] border-[#67B68B] h-full min-h-[400px] relative">
        <LoadingSkeleton />
      </div>
    );
  }

  // Show error if generation failed
  if (error) {
    return (
      <div className="bg-[#2A3038] border-[0.5px] border-[#67B68B] h-full min-h-[400px] relative">
        <ErrorDisplay message={error} />
      </div>
    );
  }

  return (
    <div className="bg-[#2A3038] border-[0.5px] border-[#67B68B] h-full min-h-[400px] relative">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{
          toneMapping: 2, // ACESFilmic tone mapping
          toneMappingExposure: exposure,
        }}
      >
        <color attach="background" args={["#2A3038"]} />

        <Suspense fallback={<LoadingPlaceholder />}>
          {/* HDR Environment for PBR materials */}
          <Environment preset="studio" background={false} />

          {/* Additional subtle lighting with contrast control */}
          <ambientLight intensity={0.5 * contrast} />
          <directionalLight
            position={[5, 5, 5]}
            intensity={0.8 * contrast}
            castShadow
          />
          <directionalLight position={[-5, 3, -5]} intensity={0.3 * contrast} />

          {modelUrl ? <Model url={modelUrl} /> : <LoadingPlaceholder />}

          <OrbitControls
            ref={controlsRef}
            enableDamping
            dampingFactor={0.05}
            minDistance={2}
            maxDistance={10}
          />
        </Suspense>
      </Canvas>

      {/* Control Panel */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        {/* Reset Camera */}
        <button
          onClick={() => controlsRef.current?.reset()}
          className="w-10 h-10 bg-[#2A3142] hover:bg-[#3a4560] border-[0.5px] border-[#67B68B] flex items-center justify-center text-[#67B68B] transition"
          title="Reset Camera"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </button>

        {/* Zoom In */}
        <button
          onClick={() => {
            if (controlsRef.current) {
              const camera = controlsRef.current.object;
              camera.position.multiplyScalar(0.8);
              controlsRef.current.update();
            }
          }}
          className="w-10 h-10 bg-[#2A3142] hover:bg-[#3a4560] border-[0.5px] border-[#67B68B] flex items-center justify-center text-[#67B68B] transition"
          title="Zoom In"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
            />
          </svg>
        </button>

        {/* Zoom Out */}
        <button
          onClick={() => {
            if (controlsRef.current) {
              const camera = controlsRef.current.object;
              camera.position.multiplyScalar(1.2);
              controlsRef.current.update();
            }
          }}
          className="w-10 h-10 bg-[#2A3142] hover:bg-[#3a4560] border-[0.5px] border-[#67B68B] flex items-center justify-center text-[#67B68B] transition"
          title="Zoom Out"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7"
            />
          </svg>
        </button>

        {/* Center Dot Indicator */}
        <div className="w-10 h-10 bg-[#67B68B]/20 border-[0.5px] border-[#67B68B] flex items-center justify-center">
          <div className="w-2 h-2 bg-[#67B68B] rounded-full"></div>
        </div>

        {/* Increase Contrast */}
        <button
          onClick={() => setContrast(Math.min(contrast + 0.3, 5.0))}
          className="w-10 h-10 bg-[#2A3142] hover:bg-[#3a4560] border-[0.5px] border-[#67B68B] flex items-center justify-center text-[#67B68B] transition"
          title="Increase Contrast"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="10" strokeWidth={2} />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v8m4-4H8"
            />
          </svg>
        </button>

        {/* Decrease Contrast */}
        <button
          onClick={() => setContrast(Math.max(contrast - 0.3, 0.5))}
          className="w-10 h-10 bg-[#2A3142] hover:bg-[#3a4560] border-[0.5px] border-[#67B68B] flex items-center justify-center text-[#67B68B] transition"
          title="Decrease Contrast"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="10" strokeWidth={2} />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 12H8"
            />
          </svg>
        </button>
      </div>

      {/* Bottom Info Bar */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-sm text-gray-400">
        <div className="flex items-center gap-2 bg-[#1a1a2e]/80 px-3 py-2 backdrop-blur-sm">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Use mouse to rotate, zoom, and pan</span>
        </div>
        <div className="bg-[#1a1a2e]/80 px-3 py-2 backdrop-blur-sm">
          Contrast: {contrast.toFixed(1)}
        </div>
      </div>
    </div>
  );
}
