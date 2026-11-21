import { createEmptyCard, fsrs, Rating, type Card } from "ts-fsrs";
import type { StudyData } from "./storage.types";

const scheduler = fsrs({ enable_fuzz: false });

export function reviewQueue(
  data: StudyData,
  knownIds: readonly string[],
  now: number,
) {
  const known = new Set(knownIds);
  const cards = new Map<string, Card>();
  const studied = new Set(data.seen.filter((id) => known.has(id)));
  const history = data.attempts
    .filter((attempt) => known.has(attempt.kanaId))
    .sort((a, b) => a.at - b.at || a.id.localeCompare(b.id));
  for (const attempt of history) {
    studied.add(attempt.kanaId);
    if (attempt.mode !== "recall") continue;
    const time = new Date(attempt.at);
    const card = cards.get(attempt.kanaId) ?? createEmptyCard(time);
    const rating = attempt.correct ? Rating.Good : Rating.Again;
    cards.set(attempt.kanaId, scheduler.next(card, time, rating).card);
  }

  return [...studied]
    .map((id) => ({
      id,
      dueAt: cards.get(id)?.due.getTime() ?? now,
    }))
    .sort(
      (a, b) =>
        a.dueAt - b.dueAt || knownIds.indexOf(a.id) - knownIds.indexOf(b.id),
    );
}
