"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

interface Point {
  x: number;
  y: number;
}

interface HistoryState {
  imageData: ImageData;
  baseImage: string; // The base image URL for this state
}

export default function MagicPencilPage() {
  const searchParams = useSearchParams();
  const imageFromQuery = searchParams.get("image") || "/pikachu.webp";
  const [uploadedImage, setUploadedImage] = useState<string | null>(
    imageFromQuery
  );
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<"pencil" | "eraser" | null>(null);
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastPoint, setLastPoint] = useState<Point | null>(null);

  // History management
  const [history, setHistory] = useState<HistoryState[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const brushColors = [
    "#E91E63", // Pink
    "#B8975A", // Gold/Yellow
    "#67B68B", // Green
    "#5BA3D0", // Blue
    "#9B59B6", // Purple
  ];

  const [brushColor, setBrushColor] = useState(brushColors[2]); // Default green
  const [brushSize, setBrushSize] = useState(30);

  // Custom cursor position
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(
    null
  );

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
    if (!tool) return; // Don't allow drawing if no tool is selected

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
      // Convert hex color to rgba with opacity
      const r = parseInt(brushColor.slice(1, 3), 16);
      const g = parseInt(brushColor.slice(3, 5), 16);
      const b = parseInt(brushColor.slice(5, 7), 16);
      const colorWithOpacity = `rgba(${r}, ${g}, ${b}, 0.7)`;

      ctx.strokeStyle = colorWithOpacity;
      ctx.fillStyle = colorWithOpacity;
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
    // Update cursor position relative to container
    const container = containerRef.current;
    if (container) {
      const rect = container.getBoundingClientRect();
      setCursorPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }

    if (!isDrawing || !lastPoint) return;

    const coords = getCanvasCoordinates(e);
    if (!coords) return;

    // Draw line from last point to current point
    drawLine(lastPoint, coords);

    // Update last point
    setLastPoint(coords);
  };

  const handleMouseEnter = () => {
    // Show cursor
  };

  const handleMouseLeave = () => {
    setCursorPos(null);
    if (isDrawing) {
      stopDrawing();
    }
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
    <div className="h-screen bg-[#161924] flex flex-col font-menlo overflow-hidden">
      {/* Main Content */}
      <div className="flex-1 flex flex-col pt-8 max-w-7xl mx-auto w-full">
        <div className="w-full max-w-full">
          {/* Title */}
          <h1 className="text-4xl font-light tracking-wider text-white mb-2">
            Adjust your Design
          </h1>
          <p className="text-[#67B68B] text-xl tracking-wider mb-12">
            Make changes before finalizing
          </p>

          {/* Main Canvas Area */}
          <div className="border-[#67B68B] border-[0.45px] bg-[#2A3038]">
            {/* Tooltip Block - Full Width at Top */}
            <div className="flex items-center gap-4 px-8 py-4 text-[#67B68B] text-sm border-b border-[#67B68B]/20">
              <Image
                src="/edit/tooltip.svg"
                alt="Info"
                width={16}
                height={16}
              />
              <span className="tracking-wide">
                Use pencil to mark, undo marks with the eraser, and type your
                change description on notepad
              </span>
            </div>

            <div className="relative p-8">
              {/* Tools Component - Compact Top Left */}
              <div className="absolute top-8 left-8 z-10 w-48 border-[0.5px] border-[#67B68B] bg-[#2A3038] p-4">
                <h3 className="text-md text-[#67B68B] font-normal mb-4">
                  Tools
                </h3>

                {/* Brush Size */}
                <div className="mb-4">
                  <label className="text-white text-xs tracking-wider font-normal block">
                    Brush Size
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={brushSize}
                    onChange={(e) => setBrushSize(Number(e.target.value))}
                    className="w-full h-1 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #67B68B 0%, #67B68B ${
                        ((brushSize - 10) / 90) * 100
                      }%, #4A5568 ${
                        ((brushSize - 10) / 90) * 100
                      }%, #4A5568 100%)`,
                    }}
                  />
                </div>

                {/* Brush Colour */}
                <div className="mb-4">
                  <label className="text-white text-xs tracking-wider font-normal mb-2 block">
                    Brush Colour
                  </label>
                  <div className="flex gap-1.5">
                    {brushColors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setBrushColor(color)}
                        className={`w-6 h-6 rounded-full border transition-all ${
                          brushColor === color
                            ? "border-white scale-110"
                            : "border-transparent hover:border-gray-400"
                        }`}
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>

                {/* Tool Icons - Animated Peek */}
                <div className="relative h-20 overflow-hidden -mb-4">
                  <div className="flex">
                    <button
                      onClick={() => setTool("pencil")}
                      disabled={!uploadedImage}
                      className={`flex-1 h-24 flex items-center justify-center transition-all duration-300 ease-out disabled:opacity-30 ${
                        tool === "pencil"
                          ? "translate-y-0"
                          : "translate-y-10 hover:translate-y-8"
                      }`}
                      title="Pencil"
                    >
                      <Image
                        src="/edit/pencil.svg"
                        alt="Pencil"
                        width={90}
                        height={70}
                        className="w-auto h-auto max-w-[70px] max-h-[70px]"
                      />
                    </button>
                    <button
                      onClick={() => setTool("eraser")}
                      disabled={!uploadedImage}
                      className={`flex-1 h-24 flex items-center justify-center transition-all duration-300 ease-out disabled:opacity-30 ${
                        tool === "eraser"
                          ? "translate-y-0"
                          : "translate-y-10 hover:translate-y-8"
                      }`}
                      title="Eraser"
                    >
                      <Image
                        src="/edit/eraser.png"
                        alt="Eraser"
                        width={70}
                        height={70}
                        className="w-auto h-auto max-w-[70px] max-h-[70px]"
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Canvas Container */}
              <div
                ref={containerRef}
                className="relative bg-[#2A3038] flex items-center justify-center"
                style={{ minHeight: "300px", height: "350px" }}
              >
                {uploadedImage && (
                  <>
                    <canvas
                      ref={canvasRef}
                      onMouseDown={startDrawing}
                      onMouseUp={stopDrawing}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      onMouseMove={handleMouseMove}
                      className={`max-w-full max-h-full ${
                        tool ? "cursor-none" : "cursor-default"
                      }`}
                      style={{
                        imageRendering: "crisp-edges",
                      }}
                    />
                    {/* Custom Cursor */}
                    {cursorPos && tool && (
                      <div
                        className="absolute pointer-events-none"
                        style={{
                          left: `${cursorPos.x}px`,
                          top: `${cursorPos.y}px`,
                          transform: "translate(-50%, -50%)",
                        }}
                      >
                        {/* Outer circle showing brush size */}
                        <div
                          className="absolute rounded-full border-2"
                          style={{
                            width: `${brushSize}px`,
                            height: `${brushSize}px`,
                            transform: "translate(-50%, -50%)",
                            borderColor:
                              tool === "pencil" ? brushColor : "#FF6B6B",
                            backgroundColor:
                              tool === "pencil"
                                ? `${brushColor}20`
                                : "#FF6B6B20",
                            transition: "width 0.1s ease, height 0.1s ease",
                          }}
                        />
                        {/* Center dot for precision */}
                        <div
                          className="absolute w-1 h-1 rounded-full"
                          style={{
                            backgroundColor:
                              tool === "pencil" ? brushColor : "#FF6B6B",
                            transform: "translate(-50%, -50%)",
                          }}
                        />
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Prompt Input */}
              {uploadedImage && (
                <div className="mt-6 border-[0.5px] border-[#67B68B] bg-[#2A3344] p-6">
                  <label className="block text-[#67B68B] text-sm mb-4 tracking-wide font-normal">
                    Describe your Change
                  </label>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Type what you want to change..."
                    className="w-full bg-[#3A4354] text-white text-sm border-none p-4 h-20 resize-none focus:outline-none placeholder:text-gray-500 placeholder:text-sm"
                  />
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-6 flex items-center justify-end gap-8">
                <button
                  onClick={() => {
                    // Store image in localStorage to pass to product page
                    if (uploadedImage) {
                      localStorage.setItem("productImage", uploadedImage);
                    }
                    window.location.href = "/product";
                  }}
                  className="text-[#67B68B] hover:text-[#3bc970] font-medium transition-colors uppercase underline underline-offset-2 text-sm tracking-wide cursor-pointer"
                >
                  Skip
                </button>
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating || !prompt.trim()}
                  className="px-24 py-4 bg-[#67B68B] hover:bg-[#3bc970] disabled:bg-gray-600 disabled:cursor-not-allowed text-black font-semibold transition-colors uppercase tracking-wide"
                >
                  {isGenerating ? "Generating..." : "Generate"}
                </button>
              </div>
            </div>
            {/* End relative container */}
          </div>
          {/* End Main Canvas Area */}
        </div>
      </div>
    </div>
  );
}
