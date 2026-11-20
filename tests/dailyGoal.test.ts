import assert from "node:assert/strict";
import test from "node:test";
import { dailyGoalProgress, readDailyGoal } from "../src/dailyGoal.ts";
import type { Attempt } from "../src/storage.types.ts";

test("daily goals count all answers on the current local date and cap the progress bar", () => {
  const now = new Date(2026, 10, 20, 14);
  const attempt = (id: number, date: Date, correct: boolean): Attempt => ({
    id: String(id),
    at: date.getTime(),
    correct,
    mode: "recognition",
    answer: "a",
    kanaId: "a",
  });
  const attempts = [
    attempt(-1, new Date(2026, 10, 19, 23, 59), true),
    ...Array.from({ length: 6 }, (_, i) =>
      attempt(i, new Date(2026, 10, 20, i), i % 2 === 0),
    ),
    attempt(7, new Date(2026, 10, 20, 23), true),
  ];
  assert.deepEqual(dailyGoalProgress(attempts, 5, now), {
    answered: 6,
    complete: true,
    percent: 100,
  });
  assert.deepEqual(dailyGoalProgress(attempts, 10, now), {
    answered: 6,
    complete: false,
    percent: 60,
  });
  assert.equal(dailyGoalProgress(attempts, 0, now).complete, false);
  assert.equal(readDailyGoal(20), 20);
  assert.equal(readDailyGoal("20"), 0);
  assert.equal(readDailyGoal(42), 0);
});
