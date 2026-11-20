import assert from "node:assert/strict";
import test from "node:test";
import { recentActivity } from "../src/activity.ts";
import type { Attempt } from "../src/storage.types.ts";

test("recent activity counts local dates across a month and ignores future and older answers", () => {
  const now = new Date(2026, 1, 2, 12);
  const create = (id: string, date: Date, correct = true): Attempt => ({
    id,
    kanaId: "a",
    mode: "recall",
    answer: "a",
    correct,
    at: date.getTime(),
  });
  const attempts = [
    create("before", new Date(2026, 0, 26, 23, 59)),
    create("start", new Date(2026, 0, 27, 0)),
    create("today", new Date(2026, 1, 2, 0)),
    create("wrong", new Date(2026, 1, 2, 11), false),
    create("future", new Date(2026, 1, 2, 13)),
  ];
  const data = recentActivity(attempts, now);
  assert.deepEqual(
    data.map((day) => day.date.getDate()),
    [27, 28, 29, 30, 31, 1, 2],
  );
  assert.deepEqual(
    data.map((day) => [day.answered, day.correct]),
    [
      [1, 1],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [2, 1],
    ],
  );
});
