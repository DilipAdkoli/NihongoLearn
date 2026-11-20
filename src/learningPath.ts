import type { Href } from "expo-router";
import type { StudyData } from "./storage.types";

export type LearningStep = {
  id: string;
  title: string;
  detail: string;
} & ({ seen: readonly string[] } | { href: Href; answers: readonly string[] });

export type PathStudy = Pick<StudyData, "seen" | "attempts">;

export function completeSteps(steps: readonly LearningStep[], data: PathStudy) {
  const seen = new Set(data.seen);
  const correct = new Set(
    data.attempts
      .filter((attempt) => attempt.correct)
      .map((attempt) => attempt.kanaId),
  );
  return steps.map((step) => ({
    ...step,
    complete:
      "seen" in step
        ? step.seen.every((id) => seen.has(id))
        : step.answers.every((id) => correct.has(id)),
  }));
}
