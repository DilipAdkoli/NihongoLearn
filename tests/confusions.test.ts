import assert from "node:assert/strict";
import test from "node:test";
import { confusedPairs } from "../src/confusions.ts";
import { kana } from "../src/learning.ts";
import type { Attempt } from "../src/storage.types.ts";

test("recognition mistakes are grouped in either direction and ranked by frequency", () => {
  const first: Attempt = {
    id: "1",
    kanaId: "kata-shi",
    mode: "recognition",
    answer: "ツ",
    correct: false,
    at: 1,
  };
  const pairs = confusedPairs(
    [
      first,
      { ...first, id: "2", kanaId: "kata-tsu", answer: "シ", at: 2 },
      { ...first, id: "3", kanaId: "kata-so", answer: "ン", at: 3 },
      { ...first, id: "4", kanaId: "grammar:desu", answer: "を" },
      { ...first, id: "5", kanaId: "kata-shi", answer: "し" },
      { ...first, id: "6", mode: "recall", answer: "ツ" },
    ],
    kana,
  );
  assert.deepEqual(
    pairs.map(({ items, count }) => [
      items.map((item) => item.glyph).join(""),
      count,
    ]),
    [
      ["シツ", 2],
      ["ンソ", 1],
    ],
  );
});
