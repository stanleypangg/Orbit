"use client";

import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import { uploadImageToTemporaryHost } from "@/lib/imageUpload";

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

      // Call the Trellis API
      const response = await fetch("http://localhost:8000/trellis/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          images: [imageUrl],
          generate_model: true,
          texture_size: 2048,
          mesh_simplify: 0.95,
          ss_sampling_steps: 38,
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
    <div className="min-h-screen bg-gray-50 p-8">
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

            <div className="w-full h-[500px] bg-gray-100 rounded-lg overflow-hidden">
              {glbUrl ? (
                <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                  <ambientLight intensity={0.5} />
                  <spotLight position={[10, 10, 10]} angle={0.15} />
                  <pointLight position={[-10, -10, -10]} />
                  <Model url={glbUrl} />
                  <OrbitControls />
                  <Environment preset="studio" />
                </Canvas>
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
