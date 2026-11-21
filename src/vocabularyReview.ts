import { reviewQueue } from "./review.ts";
import type { StudyData } from "./storage.types";

export const vocabularyRecallCourse = "vocabulary-recall";
const recallPrefix = `${vocabularyRecallCourse}:`;
const meaningPrefixes = ["vocabulary:", "vocabulary-listening:"];

export function vocabularyReviewQueue(
  data: StudyData,
  wordIds: readonly string[],
  now: number,
) {
  const seen = new Set<string>();
  for (const attempt of data.attempts) {
    if (!attempt.correct) continue;
    const prefix = meaningPrefixes.find((value) =>
      attempt.kanaId.startsWith(value),
    );
    if (prefix) seen.add(recallPrefix + attempt.kanaId.slice(prefix.length));
  }

  const recallIds = wordIds.map((id) => recallPrefix + id);
  return reviewQueue({ ...data, seen: [...seen] }, recallIds, now).map(
    ({ id, dueAt }) => ({
      id: id.slice(recallPrefix.length),
      dueAt,
    }),
  );
}
