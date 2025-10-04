"use client";

import { useState } from "react";
import {
  RequirementsResponse,
  IdeationDraftsResponse,
  SelectionResponse,
  ProjectContext,
  Ingredient,
} from "@/lib/chat/types";

const API_BASE = "http://localhost:8000";

export default function PhaseWorkflowDemo() {
  // State management
  const [userInput, setUserInput] = useState("");
  const [projectContext, setProjectContext] = useState<ProjectContext>({
    assumptions: [],
    clarifications: {},
    confidence: 0,
    chosen_idea: null,
  });
  const [clarifyCycles, setClarifyCycles] = useState(0);
  const [phase, setPhase] = useState<"requirements" | "ideation" | "selected">("requirements");
  
  // Phase data
  const [requirementsData, setRequirementsData] = useState<RequirementsResponse | null>(null);
  const [ideationData, setIdeationData] = useState<IdeationDraftsResponse | null>(null);
  const [selectionData, setSelectionData] = useState<SelectionResponse | null>(null);
  
  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [clarificationAnswers, setClarificationAnswers] = useState<{ [key: string]: string }>({});

  // Handler: Requirements Loop
  const handleRequirementsSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/api/chat/requirements`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: userInput,
          clarifications: clarificationAnswers,
          project_context: projectContext,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${await response.text()}`);
      }

      const data: RequirementsResponse = await response.json();
      setRequirementsData(data);

      // Update project context with new data
      if (data.assumptions && data.assumptions.length > 0) {
        setProjectContext((prev) => ({
          ...prev,
          assumptions: [...prev.assumptions, ...(data.assumptions || [])],
        }));
      }

      // Handle clarification loop
      if (data.needs_clarification && data.clarifying_questions) {
        setClarifyCycles((prev) => prev + 1);
        
        if (clarifyCycles >= 3) {
          // Escape hatch: best-effort assumptions
          alert("Max clarification cycles reached. Proceeding with best-effort assumptions.");
          setPhase("ideation");
        } else {
          // Stay in requirements phase, show questions
          setClarificationAnswers({});
        }
      } else {
        // Requirements complete, move to ideation
        setProjectContext((prev) => ({
          ...prev,
          confidence: data.confidence,
        }));
        setPhase("ideation");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handler: Generate Ideation Drafts
  const handleIdeationDrafts = async () => {
    if (!requirementsData) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/api/chat/ideation-drafts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ingredients: requirementsData.ingredients,
          assumptions: projectContext.assumptions,
          confidence: projectContext.confidence,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${await response.text()}`);
      }

      const data: IdeationDraftsResponse = await response.json();
      setIdeationData(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handler: Select Idea
  const handleSelectIdea = async (ideaId: string) => {
    const selectedDraft = ideationData?.drafts.find((d) => d.id === ideaId);
    if (!selectedDraft || !requirementsData) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/api/chat/select-idea`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idea_id: selectedDraft.id,
          idea_name: selectedDraft.name,
          one_liner: selectedDraft.one_liner,
          ingredients: requirementsData.ingredients,
          assumptions: projectContext.assumptions,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${await response.text()}`);
      }

      const data: SelectionResponse = await response.json();
      setSelectionData(data);
      setProjectContext((prev) => ({
        ...prev,
        chosen_idea: data.context_summary,
      }));
      setPhase("selected");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Phase Workflow Demo
          </h1>
          <p className="text-gray-600">
            Test the Requirements Loop → Ideation Drafts → Selection flow
          </p>
          <div className="mt-4 flex gap-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${phase === "requirements" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"}`}>
              Requirements
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${phase === "ideation" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"}`}>
              Ideation
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${phase === "selected" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"}`}>
              Selected
            </span>
          </div>
        </header>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-lg text-red-700">
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* PHASE 1: Requirements Loop */}
        {phase === "requirements" && (
          <section className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Phase 1: Requirements Loop
            </h2>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Describe your materials:
              </label>
              <textarea
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={4}
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="e.g., I have 3 plastic bottles and 5 aluminum cans"
                disabled={loading}
              />
            </div>

            {requirementsData?.clarifying_questions && requirementsData.clarifying_questions.length > 0 && (
              <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-3">
                  Please answer these questions:
                </h3>
                {requirementsData.clarifying_questions.map((q, idx) => (
                  <div key={idx} className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {q}
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      value={clarificationAnswers[q] || ""}
                      onChange={(e) =>
                        setClarificationAnswers((prev) => ({
                          ...prev,
                          [q]: e.target.value,
                        }))
                      }
                    />
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={handleRequirementsSubmit}
              disabled={loading || !userInput}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
            >
              {loading ? "Processing..." : requirementsData?.clarifying_questions ? "Submit Answers" : "Extract Requirements"}
            </button>

            {requirementsData && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Results:</h3>
                <div className="mb-2">
                  <span className="text-sm text-gray-600">Confidence: </span>
                  <span className="font-medium">{(requirementsData.confidence * 100).toFixed(0)}%</span>
                </div>
                <div className="mb-2">
                  <span className="text-sm text-gray-600">Ingredients: </span>
                  <span className="font-medium">{requirementsData.ingredients.length}</span>
                </div>
                {requirementsData.assumptions && requirementsData.assumptions.length > 0 && (
                  <div className="mt-2">
                    <span className="text-sm text-gray-600">Assumptions:</span>
                    <ul className="list-disc list-inside text-sm text-gray-700 mt-1">
                      {requirementsData.assumptions.map((a, idx) => (
                        <li key={idx}>{a}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </section>
        )}

        {/* PHASE 2: Ideation Drafts */}
        {phase === "ideation" && (
          <section className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Phase 2: Ideation Drafts
            </h2>

            {!ideationData && (
              <button
                onClick={handleIdeationDrafts}
                disabled={loading}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 disabled:bg-gray-300 transition"
              >
                {loading ? "Generating Ideas..." : "Generate 3 Ideas"}
              </button>
            )}

            {ideationData && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {ideationData.drafts.map((draft) => (
                  <div key={draft.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition">
                    {draft.draft_image && (
                      <div className="mb-3">
                        <img
                          src={draft.draft_image.url}
                          alt={draft.name}
                          className="w-full h-48 object-cover rounded-md"
                        />
                      </div>
                    )}
                    <h3 className="font-bold text-lg text-gray-800 mb-2">{draft.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{draft.one_liner}</p>
                    {draft.assumptions && draft.assumptions.length > 0 && (
                      <div className="text-xs text-gray-500 mb-3">
                        <span className="font-medium">Assumptions:</span>
                        <ul className="list-disc list-inside">
                          {draft.assumptions.map((a, idx) => (
                            <li key={idx}>{a}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <button
                      onClick={() => handleSelectIdea(draft.id)}
                      disabled={loading}
                      className="w-full bg-purple-600 text-white py-2 rounded-md font-medium hover:bg-purple-700 disabled:bg-gray-300 transition"
                    >
                      {loading ? "Selecting..." : "Choose This Idea"}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* PHASE 3: Selection Result */}
        {phase === "selected" && selectionData && (
          <section className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Phase 3: Selected Idea
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-xl text-gray-800 mb-2">
                  {selectionData.context_summary.name}
                </h3>
                <p className="text-gray-600 mb-2">
                  {selectionData.context_summary.short_scope}
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  {selectionData.context_summary.end_product_description}
                </p>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-sm text-gray-700 mb-2">
                    Imaging Brief:
                  </h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div><span className="font-medium">Camera:</span> {selectionData.brief.camera.view}</div>
                    {selectionData.brief.lighting && (
                      <div><span className="font-medium">Lighting:</span> {selectionData.brief.lighting}</div>
                    )}
                    {selectionData.brief.background && (
                      <div><span className="font-medium">Background:</span> {selectionData.brief.background}</div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <img
                  src={selectionData.refined_image_url}
                  alt="Refined concept"
                  className="w-full rounded-lg shadow-md"
                />
              </div>
            </div>

            <button
              onClick={() => {
                setPhase("requirements");
                setRequirementsData(null);
                setIdeationData(null);
                setSelectionData(null);
                setUserInput("");
                setClarifyCycles(0);
                setProjectContext({
                  assumptions: [],
                  clarifications: {},
                  confidence: 0,
                  chosen_idea: null,
                });
              }}
              className="mt-6 w-full bg-gray-600 text-white py-3 rounded-lg font-medium hover:bg-gray-700 transition"
            >
              Start New Project
            </button>
          </section>
        )}

        {/* Project Context Display */}
        <section className="bg-white rounded-lg shadow-lg p-6 mt-6">
          <h3 className="text-lg font-bold text-gray-800 mb-3">
            Project Context (Debug)
          </h3>
          <pre className="text-xs bg-gray-100 p-4 rounded-md overflow-auto">
            {JSON.stringify(projectContext, null, 2)}
          </pre>
        </section>
      </div>
    </div>
  );
}

