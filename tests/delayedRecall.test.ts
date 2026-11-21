import assert from "node:assert/strict";
import test from "node:test";
import { delayedRecall, practiceItemKeys } from "../src/delayedRecall.ts";
import type { Attempt } from "../src/storage.types.ts";

const day = 86_400_000;
const water = { id: "water", kana: "みず", spelling: "水", meaning: "water" };
const keys = practiceItemKeys(
  [{ id: "a" }, { id: "kata-a" }],
  [water],
  [water],
);
const answer = (
  kanaId: string,
  at: number,
  mode: Attempt["mode"],
  correct = true,
): Attempt => ({
  id: `${kanaId}-${at}`,
  at,
  kanaId,
  mode,
  correct,
  answer: "",
});

test("sorts saved attempts and counts the first answer after each full interval", () => {
  const attempts = [
    answer("a", 38 * day, "recall"),
    answer("a", day, "recognition", false),
    answer("a", 0, "recall"),
    answer("a", 8 * day, "listening"),
    answer("kata-a", 8 * day, "listening"),
    answer("a", 38 * day + 10, "recall"),
    answer("a", 40 * day, "recall"),
    answer("grammar:a", 0, "recognition"),
    answer("grammar:a", day, "recall"),
  ];
  const rows = delayedRecall(attempts, keys, 39 * day);
  assert.deepEqual(
    rows.map(({ recall, recognition, listening }) => [
      [recall.correct, recall.total],
      [recognition.correct, recognition.total],
      [listening.correct, listening.total],
    ]),
    [
      [
        [0, 0],
        [0, 1],
        [0, 0],
      ],
      [
        [0, 0],
        [0, 0],
        [1, 1],
      ],
      [
        [1, 1],
        [0, 0],
        [0, 0],
      ],
    ],
  );
});

test("recognizing or hearing the same word restarts its gap across courses", () => {
  const rows = delayedRecall(
    [
      answer("vocabulary-recall:water", 0, "recall"),
      answer("saved-words:みず:water", 7 * day - 1, "recognition"),
      answer("saved-word-recall:みず:water", 7 * day, "recall"),
      answer("vocabulary-listening:water", 7 * day + 100, "listening"),
      answer("vocabulary:water", 8 * day, "recognition"),
      answer("vocabulary-recall:water", 38 * day - 1, "recall", false),
    ],
    keys,
    40 * day,
  );
  assert.deepEqual(rows[0].recognition, { total: 1, correct: 1 });
  assert.deepEqual(rows[0].recall, { total: 0, correct: 0 });
  assert.deepEqual(rows[1].recall, { total: 1, correct: 0 });
  assert.deepEqual(rows[2].recall, { total: 0, correct: 0 });
});
