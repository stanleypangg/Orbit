"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ESGImpact from "@/components/ProductDetail/ESGImpact";
import ModelViewer from "@/components/ProductDetail/ModelViewer";
import MaterialsCarousel from "@/components/ProductDetail/MaterialsCarousel";
import Storyboard from "@/components/ProductDetail/Storyboard";
import ToolsAndMaterialsSection from "@/components/ProductDetail/ToolsAndMaterialsSection";

// Force dynamic rendering
export const dynamic = "force-dynamic";

// Mock data - replace with actual props or API data
const productData = {
  name: "Ocean Drop Earring",
  summary: "Earring crafted entirely from recycled ocean plastic",
  esgData: {
    co2EmissionsAvoided: 0.05,
    waterSaved: 0.04,
    sustainabilityScore: 96,
  },
  toolsAndMaterials: [
    { 
      name: "Heat Gun", 
      category: "tool" as const,
      purpose: "Shape plastic pieces",
      is_optional: false,
      icon_name: "Flame"
    },
    { 
      name: "Wire Cutters", 
      category: "tool" as const,
      purpose: "Cut jewelry wire",
      is_optional: false,
      icon_name: "Scissors"
    },
    { 
      name: "Pliers", 
      category: "tool" as const,
      purpose: "Bend and shape wire",
      is_optional: false,
      icon_name: "Wrench"
    },
    { 
      name: "Jewelry Wire", 
      category: "material" as const,
      purpose: "Connect components",
      is_optional: false,
      icon_name: "Cable"
    },
    { 
      name: "Silver Hooks", 
      category: "material" as const,
      purpose: "Earring attachment",
      is_optional: false,
      icon_name: "Anchor"
    },
  ],
  materials: [
    { name: "Ocean Plastic", image: "/turtle.svg" },
    { name: "Silver Hooks", image: "/glass.svg" },
    { name: "Heat Gun", image: "/plastic.svg" },
    { name: "Wire Cutters", image: "/turtle.svg" },
    { name: "Jewelry Wire", image: "/glass.svg" },
    { name: "Pliers", image: "/plastic.svg" },
    { name: "Work Surface", image: "/turtle.svg" },
  ],
  steps: [
    {
      image: "/landing.png",
      title: "Attach Weave",
      description:
        "Begin by carefully weaving the recycled ocean plastic pieces together. Use the jewelry wire to create a secure connection between each piece. This forms the foundation of your earring structure.",
    },
    {
      image: "/landing.png",
      title: "Shape the Plastic",
      description:
        "Use the heat gun to carefully shape the ocean plastic pieces into the desired earring form. Apply heat gradually and evenly to avoid damaging the material. Work in a well-ventilated area.",
    },
    {
      image: "/landing.png",
      title: "Attach Hooks",
      description:
        "Connect the silver hooks to the shaped plastic using the jewelry wire and wire cutters. Ensure the hooks are securely attached and properly oriented for comfortable wearing.",
    },
    {
      image: "/landing.png",
      title: "Final Assembly",
      description:
        "Complete the assembly by checking all connections and making sure all components are securely attached. Test the earrings gently to ensure structural integrity.",
    },
    {
      image: "/landing.png",
      title: "Quality Check",
      description:
        "Inspect the finished earrings for quality. Check for any sharp edges, loose connections, or imperfections. Make any necessary adjustments before proceeding to the next step.",
    },
    {
      image: "/landing.png",
      title: "Polish & Finish",
      description:
        "Polish the earrings using a soft cloth to bring out the natural shine of the ocean plastic. Add any final decorative touches or protective coatings if desired.",
    },
    {
      image: "/landing.png",
      title: "Safety Test",
      description:
        "Perform a final safety test by gently pulling on all connections. Ensure the earrings are comfortable and safe to wear. Make any last-minute adjustments as needed.",
    },
    {
      image: "/landing.png",
      title: "Package",
      description:
        "Package the earrings in eco-friendly materials ready for use or gifting. Use recycled or biodegradable packaging to maintain the sustainable ethos of your creation.",
    },
    {
      image: "/landing.png",
      title: "Enjoy Your Creation",
      description:
        "Your sustainable ocean drop earrings are now ready to wear! You've successfully transformed ocean waste into a beautiful, wearable piece of art. Share your creation with others to inspire more sustainable crafting.",
    },
  ],
  modelUrl: undefined, // Add actual GLB model URL when available
};

export default function ProductDetail() {
  const [imageUrl, setImageUrl] = useState<string>("/pikachu.webp");
  const [modelUrl, setModelUrl] = useState<string | undefined>(undefined);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get image from localStorage on mount
  useEffect(() => {
    const storedImage = localStorage.getItem("productImage");
    if (storedImage) {
      console.log("[Product Page] Loading image from storage:", storedImage.substring(0, 50));
      setImageUrl(storedImage);
      // Don't remove productImage yet - we'll use it as a key for model caching
    } else {
      console.log("[Product Page] No stored image, using default");
    }
  }, []);

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
      const threadId = new URLSearchParams(window.location.search).get('thread');
      if (threadId) {
        console.log("[Product Page] Checking for background generation...");
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
                return true; // Stop polling
              } else {
                // Still processing
                console.log(`[Product Page] Background generation: ${statusData.progress}%`);
                return false; // Continue polling
              }
            }
          } catch (err) {
            console.log("[Product Page] No background generation found, will generate now");
          }
          return true; // Stop polling on error
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
        
        // If no background job found, fall through to generate now
      }
      
      console.log("[Product Page] No cached model found, generating new 3D model...");

      // Reset model URL to prevent showing old model
      setModelUrl(undefined);
      setIsGenerating(true);
      setError(null);

      try {
        // Convert local image path to full URL or data URL
        let processedImageUrl = imageUrl;

        // If it's a local path or proxy path, convert to data URL
        if ((imageUrl.startsWith("/") || imageUrl.startsWith("/api/")) && !imageUrl.startsWith("http")) {
          console.log("[Product Page] Converting image to data URL for Trellis...");
          // Fetch the local image and convert to data URL
          const imgResponse = await fetch(imageUrl);
          const blob = await imgResponse.blob();
          processedImageUrl = await new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(blob);
          });
        }

        // Add timestamp to prevent caching issues
        const timestamp = Date.now();
        const response = await fetch(
          `${
            process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
          }/trellis/generate?_t=${timestamp}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              images: [processedImageUrl],
              seed: 1337,
              randomize_seed: false,
              texture_size: 2048,
              mesh_simplify: 0.96,
              generate_color: true,
              generate_normal: false,
              generate_model: true,
              save_gaussian_ply: false,
              return_no_background: true,
              ss_sampling_steps: 26,
              ss_guidance_strength: 8.0,
              slat_sampling_steps: 26,
              slat_guidance_strength: 3.2,
            }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.detail || "Failed to generate 3D model");
        }

        const data = await response.json();
        if (data.model_file) {
          // Add cache-busting parameter to force reload
          const modelUrlWithCacheBust = `${data.model_file}${
            data.model_file.includes("?") ? "&" : "?"
          }_cb=${Date.now()}`;
          setModelUrl(modelUrlWithCacheBust);

          // Cache the model URL for this image
          const imageHash = btoa(imageUrl.substring(0, 100));
          const cachedModelKey = `model_${imageHash}`;
          localStorage.setItem(cachedModelKey, modelUrlWithCacheBust);
        }
      } catch (err) {
        console.error("Error generating 3D model:", err);
        setError(
          err instanceof Error ? err.message : "Failed to generate 3D model"
        );
      } finally {
        setIsGenerating(false);
      }
    };

    generate3DModel();
  }, [imageUrl]);

  return (
    <div className="min-h-screen bg-[#161924] font-menlo">
      {/* Main Content */}
      <div className="max-w-[1440px] mx-auto p-8">
        {/* Product Header */}
        <div className="mb-8">
          <h1 className="text-4xl text-white mb-2">{productData.name}</h1>
          <p className="text-[#67B68B] text-base">{productData.summary}</p>
        </div>

        {/* Top Section: Model Viewer + ESG Impact Split */}
        <div className="grid grid-cols-[7fr_5fr] gap-6 mb-8">
          {/* 3D Model Viewer - Square */}
          <div className="aspect-square">
          <ModelViewer
            modelUrl={modelUrl}
            isLoading={isGenerating}
            error={error}
          />
          </div>
          
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
                  <div className="flex items-baseline justify-center gap-1 mb-2">
                    <span className="text-5xl font-bold text-[#67B68B] font-mono">97</span>
                    <span className="text-xl text-gray-500 font-mono">/100</span>
                  </div>
                  <div className="px-3 py-1 bg-[#67B68B]/10 border border-[#67B68B]/30 rounded text-[#67B68B] font-mono text-xs inline-block">
                    S-RANK
                  </div>
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
                      <div className="font-bold">98</div>
                      <div className="text-[10px] text-gray-400">CARBON</div>
                    </div>
                  </div>
                  <div className="absolute bottom-0 right-0 translate-x-4 translate-y-6">
                    <div className="text-xs text-[#5BA3D0] font-mono text-center">
                      <div className="font-bold">99</div>
                      <div className="text-[10px] text-gray-400">WATER</div>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 -translate-x-4 translate-y-6">
                    <div className="text-xs text-[#4ade80] font-mono text-center">
                      <div className="font-bold">96</div>
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
                    <div className="text-xl font-bold text-[#67B68B] font-mono">98</div>
                  </div>
                  
                  <div className="space-y-2 flex-1">
                    <div>
                      <div className="flex justify-between text-[8px] text-gray-400 font-mono mb-1">
                        <span>EMISSIONS</span>
                        <span className="text-[#67B68B]">98</span>
                      </div>
                      <div className="h-1 bg-[#161924] rounded overflow-hidden">
                        <div className="h-full bg-[#67B68B]" style={{ width: '98%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[8px] text-gray-400 font-mono mb-1">
                        <span>ENERGY</span>
                        <span className="text-[#67B68B]">95</span>
                      </div>
                      <div className="h-1 bg-[#161924] rounded overflow-hidden">
                        <div className="h-full bg-[#67B68B]" style={{ width: '95%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[8px] text-gray-400 font-mono mb-1">
                        <span>TRANSPORT</span>
                        <span className="text-[#67B68B]">100</span>
                      </div>
                      <div className="h-1 bg-[#161924] rounded overflow-hidden">
                        <div className="h-full bg-[#67B68B]" style={{ width: '100%' }} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-[#67B68B]/20">
                    <div className="text-[8px] text-gray-500 font-mono">
                      <span className="text-[#67B68B]">{productData.esgData.co2EmissionsAvoided} kg</span> saved
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
                    <div className="text-xl font-bold text-[#5BA3D0] font-mono">99</div>
                  </div>
                  
                  <div className="space-y-2 flex-1">
                    <div>
                      <div className="flex justify-between text-[8px] text-gray-400 font-mono mb-1">
                        <span>USAGE</span>
                        <span className="text-[#5BA3D0]">99</span>
                      </div>
                      <div className="h-1 bg-[#161924] rounded overflow-hidden">
                        <div className="h-full bg-[#5BA3D0]" style={{ width: '99%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[8px] text-gray-400 font-mono mb-1">
                        <span>POLLUTION</span>
                        <span className="text-[#5BA3D0]">100</span>
                      </div>
                      <div className="h-1 bg-[#161924] rounded overflow-hidden">
                        <div className="h-full bg-[#5BA3D0]" style={{ width: '100%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[8px] text-gray-400 font-mono mb-1">
                        <span>TREATMENT</span>
                        <span className="text-[#5BA3D0]">98</span>
                      </div>
                      <div className="h-1 bg-[#161924] rounded overflow-hidden">
                        <div className="h-full bg-[#5BA3D0]" style={{ width: '98%' }} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-[#5BA3D0]/20">
                    <div className="text-[8px] text-gray-500 font-mono">
                      <span className="text-[#5BA3D0]">{productData.esgData.waterSaved} L</span> conserved
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
                    <div className="text-xl font-bold text-[#4ade80] font-mono">{productData.esgData.sustainabilityScore}</div>
                  </div>
                  
                  <div className="space-y-2 flex-1">
                    <div>
                      <div className="flex justify-between text-[8px] text-gray-400 font-mono mb-1">
                        <span>REUSE</span>
                        <span className="text-[#4ade80]">100</span>
                      </div>
                      <div className="h-1 bg-[#161924] rounded overflow-hidden">
                        <div className="h-full bg-[#4ade80]" style={{ width: '100%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[8px] text-gray-400 font-mono mb-1">
                        <span>LONGEVITY</span>
                        <span className="text-[#4ade80]">95</span>
                      </div>
                      <div className="h-1 bg-[#161924] rounded overflow-hidden">
                        <div className="h-full bg-[#4ade80]" style={{ width: '95%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[8px] text-gray-400 font-mono mb-1">
                        <span>END-OF-LIFE</span>
                        <span className="text-[#4ade80]">93</span>
                      </div>
                      <div className="h-1 bg-[#161924] rounded overflow-hidden">
                        <div className="h-full bg-[#4ade80]" style={{ width: '93%' }} />
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
        <ToolsAndMaterialsSection items={productData.toolsAndMaterials} />

        {/* How to Build Storyboard */}
        <div>
          <Storyboard steps={productData.steps} />
        </div>
      </div>
    </div>
  );
}
