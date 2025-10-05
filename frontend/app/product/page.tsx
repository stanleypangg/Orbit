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
      setImageUrl(storedImage);
      // Don't remove productImage yet - we'll use it as a key for model caching
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
        setModelUrl(cachedModelUrl);
        return;
      }

      // Reset model URL to prevent showing old model
      setModelUrl(undefined);
      setIsGenerating(true);
      setError(null);

      try {
        // Convert local image path to full URL or data URL
        let processedImageUrl = imageUrl;

        // If it's a local path (starts with /), convert to data URL
        if (imageUrl.startsWith("/") && !imageUrl.startsWith("http")) {
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

        {/* Top Section: Model Viewer + ESG Impact */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <ModelViewer
            modelUrl={modelUrl}
            isLoading={isGenerating}
            error={error}
          />
          <ESGImpact {...productData.esgData} />
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
