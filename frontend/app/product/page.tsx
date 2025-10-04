"use client";

import Image from "next/image";
import Link from "next/link";
import ESGImpact from "@/components/ProductDetail/ESGImpact";
import ModelViewer from "@/components/ProductDetail/ModelViewer";
import MaterialsCarousel from "@/components/ProductDetail/MaterialsCarousel";
import Storyboard from "@/components/ProductDetail/Storyboard";

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
  return (
    <div className="min-h-screen bg-[#161924] font-menlo">
      {/* Header */}
      <div className="p-4 bg-[#1E2433] border-b border-[#2A3142] flex items-center gap-4">
        <Image
          src="/logo_text.svg"
          alt="Orbit"
          width={80}
          height={27}
          className="opacity-90 mr-auto"
        />
        <Link
          href="/poc"
          className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
        >
          ← Back to Chat
        </Link>
        <Link
          href="/poc/trellis"
          className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
        >
          Try Trellis 3D Generator →
        </Link>
        <Link
          href="/poc/magic-pencil"
          className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
        >
          Try Magic Pencil ✨ →
        </Link>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-8">
        {/* Product Header */}
        <div className="mb-8">
          <h1 className="text-4xl text-white mb-2">{productData.name}</h1>
          <p className="text-[#67B68B] text-base">{productData.summary}</p>
        </div>

        {/* Top Section: Model Viewer + ESG Impact */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <ModelViewer modelUrl={productData.modelUrl} />
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
