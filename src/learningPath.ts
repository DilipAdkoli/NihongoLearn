import type { Href } from "expo-router";
import type { Attempt, StudyData } from "./storage.types";

export type LearningStep = {
  id: string;
  title: string;
  detail: string;
  mastery?: {
    href: Href;
    answers: readonly string[];
    modes: readonly Attempt["mode"][];
  };
} & ({ seen: readonly string[] } | { href: Href; answers: readonly string[] });

export type PathStudy = Pick<StudyData, "seen" | "attempts">;

export function completeSteps(steps: readonly LearningStep[], data: PathStudy) {
  const seen = new Set(data.seen);
  const latestById = new Map<string, Attempt>();
  const latest = new Map<string, Attempt>();
  for (const attempt of [...data.attempts].sort(
    (a, b) => a.at - b.at || a.id.localeCompare(b.id),
  )) {
    latestById.set(attempt.kanaId, attempt);
    latest.set(`${attempt.kanaId}:${attempt.mode}`, attempt);
  }
  return steps.map((step) => ({
    ...step,
    complete:
      "seen" in step
        ? step.seen.every((id) => seen.has(id)) &&
          (step.mastery
            ? step.mastery.answers.every((id) =>
                step.mastery?.modes.every(
                  (mode) => latest.get(`${id}:${mode}`)?.correct,
                ),
              )
            : true)
        : step.answers.every((id) => latestById.get(id)?.correct),
  }));
}
