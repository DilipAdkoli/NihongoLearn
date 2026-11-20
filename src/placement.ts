import { lessons, type Script } from "./learning.ts";
import type { Attempt } from "./storage.types";

export function placementSample(script: Script) {
  return lessons
    .filter((lesson) => lesson.script === script)
    .slice(0, 10)
    .map((lesson, index) => lesson.ids[index % lesson.ids.length]);
}

export function recommendedLesson(attempts: readonly Attempt[]) {
  const mistakes = new Map<string, number>();
  for (const attempt of attempts) {
    if (!attempt.correct) {
      mistakes.set(
        attempt.kanaId,
        (mistakes.get(attempt.kanaId) ?? 0) +
          (attempt.mode === "recall" ? 2 : 1),
      );
    }
  }
  let best: (typeof lessons)[number] | undefined;
  let highest = 0;
  for (const lesson of lessons) {
    const score = lesson.ids.reduce(
      (total, id) => total + (mistakes.get(id) ?? 0),
      0,
    );
    if (score > highest) {
      best = lesson;
      highest = score;
    }
  }
  return best;
}
