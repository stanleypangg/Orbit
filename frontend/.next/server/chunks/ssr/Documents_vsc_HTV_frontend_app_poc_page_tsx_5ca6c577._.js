module.exports = [
"[project]/Documents/vsc/HTV/frontend/app/poc/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/vsc/HTV/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '@/components/PresetCard'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '@/lib/chat/validator-and-calls'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
"use client";
;
;
;
;
;
;
function Home() {
    const [prompt, setPrompt] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [isGenerating, setIsGenerating] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isChatMode, setIsChatMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [chatInput, setChatInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [animationPhase, setAnimationPhase] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const messagesEndRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [animatedMessageIds, setAnimatedMessageIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(new Set());
    const [selectedIdea, setSelectedIdea] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [extractedIngredients, setExtractedIngredients] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const presets = [
        {
            icon: "/turtle.svg",
            title: "Generate a fashion accessory",
            description: "from recycled ocean plastic...",
            text: "Generate a fashion accessory from recycled ocean plastic..."
        },
        {
            icon: "/glass.svg",
            title: "Make home decor from recycled",
            description: "glass bottles...",
            text: "Make home decor from recycled glass bottles..."
        },
        {
            icon: "/plastic.svg",
            title: "Help me make something from",
            description: "plastic bottles....",
            text: "Help me make something from plastic bottles...."
        }
    ];
    const scrollToBottom = ()=>{
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth"
        });
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        scrollToBottom();
    }, [
        messages
    ]);
    const handleGenerate = async ()=>{
        if (!prompt.trim()) return;
        setIsGenerating(true);
        const initialMessage = prompt;
        // Animation sequence
        // Phase 1: Fade out examples (0-300ms)
        setAnimationPhase(1);
        setTimeout(()=>{
            // Phase 2: Fade out title and button (300-600ms)
            setAnimationPhase(2);
        }, 300);
        setTimeout(()=>{
            // Phase 3: Clear input, slide to top (600-1000ms)
            setAnimationPhase(3);
            setPrompt("");
        }, 600);
        setTimeout(()=>{
            // Phase 4: Expand box (1000-1800ms)
            setAnimationPhase(4);
        }, 1000);
        setTimeout(()=>{
            // Phase 5: Prepare for transition (1800ms) - wait for grow to finish
            setAnimationPhase(5);
        }, 1800);
        setTimeout(()=>{
            // Phase 6: Switch to chat mode and show first message (1900ms)
            const messageId = Date.now().toString();
            setMessages([
                {
                    role: "user",
                    content: initialMessage,
                    id: messageId
                }
            ]);
            setAnimatedMessageIds(new Set([
                messageId
            ]));
            setIsChatMode(true);
            setAnimationPhase(6);
        }, 1900);
        setTimeout(()=>{
            // Phase 6.5: Show chat input after chat interface renders (2200ms)
            setAnimationPhase(7);
        }, 2200);
        setTimeout(async ()=>{
            // Phase 8: Fetch AI response
            setAnimationPhase(8);
            setIsGenerating(false);
            // Call Phase 1 API with the initial message
            try {
                const phase1Response = await handlePhase1(initialMessage);
                const assistantId = (Date.now() + 1).toString();
                setMessages((prev)=>[
                        ...prev,
                        {
                            role: "assistant",
                            content: "I've analyzed your materials! Here's what I found:",
                            id: assistantId,
                            phase1Data: phase1Response
                        }
                    ]);
                setAnimatedMessageIds((prev)=>new Set([
                        ...prev,
                        assistantId
                    ]));
                setExtractedIngredients(phase1Response.ingredients);
            } catch (error) {
                console.error("Phase 1 API error:", error);
                const assistantId = (Date.now() + 1).toString();
                setMessages((prev)=>[
                        ...prev,
                        {
                            role: "assistant",
                            content: "I'm sorry, I encountered an error analyzing your materials. Please try again.",
                            id: assistantId
                        }
                    ]);
                setAnimatedMessageIds((prev)=>new Set([
                        ...prev,
                        assistantId
                    ]));
            }
        }, 1900);
    };
    const handleSendMessage = async ()=>{
        if (!chatInput.trim()) return;
        const userMessageId = Date.now().toString();
        const userMessage = {
            role: "user",
            content: chatInput,
            id: userMessageId
        };
        setMessages((prev)=>[
                ...prev,
                userMessage
            ]);
        setAnimatedMessageIds((prev)=>new Set([
                ...prev,
                userMessageId
            ]));
        setChatInput("");
        // Call Phase 1 API with the follow-up message
        try {
            const phase1Response = await handlePhase1(chatInput);
            const assistantId = (Date.now() + 1).toString();
            setMessages((prev)=>[
                    ...prev,
                    {
                        role: "assistant",
                        content: "Here's an updated analysis based on your input:",
                        id: assistantId,
                        phase1Data: phase1Response
                    }
                ]);
            setAnimatedMessageIds((prev)=>new Set([
                    ...prev,
                    assistantId
                ]));
            setExtractedIngredients(phase1Response.ingredients);
        } catch (error) {
            console.error("Phase 1 API error:", error);
            const assistantId = (Date.now() + 1).toString();
            setMessages((prev)=>[
                    ...prev,
                    {
                        role: "assistant",
                        content: "I'm sorry, I encountered an error. Please try again.",
                        id: assistantId
                    }
                ]);
            setAnimatedMessageIds((prev)=>new Set([
                    ...prev,
                    assistantId
                ]));
        }
    };
    const handleIdeaSelect = (idea)=>{
        setSelectedIdea(idea);
        const assistantId = Date.now().toString();
        setMessages((prev)=>[
                ...prev,
                {
                    role: "assistant",
                    content: `Great choice! You selected "${idea.title}". Ready to visualize this project? (Phase 2 coming soon)`,
                    id: assistantId
                }
            ]);
        setAnimatedMessageIds((prev)=>new Set([
                ...prev,
                assistantId
            ]));
    };
    const handleExampleClick = (text)=>{
        setPrompt(text);
    };
    if (isChatMode) {
        // Chat Interface
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-[#181A25] flex flex-col overflow-hidden font-menlo",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-4 bg-[#1E2433] border-b border-[#2A3142] flex items-center gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            src: "/logo_text.svg",
                            alt: "Orbit",
                            width: 80,
                            height: 27,
                            className: "opacity-90 mr-auto"
                        }, void 0, false, {
                            fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/page.tsx",
                            lineNumber: 221,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: "/poc/trellis",
                            className: "text-blue-400 hover:text-blue-300 font-semibold transition-colors",
                            children: "Try Trellis 3D Generator →"
                        }, void 0, false, {
                            fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/page.tsx",
                            lineNumber: 228,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: "/poc/magic-pencil",
                            className: "text-purple-400 hover:text-purple-300 font-semibold transition-colors",
                            children: "Try Magic Pencil ✨ →"
                        }, void 0, false, {
                            fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/page.tsx",
                            lineNumber: 234,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/page.tsx",
                    lineNumber: 220,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 flex flex-col max-w-8xl px-16 mx-auto w-full py-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-[#232937] border border-[#4ade80] p-6 overflow-y-auto",
                            style: {
                                height: animationPhase >= 7 ? "calc(100vh - 280px)" : "calc(100vh - 200px)",
                                transition: "height 300ms ease-out"
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-4",
                                children: [
                                    messages.map((message)=>{
                                        const shouldAnimate = animatedMessageIds.has(message.id);
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: `flex ${message.role === "user" ? "justify-end" : "justify-start"}`,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: `max-w-[70%] px-4 py-3 rounded-lg ${message.role === "user" ? "bg-[#4ade80] text-black" : "bg-[#2A3142] text-white"}`,
                                                        style: shouldAnimate ? {
                                                            animation: "popIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards"
                                                        } : undefined,
                                                        children: message.content
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/page.tsx",
                                                        lineNumber: 267,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/page.tsx",
                                                    lineNumber: 260,
                                                    columnNumber: 21
                                                }, this),
                                                message.phase1Data && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-4 space-y-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "bg-[#1a2030] border border-[#3a4560] rounded-lg p-4",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                    className: "text-[#4ade80] text-lg font-semibold mb-3",
                                                                    children: "📦 Extracted Materials"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/page.tsx",
                                                                    lineNumber: 291,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "space-y-2",
                                                                    children: message.phase1Data.ingredients.map((ingredient, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "bg-[#232937] rounded p-3 border border-[#2A3142]",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex items-start justify-between",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "flex-1",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                className: "text-white font-medium",
                                                                                                children: ingredient.name || "Unknown"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/page.tsx",
                                                                                                lineNumber: 303,
                                                                                                columnNumber: 39
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                className: "text-sm text-gray-400 mt-1 flex flex-wrap gap-3",
                                                                                                children: [
                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                        children: [
                                                                                                            "Material:",
                                                                                                            " ",
                                                                                                            ingredient.material || "N/A"
                                                                                                        ]
                                                                                                    }, void 0, true, {
                                                                                                        fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/page.tsx",
                                                                                                        lineNumber: 307,
                                                                                                        columnNumber: 41
                                                                                                    }, this),
                                                                                                    ingredient.size && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                        children: [
                                                                                                            "Size: ",
                                                                                                            ingredient.size
                                                                                                        ]
                                                                                                    }, void 0, true, {
                                                                                                        fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/page.tsx",
                                                                                                        lineNumber: 312,
                                                                                                        columnNumber: 43
                                                                                                    }, this),
                                                                                                    ingredient.condition && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                        children: [
                                                                                                            "Condition: ",
                                                                                                            ingredient.condition
                                                                                                        ]
                                                                                                    }, void 0, true, {
                                                                                                        fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/page.tsx",
                                                                                                        lineNumber: 315,
                                                                                                        columnNumber: 43
                                                                                                    }, this)
                                                                                                ]
                                                                                            }, void 0, true, {
                                                                                                fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/page.tsx",
                                                                                                lineNumber: 306,
                                                                                                columnNumber: 39
                                                                                            }, this)
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/page.tsx",
                                                                                        lineNumber: 302,
                                                                                        columnNumber: 37
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: `text-xs px-2 py-1 rounded ml-2 ${ingredient.confidence >= 0.8 ? "bg-green-900 text-green-200" : ingredient.confidence >= 0.6 ? "bg-yellow-900 text-yellow-200" : "bg-red-900 text-red-200"}`,
                                                                                        children: [
                                                                                            Math.round(ingredient.confidence * 100),
                                                                                            "%"
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/page.tsx",
                                                                                        lineNumber: 321,
                                                                                        columnNumber: 37
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/page.tsx",
                                                                                lineNumber: 301,
                                                                                columnNumber: 35
                                                                            }, this)
                                                                        }, idx, false, {
                                                                            fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/page.tsx",
                                                                            lineNumber: 297,
                                                                            columnNumber: 33
                                                                        }, this))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/page.tsx",
                                                                    lineNumber: 294,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/page.tsx",
                                                            lineNumber: 290,
                                                            columnNumber: 25
                                                        }, this),
                                                        message.phase1Data.needs_clarification && message.phase1Data.clarifying_questions && message.phase1Data.clarifying_questions.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-4",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                    className: "text-yellow-400 text-lg font-semibold mb-2",
                                                                    children: "❓ Need More Information"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/page.tsx",
                                                                    lineNumber: 345,
                                                                    columnNumber: 31
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                                    className: "space-y-2",
                                                                    children: message.phase1Data.clarifying_questions.map((question, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                            className: "text-yellow-200 text-sm",
                                                                            children: [
                                                                                "• ",
                                                                                question
                                                                            ]
                                                                        }, idx, true, {
                                                                            fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/page.tsx",
                                                                            lineNumber: 351,
                                                                            columnNumber: 37
                                                                        }, this))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/page.tsx",
                                                                    lineNumber: 348,
                                                                    columnNumber: 31
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/page.tsx",
                                                            lineNumber: 344,
                                                            columnNumber: 29
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                    className: "text-[#4ade80] text-lg font-semibold mb-3",
                                                                    children: "💡 Project Ideas"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/page.tsx",
                                                                    lineNumber: 365,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "grid grid-cols-1 gap-3",
                                                                    children: message.phase1Data.ideas.map((idea)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            onClick: ()=>handleIdeaSelect(idea),
                                                                            className: "bg-[#1a2030] border border-[#3a4560] hover:border-[#4ade80] rounded-lg p-4 cursor-pointer transition-all hover:scale-[1.02]",
                                                                            style: {
                                                                                animation: "fadeIn 0.5s ease-out forwards"
                                                                            },
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                                    className: "text-white font-semibold mb-1",
                                                                                    children: idea.title
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/page.tsx",
                                                                                    lineNumber: 378,
                                                                                    columnNumber: 33
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    className: "text-gray-400 text-sm",
                                                                                    children: idea.one_liner
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/page.tsx",
                                                                                    lineNumber: 381,
                                                                                    columnNumber: 33
                                                                                }, this)
                                                                            ]
                                                                        }, idea.id, true, {
                                                                            fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/page.tsx",
                                                                            lineNumber: 370,
                                                                            columnNumber: 31
                                                                        }, this))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/page.tsx",
                                                                    lineNumber: 368,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/page.tsx",
                                                            lineNumber: 364,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/page.tsx",
                                                    lineNumber: 288,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, message.id, true, {
                                            fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/page.tsx",
                                            lineNumber: 259,
                                            columnNumber: 19
                                        }, this);
                                    }),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        ref: messagesEndRef
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/page.tsx",
                                        lineNumber: 393,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/page.tsx",
                                lineNumber: 255,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/page.tsx",
                            lineNumber: 245,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-4 transition-all duration-500 ease-out",
                            style: {
                                transform: animationPhase >= 7 ? "translateY(0)" : "translateY(100px)",
                                opacity: animationPhase >= 7 ? 1 : 0,
                                pointerEvents: animationPhase >= 7 ? "auto" : "none"
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-3 items-end",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        value: chatInput,
                                        onChange: (e)=>setChatInput(e.target.value),
                                        onKeyDown: (e)=>{
                                            if (e.key === "Enter" && !e.shiftKey) {
                                                e.preventDefault();
                                                handleSendMessage();
                                            }
                                        },
                                        placeholder: "Continue the conversation...",
                                        className: "flex-1 bg-[#232937] text-white text-base border border-[#4ade80] p-4 resize-none focus:outline-none focus:border-[#3bc970] transition-colors placeholder:text-gray-500 rounded",
                                        rows: 2
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/page.tsx",
                                        lineNumber: 408,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleSendMessage,
                                        disabled: !chatInput.trim(),
                                        className: "px-8 py-4 bg-[#4ade80] hover:bg-[#3bc970] disabled:bg-gray-600 disabled:cursor-not-allowed text-black font-semibold transition-colors uppercase rounded",
                                        children: "Send"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/page.tsx",
                                        lineNumber: 421,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/page.tsx",
                                lineNumber: 407,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/page.tsx",
                            lineNumber: 398,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/page.tsx",
                    lineNumber: 243,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/page.tsx",
            lineNumber: 218,
            columnNumber: 7
        }, this);
    }
    // Initial Form UI
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-[#181A25] overflow-hidden font-menlo",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4 bg-[#1E2433] border-b border-[#2A3142] flex items-center gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        src: "/logo_text.svg",
                        alt: "Orbit",
                        width: 80,
                        height: 27,
                        className: "opacity-90 mr-auto"
                    }, void 0, false, {
                        fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/page.tsx",
                        lineNumber: 440,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: "/poc/trellis",
                        className: "text-blue-400 hover:text-blue-300 font-semibold transition-colors",
                        children: "Try Trellis 3D Generator →"
                    }, void 0, false, {
                        fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/page.tsx",
                        lineNumber: 447,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: "/poc/magic-pencil",
                        className: "text-purple-400 hover:text-purple-300 font-semibold transition-colors",
                        children: "Try Magic Pencil ✨ →"
                    }, void 0, false, {
                        fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/page.tsx",
                        lineNumber: 453,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/page.tsx",
                lineNumber: 439,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto transition-all duration-500 ease-out",
                style: {
                    maxWidth: animationPhase >= 3 ? "100%" : "var(--max-width-8xl)",
                    paddingLeft: animationPhase >= 3 ? "4rem" : "4rem",
                    paddingRight: animationPhase >= 3 ? "4rem" : "4rem",
                    paddingTop: animationPhase >= 3 ? "2rem" : "4rem",
                    paddingBottom: animationPhase >= 3 ? "0" : "0"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "overflow-hidden",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-4xl text-white mb-2 transition-all duration-500 ease-out",
                            style: {
                                transform: animationPhase >= 2 ? "translateY(-150%)" : "translateY(0)",
                                opacity: animationPhase >= 2 ? 0 : 1
                            },
                            children: "Turn Waste into Products"
                        }, void 0, false, {
                            fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/page.tsx",
                            lineNumber: 474,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/page.tsx",
                        lineNumber: 473,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "transition-all duration-500 ease-out",
                        style: {
                            marginTop: animationPhase >= 3 ? "0" : "3rem",
                            marginBottom: animationPhase >= 3 ? "0" : "2rem",
                            transform: animationPhase >= 3 ? "translateY(-50px)" : "translateY(0)"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "overflow-hidden",
                                children: animationPhase < 2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-[#4ade80] text-base mb-4 font-mono transition-all duration-500 ease-out",
                                    style: {
                                        transform: animationPhase >= 2 ? "translateY(-150%)" : "translateY(0)",
                                        opacity: animationPhase >= 2 ? 0 : 1
                                    },
                                    children: "Describe your waste material"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/page.tsx",
                                    lineNumber: 498,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/page.tsx",
                                lineNumber: 496,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                    value: prompt,
                                    onChange: (e)=>setPrompt(e.target.value),
                                    onKeyDown: (e)=>{
                                        if (e.key === "Enter" && e.ctrlKey) {
                                            handleGenerate();
                                        }
                                    },
                                    placeholder: animationPhase < 3 ? "Describe what you want to make and what materials you have." : "",
                                    style: {
                                        height: animationPhase >= 4 ? "60vh" : "10rem",
                                        transition: "height 800ms cubic-bezier(0.4, 0, 0.2, 1)"
                                    },
                                    className: "w-full bg-[#232937] text-white text-base border p-5 resize-none focus:outline-none border-[#4ade80] placeholder:text-gray-500"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/page.tsx",
                                    lineNumber: 511,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/page.tsx",
                                lineNumber: 510,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/page.tsx",
                        lineNumber: 487,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "overflow-hidden",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "transition-all duration-500 ease-out",
                            style: {
                                transform: animationPhase >= 1 ? "translateY(150%)" : "translateY(0)",
                                opacity: animationPhase >= 1 ? 0 : 1
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleGenerate,
                                disabled: !prompt.trim() || isGenerating,
                                className: "w-full bg-[#4ade80] hover:bg-[#3bc970] disabled:bg-gray-600 disabled:cursor-not-allowed text-black py-3 transition-all duration-300 uppercase text-base",
                                children: isGenerating ? "GENERATING..." : "GENERATE"
                            }, void 0, false, {
                                fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/page.tsx",
                                lineNumber: 543,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/page.tsx",
                            lineNumber: 535,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/page.tsx",
                        lineNumber: 534,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/page.tsx",
                lineNumber: 462,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "overflow-hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-8xl px-16 mx-auto pb-16 transition-all duration-500 ease-out",
                    style: {
                        transform: animationPhase >= 1 ? "translateY(100%)" : "translateY(0)",
                        opacity: animationPhase >= 1 ? 0 : 1
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-[#4ade80] text-base mb-4 font-mono",
                            children: "Try these examples"
                        }, void 0, false, {
                            fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/page.tsx",
                            lineNumber: 564,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-between",
                            children: presets.map((example, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    onClick: ()=>handleExampleClick(example.text),
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$vsc$2f$HTV$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PresetCard, {
                                        title: example.title,
                                        description: example.description,
                                        image: example.icon
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/page.tsx",
                                        lineNumber: 570,
                                        columnNumber: 17
                                    }, this)
                                }, index, false, {
                                    fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/page.tsx",
                                    lineNumber: 569,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/page.tsx",
                            lineNumber: 567,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/page.tsx",
                    lineNumber: 556,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/page.tsx",
                lineNumber: 555,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/vsc/HTV/frontend/app/poc/page.tsx",
        lineNumber: 437,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=Documents_vsc_HTV_frontend_app_poc_page_tsx_5ca6c577._.js.map