(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Documents/vsc/HTV/frontend/app/poc/magic-pencil/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MagicPencilPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function MagicPencilPage() {
    _s();
    const [uploadedImage, setUploadedImage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [currentGeneratedImage, setCurrentGeneratedImage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isDrawing, setIsDrawing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [tool, setTool] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("pencil");
    const [showPrompt, setShowPrompt] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [prompt, setPrompt] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [isGenerating, setIsGenerating] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [lastPoint, setLastPoint] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // History management
    const [history, setHistory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [historyIndex, setHistoryIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(-1);
    const [generatedImagesCache, setGeneratedImagesCache] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const fileInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const brushSize = 30;
    // Initialize canvas when image is uploaded
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MagicPencilPage.useEffect": ()=>{
            if (uploadedImage && canvasRef.current) {
                const canvas = canvasRef.current;
                const ctx = canvas.getContext("2d");
                if (!ctx) return;
                const img = new window.Image();
                img.src = uploadedImage;
                img.onload = ({
                    "MagicPencilPage.useEffect": ()=>{
                        canvas.width = img.width;
                        canvas.height = img.height;
                        // Save initial state
                        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                        setHistory([
                            {
                                imageData,
                                generatedImage: null
                            }
                        ]);
                        setHistoryIndex(0);
                    }
                })["MagicPencilPage.useEffect"];
            }
        }
    }["MagicPencilPage.useEffect"], [
        uploadedImage
    ]);
    const saveToHistory = ()=>{
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push({
            imageData,
            generatedImage: currentGeneratedImage
        });
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
    };
    const undo = ()=>{
        if (historyIndex > 0) {
            const newIndex = historyIndex - 1;
            setHistoryIndex(newIndex);
            restoreHistoryState(newIndex);
        }
    };
    const redo = ()=>{
        if (historyIndex < history.length - 1) {
            const newIndex = historyIndex + 1;
            setHistoryIndex(newIndex);
            restoreHistoryState(newIndex);
        }
    };
    const restoreHistoryState = (index)=>{
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        const state = history[index];
        ctx.putImageData(state.imageData, 0, 0);
        setCurrentGeneratedImage(state.generatedImage);
    };
    const handleImageUpload = (e)=>{
        var _e_target_files;
        const file = (_e_target_files = e.target.files) === null || _e_target_files === void 0 ? void 0 : _e_target_files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event)=>{
            var _event_target;
            setUploadedImage((_event_target = event.target) === null || _event_target === void 0 ? void 0 : _event_target.result);
            setCurrentGeneratedImage(null);
            setGeneratedImagesCache([]);
        };
        reader.readAsDataURL(file);
    };
    const getCanvasCoordinates = (e)=>{
        const canvas = canvasRef.current;
        if (!canvas) return null;
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        return {
            x: (e.clientX - rect.left) * scaleX,
            y: (e.clientY - rect.top) * scaleY
        };
    };
    const startDrawing = (e)=>{
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
    const stopDrawing = ()=>{
        if (isDrawing) {
            setIsDrawing(false);
            setLastPoint(null);
            saveToHistory();
        }
    };
    const drawLine = (start, end)=>{
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
        for(let i = 0; i <= steps; i++){
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
    const handleMouseMove = (e)=>{
        if (!isDrawing || !lastPoint) return;
        const coords = getCanvasCoordinates(e);
        if (!coords) return;
        // Draw line from last point to current point
        drawLine(lastPoint, coords);
        // Update last point
        setLastPoint(coords);
    };
    const handleGenerate = async ()=>{
        if (!prompt.trim()) return;
        setIsGenerating(true);
        // TODO: Implement actual API call
        // For now, simulate generation
        setTimeout(()=>{
            // Cache the current generated image
            if (currentGeneratedImage) {
                setGeneratedImagesCache([
                    ...generatedImagesCache,
                    currentGeneratedImage
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-[#181A25] flex flex-col",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4 bg-[#1E2433] border-b border-[#2A3142] flex items-center gap-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: "/poc",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        src: "/logo_text.svg",
                        alt: "Orbit",
                        width: 80,
                        height: 27,
                        className: "opacity-90 cursor-pointer"
                    }, void 0, false, {
                        fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/magic-pencil/page.tsx",
                        lineNumber: 256,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/magic-pencil/page.tsx",
                    lineNumber: 255,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/magic-pencil/page.tsx",
                lineNumber: 254,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 flex flex-col items-center justify-center p-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full max-w-6xl",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-4xl font-light text-white mb-2",
                            children: "Adjust your Design"
                        }, void 0, false, {
                            fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/magic-pencil/page.tsx",
                            lineNumber: 270,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[#4ade80] text-sm mb-12",
                            children: "Make changes before finalizing"
                        }, void 0, false, {
                            fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/magic-pencil/page.tsx",
                            lineNumber: 273,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "border border-[#67B68B] bg-[#2A3038] p-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 text-[#4ade80] text-sm bg-[#2A3038] p-3 -mx-8 -mt-8 mb-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            src: "/edit/tooltip.svg",
                                            alt: "Info",
                                            width: 16,
                                            height: 16
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/magic-pencil/page.tsx",
                                            lineNumber: 281,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Use pencil to mark, undo marks with the eraser, and type your change description on notepad"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/magic-pencil/page.tsx",
                                            lineNumber: 287,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/magic-pencil/page.tsx",
                                    lineNumber: 280,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    ref: containerRef,
                                    className: "relative bg-[#2A3038] flex items-center justify-center",
                                    style: {
                                        minHeight: "400px",
                                        height: "500px"
                                    },
                                    children: !uploadedImage ? // Upload State
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                ref: fileInputRef,
                                                type: "file",
                                                accept: "image/*",
                                                onChange: handleImageUpload,
                                                className: "hidden"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/magic-pencil/page.tsx",
                                                lineNumber: 302,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>{
                                                    var _fileInputRef_current;
                                                    return (_fileInputRef_current = fileInputRef.current) === null || _fileInputRef_current === void 0 ? void 0 : _fileInputRef_current.click();
                                                },
                                                className: "px-8 py-4 bg-[#4ade80] hover:bg-[#3bc970] text-black font-semibold rounded-lg transition-colors",
                                                children: "Upload Image"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/magic-pencil/page.tsx",
                                                lineNumber: 309,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/magic-pencil/page.tsx",
                                        lineNumber: 301,
                                        columnNumber: 17
                                    }, this) : // Canvas State
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                                        ref: canvasRef,
                                        onMouseDown: startDrawing,
                                        onMouseUp: stopDrawing,
                                        onMouseLeave: stopDrawing,
                                        onMouseMove: handleMouseMove,
                                        className: "max-w-full max-h-full cursor-crosshair",
                                        style: {
                                            imageRendering: "crisp-edges"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/magic-pencil/page.tsx",
                                        lineNumber: 318,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/magic-pencil/page.tsx",
                                    lineNumber: 294,
                                    columnNumber: 13
                                }, this),
                                uploadedImage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-6 bg-[#2D3642] border border-[#67B68B] px-6 py-5 flex items-center justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-6",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex gap-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: undo,
                                                            disabled: historyIndex <= 0,
                                                            className: "w-[50px] h-[50px] bg-[#3A4450] rounded flex items-center justify-center hover:bg-[#454D5A] transition-colors disabled:opacity-30 disabled:cursor-not-allowed",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                src: "/edit/undo.svg",
                                                                alt: "Undo",
                                                                width: 24,
                                                                height: 24
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/magic-pencil/page.tsx",
                                                                lineNumber: 343,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/magic-pencil/page.tsx",
                                                            lineNumber: 338,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: redo,
                                                            disabled: historyIndex >= history.length - 1,
                                                            className: "w-[50px] h-[50px] bg-[#3A4450] rounded flex items-center justify-center hover:bg-[#454D5A] transition-colors disabled:opacity-30 disabled:cursor-not-allowed",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                src: "/edit/redo.svg",
                                                                alt: "Redo",
                                                                width: 24,
                                                                height: 24
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/magic-pencil/page.tsx",
                                                                lineNumber: 355,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/magic-pencil/page.tsx",
                                                            lineNumber: 350,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/magic-pencil/page.tsx",
                                                    lineNumber: 337,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex gap-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>setTool("pencil"),
                                                            className: "w-[90px] h-[90px] bg-[#3A4450] rounded-lg flex items-center justify-center transition-all ".concat(tool === "pencil" ? "ring-2 ring-[#4ade80]" : "hover:bg-[#454D5A]"),
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                src: "/edit/pencil.png",
                                                                alt: "Pencil",
                                                                width: 50,
                                                                height: 50
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/magic-pencil/page.tsx",
                                                                lineNumber: 374,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/magic-pencil/page.tsx",
                                                            lineNumber: 366,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>setTool("eraser"),
                                                            className: "w-[90px] h-[90px] bg-[#3A4450] rounded-lg flex items-center justify-center transition-all ".concat(tool === "eraser" ? "ring-2 ring-[#4ade80]" : "hover:bg-[#454D5A]"),
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                src: "/edit/eraser.png",
                                                                alt: "Eraser",
                                                                width: 50,
                                                                height: 50
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/magic-pencil/page.tsx",
                                                                lineNumber: 389,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/magic-pencil/page.tsx",
                                                            lineNumber: 381,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>setShowPrompt(!showPrompt),
                                                            className: "w-[90px] h-[90px] bg-[#3A4450] rounded-lg flex items-center justify-center transition-all ".concat(showPrompt ? "ring-2 ring-[#4ade80]" : "hover:bg-[#454D5A]"),
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                src: "/edit/note.png",
                                                                alt: "Note",
                                                                width: 50,
                                                                height: 50
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/magic-pencil/page.tsx",
                                                                lineNumber: 404,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/magic-pencil/page.tsx",
                                                            lineNumber: 396,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/magic-pencil/page.tsx",
                                                    lineNumber: 365,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/magic-pencil/page.tsx",
                                            lineNumber: 335,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-col gap-2 items-end",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: handleGenerate,
                                                    disabled: isGenerating || !showPrompt || !prompt.trim(),
                                                    className: "w-[280px] py-4 bg-[#4ade80] hover:bg-[#3bc970] disabled:bg-gray-600 disabled:cursor-not-allowed text-black font-semibold rounded transition-colors uppercase tracking-wide",
                                                    children: isGenerating ? "Generating..." : "Generate"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/magic-pencil/page.tsx",
                                                    lineNumber: 416,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "text-[#4ade80] hover:text-[#3bc970] font-medium transition-colors uppercase text-sm tracking-wide",
                                                    children: "Skip"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/magic-pencil/page.tsx",
                                                    lineNumber: 423,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/magic-pencil/page.tsx",
                                            lineNumber: 415,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/magic-pencil/page.tsx",
                                    lineNumber: 334,
                                    columnNumber: 15
                                }, this),
                                showPrompt && uploadedImage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-4 p-4 border border-[#4ade80] rounded-lg bg-[#1E2433]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-[#4ade80] text-sm mb-2",
                                            children: "Describe your changes"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/magic-pencil/page.tsx",
                                            lineNumber: 433,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                            value: prompt,
                                            onChange: (e)=>setPrompt(e.target.value),
                                            placeholder: "Type what you want to change in the marked areas...",
                                            className: "w-full bg-[#232937] text-white border border-[#2A3142] rounded p-3 h-24 resize-none focus:outline-none focus:border-[#4ade80] transition-colors placeholder:text-gray-500"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/magic-pencil/page.tsx",
                                            lineNumber: 436,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/magic-pencil/page.tsx",
                                    lineNumber: 432,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/magic-pencil/page.tsx",
                            lineNumber: 278,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/magic-pencil/page.tsx",
                    lineNumber: 268,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/magic-pencil/page.tsx",
                lineNumber: 267,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/magic-pencil/page.tsx",
        lineNumber: 252,
        columnNumber: 5
    }, this);
}
_s(MagicPencilPage, "OE28IA8N3gW6N7FaH/hy+sfno3M=");
_c = MagicPencilPage;
var _c;
__turbopack_context__.k.register(_c, "MagicPencilPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Documents_vsc_HTV_frontend_app_poc_magic-pencil_page_tsx_45154ac1._.js.map