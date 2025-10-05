"use client";

import { useEffect, useState } from "react";

interface LoadingPhase {
  id: string;
  label: string;
  status: "pending" | "loading" | "complete";
  progress?: number;
}

interface TerminalLoaderProps {
  isLoading: boolean;
  hasESGData: boolean;
  has3DModel: boolean;
  hasToolsData: boolean;
  hasInstructions: boolean;
}

export default function TerminalLoader({ isLoading, hasESGData, has3DModel, hasToolsData, hasInstructions }: TerminalLoaderProps) {
  const [phases, setPhases] = useState<LoadingPhase[]>([
    { id: "init", label: "Initializing project analysis", status: "loading", progress: 0 },
    { id: "materials", label: "Processing material data", status: "pending" },
    { id: "esg", label: "Calculating ESG impact metrics", status: "pending" },
    { id: "tools", label: "Extracting tools & materials", status: "pending" },
    { id: "model", label: "Generating 3D model", status: "pending" },
    { id: "package", label: "Finalizing project package", status: "pending" },
  ]);
  
  const [isExiting, setIsExiting] = useState(false);
  const [dots, setDots] = useState("");

  // Animate dots
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Visual progress animation for loading phases (caps at 90% until real data arrives)
  useEffect(() => {
    if (!isLoading) return;

    const progressInterval = setInterval(() => {
      setPhases((prev) => {
        const updated = [...prev];
        const loadingPhases = updated.filter((p) => p.status === "loading");
        
        loadingPhases.forEach(phase => {
          if (phase.progress !== undefined) {
            // Slow progress animation, capped at 90% until real backend data arrives
            const increment = phase.progress < 50 ? 5 : phase.progress < 70 ? 3 : 1;
            phase.progress = Math.min((phase.progress || 0) + increment, 90);
          }
        });
        
        return updated;
      });
    }, 500);

    return () => clearInterval(progressInterval);
  }, [isLoading]);

  // Handle exit transition when loading completes
  useEffect(() => {
    if (!isLoading && !isExiting) {
      // Mark all as complete and start exit transition
      setPhases((prev) => prev.map(p => ({ ...p, status: "complete" as const, progress: 100 })));
      setIsExiting(true);
    }
  }, [isLoading, isExiting]);

  // Update phases based on ACTUAL backend data arrival
  useEffect(() => {
    if (!isLoading) {
      return;
    }

    setPhases((prev) => {
      const updated = [...prev];
      
      // Phase 1: Init (always starts immediately)
      const initPhase = updated.find(p => p.id === "init");
      if (initPhase && initPhase.status === "loading") {
        // Complete init once we start fetching
        initPhase.status = "complete";
        initPhase.progress = 100;
        
        // Start materials phase
        const materialsPhase = updated.find(p => p.id === "materials");
        if (materialsPhase && materialsPhase.status === "pending") {
          materialsPhase.status = "loading";
          materialsPhase.progress = 0;
        }
      }
      
      // Phase 2: Materials (completes when basic package data arrives)
      const materialsPhase = updated.find(p => p.id === "materials");
      if (materialsPhase && materialsPhase.status === "loading") {
        // Materials complete = essential package exists
        materialsPhase.status = "complete";
        materialsPhase.progress = 100;
        
        // Start ESG phase
        const esgPhase = updated.find(p => p.id === "esg");
        if (esgPhase && esgPhase.status === "pending") {
          esgPhase.status = "loading";
          esgPhase.progress = 0;
        }
      }
      
      // Phase 3: ESG (completes when ESG data actually arrives from backend)
      if (hasESGData) {
        const esgPhase = updated.find(p => p.id === "esg");
        if (esgPhase && esgPhase.status !== "complete") {
          esgPhase.status = "complete";
          esgPhase.progress = 100;
          
          // Start tools phase
          const toolsPhase = updated.find(p => p.id === "tools");
          if (toolsPhase && toolsPhase.status === "pending") {
            toolsPhase.status = "loading";
            toolsPhase.progress = 0;
          }
        }
      }
      
      // Phase 4: Tools (completes when tools data arrives)
      if (hasToolsData) {
        const toolsPhase = updated.find(p => p.id === "tools");
        if (toolsPhase && toolsPhase.status !== "complete") {
          toolsPhase.status = "complete";
          toolsPhase.progress = 100;
          
          // Start model phase (parallel with package)
          const modelPhase = updated.find(p => p.id === "model");
          if (modelPhase && modelPhase.status === "pending") {
            modelPhase.status = "loading";
            modelPhase.progress = 0;
          }
        }
      }
      
      // Phase 5: 3D Model (completes when Trellis finishes)
      if (has3DModel) {
        const modelPhase = updated.find(p => p.id === "model");
        if (modelPhase && modelPhase.status !== "complete") {
          modelPhase.status = "complete";
          modelPhase.progress = 100;
        }
      }
      
      // Phase 6: Package (completes when instructions are ready)
      if (hasInstructions) {
        const packagePhase = updated.find(p => p.id === "package");
        if (packagePhase && packagePhase.status === "pending") {
          packagePhase.status = "loading";
          packagePhase.progress = 50;
        }
        if (packagePhase && packagePhase.status === "loading") {
          packagePhase.status = "complete";
          packagePhase.progress = 100;
        }
      }
      
      return updated;
    });
  }, [isLoading, hasESGData, hasToolsData, has3DModel, hasInstructions]);

  // 3D model status is now handled in the main data effect above

  // Don't render if not loading and not exiting
  if (!isLoading && !isExiting) {
    return null;
  }

  return (
    <div 
      className={`fixed inset-0 bg-[#161924] z-50 flex items-center justify-center font-mono overflow-hidden transition-opacity duration-500 ${
        isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      onTransitionEnd={() => {
        if (isExiting) {
          setIsExiting(false);  // Allow component to unmount after fade
        }
      }}
    >
      {/* Scanline effect */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#67B68B] to-transparent animate-pulse" 
             style={{ 
               backgroundSize: '100% 4px',
               animation: 'scan 8s linear infinite'
             }} 
        />
      </div>

      <div className="w-full max-w-3xl px-8 relative z-10">
        {/* ASCII Art Logo */}
        <div className="text-[#67B68B] text-[10px] leading-tight mb-6 opacity-60">
          <pre>{`
   ___  ____  ____ ___ _____ 
  / _ \\| __ )|  _ \\_ _|_   _|
 | | | |  _ \\| |_) | |  | |  
 | |_| | |_) |  _ <| |  | |  
  \\___/|____/|_| \\_\\___| |_|  
          `}</pre>
        </div>

        {/* Header */}
        <div className="mb-8 border-b border-[#2A3142] pb-4">
          <div className="text-[#67B68B] text-xl mb-2 uppercase tracking-wider flex items-center gap-2">
            <span className="animate-pulse">▶</span> SYSTEM_INITIALIZE
          </div>
          <div className="text-gray-400 text-xs">
            &gt; Generating sustainable product package{dots}
          </div>
        </div>

        {/* Progress Phases */}
        <div className="space-y-4 mb-8">
          {phases.map((phase, index) => (
            <div key={phase.id} className="flex items-start gap-3">
              {/* Status Indicator */}
              <div className="mt-1">
                {phase.status === "complete" && (
                  <div className="w-4 h-4 border border-[#4ade80] flex items-center justify-center text-[#4ade80] text-xs">
                    ✓
                  </div>
                )}
                {phase.status === "loading" && (
                  <div className="w-4 h-4 border border-[#67B68B] flex items-center justify-center">
                    <div className="w-2 h-2 bg-[#67B68B] animate-pulse"></div>
                  </div>
                )}
                {phase.status === "pending" && (
                  <div className="w-4 h-4 border border-gray-600"></div>
                )}
              </div>

              {/* Phase Info */}
              <div className="flex-1">
                <div className={`text-sm ${
                  phase.status === "complete" 
                    ? "text-[#4ade80]" 
                    : phase.status === "loading"
                    ? "text-white"
                    : "text-gray-500"
                }`}>
                  [{String(index + 1).padStart(2, "0")}] {phase.label}
                  {phase.status === "loading" && dots}
                </div>
                
                {/* Progress Bar */}
                {phase.status === "loading" && phase.progress !== undefined && (
                  <div className="mt-2">
                    <div className="h-1 bg-[#2A3142] border-[0.5px] border-[#67B68B]/30">
                      <div 
                        className="h-full bg-[#67B68B] transition-all duration-300"
                        style={{ width: `${phase.progress}%` }}
                      />
                    </div>
                    <div className="text-[10px] text-gray-500 mt-1">
                      {phase.progress}% COMPLETE
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* System Messages */}
        <div className="border-t border-[#2A3142] pt-4 mt-6">
          <div className="text-[10px] text-gray-600 space-y-1 font-mono">
            <div className="flex items-center gap-2">
              <span className="text-[#4ade80]">[OK]</span>
              <span>AI_GEMINI_PRO v1.5</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#4ade80]">[OK]</span>
              <span>SUSTAINABILITY_MODELS loaded</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#5BA3D0]">[~~]</span>
              <span>TRELLIS_3D_ENGINE {has3DModel ? 'complete' : 'rendering...'}</span>
            </div>
            <div className="flex items-center gap-2 mt-3">
              <span className="text-[#67B68B] animate-pulse">▶</span>
              <span className="text-[#67B68B]">SYSTEM_STATUS: OPERATIONAL</span>
            </div>
          </div>
        </div>

        {/* Stats Counter */}
        <div className="mt-6 pt-4 border-t border-[#2A3142]">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-[#67B68B] text-2xl font-bold">{phases.filter(p => p.status === 'complete').length}</div>
              <div className="text-[10px] text-gray-500">PHASES_COMPLETE</div>
            </div>
            <div>
              <div className="text-[#4ade80] text-2xl font-bold">{Math.round((phases.filter(p => p.status === 'complete').length / phases.length) * 100)}%</div>
              <div className="text-[10px] text-gray-500">TOTAL_PROGRESS</div>
            </div>
            <div>
              <div className="text-[#5BA3D0] text-2xl font-bold">{phases.length - phases.filter(p => p.status === 'complete').length}</div>
              <div className="text-[10px] text-gray-500">REMAINING_TASKS</div>
            </div>
          </div>
        </div>
      </div>

      {/* Corner brackets (terminal aesthetic) */}
      <div className="absolute top-8 left-8 w-8 h-8 border-t-2 border-l-2 border-[#67B68B] opacity-30"></div>
      <div className="absolute top-8 right-8 w-8 h-8 border-t-2 border-r-2 border-[#67B68B] opacity-30"></div>
      <div className="absolute bottom-8 left-8 w-8 h-8 border-b-2 border-l-2 border-[#67B68B] opacity-30"></div>
      <div className="absolute bottom-8 right-8 w-8 h-8 border-b-2 border-r-2 border-[#67B68B] opacity-30"></div>
    </div>
  );
}

