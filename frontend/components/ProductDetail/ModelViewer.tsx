"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF } from "@react-three/drei";
import { Suspense } from "react";

interface ModelViewerProps {
  modelUrl?: string;
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

export default function ModelViewer({ modelUrl }: ModelViewerProps) {
  return (
    <div className="bg-[#393E46] border border-[#3a4560] h-full min-h-[400px] relative">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ width: "100%", height: "100%" }}
      >
        <Suspense fallback={<LoadingPlaceholder />}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />

          {modelUrl ? <Model url={modelUrl} /> : <LoadingPlaceholder />}

          <OrbitControls
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
            minDistance={2}
            maxDistance={10}
          />
          <Environment preset="studio" />
        </Suspense>
      </Canvas>
    </div>
  );
}
