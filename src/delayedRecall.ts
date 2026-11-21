import { glossaryKey, type GlossaryEntry } from "./glossary.ts";
import type { Attempt } from "./storage.types";

const day = 24 * 60 * 60 * 1000;
const intervals = ["1–6 days", "7–29 days", "30 days or more"];

export function practiceItemKeys(
  characters: readonly { id: string }[],
  words: readonly (GlossaryEntry & { id: string })[],
  glossary: readonly GlossaryEntry[],
) {
  const keys = new Map(characters.map(({ id }) => [id, id]));
  for (const word of words) {
    const key = glossaryKey(word);
    for (const course of [
      "vocabulary",
      "vocabulary-recall",
      "vocabulary-listening",
    ]) {
      keys.set(`${course}:${word.id}`, key);
    }
  }
  for (const entry of glossary) {
    const key = glossaryKey(entry);
    keys.set(`saved-words:${key}`, key);
    keys.set(`saved-word-recall:${key}`, key);
  }
  return keys;
}

export function delayedRecall(
  attempts: readonly Attempt[],
  itemKeys: ReadonlyMap<string, string>,
  now: number,
) {
  const results = intervals.map((label) => ({
    label,
    recall: { correct: 0, total: 0 },
    recognition: { correct: 0, total: 0 },
    listening: { correct: 0, total: 0 },
  }));
  const lastAnswer = new Map<string, number>();
  const history = attempts
    .filter((attempt) => attempt.at <= now && itemKeys.has(attempt.kanaId))
    .sort((a, b) => a.at - b.at || a.id.localeCompare(b.id));
  for (const attempt of history) {
    const key = itemKeys.get(attempt.kanaId)!;
    const previous = lastAnswer.get(key);
    lastAnswer.set(key, attempt.at);
    if (previous === undefined) continue;
    const gap = (attempt.at - previous) / day;
    if (gap < 1) continue;
    const interval = gap >= 30 ? 2 : gap >= 7 ? 1 : 0;
    const score = results[interval][attempt.mode];
    score.total++;
    if (attempt.correct) score.correct++;
  }
  return results;
}
