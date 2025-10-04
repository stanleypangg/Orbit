"use client";

import { useState, useRef, useEffect } from "react";
import { uploadImageToTemporaryHost } from "@/lib/imageUpload";

export default function MagicPencilPage() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [prompt, setPrompt] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [brushSize, setBrushSize] = useState(20);
  const [isDrawing, setIsDrawing] = useState(false);
  const [cursorPosition, setCursorPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const cursorCanvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setOriginalFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setOriginalImage(event.target?.result as string);
        setResultImage(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (originalImage && canvasRef.current) {
      const canvas = canvasRef.current;
      const cursorCanvas = cursorCanvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx && imageRef.current) {
        // Wait for image to load
        imageRef.current.onload = () => {
          if (imageRef.current) {
            canvas.width = imageRef.current.width;
            canvas.height = imageRef.current.height;
            // Also set cursor canvas to same dimensions
            if (cursorCanvas) {
              cursorCanvas.width = imageRef.current.width;
              cursorCanvas.height = imageRef.current.height;
            }
            ctx.clearRect(0, 0, canvas.width, canvas.height);
          }
        };
      }
    }
  }, [originalImage]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (ctx) {
      ctx.beginPath();
    }
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (ctx) {
      ctx.beginPath();
    }
  };

  const updateCursor = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    setCursorPosition({ x, y });
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    updateCursor(e);

    if (!isDrawing && e.type !== "mousedown") return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    // Use destination-over to draw BEHIND existing strokes
    // This prevents opacity buildup
    ctx.globalCompositeOperation = "destination-over";
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "rgba(255, 0, 0, 0.5)";
    ctx.fillStyle = "rgba(255, 0, 0, 0.5)";

    if (e.type === "mousedown") {
      // Draw a dot for single clicks
      ctx.beginPath();
      ctx.arc(x, y, brushSize / 2, 0, Math.PI * 2);
      ctx.fill();
      // Switch back to source-over for continuous drawing
      ctx.globalCompositeOperation = "source-over";
    } else {
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  };

  // Draw cursor circle on cursor canvas
  useEffect(() => {
    const cursorCanvas = cursorCanvasRef.current;
    const ctx = cursorCanvas?.getContext("2d");
    if (!ctx || !cursorCanvas || !cursorPosition) return;

    // Clear cursor canvas
    ctx.clearRect(0, 0, cursorCanvas.width, cursorCanvas.height);

    // Draw cursor circle
    ctx.beginPath();
    ctx.arc(cursorPosition.x, cursorPosition.y, brushSize / 2, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(255, 0, 0, 0.8)";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw center dot
    ctx.beginPath();
    ctx.arc(cursorPosition.x, cursorPosition.y, 1, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 0, 0, 0.8)";
    ctx.fill();
  }, [cursorPosition, brushSize]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (ctx && canvas) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
    }
  };

  const handleSubmit = async () => {
    if (!originalFile || !prompt.trim() || !canvasRef.current) {
      setError("Please upload an image, draw on it, and provide a prompt");
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // Upload original image
      const originalImageUrl = await uploadImageToTemporaryHost(originalFile);

      // Convert canvas to blob
      const canvas = canvasRef.current;
      const maskBlob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => {
          if (blob) resolve(blob);
        }, "image/png");
      });

      // Convert mask blob to file
      const maskFile = new File([maskBlob], "mask.png", { type: "image/png" });
      const maskImageUrl = await uploadImageToTemporaryHost(maskFile);

      // Call backend API
      const response = await fetch("http://localhost:8000/magic-pencil/edit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          original_image_url: originalImageUrl,
          drawn_overlay_url: maskImageUrl,
          prompt: prompt,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || "Failed to process image");
      }

      const data = await response.json();
      setResultImage(data.result_image_url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-4xl font-bold mb-2">Magic Pencil ✨</h1>
          <p className="text-gray-600">
            Draw on your image to select areas, then describe what you want to
            change
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Upload & Controls */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Upload & Draw</h2>

            <div className="mb-6">
              <label
                htmlFor="image-upload"
                className="block w-full p-8 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:border-blue-500 transition"
              >
                {originalImage ? (
                  <div className="text-green-600">
                    <svg
                      className="w-12 h-12 mx-auto mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <p className="font-semibold">Image Uploaded</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Click to change
                    </p>
                  </div>
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
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>

            {originalImage && (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Brush Size: {brushSize}px
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="50"
                    value={brushSize}
                    onChange={(e) => setBrushSize(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>

                <button
                  onClick={clearCanvas}
                  className="w-full bg-gray-600 text-white py-2 rounded-lg font-semibold hover:bg-gray-700 transition mb-4"
                >
                  Clear Drawing
                </button>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What do you want to change?
                  </label>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="E.g., 'Change the sky to sunset', 'Make the car blue', 'Add flowers in this area'"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    rows={4}
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={isProcessing || !prompt.trim()}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
                >
                  {isProcessing ? "Processing..." : "Apply Magic ✨"}
                </button>
              </>
            )}

            {error && (
              <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}
          </div>

          {/* Middle Panel - Canvas */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Draw Selection</h2>

            {originalImage ? (
              <div className="relative border-2 border-gray-300 rounded-lg overflow-hidden bg-gray-100 inline-block">
                <div className="relative" style={{ display: "inline-block" }}>
                  <img
                    ref={imageRef}
                    src={originalImage}
                    alt="Original"
                    className="w-full h-auto block"
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                  <canvas
                    ref={canvasRef}
                    onMouseDown={startDrawing}
                    onMouseUp={stopDrawing}
                    onMouseMove={draw}
                    onMouseLeave={() => {
                      stopDrawing();
                      setCursorPosition(null);
                    }}
                    onMouseEnter={updateCursor}
                    className="absolute top-0 left-0"
                    style={{
                      width: "100%",
                      height: "100%",
                      touchAction: "none",
                      cursor: "none",
                    }}
                  />
                  {/* Cursor canvas overlay */}
                  <canvas
                    ref={cursorCanvasRef}
                    className="absolute top-0 left-0 pointer-events-none"
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-96 border-2 border-dashed border-gray-300 rounded-lg text-gray-400">
                Upload an image to start
              </div>
            )}

            {originalImage && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded text-sm text-blue-800">
                <strong>Tip:</strong> Draw over the areas you want to modify.
                The red marks show where changes will be applied.
              </div>
            )}
          </div>

          {/* Right Panel - Result */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Result</h2>

            {resultImage ? (
              <div>
                <img
                  src={resultImage}
                  alt="Result"
                  className="w-full h-auto rounded-lg border-2 border-green-500"
                />
                <a
                  href={resultImage}
                  download="magic-pencil-result.png"
                  className="block w-full mt-4 bg-green-600 text-white py-2 rounded-lg font-semibold text-center hover:bg-green-700 transition"
                >
                  Download Result
                </a>
              </div>
            ) : isProcessing ? (
              <div className="flex flex-col items-center justify-center h-96 border-2 border-dashed border-gray-300 rounded-lg">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mb-4"></div>
                <p className="text-gray-600">Processing your image...</p>
              </div>
            ) : (
              <div className="flex items-center justify-center h-96 border-2 border-dashed border-gray-300 rounded-lg text-gray-400">
                Result will appear here
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
