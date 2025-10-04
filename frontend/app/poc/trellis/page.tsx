"use client";

import { useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import { uploadImageToTemporaryHost } from "@/lib/imageUpload";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";

// Component to load and display the GLB model
function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

export default function TrellisPage() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [glbUrl, setGlbUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [contrast, setContrast] = useState(3.0);
  const [exposure, setExposure] = useState(2.0);
  const [environmentPreset, setEnvironmentPreset] = useState<
    | "city"
    | "sunset"
    | "dawn"
    | "night"
    | "warehouse"
    | "forest"
    | "apartment"
    | "studio"
    | "park"
    | "lobby"
  >("studio");
  const controlsRef = useRef<OrbitControlsImpl>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
      setGlbUrl(null);
      setError(null);
    }
  };

  const handleGenerate = async () => {
    if (!selectedImage) return;

    setIsLoading(true);
    setError(null);

    try {
      // Upload the image to get a public URL
      const imageUrl = await uploadImageToTemporaryHost(selectedImage);

      // Call the Trellis API - backend has optimized defaults configured
      const response = await fetch("http://localhost:8000/trellis/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          images: [imageUrl],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || "Failed to generate 3D model");
      }

      const data = await response.json();

      if (data.model_file) {
        setGlbUrl(data.model_file);
      } else {
        throw new Error("No model file in response");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#161924] p-8 font-menlo">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Trellis 3D Generator</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Upload & Controls */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Upload Image</h2>

            <div className="mb-6">
              <label
                htmlFor="image-upload"
                className="block w-full p-8 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:border-blue-500 transition"
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-w-full max-h-64 mx-auto rounded"
                  />
                ) : (
                  <div>
                    <p className="text-gray-600">Click to upload image</p>
                    <p className="text-sm text-gray-400 mt-2">
                      PNG, JPG up to 10MB
                    </p>
                  </div>
                )}
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                />
              </label>
            </div>

            <button
              onClick={handleGenerate}
              disabled={!selectedImage || isLoading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
            >
              {isLoading ? "Generating 3D Model..." : "Generate 3D Model"}
            </button>

            {error && (
              <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            {isLoading && (
              <div className="mt-4 p-4 bg-blue-100 border border-blue-400 text-blue-700 rounded">
                <p className="font-semibold">Processing...</p>
                <p className="text-sm">
                  This may take a few minutes. The model is being generated from
                  your image.
                </p>
              </div>
            )}
          </div>

          {/* Right Panel - 3D Viewer */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">3D Model Preview</h2>

            {/* Lighting Controls */}
            {glbUrl && (
              <div className="mb-4 space-y-3 bg-[#2A3038] p-4 rounded-lg">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Environment Preset
                  </label>
                  <select
                    value={environmentPreset}
                    onChange={(e) =>
                      setEnvironmentPreset(e.target.value as any)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="city">City</option>
                    <option value="sunset">Sunset</option>
                    <option value="dawn">Dawn</option>
                    <option value="night">Night</option>
                    <option value="warehouse">Warehouse</option>
                    <option value="forest">Forest</option>
                    <option value="apartment">Apartment</option>
                    <option value="studio">Studio</option>
                    <option value="park">Park</option>
                    <option value="lobby">Lobby</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lighting Intensity: {contrast.toFixed(1)}x
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="5.0"
                    step="0.1"
                    value={contrast}
                    onChange={(e) => setContrast(parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Dim</span>
                    <span>Very Bright</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Exposure: {exposure.toFixed(1)}x
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="3.5"
                    step="0.1"
                    value={exposure}
                    onChange={(e) => setExposure(parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Dark</span>
                    <span>Very Bright</span>
                  </div>
                </div>
              </div>
            )}

            <div className="w-full h-[500px] bg-gradient-to-b from-gray-900 to-gray-800 rounded-lg overflow-hidden relative">
              {glbUrl ? (
                <>
                  <Canvas
                    camera={{ position: [0, 0, 5], fov: 50 }}
                    gl={{
                      toneMapping: 2, // ACESFilmic tone mapping
                      toneMappingExposure: exposure,
                    }}
                  >
                    <color attach="background" args={["#1a1a2e"]} />

                    {/* HDR Environment for PBR materials */}
                    <Environment
                      preset={environmentPreset}
                      background={false}
                    />

                    {/* Additional subtle lighting with contrast control */}
                    <ambientLight intensity={0.5 * contrast} />
                    <directionalLight
                      position={[5, 5, 5]}
                      intensity={0.8 * contrast}
                      castShadow
                    />
                    <directionalLight
                      position={[-5, 3, -5]}
                      intensity={0.3 * contrast}
                    />

                    <Model url={glbUrl} />

                    <OrbitControls
                      ref={controlsRef}
                      enableDamping
                      dampingFactor={0.05}
                      minDistance={2}
                      maxDistance={10}
                    />
                  </Canvas>

                  {/* Control Panel */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    {/* Reset Camera */}
                    <button
                      onClick={() => controlsRef.current?.reset()}
                      className="w-12 h-12 bg-gray-800/80 hover:bg-gray-700 border border-gray-600 rounded-lg flex items-center justify-center text-white transition backdrop-blur-sm"
                      title="Reset Camera"
                    >
                      <svg
                        className="w-6 h-6"
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
                      className="w-12 h-12 bg-gray-800/80 hover:bg-gray-700 border border-gray-600 rounded-lg flex items-center justify-center text-white transition backdrop-blur-sm"
                      title="Zoom In"
                    >
                      <svg
                        className="w-6 h-6"
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
                      className="w-12 h-12 bg-gray-800/80 hover:bg-gray-700 border border-gray-600 rounded-lg flex items-center justify-center text-white transition backdrop-blur-sm"
                      title="Zoom Out"
                    >
                      <svg
                        className="w-6 h-6"
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
                    <div className="w-12 h-12 bg-purple-600/80 border border-purple-500 rounded-lg flex items-center justify-center backdrop-blur-sm">
                      <div className="w-2 h-2 bg-purple-300 rounded-full"></div>
                    </div>

                    {/* Increase Contrast */}
                    <button
                      onClick={() => setContrast(Math.min(contrast + 0.3, 5.0))}
                      className="w-12 h-12 bg-gray-800/80 hover:bg-gray-700 border border-gray-600 rounded-lg flex items-center justify-center text-white transition backdrop-blur-sm"
                      title="Increase Contrast"
                    >
                      <svg
                        className="w-6 h-6"
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
                      className="w-12 h-12 bg-gray-800/80 hover:bg-gray-700 border border-gray-600 rounded-lg flex items-center justify-center text-white transition backdrop-blur-sm"
                      title="Decrease Contrast"
                    >
                      <svg
                        className="w-6 h-6"
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
                    <div className="flex items-center gap-2 bg-gray-900/80 px-3 py-2 rounded backdrop-blur-sm">
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
                      <span>
                        Use mouse to rotate, zoom, and pan the 3D model
                      </span>
                    </div>
                    <div className="bg-gray-900/80 px-3 py-2 rounded backdrop-blur-sm">
                      Contrast: {contrast.toFixed(1)}
                    </div>
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  {isLoading
                    ? "Generating model..."
                    : "Upload an image and generate to see 3D model"}
                </div>
              )}
            </div>

            {glbUrl && (
              <div className="mt-4">
                <a
                  href={glbUrl}
                  download
                  className="block w-full bg-green-600 text-white py-2 rounded-lg font-semibold text-center hover:bg-green-700 transition"
                >
                  Download GLB Model
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
