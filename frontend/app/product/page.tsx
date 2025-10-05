"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ESGImpact from "@/components/ProductDetail/ESGImpact";
import ModelViewer from "@/components/ProductDetail/ModelViewer";
import MaterialsCarousel from "@/components/ProductDetail/MaterialsCarousel";
import Storyboard from "@/components/ProductDetail/Storyboard";
import ToolsAndMaterialsSection from "@/components/ProductDetail/ToolsAndMaterialsSection";
import TerminalLoader from "@/components/ProductDetail/TerminalLoader";

// Force dynamic rendering
export const dynamic = "force-dynamic";

interface ESGMetrics {
  carbon_impact: {
    emissions_reduction_score: number;
    energy_efficiency_score: number;
    transport_impact_score: number;
    total_co2_avoided_kg: number;
    rationale: string;
  };
  water_conservation: {
    usage_reduction_score: number;
    pollution_prevention_score: number;
    treatment_efficiency_score: number;
    total_water_saved_liters: number;
    rationale: string;
  };
  material_circularity: {
    reuse_score: number;
    longevity_score: number;
    end_of_life_score: number;
    circularity_percentage: number;
    rationale: string;
  };
  overall_esg_score: number;
}

interface ToolOrMaterial {
  name: string;
  category: "tool" | "material";
  purpose: string;
  is_optional: boolean;
  icon_name: string;
}

interface ProductPackage {
  package_metadata?: {
    thread_id: string;
    generated_at: string;
  };
  executive_summary?: {
    project_title: string;
    tagline: string;
    description: string;
  };
  detailed_esg_metrics?: ESGMetrics;
  detailed_tools_and_materials?: {
    tools: ToolOrMaterial[];
    materials: ToolOrMaterial[];
  };
  project_documentation?: {
    detailed_instructions?: Array<{
      step_number: number;
      title: string;
      description: string;
      image_url?: string;
    }>;
  };
}

export default function ProductDetail() {
  const searchParams = useSearchParams();
  const threadId = searchParams?.get("thread");
  
  const [imageUrl, setImageUrl] = useState<string>("/pikachu.webp");
  const [modelUrl, setModelUrl] = useState<string | undefined>(undefined);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [packageData, setPackageData] = useState<ProductPackage | null>(null);
  const [isLoadingPackage, setIsLoadingPackage] = useState(true); // Start true
  const [showLoader, setShowLoader] = useState(false); // Only show after delay
  const [loaderMounted, setLoaderMounted] = useState(false); // Track if loader was ever needed

  // Get image from localStorage on mount
  useEffect(() => {
    const storedImage = localStorage.getItem("productImage");
    if (storedImage) {
      console.log("[Product Page] ✓ Loaded image from storage");
      setImageUrl(storedImage);
    } else {
      console.log("[Product Page] No stored image, using default");
    }
  }, []);

  // Fetch product package data from API
  useEffect(() => {
    const fetchPackageData = async () => {
      if (!threadId) {
        console.log("[Product Page] No thread ID, skipping package fetch");
        setIsLoadingPackage(false);
        return;
      }

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const packageUrl = `${apiUrl}/api/package/package/${threadId}`;
      console.log("[Product Page] Fetching package from:", packageUrl);
      
      // Track if we should show loader (will be cancelled if data arrives quickly)
      let shouldShowLoader = true;
      const loaderTimeout = setTimeout(() => {
        if (shouldShowLoader) {  // Only show if NOT cancelled
          console.log("[Product Page] ⏱️ Data taking >500ms, showing loader...");
          setLoaderMounted(true);
          setShowLoader(true);
        }
      }, 500);
      
      try {
        const response = await fetch(packageUrl);

        if (!response.ok) {
          if (response.status === 404) {
            console.log("[Product Page] Package not ready yet (404), will retry in 3s");
            // Retry after 3 seconds - Phase 4 might still be running
            setTimeout(fetchPackageData, 3000);
            return;
          }
          throw new Error(`Failed to fetch package data: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log("[Product Page] ✓ Loaded package data:");
        console.log("  - Keys in data:", Object.keys(data));
        console.log("  - detailed_esg_metrics present?", !!data.detailed_esg_metrics);
        console.log("  - Full ESG structure:", JSON.stringify(data.detailed_esg_metrics, null, 2));
        console.log("  - Overall ESG Score:", data.detailed_esg_metrics?.overall_esg_score);
        
        // Check if this is essential package (no ESG yet) or full package
        if (!data.detailed_esg_metrics) {
          console.log("[Product Page] Essential package received, waiting for full package...");
          // Retry after 5 seconds to get full package with ESG
          setTimeout(fetchPackageData, 5000);
          return;
        }
        
        setPackageData(data);
        shouldShowLoader = false; // Cancel loader mount if data arrived quickly
        clearTimeout(loaderTimeout);
        setIsLoadingPackage(false);
        setShowLoader(false); // Hide loader animation immediately when data arrives
        console.log("[Product Page] ✓ Package loaded, loader mounted:", loaderMounted);
      } catch (err) {
        console.error("[Product Page] Error loading package data:", err);
        shouldShowLoader = false;
        clearTimeout(loaderTimeout);
        setIsLoadingPackage(false);
        setShowLoader(false);
      }
    };

    fetchPackageData();
  }, [threadId]);

  // Generate 3D model
  useEffect(() => {
    const generate3DModel = async () => {
      if (!imageUrl) return;

      // Create a simple hash of the image URL to use as a cache key
      const imageHash = btoa(imageUrl.substring(0, 100)); // Use first 100 chars as hash
      const cachedModelKey = `model_${imageHash}`;

      // Check if we have a cached model for this image
      const cachedModelUrl = localStorage.getItem(cachedModelKey);
      if (cachedModelUrl) {
        console.log("[Product Page] Using cached 3D model:", cachedModelUrl);
        setModelUrl(cachedModelUrl);
        return;
      }
      
      // Check if there's a background generation in progress (from concept selection)
      if (threadId) {
        const trellisKey = `trellis_queued_${threadId}`;
        const wasQueued = localStorage.getItem(trellisKey);
        
        if (wasQueued) {
          console.log("[Product Page] Trellis generation already queued, polling for status...");
          
        const pollStatus = async () => {
          try {
            const statusResponse = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/trellis/status/${threadId}`
            );
            
            if (statusResponse.ok) {
              const statusData = await statusResponse.json();
              
              if (statusData.status === "complete" && statusData.model_file) {
                console.log("[Product Page] ✓ Background generation complete!");
                const modelUrlWithCacheBust = `${statusData.model_file}?_cb=${Date.now()}`;
                setModelUrl(modelUrlWithCacheBust);
                localStorage.setItem(cachedModelKey, modelUrlWithCacheBust);
                setIsGenerating(false);
                return true; // Stop polling
              } else if (statusData.status === "error") {
                console.error("[Product Page] Background generation failed:", statusData.message);
                setError(statusData.message);
                setIsGenerating(false);
                  // Clear flag so user can retry
                  localStorage.removeItem(trellisKey);
                return true; // Stop polling
              } else {
                // Still processing
                  console.log(`[Product Page] Background generation: ${statusData.progress || 0}%`);
                return false; // Continue polling
                }
              } else {
                // Status endpoint not available, clear flag and fall through
                console.log("[Product Page] Status check failed, clearing queue flag");
                localStorage.removeItem(trellisKey);
                return true;
              }
            } catch (err) {
              console.log("[Product Page] Error checking status:", err);
              // Clear flag on error
              localStorage.removeItem(trellisKey);
              return true; // Stop polling on error
            }
        };
        
        // Poll every 3 seconds
        setIsGenerating(true);
        const checkStatus = async () => {
          const shouldStop = await pollStatus();
          if (!shouldStop) {
            setTimeout(checkStatus, 3000);
          }
        };
        
        const initialCheck = await pollStatus();
        if (!initialCheck) {
          setTimeout(checkStatus, 3000);
          return; // Exit and let polling handle it
        }
        
        // If polling stopped but no model yet, don't generate - just show placeholder
        if (!modelUrl) {
          console.log("[Product Page] Background job status unclear, skipping 3D generation on product page");
          setIsGenerating(false);
          return; // Don't generate on product page!
        } else {
          return; // Model is set, we're done
        }
      }
    }
      
    console.log("[Product Page] No background job found, skipping 3D generation on product page");
    // DON'T generate 3D models on the product page - they should be generated during the workflow
    // This avoids duplicate generations and expensive Replicate API calls
        setIsGenerating(false);
    };

    generate3DModel();
  }, [imageUrl, threadId]);

  // Use real data from package or fallback to defaults
  const projectName = packageData?.executive_summary?.project_title || "Ocean Drop Earring";
  const projectSummary = packageData?.executive_summary?.tagline || packageData?.executive_summary?.description || "Earring crafted entirely from recycled ocean plastic";
  
  const esgMetrics = packageData?.detailed_esg_metrics;
  const hasRealESGData = !!(esgMetrics?.overall_esg_score);
  
  // Track what data we actually have for the loader
  const hasToolsData = !!(packageData?.detailed_tools_and_materials?.tools?.length || packageData?.detailed_tools_and_materials?.materials?.length);
  const hasInstructions = !!(packageData?.project_documentation?.detailed_instructions?.length);
  
  // Log whether we're using real or fallback data
  console.log("[Product Page] Data status:", {
    hasESGData: hasRealESGData,
    hasToolsData,
    hasInstructions,
    has3DModel: !!modelUrl,
    showLoader
  });
  if (hasRealESGData) {
    console.log("[Product Page] Real ESG scores:", {
      overall: esgMetrics?.overall_esg_score,
      carbon: esgMetrics?.carbon_impact?.emissions_reduction_score,
      water: esgMetrics?.water_conservation?.usage_reduction_score,
      circular: esgMetrics?.material_circularity?.circularity_percentage
    });
  }
  
  // Only use real data - no fallbacks
  const overallScore = esgMetrics?.overall_esg_score;
  const carbonScore = esgMetrics?.carbon_impact ? Math.round((esgMetrics.carbon_impact.emissions_reduction_score + esgMetrics.carbon_impact.energy_efficiency_score + esgMetrics.carbon_impact.transport_impact_score) / 3) : undefined;
  const waterScore = esgMetrics?.water_conservation ? Math.round((esgMetrics.water_conservation.usage_reduction_score + esgMetrics.water_conservation.pollution_prevention_score + esgMetrics.water_conservation.treatment_efficiency_score) / 3) : undefined;
  const circularScore = esgMetrics?.material_circularity?.circularity_percentage;
  
  const co2Avoided = esgMetrics?.carbon_impact?.total_co2_avoided_kg;
  const waterSaved = esgMetrics?.water_conservation?.total_water_saved_liters;
  
  // Combine tools and materials, ensuring all have icon_name
  const toolsAndMaterials: ToolOrMaterial[] = [
    ...(packageData?.detailed_tools_and_materials?.tools || []).map(t => ({
      ...t,
      icon_name: t.icon_name || "Wrench"
    })),
    ...(packageData?.detailed_tools_and_materials?.materials || []).map(m => ({
      ...m,
      icon_name: m.icon_name || "Package"
    }))
  ];
  
  // Fallback data if no package data loaded
  const defaultToolsAndMaterials: ToolOrMaterial[] = [
    { name: "Heat Gun", category: "tool", purpose: "Shape plastic pieces", is_optional: false, icon_name: "Flame" },
    { name: "Wire Cutters", category: "tool", purpose: "Cut jewelry wire", is_optional: false, icon_name: "Scissors" },
    { name: "Pliers", category: "tool", purpose: "Bend and shape wire", is_optional: false, icon_name: "Wrench" },
    { name: "Jewelry Wire", category: "material", purpose: "Connect components", is_optional: false, icon_name: "Cable" },
    { name: "Silver Hooks", category: "material", purpose: "Earring attachment", is_optional: false, icon_name: "Anchor" },
  ];
  
  const displayToolsAndMaterials = toolsAndMaterials.length > 0 ? toolsAndMaterials : defaultToolsAndMaterials;
  
  // Instructions/steps
  const steps = packageData?.project_documentation?.detailed_instructions?.map((step, idx) => ({
    image: step.image_url || "/landing.png",
    title: step.title,
    description: step.description,
  })) || [
    {
      image: "/landing.png",
      title: "Attach Weave",
      description: "Begin by carefully weaving the recycled ocean plastic pieces together. Use the jewelry wire to create a secure connection between each piece. This forms the foundation of your earring structure.",
    },
    {
      image: "/landing.png",
      title: "Shape the Plastic",
      description: "Use the heat gun to carefully shape the ocean plastic pieces into the desired earring form. Apply heat gradually and evenly to avoid damaging the material. Work in a well-ventilated area.",
    },
    {
      image: "/landing.png",
      title: "Final Assembly",
      description: "Complete the assembly by checking all connections and making sure all components are securely attached. Test the earrings gently to ensure structural integrity.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#161924] font-menlo">
      {/* Terminal Loading Screen - only mount if data takes >500ms */}
      {loaderMounted && (
        <TerminalLoader 
          isLoading={showLoader}
          hasESGData={hasRealESGData}
          has3DModel={!!modelUrl}
          hasToolsData={hasToolsData}
          hasInstructions={hasInstructions}
        />
      )}
      
      {/* Main Content */}
      <div className="max-w-[1440px] mx-auto p-8">
        {/* Product Header */}
        <div className="mb-8">
          <h1 className="text-4xl text-white mb-2">{projectName}</h1>
          <p className="text-[#67B68B] text-base">{projectSummary}</p>
          {isLoadingPackage && (
            <p className="text-[#B1AFAF] text-sm mt-2">Loading project data...</p>
          )}
        </div>

        {/* Top Section: Model Viewer + ESG Impact Split */}
        <div className="grid grid-cols-[7fr_5fr] gap-6 mb-8">
          {/* 3D Model Viewer */}
          <ModelViewer
            modelUrl={modelUrl}
            isLoading={isGenerating}
            error={error}
          />
          
          {/* ESG Impact Stats Screen - Video Game Aesthetic */}
          <div className="flex flex-col gap-6">
            {/* Top: Radar Chart - Square */}
            <div className="aspect-square bg-gradient-to-br from-[#2A3038] to-[#161924] border border-[#67B68B] relative overflow-hidden flex flex-col items-center justify-center p-8">
              {/* Corner decorations */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#67B68B]" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#67B68B]" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#67B68B]" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#67B68B]" />
              
              <div className="relative w-full max-w-md">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="text-xs text-gray-500 font-mono uppercase tracking-wider">Impact Stats</div>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-[#67B68B] animate-pulse" />
                    <div className="w-2 h-2 bg-[#67B68B] animate-pulse" style={{ animationDelay: '0.2s' }} />
                    <div className="w-2 h-2 bg-[#67B68B] animate-pulse" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
                
                {/* Overall Score */}
                <div className="text-center mb-6">
                  {overallScore !== undefined ? (
                    <>
                  <div className="flex items-baseline justify-center gap-1 mb-2">
                        <span className="text-5xl font-bold text-[#67B68B] font-mono">{overallScore}</span>
                    <span className="text-xl text-gray-500 font-mono">/100</span>
                  </div>
                  <div className="px-3 py-1 bg-[#67B68B]/10 border border-[#67B68B]/30 rounded text-[#67B68B] font-mono text-xs inline-block">
                        {overallScore >= 95 ? "S-RANK" : overallScore >= 85 ? "A-RANK" : overallScore >= 75 ? "B-RANK" : "C-RANK"}
                      </div>
                    </>
                  ) : (
                    <div className="animate-pulse">
                      <div className="flex items-baseline justify-center gap-1 mb-2">
                        <div className="h-12 w-24 bg-[#67B68B]/20"></div>
                        <div className="h-6 w-12 bg-gray-700"></div>
                      </div>
                      <div className="h-6 w-20 bg-[#67B68B]/20 mx-auto"></div>
                  </div>
                  )}
                </div>
                
                {/* Radar Chart */}
                <div className="relative aspect-square w-full max-w-xs mx-auto">
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    {/* Grid circles */}
                    <circle cx="100" cy="100" r="80" fill="none" stroke="#67B68B" strokeWidth="0.5" opacity="0.1" />
                    <circle cx="100" cy="100" r="60" fill="none" stroke="#67B68B" strokeWidth="0.5" opacity="0.1" />
                    <circle cx="100" cy="100" r="40" fill="none" stroke="#67B68B" strokeWidth="0.5" opacity="0.1" />
                    <circle cx="100" cy="100" r="20" fill="none" stroke="#67B68B" strokeWidth="0.5" opacity="0.1" />
                    
                    {/* Axes */}
                    <line x1="100" y1="100" x2="100" y2="20" stroke="#67B68B" strokeWidth="0.5" opacity="0.2" />
                    <line x1="100" y1="100" x2="169.28" y2="160" stroke="#5BA3D0" strokeWidth="0.5" opacity="0.2" />
                    <line x1="100" y1="100" x2="30.72" y2="160" stroke="#4ade80" strokeWidth="0.5" opacity="0.2" />
                    
                    {/* Data polygon */}
                    <polygon 
                      points="100,21.6 167.9,156.8 32.1,156.8"
                      fill="url(#radarGradient)"
                      stroke="#67B68B"
                      strokeWidth="2"
                      opacity="0.6"
                    />
                    
                    {/* Data points */}
                    <circle cx="100" cy="21.6" r="4" fill="#67B68B" />
                    <circle cx="167.9" cy="156.8" r="4" fill="#5BA3D0" />
                    <circle cx="32.1" cy="156.8" r="4" fill="#4ade80" />
                    
                    {/* Gradient definition */}
                    <defs>
                      <linearGradient id="radarGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#67B68B" stopOpacity="0.4" />
                        <stop offset="50%" stopColor="#5BA3D0" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#4ade80" stopOpacity="0.4" />
                      </linearGradient>
                    </defs>
                  </svg>
                  
                  {/* Labels */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-6">
                    <div className="text-xs text-[#67B68B] font-mono text-center">
                      {carbonScore !== undefined ? (
                        <div className="font-bold">{carbonScore}</div>
                      ) : (
                        <div className="h-4 w-8 bg-[#67B68B]/20 animate-pulse mx-auto"></div>
                      )}
                      <div className="text-[10px] text-gray-400">CARBON</div>
                    </div>
                  </div>
                  <div className="absolute bottom-0 right-0 translate-x-4 translate-y-6">
                    <div className="text-xs text-[#5BA3D0] font-mono text-center">
                      {waterScore !== undefined ? (
                        <div className="font-bold">{waterScore}</div>
                      ) : (
                        <div className="h-4 w-8 bg-[#5BA3D0]/20 animate-pulse mx-auto"></div>
                      )}
                      <div className="text-[10px] text-gray-400">WATER</div>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 -translate-x-4 translate-y-6">
                    <div className="text-xs text-[#4ade80] font-mono text-center">
                      {circularScore !== undefined ? (
                        <div className="font-bold">{circularScore}</div>
                      ) : (
                        <div className="h-4 w-8 bg-[#4ade80]/20 animate-pulse mx-auto"></div>
                      )}
                      <div className="text-[10px] text-gray-400">CIRCULAR</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Bottom: Detailed Stats Breakdown - Horizontal Layout */}
            <div className="grid grid-cols-3 gap-4">
              {/* Carbon Impact Breakdown */}
              <div className="aspect-square bg-gradient-to-br from-[#2A3038] to-[#161924] border border-[#67B68B] relative overflow-hidden p-4 flex flex-col">
                {/* Corner decorations */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#67B68B]" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#67B68B]" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#67B68B]" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#67B68B]" />
                
                <div className="relative flex flex-col h-full">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border border-[#67B68B] flex items-center justify-center text-[#67B68B] text-[10px] font-mono">&gt;</div>
                      <span className="text-[10px] text-[#67B68B] font-mono uppercase">Carbon</span>
                    </div>
                    {carbonScore !== undefined ? (
                      <div className="text-xl font-bold text-[#67B68B] font-mono">{carbonScore}</div>
                    ) : (
                      <div className="h-6 w-12 bg-[#67B68B]/20 animate-pulse"></div>
                    )}
                  </div>
                  
                  <div className="space-y-2 flex-1">
                    <div>
                      <div className="flex justify-between text-[8px] text-gray-400 font-mono mb-1">
                        <span>EMISSIONS</span>
                        {esgMetrics?.carbon_impact?.emissions_reduction_score !== undefined ? (
                          <span className="text-[#67B68B]">{esgMetrics.carbon_impact.emissions_reduction_score}</span>
                        ) : (
                          <div className="h-2 w-6 bg-[#67B68B]/20 animate-pulse"></div>
                        )}
                      </div>
                      <div className="h-1 bg-[#161924] rounded overflow-hidden">
                        {esgMetrics?.carbon_impact?.emissions_reduction_score !== undefined ? (
                          <div className="h-full bg-[#67B68B]" style={{ width: `${esgMetrics.carbon_impact.emissions_reduction_score}%` }} />
                        ) : (
                          <div className="h-full bg-[#67B68B]/20 animate-pulse w-full"></div>
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[8px] text-gray-400 font-mono mb-1">
                        <span>ENERGY</span>
                        {esgMetrics?.carbon_impact?.energy_efficiency_score !== undefined ? (
                          <span className="text-[#67B68B]">{esgMetrics.carbon_impact.energy_efficiency_score}</span>
                        ) : (
                          <div className="h-2 w-6 bg-[#67B68B]/20 animate-pulse"></div>
                        )}
                      </div>
                      <div className="h-1 bg-[#161924] rounded overflow-hidden">
                        {esgMetrics?.carbon_impact?.energy_efficiency_score !== undefined ? (
                          <div className="h-full bg-[#67B68B]" style={{ width: `${esgMetrics.carbon_impact.energy_efficiency_score}%` }} />
                        ) : (
                          <div className="h-full bg-[#67B68B]/20 animate-pulse w-full"></div>
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[8px] text-gray-400 font-mono mb-1">
                        <span>TRANSPORT</span>
                        {esgMetrics?.carbon_impact?.transport_impact_score !== undefined ? (
                          <span className="text-[#67B68B]">{esgMetrics.carbon_impact.transport_impact_score}</span>
                        ) : (
                          <div className="h-2 w-6 bg-[#67B68B]/20 animate-pulse"></div>
                        )}
                      </div>
                      <div className="h-1 bg-[#161924] rounded overflow-hidden">
                        {esgMetrics?.carbon_impact?.transport_impact_score !== undefined ? (
                          <div className="h-full bg-[#67B68B]" style={{ width: `${esgMetrics.carbon_impact.transport_impact_score}%` }} />
                        ) : (
                          <div className="h-full bg-[#67B68B]/20 animate-pulse w-full"></div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-[#67B68B]/20">
                    <div className="text-[8px] text-gray-500 font-mono">
                      {co2Avoided !== undefined ? (
                        <><span className="text-[#67B68B]">{co2Avoided.toFixed(2)} kg</span> saved</>
                      ) : (
                        <div className="h-2 w-16 bg-[#67B68B]/20 animate-pulse"></div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Water Conservation Breakdown */}
              <div className="aspect-square bg-gradient-to-br from-[#2A3038] to-[#161924] border border-[#5BA3D0] relative overflow-hidden p-4 flex flex-col">
                {/* Corner decorations */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#5BA3D0]" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#5BA3D0]" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#5BA3D0]" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#5BA3D0]" />
                
                <div className="relative flex flex-col h-full">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border border-[#5BA3D0] flex items-center justify-center text-[#5BA3D0] text-[10px] font-mono">~</div>
                      <span className="text-[10px] text-[#5BA3D0] font-mono uppercase">Water</span>
                    </div>
                    {waterScore !== undefined ? (
                      <div className="text-xl font-bold text-[#5BA3D0] font-mono">{waterScore}</div>
                    ) : (
                      <div className="h-6 w-12 bg-[#5BA3D0]/20 animate-pulse"></div>
                    )}
                  </div>
                  
                  <div className="space-y-2 flex-1">
                    <div>
                      <div className="flex justify-between text-[8px] text-gray-400 font-mono mb-1">
                        <span>USAGE</span>
                        {esgMetrics?.water_conservation?.usage_reduction_score !== undefined ? (
                          <span className="text-[#5BA3D0]">{esgMetrics.water_conservation.usage_reduction_score}</span>
                        ) : (
                          <div className="h-2 w-6 bg-[#5BA3D0]/20 animate-pulse"></div>
                        )}
                      </div>
                      <div className="h-1 bg-[#161924] rounded overflow-hidden">
                        {esgMetrics?.water_conservation?.usage_reduction_score !== undefined ? (
                          <div className="h-full bg-[#5BA3D0]" style={{ width: `${esgMetrics.water_conservation.usage_reduction_score}%` }} />
                        ) : (
                          <div className="h-full bg-[#5BA3D0]/20 animate-pulse w-full"></div>
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[8px] text-gray-400 font-mono mb-1">
                        <span>POLLUTION</span>
                        {esgMetrics?.water_conservation?.pollution_prevention_score !== undefined ? (
                          <span className="text-[#5BA3D0]">{esgMetrics.water_conservation.pollution_prevention_score}</span>
                        ) : (
                          <div className="h-2 w-6 bg-[#5BA3D0]/20 animate-pulse"></div>
                        )}
                      </div>
                      <div className="h-1 bg-[#161924] rounded overflow-hidden">
                        {esgMetrics?.water_conservation?.pollution_prevention_score !== undefined ? (
                          <div className="h-full bg-[#5BA3D0]" style={{ width: `${esgMetrics.water_conservation.pollution_prevention_score}%` }} />
                        ) : (
                          <div className="h-full bg-[#5BA3D0]/20 animate-pulse w-full"></div>
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[8px] text-gray-400 font-mono mb-1">
                        <span>TREATMENT</span>
                        {esgMetrics?.water_conservation?.treatment_efficiency_score !== undefined ? (
                          <span className="text-[#5BA3D0]">{esgMetrics.water_conservation.treatment_efficiency_score}</span>
                        ) : (
                          <div className="h-2 w-6 bg-[#5BA3D0]/20 animate-pulse"></div>
                        )}
                      </div>
                      <div className="h-1 bg-[#161924] rounded overflow-hidden">
                        {esgMetrics?.water_conservation?.treatment_efficiency_score !== undefined ? (
                          <div className="h-full bg-[#5BA3D0]" style={{ width: `${esgMetrics.water_conservation.treatment_efficiency_score}%` }} />
                        ) : (
                          <div className="h-full bg-[#5BA3D0]/20 animate-pulse w-full"></div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-[#5BA3D0]/20">
                    <div className="text-[8px] text-gray-500 font-mono">
                      {waterSaved !== undefined ? (
                        <><span className="text-[#5BA3D0]">{waterSaved.toFixed(2)} L</span> conserved</>
                      ) : (
                        <div className="h-2 w-16 bg-[#5BA3D0]/20 animate-pulse"></div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Circularity Breakdown */}
              <div className="aspect-square bg-gradient-to-br from-[#2A3038] to-[#161924] border border-[#4ade80] relative overflow-hidden p-4 flex flex-col">
                {/* Corner decorations */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#4ade80]" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#4ade80]" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#4ade80]" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#4ade80]" />
                
                <div className="relative flex flex-col h-full">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border border-[#4ade80] flex items-center justify-center text-[#4ade80] text-[10px] font-mono">↻</div>
                      <span className="text-[10px] text-[#4ade80] font-mono uppercase">Circular</span>
                    </div>
                    {circularScore !== undefined ? (
                      <div className="text-xl font-bold text-[#4ade80] font-mono">{circularScore}</div>
                    ) : (
                      <div className="h-6 w-12 bg-[#4ade80]/20 animate-pulse"></div>
                    )}
                  </div>
                  
                  <div className="space-y-2 flex-1">
                    <div>
                      <div className="flex justify-between text-[8px] text-gray-400 font-mono mb-1">
                        <span>REUSE</span>
                        {esgMetrics?.material_circularity?.reuse_score !== undefined ? (
                          <span className="text-[#4ade80]">{esgMetrics.material_circularity.reuse_score}</span>
                        ) : (
                          <div className="h-2 w-6 bg-[#4ade80]/20 animate-pulse"></div>
                        )}
                      </div>
                      <div className="h-1 bg-[#161924] rounded overflow-hidden">
                        {esgMetrics?.material_circularity?.reuse_score !== undefined ? (
                          <div className="h-full bg-[#4ade80]" style={{ width: `${esgMetrics.material_circularity.reuse_score}%` }} />
                        ) : (
                          <div className="h-full bg-[#4ade80]/20 animate-pulse w-full"></div>
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[8px] text-gray-400 font-mono mb-1">
                        <span>LONGEVITY</span>
                        {esgMetrics?.material_circularity?.longevity_score !== undefined ? (
                          <span className="text-[#4ade80]">{esgMetrics.material_circularity.longevity_score}</span>
                        ) : (
                          <div className="h-2 w-6 bg-[#4ade80]/20 animate-pulse"></div>
                        )}
                      </div>
                      <div className="h-1 bg-[#161924] rounded overflow-hidden">
                        {esgMetrics?.material_circularity?.longevity_score !== undefined ? (
                          <div className="h-full bg-[#4ade80]" style={{ width: `${esgMetrics.material_circularity.longevity_score}%` }} />
                        ) : (
                          <div className="h-full bg-[#4ade80]/20 animate-pulse w-full"></div>
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[8px] text-gray-400 font-mono mb-1">
                        <span>END-OF-LIFE</span>
                        {esgMetrics?.material_circularity?.end_of_life_score !== undefined ? (
                          <span className="text-[#4ade80]">{esgMetrics.material_circularity.end_of_life_score}</span>
                        ) : (
                          <div className="h-2 w-6 bg-[#4ade80]/20 animate-pulse"></div>
                        )}
                      </div>
                      <div className="h-1 bg-[#161924] rounded overflow-hidden">
                        {esgMetrics?.material_circularity?.end_of_life_score !== undefined ? (
                          <div className="h-full bg-[#4ade80]" style={{ width: `${esgMetrics.material_circularity.end_of_life_score}%` }} />
                        ) : (
                          <div className="h-full bg-[#4ade80]/20 animate-pulse w-full"></div>
                        )}
                      </div>
                    </div>
        </div>

                  <div className="mt-3 pt-3 border-t border-[#4ade80]/20">
                    <div className="text-[8px] text-gray-500 font-mono">
                      <span className="text-[#4ade80]">100%</span> reclaimed
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tools & Materials Required */}
        <ToolsAndMaterialsSection items={displayToolsAndMaterials} />

        {/* How to Build Storyboard */}
        <div>
          <Storyboard steps={steps} />
        </div>
      </div>
    </div>
  );
}
