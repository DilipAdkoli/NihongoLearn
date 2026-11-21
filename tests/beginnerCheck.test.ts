import assert from "node:assert/strict";
import test from "node:test";
import { beginnerCheckProgress } from "../src/beginnerCheck.ts";
import type { Attempt } from "../src/storage.types.ts";

test("the beginner check counts only the latest answer to each known question", () => {
  const attempt = (kanaId: string, at: number, correct: boolean): Attempt => ({
    id: String(at),
    kanaId,
    at,
    correct,
    mode: "recognition",
    answer: "sample",
  });
  const summary = beginnerCheckProgress([
    attempt("beginner-check:sign-entrance", 5, true),
    attempt("beginner-check:sign-entrance", 1, false),
    attempt("beginner-check:verb-negative", 3, false),
    attempt("beginner-check:drinking-water", 2, true),
    attempt("beginner-check:writing-water-permission", 8, false),
    attempt("beginner-check:writing-water-permission", 4, true),
    attempt("beginner-check:unknown", 6, true),
    attempt("grammar:topic-wa", 7, true),
  ]);
  assert.deepEqual(
    summary.map(({ title, total, answered, correct }) => [
      title,
      total,
      answered,
      correct,
    ]),
    [
      ["Vocabulary", 2, 1, 1],
      ["Grammar", 2, 1, 0],
      ["Reading", 2, 0, 0],
      ["Listening", 2, 1, 1],
      ["Writing", 2, 1, 0],
    ],
  );
});
