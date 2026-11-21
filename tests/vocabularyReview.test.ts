import assert from "node:assert/strict";
import test from "node:test";
import type { Attempt, StudyData } from "../src/storage.types.ts";
import { vocabularyReviewQueue } from "../src/vocabularyReview.ts";

test("everyday word recall uses recognition and listening to start scheduled review", () => {
  const at = Date.parse("2026-01-01T12:00:00Z");
  const now = at + 1000;
  const attempt = (
    kanaId: string,
    mode: Attempt["mode"],
    correct = true,
  ): Attempt => ({
    id: kanaId,
    kanaId,
    mode,
    correct,
    answer: "sample",
    at,
  });
  const data: StudyData = {
    seen: ["a"],
    savedWords: [],
    attempts: [
      attempt("vocabulary:book", "recognition"),
      attempt("vocabulary-listening:family", "listening"),
      attempt("vocabulary:tea:unknown", "recognition"),
      attempt("vocabulary:bread", "recognition", false),
      attempt("vocabulary-recall:water", "recall"),
    ],
    dailyGoal: 0,
    overviewPath: 0,
    japaneseTextSize: 0,
    darkMode: false,
    sound: true,
    romaji: true,
  };
  const queue = vocabularyReviewQueue(
    data,
    ["book", "family", "water", "bread", "tea"],
    now,
  );
  assert.deepEqual(
    queue.map(({ id }) => id),
    ["book", "family", "water"],
  );
  assert.deepEqual(
    queue.slice(0, 2).map(({ dueAt }) => dueAt),
    [now, now],
  );
  assert.ok(queue[2].dueAt > now);
});
