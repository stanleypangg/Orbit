"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface Point {
  x: number;
  y: number;
}

interface HistoryState {
  imageData: ImageData;
  baseImage: string; // The base image URL for this state
}

export default function MagicPencilPage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<"pencil" | "eraser">("pencil");
  const [showPrompt, setShowPrompt] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastPoint, setLastPoint] = useState<Point | null>(null);

  // History management
  const [history, setHistory] = useState<HistoryState[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const brushSize = 30;

  // Initialize canvas when image is uploaded
  useEffect(() => {
    if (uploadedImage && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const img = new window.Image();
      img.src = uploadedImage;
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw the uploaded image onto the canvas
        ctx.drawImage(img, 0, 0);

        // Save initial state with the base image
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        setHistory([{ imageData, baseImage: uploadedImage }]);
        setHistoryIndex(0);
      };
    }
  }, [uploadedImage]);

  const saveToHistory = (baseImageOverride?: string) => {
    const canvas = canvasRef.current;
    const baseImageToUse = baseImageOverride || uploadedImage;
    if (!canvas || !baseImageToUse) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push({ imageData, baseImage: baseImageToUse });
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      restoreHistoryState(newIndex);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      restoreHistoryState(newIndex);
    }
  };

  const restoreHistoryState = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const state = history[index];
    ctx.putImageData(state.imageData, 0, 0);
    setUploadedImage(state.baseImage); // Restore the base image for this state
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setUploadedImage(event.target?.result as string);
      setHistory([]);
      setHistoryIndex(-1);
    };
    reader.readAsDataURL(file);
  };

  const getCanvasCoordinates = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const coords = getCanvasCoordinates(e);
    if (!coords) return;

    setIsDrawing(true);
    setLastPoint(coords);

    // Draw initial point
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.beginPath();
    ctx.arc(coords.x, coords.y, brushSize / 2, 0, Math.PI * 2);

    if (tool === "pencil") {
      ctx.fillStyle = "rgba(76, 222, 128, 0.5)";
      ctx.fill();
    } else {
      ctx.globalCompositeOperation = "destination-out";
      ctx.fill();
      ctx.globalCompositeOperation = "source-over";
    }
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      setLastPoint(null);
      saveToHistory();
    }
  };

  const drawLine = (start: Point, end: Point) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Calculate distance between points
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Interpolate points for smoother curves
    const steps = Math.max(Math.ceil(distance / 2), 1);

    // Set up drawing style
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    if (tool === "pencil") {
      ctx.strokeStyle = "rgba(76, 222, 128, 0.5)";
      ctx.fillStyle = "rgba(76, 222, 128, 0.5)";
      ctx.globalCompositeOperation = "source-over";
    } else {
      ctx.globalCompositeOperation = "destination-out";
    }

    // Draw multiple circles along the path for smoother appearance
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const x = start.x + dx * t;
      const y = start.y + dy * t;

      ctx.beginPath();
      ctx.arc(x, y, brushSize / 2, 0, Math.PI * 2);
      ctx.fill();
    }

    // Reset composite operation
    if (tool === "eraser") {
      ctx.globalCompositeOperation = "source-over";
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !lastPoint) return;

    const coords = getCanvasCoordinates(e);
    if (!coords) return;

    // Draw line from last point to current point
    drawLine(lastPoint, coords);

    // Update last point
    setLastPoint(coords);
  };

  const handleGenerate = async () => {
    if (!prompt.trim() || !uploadedImage) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsGenerating(true);

    try {
      // Create a temporary canvas to extract the original image without drawings
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      const tempCtx = tempCanvas.getContext("2d");
      if (!tempCtx) return;

      // Draw the current base image (without green overlay)
      const baseImg = new window.Image();
      baseImg.src = uploadedImage;
      await new Promise<void>((resolve, reject) => {
        baseImg.onload = () => {
          tempCtx.drawImage(baseImg, 0, 0);
          resolve();
        };
        baseImg.onerror = reject;
      });

      const originalImageUrl = tempCanvas.toDataURL("image/png");

      // Get the canvas with drawings as data URL
      const drawnOverlayUrl = canvas.toDataURL("image/png");

      // Call the backend API
      const response = await fetch("http://localhost:8000/magic-pencil/edit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          original_image_url: originalImageUrl,
          drawn_overlay_url: drawnOverlayUrl,
          prompt: prompt.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();

      // Load the generated image and update the canvas
      const img = new window.Image();
      img.src = data.result_image_url;

      img.onload = () => {
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Clear canvas and draw the new generated image
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);

        // Update the base image for next iteration
        setUploadedImage(data.result_image_url);

        // Save to history with the new base image
        saveToHistory(data.result_image_url);

        setIsGenerating(false);
        setShowPrompt(false);
        setPrompt("");
      };

      img.onerror = () => {
        console.error("Failed to load generated image");
        setIsGenerating(false);
        alert("Failed to load the generated image");
      };
    } catch (error) {
      console.error("Error generating image:", error);
      setIsGenerating(false);
      alert("Failed to generate image. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#161924] flex flex-col font-menlo">
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-6xl">
          {/* Title */}
          <h1 className="text-4xl font-light tracking-wider text-white mb-2">
            Adjust your Design
          </h1>
          <p className="text-[#67B68B] text-xl tracking-wider mb-12">
            Make changes before finalizing
          </p>

          {/* Main Canvas Area */}
          <div className="border-[#67B68B] border-[0.45px] bg-[#2A3038] p-8">
            {/* Instruction */}
            <div className="flex pl-22 pt-10 items-center gap-8 text-[#67B68B] text-lg bg-[#2A3038] p-3 -mx-8 -mt-8 mb-6">
              <Image
                src="/edit/tooltip.svg"
                alt="Info"
                width={16}
                height={16}
              />
              <span className="tracking-wider">
                Use pencil to mark, undo marks with the eraser, and type your
                change description on notepad
              </span>
            </div>

            {/* Canvas Container */}
            <div
              ref={containerRef}
              className="relative bg-[#2A3038] flex items-center justify-center"
              style={{ minHeight: "400px", height: "500px" }}
            >
              {!uploadedImage ? (
                // Upload State
                <div className="text-center">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-8 py-4 bg-[#67B68B] hover:bg-[#3bc970] text-black font-semibold rounded-lg transition-colors tracking-wide"
                  >
                    Upload Image
                  </button>
                </div>
              ) : (
                // Canvas State
                <canvas
                  ref={canvasRef}
                  onMouseDown={startDrawing}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onMouseMove={handleMouseMove}
                  className="max-w-full max-h-full cursor-crosshair"
                  style={{
                    imageRendering: "crisp-edges",
                  }}
                />
              )}
            </div>

            {/* Tools Bar - Always visible */}
            <div className="mt-6 bg-[#2D3642] border border-[#67B68B] px-6 py-5 flex items-center justify-between">
              <div className="flex items-center gap-6">
                {/* Undo/Redo */}
                <div className="flex">
                  <button
                    onClick={undo}
                    disabled={!uploadedImage || historyIndex <= 0}
                    className="w-[100px] h-[100px] flex items-center justify-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <Image
                      src="/edit/undo.svg"
                      alt="Undo"
                      width={24}
                      height={24}
                    />
                  </button>
                  <button
                    onClick={redo}
                    disabled={
                      !uploadedImage || historyIndex >= history.length - 1
                    }
                    className="w-[100px] h-[100px] flex items-center justify-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <Image
                      src="/edit/redo.svg"
                      alt="Redo"
                      width={24}
                      height={24}
                    />
                  </button>
                </div>

                {/* Tools */}
                <div className="flex gap-4">
                  <button
                    onClick={() => setTool("pencil")}
                    disabled={!uploadedImage}
                    className={`w-[90px] h-[90px] flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed ${
                      tool === "pencil" ? "" : "hover:bg-[#454D5A]"
                    }`}
                  >
                    <Image
                      src="/edit/pencil.png"
                      alt="Pencil"
                      width={100}
                      height={100}
                      className="max-w-[100px] max-h-[100px] w-auto h-auto"
                    />
                  </button>
                  <button
                    onClick={() => setTool("eraser")}
                    disabled={!uploadedImage}
                    className={`w-[90px] h-[90px] flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed ${
                      tool === "eraser" ? "" : "hover:bg-[#454D5A]"
                    }`}
                  >
                    <Image
                      src="/edit/eraser.png"
                      alt="Eraser"
                      width={100}
                      height={100}
                      className="max-w-[100px] max-h-[100px] w-auto h-auto"
                    />
                  </button>
                  <button
                    onClick={() => setShowPrompt(!showPrompt)}
                    disabled={!uploadedImage}
                    className={`w-[90px] h-[90px] flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed ${
                      showPrompt ? "" : "hover:bg-[#454D5A]"
                    }`}
                  >
                    <Image
                      src="/edit/note.png"
                      alt="Note"
                      width={100}
                      height={100}
                      className="max-w-[100px] max-h-[100px] w-auto h-auto"
                    />
                  </button>
                </div>
              </div>

              {/* Generate & Skip Buttons */}
              <div className="flex flex-col gap-2 items-center">
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating || !showPrompt || !prompt.trim()}
                  className="w-[400px] py-4 bg-[#67B68B] hover:bg-[#3bc970] disabled:bg-gray-600 disabled:cursor-not-allowed text-black font-semibold transition-colors uppercase tracking-wide"
                >
                  {isGenerating ? "Generating..." : "Generate"}
                </button>
                <button className="text-[#67B68B] hover:text-[#3bc970] font-medium transition-colors uppercase underline underline-offset-2 text-sm tracking-wide">
                  Skip
                </button>
              </div>
            </div>

            {/* Prompt Input */}
            {showPrompt && uploadedImage && (
              <div className="mt-4 p-4 border border-[#67B68B] rounded-lg bg-[#1E2433]">
                <label className="block text-[#67B68B] text-sm mb-2 tracking-wide">
                  Describe your changes
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Type what you want to change in the marked areas..."
                  className="w-full bg-[#232937] text-white border border-[#2A3142] rounded p-3 h-24 resize-none focus:outline-none focus:border-[#67B68B] transition-colors placeholder:text-gray-500"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
