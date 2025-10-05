"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ESGImpact from "@/components/ProductDetail/ESGImpact";
import ModelViewer from "@/components/ProductDetail/ModelViewer";
import MaterialsCarousel from "@/components/ProductDetail/MaterialsCarousel";
import Storyboard from "@/components/ProductDetail/Storyboard";

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
      <div className="max-w-7xl mx-auto p-8">
        {/* Product Header */}
        <div className="mb-8">
          <h1 className="text-4xl text-white mb-2">{productData.name}</h1>
          <p className="text-[#67B68B] text-base">{productData.summary}</p>
        </div>

        {/* Top Section: Model Viewer + ESG Impact Split */}
        <div className="grid grid-cols-[3fr_2fr] gap-6 mb-8">
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
            {/* Top: Overall Score + Breakdown - Dynamic height */}
            <div className="flex-1 bg-[#2A3038] border-[0.5px] border-[#67B68B] rounded overflow-hidden flex flex-col">
              {/* Overall ESG Score - Hero Section */}
              <div className="bg-gradient-to-b from-[#161924] to-[#2A3038] border-b-[0.5px] border-[#67B68B]/30 p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs text-gray-500 font-mono uppercase tracking-wider">Overall Rating</div>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-[#67B68B] animate-pulse" />
                    <div className="w-2 h-2 bg-[#67B68B] animate-pulse" style={{ animationDelay: '0.2s' }} />
                    <div className="w-2 h-2 bg-[#67B68B] animate-pulse" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
                
                <div className="flex items-end gap-4">
                  <div className="flex items-baseline">
                    <span className="text-6xl font-bold text-[#67B68B] font-mono leading-none">97</span>
                    <span className="text-2xl text-gray-500 font-mono ml-1">/100</span>
                  </div>
                  
                  <div className="flex-1 mb-2">
                    <div className="text-xs text-gray-400 font-mono mb-2">ESG IMPACT SCORE</div>
                    <div className="h-3 bg-[#161924] rounded-full overflow-hidden border border-[#67B68B]/20">
                      <div 
                        className="h-full bg-gradient-to-r from-[#67B68B] via-[#5BA3D0] to-[#4ade80] relative"
                        style={{ width: '97%' }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                      </div>
                    </div>
                    <div className="flex justify-between text-[9px] text-gray-600 font-mono mt-1">
                      <span>POOR</span>
                      <span>FAIR</span>
                      <span>GOOD</span>
                      <span className="text-[#67B68B]">EXCELLENT</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 flex items-center gap-2 text-xs">
                  <div className="px-2 py-1 bg-[#67B68B]/10 border border-[#67B68B]/30 rounded text-[#67B68B] font-mono">
                    S-RANK
                  </div>
                  <div className="text-gray-500 font-mono">→</div>
                  <div className="text-gray-400 font-mono">Exceptional sustainability metrics</div>
                </div>
              </div>
              
              {/* Category Breakdown */}
              <div className="flex-1 p-6 overflow-auto">
                <div className="text-xs text-gray-500 font-mono uppercase tracking-wider mb-4">Stat Breakdown</div>
                <div className="space-y-4">
                {/* Carbon Impact Score */}
                <div className="bg-[#161924]/50 border border-[#67B68B]/30 rounded p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 border border-[#67B68B] flex items-center justify-center text-[#67B68B] text-xs font-mono">&gt;</div>
                      <span className="text-xs text-gray-300 font-semibold">Carbon Impact</span>
                    </div>
                    <div className="flex items-baseline gap-0.5">
                      <span className="text-xl font-bold text-[#67B68B] font-mono">98</span>
                      <span className="text-[10px] text-gray-500 font-mono">/100</span>
                    </div>
                  </div>
                  
                  {/* Score breakdown */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] text-gray-500 font-mono w-24">EMISSIONS:</span>
                      <div className="flex-1 h-1 bg-[#161924] rounded overflow-hidden">
                        <div className="h-full bg-[#67B68B]" style={{ width: '98%' }} />
                      </div>
                      <span className="text-[9px] text-[#67B68B] font-mono w-8 text-right">98</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] text-gray-500 font-mono w-24">ENERGY:</span>
                      <div className="flex-1 h-1 bg-[#161924] rounded overflow-hidden">
                        <div className="h-full bg-[#67B68B]" style={{ width: '95%' }} />
                      </div>
                      <span className="text-[9px] text-[#67B68B] font-mono w-8 text-right">95</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] text-gray-500 font-mono w-24">TRANSPORT:</span>
                      <div className="flex-1 h-1 bg-[#161924] rounded overflow-hidden">
                        <div className="h-full bg-[#67B68B]" style={{ width: '100%' }} />
                      </div>
                      <span className="text-[9px] text-[#67B68B] font-mono w-8 text-right">100</span>
                    </div>
                  </div>
                  
                  <div className="mt-2 pt-2 border-t border-[#67B68B]/10">
                    <p className="text-[9px] text-gray-500 font-mono">
                      <span className="text-[#67B68B]">{productData.esgData.co2EmissionsAvoided} kg</span> CO₂e saved vs. 2.5kg baseline
                    </p>
                  </div>
                </div>

                {/* Water Conservation Score */}
                <div className="bg-[#161924]/50 border border-[#5BA3D0]/30 rounded p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 border border-[#5BA3D0] flex items-center justify-center text-[#5BA3D0] text-xs font-mono">~</div>
                      <span className="text-xs text-gray-300 font-semibold">Water Conservation</span>
                    </div>
                    <div className="flex items-baseline gap-0.5">
                      <span className="text-xl font-bold text-[#5BA3D0] font-mono">99</span>
                      <span className="text-[10px] text-gray-500 font-mono">/100</span>
                    </div>
                  </div>
                  
                  {/* Score breakdown */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] text-gray-500 font-mono w-24">USAGE:</span>
                      <div className="flex-1 h-1 bg-[#161924] rounded overflow-hidden">
                        <div className="h-full bg-[#5BA3D0]" style={{ width: '99%' }} />
                      </div>
                      <span className="text-[9px] text-[#5BA3D0] font-mono w-8 text-right">99</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] text-gray-500 font-mono w-24">POLLUTION:</span>
                      <div className="flex-1 h-1 bg-[#161924] rounded overflow-hidden">
                        <div className="h-full bg-[#5BA3D0]" style={{ width: '100%' }} />
                      </div>
                      <span className="text-[9px] text-[#5BA3D0] font-mono w-8 text-right">100</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] text-gray-500 font-mono w-24">TREATMENT:</span>
                      <div className="flex-1 h-1 bg-[#161924] rounded overflow-hidden">
                        <div className="h-full bg-[#5BA3D0]" style={{ width: '98%' }} />
                      </div>
                      <span className="text-[9px] text-[#5BA3D0] font-mono w-8 text-right">98</span>
                    </div>
                  </div>
                  
                  <div className="mt-2 pt-2 border-t border-[#5BA3D0]/10">
                    <p className="text-[9px] text-gray-500 font-mono">
                      <span className="text-[#5BA3D0]">{productData.esgData.waterSaved} L</span> saved; no chemical treatment
                    </p>
                  </div>
                </div>

                {/* Circularity Score */}
                <div className="bg-[#161924]/50 border border-[#4ade80]/30 rounded p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 border border-[#4ade80] flex items-center justify-center text-[#4ade80] text-xs font-mono">↻</div>
                      <span className="text-xs text-gray-300 font-semibold">Circularity</span>
                    </div>
                    <div className="flex items-baseline gap-0.5">
                      <span className="text-xl font-bold text-[#4ade80] font-mono">{productData.esgData.sustainabilityScore}</span>
                      <span className="text-[10px] text-gray-500 font-mono">/100</span>
                    </div>
                  </div>
                  
                  {/* Score breakdown */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] text-gray-500 font-mono w-24">REUSE:</span>
                      <div className="flex-1 h-1 bg-[#161924] rounded overflow-hidden">
                        <div className="h-full bg-[#4ade80]" style={{ width: '100%' }} />
                      </div>
                      <span className="text-[9px] text-[#4ade80] font-mono w-8 text-right">100</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] text-gray-500 font-mono w-24">LONGEVITY:</span>
                      <div className="flex-1 h-1 bg-[#161924] rounded overflow-hidden">
                        <div className="h-full bg-[#4ade80]" style={{ width: '95%' }} />
                      </div>
                      <span className="text-[9px] text-[#4ade80] font-mono w-8 text-right">95</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] text-gray-500 font-mono w-24">END-OF-LIFE:</span>
                      <div className="flex-1 h-1 bg-[#161924] rounded overflow-hidden">
                        <div className="h-full bg-[#4ade80]" style={{ width: '93%' }} />
                      </div>
                      <span className="text-[9px] text-[#4ade80] font-mono w-8 text-right">93</span>
                    </div>
                  </div>
                  
                  <div className="mt-2 pt-2 border-t border-[#4ade80]/10">
                    <p className="text-[9px] text-gray-500 font-mono">
                      <span className="text-[#4ade80]">100% reclaimed</span> materials; fully recyclable
                    </p>
                  </div>
                </div>
              </div>
            </div>
            </div>
            
            {/* Bottom: Quick Stats - Square Video Game Tiles */}
            <div className="grid grid-cols-3 gap-4">
              {/* Carbon Stat */}
              <div className="aspect-square bg-gradient-to-br from-[#2A3038] to-[#161924] border border-[#67B68B] rounded relative overflow-hidden group hover:shadow-lg hover:shadow-[#67B68B]/20 transition-all">
                {/* Corner decorations */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#67B68B]" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#67B68B]" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#67B68B]" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#67B68B]" />
                
                <div className="relative h-full flex flex-col items-center justify-center p-4">
                  <div className="text-[10px] text-[#67B68B]/60 font-mono uppercase tracking-widest mb-2">CARBON</div>
                  <div className="text-4xl font-bold text-[#67B68B] mb-1 font-mono">
                    {productData.esgData.co2EmissionsAvoided}
                  </div>
                  <div className="text-[10px] text-gray-400 font-mono mb-2">kg CO₂</div>
                  <div className="text-[8px] text-gray-600 font-mono uppercase">AVOIDED</div>
                </div>
              </div>
              
              {/* Water Stat */}
              <div className="aspect-square bg-gradient-to-br from-[#2A3038] to-[#161924] border border-[#5BA3D0] rounded relative overflow-hidden group hover:shadow-lg hover:shadow-[#5BA3D0]/20 transition-all">
                {/* Corner decorations */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#5BA3D0]" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#5BA3D0]" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#5BA3D0]" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#5BA3D0]" />
                
                <div className="relative h-full flex flex-col items-center justify-center p-4">
                  <div className="text-[10px] text-[#5BA3D0]/60 font-mono uppercase tracking-widest mb-2">WATER</div>
                  <div className="text-4xl font-bold text-[#5BA3D0] mb-1 font-mono">
                    {productData.esgData.waterSaved}
                  </div>
                  <div className="text-[10px] text-gray-400 font-mono mb-2">Liters</div>
                  <div className="text-[8px] text-gray-600 font-mono uppercase">CONSERVED</div>
                </div>
              </div>
              
              {/* Circularity Stat */}
              <div className="aspect-square bg-gradient-to-br from-[#2A3038] to-[#161924] border border-[#4ade80] rounded relative overflow-hidden group hover:shadow-lg hover:shadow-[#4ade80]/20 transition-all">
                {/* Corner decorations */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#4ade80]" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#4ade80]" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#4ade80]" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#4ade80]" />
                
                <div className="relative h-full flex flex-col items-center justify-center p-4">
                  <div className="text-[10px] text-[#4ade80]/60 font-mono uppercase tracking-widest mb-2">CIRCULAR</div>
                  <div className="text-4xl font-bold text-[#4ade80] mb-1 font-mono">
                    {productData.esgData.sustainabilityScore}
                  </div>
                  <div className="text-[10px] text-gray-400 font-mono mb-2">Score</div>
                  <div className="text-[8px] text-gray-600 font-mono uppercase">RATING</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Materials Carousel */}
        <div className="mb-8">
          <MaterialsCarousel materials={productData.materials} />
        </div>

        {/* How to Build Storyboard */}
        <div>
          <Storyboard steps={productData.steps} />
        </div>
      </div>
    </div>
  );
}
