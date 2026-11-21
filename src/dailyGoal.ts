import { recentActivity } from "./activity.ts";
import type { Attempt } from "./storage.types";

export const dailyGoals = [0, 5, 10, 20] as const;
export type DailyGoal = (typeof dailyGoals)[number];

export function readDailyGoal(value: unknown): DailyGoal {
  return dailyGoals.find((goal) => goal === value) ?? 0;
}

export function dailyGoalProgress(
  attempts: readonly Attempt[],
  goal: DailyGoal,
  now: Date,
) {
  const answered = recentActivity(attempts, now).at(-1)?.answered ?? 0;
  return {
    answered,
    complete: goal > 0 && answered >= goal,
    percent: goal ? Math.min(100, (answered / goal) * 100) : 0,
  };
}
