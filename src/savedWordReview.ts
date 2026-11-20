import { glossaryKey, type GlossaryEntry } from "./glossary.ts";
import { reviewQueue } from "./review.ts";
import type { StudyData } from "./storage.types";

export const savedRecallCourse = "saved-word-recall";

export function savedWordRecallQueue(
  data: StudyData,
  entries: readonly GlossaryEntry[],
  now: number,
) {
  const saved = new Set(data.savedWords);
  const byId = new Map<string, GlossaryEntry>();
  for (const entry of entries) {
    const key = glossaryKey(entry);
    if (saved.has(key)) byId.set(`${savedRecallCourse}:${key}`, entry);
  }
  const ids = [...byId.keys()];
  if (!ids.length) return [];
  return reviewQueue({ ...data, seen: ids }, ids, now).map(({ id, dueAt }) => ({
    entry: byId.get(id)!,
    dueAt,
  }));
}
