import assert from "node:assert/strict";
import test from "node:test";
import { starterPath } from "../src/starterPath.ts";
import type { Attempt } from "../src/storage.types.ts";

test("the starter path uses known kana and distinct correct answers", () => {
  const answer = (id: string, kanaId: string, correct = true): Attempt => ({
    id,
    kanaId,
    correct,
    at: 1,
    mode: "recognition",
    answer: "a",
  });
  const seen = ["a", "e", "i", "o", "u"];
  const partial = [
    answer("1", "grammar:desu"),
    answer("2", "grammar:desu"),
    answer("3", "grammar:topic-wa"),
    answer("4", "grammar:question-ka", false),
  ];
  assert.deepEqual(
    starterPath({ seen: [], attempts: [] }).map((step) => step.complete),
    Array(6).fill(false),
  );
  assert.deepEqual(
    starterPath({ seen, attempts: partial })
      .filter((step) => step.complete)
      .map((step) => step.id),
    ["vowels"],
  );
  assert.deepEqual(
    starterPath({
      seen,
      attempts: [...partial, answer("5", "grammar:question-ka")],
    })
      .filter((step) => step.complete)
      .map((step) => step.id),
    ["vowels", "sentences"],
  );
});
