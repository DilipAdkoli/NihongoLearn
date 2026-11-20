import type { Attempt } from "./storage.types";

export function recentActivity(attempts: readonly Attempt[], now: Date) {
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);

  const days = new Map<
    number,
    { date: Date; answered: number; correct: number }
  >();
  for (let offset = -6; offset <= 0; offset++) {
    const date = new Date(today);
    date.setDate(date.getDate() + offset);
    days.set(date.getTime(), { date, answered: 0, correct: 0 });
  }

  for (const attempt of attempts) {
    if (attempt.at > now.getTime()) continue;
    const date = new Date(attempt.at);
    date.setHours(0, 0, 0, 0);
    const day = days.get(date.getTime());
    if (!day) continue;
    day.answered++;
    if (attempt.correct) day.correct++;
  }

  return [...days.values()];
}
