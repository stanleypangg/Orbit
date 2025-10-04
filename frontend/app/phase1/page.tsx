"use client";

import { useState } from "react";
import { Phase1Chat } from "@/components/Phase1Chat";
import { Idea, Ingredient } from "@/lib/chat/types";

/**
 * Phase 1 Demo Page
 * Demonstrates material extraction and idea generation workflow
 */
export default function Phase1Page() {
  const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  const handleIdeaSelect = (idea: Idea, extractedIngredients: Ingredient[]) => {
    setSelectedIdea(idea);
    setIngredients(extractedIngredients);
    console.log("Idea selected:", idea);
    console.log("Ingredients:", extractedIngredients);
    // TODO: Proceed to Phase 2
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white font-menlo">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Phase 1: Material Analysis
          </h1>
          <p className="text-lg text-gray-600">
            Describe your recyclable materials and get creative project ideas
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Chat Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg h-[600px]">
                <Phase1Chat onIdeaSelect={handleIdeaSelect} />
              </div>
            </div>

            {/* Info Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  How It Works
                </h2>
                <ol className="space-y-4 text-sm text-gray-700">
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      1
                    </span>
                    <div>
                      <strong>Describe Materials</strong>
                      <p className="text-gray-600 mt-1">
                        Tell us what recyclable items you have (e.g., bottles,
                        cans, cardboard)
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      2
                    </span>
                    <div>
                      <strong>Review Extraction</strong>
                      <p className="text-gray-600 mt-1">
                        See the materials we identified and their properties
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      3
                    </span>
                    <div>
                      <strong>Choose an Idea</strong>
                      <p className="text-gray-600 mt-1">
                        Select from creative upcycling project suggestions
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      4
                    </span>
                    <div>
                      <strong>Proceed to Visualization</strong>
                      <p className="text-gray-600 mt-1">
                        Move to Phase 2 to generate images of your project
                      </p>
                    </div>
                  </li>
                </ol>

                {selectedIdea && (
                  <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h3 className="font-semibold text-green-900 mb-2">
                      Selected Idea
                    </h3>
                    <p className="text-sm text-green-800 font-medium">
                      {selectedIdea.title}
                    </p>
                    <p className="text-xs text-green-700 mt-1">
                      {selectedIdea.one_liner}
                    </p>
                    <button className="mt-3 w-full px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                      Continue to Phase 2 →
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Example Section */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Example Inputs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ExampleCard
                title="Simple Example"
                description="I have 3 empty plastic water bottles and 5 aluminum soda cans."
              />
              <ExampleCard
                title="Detailed Example"
                description="I have a large cardboard box, some old fabric scraps, 10 bottle caps, and a broken wooden picture frame."
              />
              <ExampleCard
                title="Mixed Materials"
                description="Empty glass jars (3 medium-sized), plastic bags, newspaper, and some twine."
              />
              <ExampleCard
                title="With Goal"
                description="I want to make something decorative for my garden using old tin cans and wine bottles."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ExampleCardProps {
  title: string;
  description: string;
}

function ExampleCard({ title, description }: ExampleCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <h3 className="font-semibold text-gray-900 text-sm mb-2">{title}</h3>
      <p className="text-sm text-gray-600 italic">&quot;{description}&quot;</p>
    </div>
  );
}
