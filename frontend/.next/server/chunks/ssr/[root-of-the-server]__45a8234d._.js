module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/Documents/vsc/HTV/frontend/lib/imageUpload.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Upload image to a temporary hosting service
 * For production, replace with your preferred image hosting service (S3, Cloudinary, etc.)
 */ __turbopack_context__.s([
    "fileToDataURL",
    ()=>fileToDataURL,
    "uploadImageToTemporaryHost",
    ()=>uploadImageToTemporaryHost
]);
async function uploadImageToTemporaryHost(file) {
    // Using tmpfiles.org as a temporary solution for POC
    // Replace with your own image hosting service in production
    const formData = new FormData();
    formData.append("file", file);
    try {
        // Option 1: Upload to imgbb (free temporary hosting)
        // You'll need to get an API key from https://api.imgbb.com/
        // For now, we'll use a public upload service
        const response = await fetch("https://tmpfiles.org/api/v1/upload", {
            method: "POST",
            body: formData
        });
        if (!response.ok) {
            throw new Error("Failed to upload image");
        }
        const data = await response.json();
        // tmpfiles.org returns data.data.url
        // Convert the URL to direct link format
        if (data.data?.url) {
            // Convert https://tmpfiles.org/12345 to https://tmpfiles.org/dl/12345
            return data.data.url.replace("tmpfiles.org/", "tmpfiles.org/dl/");
        }
        throw new Error("Invalid response from upload service");
    } catch (error) {
        console.error("Upload error:", error);
        throw error;
    }
}
function fileToDataURL(file) {
    return new Promise((resolve, reject)=>{
        const reader = new FileReader();
        reader.onload = (e)=>{
            if (e.target?.result) {
                resolve(e.target.result);
            } else {
                reject(new Error("Failed to read file"));
            }
        };
        reader.onerror = ()=>reject(new Error("Failed to read file"));
        reader.readAsDataURL(file);
    });
}
}),
"[project]/Documents/vsc/HTV/frontend/app/poc/magic-pencil/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MagicPencilPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$lib$2f$imageUpload$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/lib/imageUpload.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
function MagicPencilPage() {
    const [originalImage, setOriginalImage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [originalFile, setOriginalFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [prompt, setPrompt] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [isProcessing, setIsProcessing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [resultImage, setResultImage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [brushSize, setBrushSize] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(20);
    const [isDrawing, setIsDrawing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [cursorPosition, setCursorPosition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const imageRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const cursorCanvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const handleImageUpload = (e)=>{
        const file = e.target.files?.[0];
        if (file) {
            setOriginalFile(file);
            const reader = new FileReader();
            reader.onload = (event)=>{
                setOriginalImage(event.target?.result);
                setResultImage(null);
                setError(null);
            };
            reader.readAsDataURL(file);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (originalImage && canvasRef.current) {
            const canvas = canvasRef.current;
            const cursorCanvas = cursorCanvasRef.current;
            const ctx = canvas.getContext("2d");
            if (ctx && imageRef.current) {
                // Wait for image to load
                imageRef.current.onload = ()=>{
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
    }, [
        originalImage
    ]);
    const startDrawing = (e)=>{
        setIsDrawing(true);
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (ctx) {
            ctx.beginPath();
        }
        draw(e);
    };
    const stopDrawing = ()=>{
        setIsDrawing(false);
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (ctx) {
            ctx.beginPath();
        }
    };
    const updateCursor = (e)=>{
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;
        setCursorPosition({
            x,
            y
        });
    };
    const draw = (e)=>{
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
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
    }, [
        cursorPosition,
        brushSize
    ]);
    const clearCanvas = ()=>{
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (ctx && canvas) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.beginPath();
        }
    };
    const handleSubmit = async ()=>{
        if (!originalFile || !prompt.trim() || !canvasRef.current) {
            setError("Please upload an image, draw on it, and provide a prompt");
            return;
        }
        setIsProcessing(true);
        setError(null);
        try {
            // Upload original image
            const originalImageUrl = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$lib$2f$imageUpload$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["uploadImageToTemporaryHost"])(originalFile);
            // Convert canvas to blob
            const canvas = canvasRef.current;
            const maskBlob = await new Promise((resolve)=>{
                canvas.toBlob((blob)=>{
                    if (blob) resolve(blob);
                }, "image/png");
            });
            // Convert mask blob to file
            const maskFile = new File([
                maskBlob
            ], "mask.png", {
                type: "image/png"
            });
            const maskImageUrl = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$lib$2f$imageUpload$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["uploadImageToTemporaryHost"])(maskFile);
            // Call backend API
            const response = await fetch("http://localhost:8000/magic-pencil/edit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    original_image_url: originalImageUrl,
                    drawn_overlay_url: maskImageUrl,
                    prompt: prompt
                })
            });
            if (!response.ok) {
                const errorData = await response.json().catch(()=>({}));
                throw new Error(errorData.detail || "Failed to process image");
            }
            const data = await response.json();
            setResultImage(data.result_image_url);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
        } finally{
            setIsProcessing(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gray-50 p-8",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-7xl mx-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-4xl font-bold mb-2",
                            children: "Magic Pencil ✨"
                        }, void 0, false, {
                            fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/magic-pencil/page.tsx",
                            lineNumber: 222,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-600",
                            children: "Draw on your image to select areas, then describe what you want to change"
                        }, void 0, false, {
                            fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/magic-pencil/page.tsx",
                            lineNumber: 223,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/magic-pencil/page.tsx",
                    lineNumber: 221,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white rounded-lg shadow-md p-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-2xl font-semibold mb-4",
                                    children: "Upload & Draw"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/magic-pencil/page.tsx",
                                    lineNumber: 232,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-6",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "image-upload",
                                        className: "block w-full p-8 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:border-blue-500 transition",
                                        children: [
                                            originalImage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-green-600",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                        className: "w-12 h-12 mx-auto mb-2",
                                                        fill: "none",
                                                        stroke: "currentColor",
                                                        viewBox: "0 0 24 24",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round",
                                                            strokeWidth: 2,
                                                            d: "M5 13l4 4L19 7"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/magic-pencil/page.tsx",
                                                            lineNumber: 247,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/magic-pencil/page.tsx",
                                                        lineNumber: 241,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "font-semibold",
                                                        children: "Image Uploaded"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/magic-pencil/page.tsx",
                                                        lineNumber: 254,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm text-gray-500 mt-1",
                                                        children: "Click to change"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/magic-pencil/page.tsx",
                                                        lineNumber: 255,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/magic-pencil/page.tsx",
                                                lineNumber: 240,
                                                columnNumber: 19
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-gray-600",
                                                        children: "Click to upload image"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/magic-pencil/page.tsx",
                                                        lineNumber: 261,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm text-gray-400 mt-2",
                                                        children: "PNG, JPG up to 10MB"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/magic-pencil/page.tsx",
                                                        lineNumber: 262,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/magic-pencil/page.tsx",
                                                lineNumber: 260,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                id: "image-upload",
                                                type: "file",
                                                accept: "image/*",
                                                onChange: handleImageUpload,
                                                className: "hidden"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/magic-pencil/page.tsx",
                                                lineNumber: 267,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/magic-pencil/page.tsx",
                                        lineNumber: 235,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/magic-pencil/page.tsx",
                                    lineNumber: 234,
                                    columnNumber: 13
                                }, this),
                                originalImage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mb-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "block text-sm font-medium text-gray-700 mb-2",
                                                    children: [
                                                        "Brush Size: ",
                                                        brushSize,
                                                        "px"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/magic-pencil/page.tsx",
                                                    lineNumber: 280,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "range",
                                                    min: "5",
                                                    max: "50",
                                                    value: brushSize,
                                                    onChange: (e)=>setBrushSize(parseInt(e.target.value)),
                                                    className: "w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/magic-pencil/page.tsx",
                                                    lineNumber: 283,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/magic-pencil/page.tsx",
                                            lineNumber: 279,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: clearCanvas,
                                            className: "w-full bg-gray-600 text-white py-2 rounded-lg font-semibold hover:bg-gray-700 transition mb-4",
                                            children: "Clear Drawing"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/magic-pencil/page.tsx",
                                            lineNumber: 293,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mb-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "block text-sm font-medium text-gray-700 mb-2",
                                                    children: "What do you want to change?"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/magic-pencil/page.tsx",
                                                    lineNumber: 301,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                    value: prompt,
                                                    onChange: (e)=>setPrompt(e.target.value),
                                                    placeholder: "E.g., 'Change the sky to sunset', 'Make the car blue', 'Add flowers in this area'",
                                                    className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none",
                                                    rows: 4
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/magic-pencil/page.tsx",
                                                    lineNumber: 304,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/magic-pencil/page.tsx",
                                            lineNumber: 300,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handleSubmit,
                                            disabled: isProcessing || !prompt.trim(),
                                            className: "w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition",
                                            children: isProcessing ? "Processing..." : "Apply Magic ✨"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/magic-pencil/page.tsx",
                                            lineNumber: 313,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true),
                                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded",
                                    children: error
                                }, void 0, false, {
                                    fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/magic-pencil/page.tsx",
                                    lineNumber: 324,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/magic-pencil/page.tsx",
                            lineNumber: 231,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white rounded-lg shadow-md p-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-2xl font-semibold mb-4",
                                    children: "Draw Selection"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/magic-pencil/page.tsx",
                                    lineNumber: 332,
                                    columnNumber: 13
                                }, this),
                                originalImage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative border-2 border-gray-300 rounded-lg overflow-hidden bg-gray-100 inline-block",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative",
                                        style: {
                                            display: "inline-block"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                ref: imageRef,
                                                src: originalImage,
                                                alt: "Original",
                                                className: "w-full h-auto block",
                                                style: {
                                                    maxWidth: "100%",
                                                    height: "auto"
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/magic-pencil/page.tsx",
                                                lineNumber: 337,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                                                ref: canvasRef,
                                                onMouseDown: startDrawing,
                                                onMouseUp: stopDrawing,
                                                onMouseMove: draw,
                                                onMouseLeave: ()=>{
                                                    stopDrawing();
                                                    setCursorPosition(null);
                                                },
                                                onMouseEnter: updateCursor,
                                                className: "absolute top-0 left-0",
                                                style: {
                                                    width: "100%",
                                                    height: "100%",
                                                    touchAction: "none",
                                                    cursor: "none"
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/magic-pencil/page.tsx",
                                                lineNumber: 344,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                                                ref: cursorCanvasRef,
                                                className: "absolute top-0 left-0 pointer-events-none",
                                                style: {
                                                    width: "100%",
                                                    height: "100%"
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/magic-pencil/page.tsx",
                                                lineNumber: 363,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/magic-pencil/page.tsx",
                                        lineNumber: 336,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/magic-pencil/page.tsx",
                                    lineNumber: 335,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-center h-96 border-2 border-dashed border-gray-300 rounded-lg text-gray-400",
                                    children: "Upload an image to start"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/magic-pencil/page.tsx",
                                    lineNumber: 374,
                                    columnNumber: 15
                                }, this),
                                originalImage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-4 p-3 bg-blue-50 border border-blue-200 rounded text-sm text-blue-800",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: "Tip:"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/magic-pencil/page.tsx",
                                            lineNumber: 381,
                                            columnNumber: 17
                                        }, this),
                                        " Draw over the areas you want to modify. The red marks show where changes will be applied."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/magic-pencil/page.tsx",
                                    lineNumber: 380,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/magic-pencil/page.tsx",
                            lineNumber: 331,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white rounded-lg shadow-md p-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-2xl font-semibold mb-4",
                                    children: "Result"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/magic-pencil/page.tsx",
                                    lineNumber: 389,
                                    columnNumber: 13
                                }, this),
                                resultImage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: resultImage,
                                            alt: "Result",
                                            className: "w-full h-auto rounded-lg border-2 border-green-500"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/magic-pencil/page.tsx",
                                            lineNumber: 393,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: resultImage,
                                            download: "magic-pencil-result.png",
                                            className: "block w-full mt-4 bg-green-600 text-white py-2 rounded-lg font-semibold text-center hover:bg-green-700 transition",
                                            children: "Download Result"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/magic-pencil/page.tsx",
                                            lineNumber: 398,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/magic-pencil/page.tsx",
                                    lineNumber: 392,
                                    columnNumber: 15
                                }, this) : isProcessing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col items-center justify-center h-96 border-2 border-dashed border-gray-300 rounded-lg",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mb-4"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/magic-pencil/page.tsx",
                                            lineNumber: 408,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-600",
                                            children: "Processing your image..."
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/magic-pencil/page.tsx",
                                            lineNumber: 409,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/magic-pencil/page.tsx",
                                    lineNumber: 407,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-center h-96 border-2 border-dashed border-gray-300 rounded-lg text-gray-400",
                                    children: "Result will appear here"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/magic-pencil/page.tsx",
                                    lineNumber: 412,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/magic-pencil/page.tsx",
                            lineNumber: 388,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/magic-pencil/page.tsx",
                    lineNumber: 229,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/magic-pencil/page.tsx",
            lineNumber: 220,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/magic-pencil/page.tsx",
        lineNumber: 219,
        columnNumber: 5
    }, this);
}
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        if ("TURBOPACK compile-time truthy", 1) {
            if ("TURBOPACK compile-time truthy", 1) {
                module.exports = __turbopack_context__.r("[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)");
            } else //TURBOPACK unreachable
            ;
        } else //TURBOPACK unreachable
        ;
    }
} //# sourceMappingURL=module.compiled.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
"[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].React; //# sourceMappingURL=react.js.map
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__45a8234d._.js.map