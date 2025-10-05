import { useState, useEffect, useCallback } from "react";

interface StepImage {
  step_number: number;
  image_id?: string;
  image_url?: string;
  status: "pending" | "generating" | "completed" | "failed";
  generated_at?: number;
}

interface StepImagesProgress {
  status:
    | "not_started"
    | "generating"
    | "completed"
    | "completed_with_errors"
    | "failed";
  total_steps: number;
  completed_steps: number;
  failed_steps: number;
  progress: number;
  step_images: StepImage[];
  started_at?: number;
  completed_at?: number;
  error?: string;
}

interface UseStepImagesOptions {
  threadId: string | null;
  apiUrl?: string;
  pollInterval?: number; // milliseconds
  enabled?: boolean;
}

export function useStepImages({
  threadId,
  apiUrl = "http://localhost:8000",
  pollInterval = 2000, // Poll every 2 seconds
  enabled = true,
}: UseStepImagesOptions) {
  const [progress, setProgress] = useState<StepImagesProgress | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProgress = useCallback(async () => {
    if (!threadId || !enabled) return;

    try {
      const response = await fetch(`${apiUrl}/step-images/${threadId}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch step images: ${response.status}`);
      }

      const data: StepImagesProgress = await response.json();
      setProgress(data);
      setError(null);

      // Stop polling if completed or failed
      if (
        data.status === "completed" ||
        data.status === "completed_with_errors" ||
        data.status === "failed"
      ) {
        setIsLoading(false);
        return true; // Signal to stop polling
      }

      return false; // Continue polling
    } catch (err) {
      console.error("Error fetching step images progress:", err);
      setError(err instanceof Error ? err.message : "Unknown error");
      return false;
    }
  }, [threadId, apiUrl, enabled]);

  useEffect(() => {
    if (!threadId || !enabled) {
      setProgress(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    // Initial fetch
    fetchProgress();

    // Set up polling
    const intervalId = setInterval(async () => {
      const shouldStop = await fetchProgress();
      if (shouldStop) {
        clearInterval(intervalId);
      }
    }, pollInterval);

    return () => {
      clearInterval(intervalId);
    };
  }, [threadId, enabled, pollInterval, fetchProgress]);

  return {
    progress,
    isLoading,
    error,
    refetch: fetchProgress,
  };
}
