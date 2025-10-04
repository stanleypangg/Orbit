"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface Point {
  x: number;
  y: number;
}

interface HistoryState {
  imageData: ImageData;
  generatedImage: string | null;
}

export default function MagicPencilPage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [currentGeneratedImage, setCurrentGeneratedImage] = useState<
    string | null
  >(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<"pencil" | "eraser">("pencil");
  const [showPrompt, setShowPrompt] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastPoint, setLastPoint] = useState<Point | null>(null);

  // History management
  const [history, setHistory] = useState<HistoryState[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [generatedImagesCache, setGeneratedImagesCache] = useState<string[]>(
    []
  );

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

        // Save initial state
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        setHistory([{ imageData, generatedImage: null }]);
        setHistoryIndex(0);
      };
    }
  }, [uploadedImage]);

  const saveToHistory = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push({ imageData, generatedImage: currentGeneratedImage });
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
    setCurrentGeneratedImage(state.generatedImage);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setUploadedImage(event.target?.result as string);
      setCurrentGeneratedImage(null);
      setGeneratedImagesCache([]);
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
    if (!prompt.trim()) return;

    setIsGenerating(true);

    // TODO: Implement actual API call
    // For now, simulate generation
    setTimeout(() => {
      // Cache the current generated image
      if (currentGeneratedImage) {
        setGeneratedImagesCache([
          ...generatedImagesCache,
          currentGeneratedImage,
        ]);
      }

      // Mock generated image (in real implementation, this would come from API)
      setCurrentGeneratedImage(uploadedImage);
      setIsGenerating(false);
      setShowPrompt(false);
      setPrompt("");

      // Save to history with new generated image
      saveToHistory();
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#181A25] flex flex-col">
      {/* Header */}
      <div className="p-4 bg-[#1E2433] border-b border-[#2A3142] flex items-center gap-4">
        <Link href="/poc">
          <Image
            src="/logo_text.svg"
            alt="Orbit"
            width={80}
            height={27}
            className="opacity-90 cursor-pointer"
          />
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-6xl">
          {/* Title */}
          <h1 className="text-4xl font-light text-white mb-2">
            Adjust your Design
          </h1>
          <p className="text-[#4ade80] text-sm mb-12">
            Make changes before finalizing
          </p>

          {/* Main Canvas Area */}
          <div className="border border-[#67B68B] bg-[#2A3038] p-8">
            {/* Instruction */}
            <div className="flex items-center gap-2 text-[#4ade80] text-sm bg-[#2A3038] p-3 -mx-8 -mt-8 mb-6">
              <Image
                src="/edit/tooltip.svg"
                alt="Info"
                width={16}
                height={16}
              />
              <span>
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
                    className="px-8 py-4 bg-[#4ade80] hover:bg-[#3bc970] text-black font-semibold rounded-lg transition-colors"
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

            {/* Tools Bar */}
            {uploadedImage && (
              <div className="mt-6 bg-[#2D3642] border border-[#67B68B] px-6 py-5 flex items-center justify-between">
                <div className="flex items-center gap-6">
                  {/* Undo/Redo */}
                  <div className="flex gap-3">
                    <button
                      onClick={undo}
                      disabled={historyIndex <= 0}
                      className="w-[50px] h-[50px] bg-[#3A4450] rounded flex items-center justify-center hover:bg-[#454D5A] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
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
                      disabled={historyIndex >= history.length - 1}
                      className="w-[50px] h-[50px] bg-[#3A4450] rounded flex items-center justify-center hover:bg-[#454D5A] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
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
                      className={`w-[90px] h-[90px] bg-[#3A4450] rounded-lg flex items-center justify-center transition-all ${
                        tool === "pencil"
                          ? "ring-2 ring-[#4ade80]"
                          : "hover:bg-[#454D5A]"
                      }`}
                    >
                      <Image
                        src="/edit/pencil.png"
                        alt="Pencil"
                        width={50}
                        height={50}
                      />
                    </button>
                    <button
                      onClick={() => setTool("eraser")}
                      className={`w-[90px] h-[90px] bg-[#3A4450] rounded-lg flex items-center justify-center transition-all ${
                        tool === "eraser"
                          ? "ring-2 ring-[#4ade80]"
                          : "hover:bg-[#454D5A]"
                      }`}
                    >
                      <Image
                        src="/edit/eraser.png"
                        alt="Eraser"
                        width={50}
                        height={50}
                      />
                    </button>
                    <button
                      onClick={() => setShowPrompt(!showPrompt)}
                      className={`w-[90px] h-[90px] bg-[#3A4450] rounded-lg flex items-center justify-center transition-all ${
                        showPrompt
                          ? "ring-2 ring-[#4ade80]"
                          : "hover:bg-[#454D5A]"
                      }`}
                    >
                      <Image
                        src="/edit/note.png"
                        alt="Note"
                        width={50}
                        height={50}
                      />
                    </button>
                  </div>
                </div>

                {/* Generate & Skip Buttons */}
                <div className="flex flex-col gap-2 items-end">
                  <button
                    onClick={handleGenerate}
                    disabled={isGenerating || !showPrompt || !prompt.trim()}
                    className="w-[280px] py-4 bg-[#4ade80] hover:bg-[#3bc970] disabled:bg-gray-600 disabled:cursor-not-allowed text-black font-semibold rounded transition-colors uppercase tracking-wide"
                  >
                    {isGenerating ? "Generating..." : "Generate"}
                  </button>
                  <button className="text-[#4ade80] hover:text-[#3bc970] font-medium transition-colors uppercase text-sm tracking-wide">
                    Skip
                  </button>
                </div>
              </div>
            )}

            {/* Prompt Input */}
            {showPrompt && uploadedImage && (
              <div className="mt-4 p-4 border border-[#4ade80] rounded-lg bg-[#1E2433]">
                <label className="block text-[#4ade80] text-sm mb-2">
                  Describe your changes
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Type what you want to change in the marked areas..."
                  className="w-full bg-[#232937] text-white border border-[#2A3142] rounded p-3 h-24 resize-none focus:outline-none focus:border-[#4ade80] transition-colors placeholder:text-gray-500"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
