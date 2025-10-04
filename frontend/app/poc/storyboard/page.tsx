"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

export default function StoryboardPage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedStoryboard, setGeneratedStoryboard] = useState<string | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
        setGeneratedStoryboard(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!uploadedImage) return;

    setIsGenerating(true);
    setError(null);

    try {
      // Convert base64 to blob
      const response = await fetch(uploadedImage);
      const blob = await response.blob();

      // Create FormData
      const formData = new FormData();
      formData.append("image", blob, "product.jpg");

      // Call backend API
      const apiResponse = await fetch(
        "http://localhost:8000/api/storyboard/generate",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!apiResponse.ok) {
        const errorData = await apiResponse.json();
        throw new Error(errorData.detail || "Failed to generate storyboard");
      }

      const data = await apiResponse.json();
      setGeneratedStoryboard(data.storyboard_url);
    } catch (err) {
      console.error("Error generating storyboard:", err);
      setError(
        err instanceof Error ? err.message : "Failed to generate storyboard"
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#181A25] flex flex-col font-menlo">
      {/* Header */}
      <div className="p-4 bg-[#1E2433] border-b border-[#2A3142] flex items-center gap-4">
        <Link href="/poc">
          <Image
            src="/logo_text.svg"
            alt="Orbit"
            width={80}
            height={27}
            className="opacity-90 mr-auto"
          />
        </Link>
        <Link
          href="/poc/trellis"
          className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
        >
          Try Trellis 3D Generator →
        </Link>
        <Link
          href="/poc/magic-pencil"
          className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
        >
          Try Magic Pencil ✨ →
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col max-w-7xl px-16 mx-auto w-full py-16">
        {/* Title */}
        <h1 className="text-5xl font-light text-white mb-2">
          Generate DIY Storyboard
        </h1>
        <p className="text-[#4ade80] text-sm mb-12">
          Upload a product image to create step-by-step instructions
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Upload & Controls */}
          <div className="bg-[#2A3038] border-[0.5px] border-[#67B68B] p-8">
            <h2 className="text-[#67B68B] text-xl font-semibold mb-6 uppercase tracking-wide">
              Upload Product Image
            </h2>

            {/* Upload Area */}
            <div className="mb-6">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-[#67B68B] rounded-lg p-8 text-center cursor-pointer hover:border-[#4ade80] transition-colors min-h-[300px] flex items-center justify-center"
              >
                {uploadedImage ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <img
                      src={uploadedImage}
                      alt="Uploaded product"
                      className="max-w-full max-h-[300px] object-contain"
                    />
                  </div>
                ) : (
                  <div>
                    <div className="text-[#67B68B] text-4xl mb-4">📸</div>
                    <p className="text-[#67B68B] text-lg mb-2">
                      Click to upload image
                    </p>
                    <p className="text-gray-400 text-sm">PNG, JPG up to 10MB</p>
                  </div>
                )}
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={!uploadedImage || isGenerating}
              className="w-full bg-[#4ade80] hover:bg-[#3bc970] disabled:bg-gray-600 disabled:cursor-not-allowed text-black py-4 font-semibold transition-colors uppercase text-base"
            >
              {isGenerating
                ? "Generating Storyboard..."
                : "Generate Storyboard"}
            </button>

            {/* Error Display */}
            {error && (
              <div className="mt-4 p-4 bg-red-900/20 border border-red-700/50 rounded-lg">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Info */}
            {isGenerating && (
              <div className="mt-4 p-4 bg-blue-900/20 border border-blue-700/50 rounded-lg">
                <p className="text-blue-400 text-sm font-semibold">
                  Processing...
                </p>
                <p className="text-blue-300 text-xs mt-1">
                  AI is analyzing your product and creating a visual
                  step-by-step guide. This may take 30-60 seconds.
                </p>
              </div>
            )}
          </div>

          {/* Right Panel - Generated Storyboard */}
          <div className="bg-[#2A3038] border-[0.5px] border-[#67B68B] p-8">
            <h2 className="text-[#67B68B] text-xl font-semibold mb-6 uppercase tracking-wide">
              Generated Storyboard
            </h2>

            <div className="min-h-[400px] flex items-center justify-center">
              {generatedStoryboard ? (
                <div className="w-full">
                  <div className="relative w-full aspect-square mb-4">
                    <Image
                      src={generatedStoryboard}
                      alt="Generated storyboard"
                      fill
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  <a
                    href={generatedStoryboard}
                    download="storyboard.png"
                    className="block w-full bg-[#67B68B] hover:bg-[#5a9d7a] text-black py-3 text-center font-semibold transition-colors uppercase"
                  >
                    Download Storyboard
                  </a>
                </div>
              ) : (
                <div className="text-center text-gray-400">
                  {isGenerating ? (
                    <div className="space-y-4">
                      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#4ade80] mx-auto"></div>
                      <p>Generating your storyboard...</p>
                    </div>
                  ) : (
                    <div>
                      <div className="text-6xl mb-4">📋</div>
                      <p>
                        Upload an image and click generate to see your DIY
                        storyboard
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-12 bg-[#2A3038] border-[0.5px] border-[#67B68B] p-8">
          <h3 className="text-[#67B68B] text-xl font-semibold mb-6 uppercase tracking-wide">
            How It Works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-[#4ade80] text-2xl font-bold mb-2">1</div>
              <h4 className="text-white font-semibold mb-2">Upload Image</h4>
              <p className="text-gray-400 text-sm">
                Upload a photo of your finished product or a reference image of
                what you want to create.
              </p>
            </div>
            <div>
              <div className="text-[#4ade80] text-2xl font-bold mb-2">2</div>
              <h4 className="text-white font-semibold mb-2">AI Analysis</h4>
              <p className="text-gray-400 text-sm">
                Our AI analyzes the image, identifies materials, and breaks down
                the construction process into clear steps.
              </p>
            </div>
            <div>
              <div className="text-[#4ade80] text-2xl font-bold mb-2">3</div>
              <h4 className="text-white font-semibold mb-2">Get Storyboard</h4>
              <p className="text-gray-400 text-sm">
                Receive a visual storyboard with 6-9 panels showing each step
                from raw materials to finished product.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
