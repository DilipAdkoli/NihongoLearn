import assert from "node:assert/strict";
import test from "node:test";
import { reviewQueue } from "../src/review.ts";
import type { Attempt } from "../src/storage.types.ts";

const time = Date.UTC(2026, 0, 1);
const recall: Attempt = {
  id: "recall",
  kanaId: "a",
  mode: "recall",
  answer: "a",
  correct: true,
  at: time,
};

test("studied kana without typed recall are ready now", () => {
  assert.deepEqual(
    reviewQueue(
      {
        seen: ["i", "removed"],
        attempts: [{ ...recall, mode: "recognition" }],
        romaji: true,
        sound: true,
      },
      ["a", "i"],
      time,
    ),
    [
      { id: "a", dueAt: time },
      { id: "i", dueAt: time },
    ],
  );
});

test("FSRS replay prioritizes a failed recall and ignores recognition scores", () => {
  const failed = {
    ...recall,
    id: "failed",
    kanaId: "i",
    answer: "u",
    correct: false,
  };
  const recognition = {
    ...recall,
    id: "recognition",
    at: time + 1,
    mode: "recognition" as const,
    correct: false,
  };
  const queue = reviewQueue(
    {
      seen: ["a", "i"],
      attempts: [recognition, failed, recall],
      romaji: true,
      sound: true,
    },
    ["a", "i"],
    time,
  );
  assert.equal(queue[0].id, "i");
  assert.ok(queue[0].dueAt < queue[1].dueAt);
  assert.ok(queue[0].dueAt > time);
  assert.deepEqual(
    queue,
    reviewQueue(
      {
        seen: ["a", "i"],
        attempts: [recall, failed],
        romaji: true,
        sound: true,
      },
      ["a", "i"],
      time,
    ),
  );
});
