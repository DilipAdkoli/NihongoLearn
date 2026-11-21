import assert from "node:assert/strict";
import test from "node:test";
import { counterPractice, japaneseCount } from "../src/counters.ts";

test("counters use context-specific readings and the native reading for ten things", () => {
  assert.deepEqual(japaneseCount(1, "general"), {
    written: "一つ",
    reading: "ひとつ",
  });
  assert.deepEqual(japaneseCount(10, "general"), {
    written: "十",
    reading: "とお",
  });
  assert.deepEqual(japaneseCount(2, "flat"), {
    written: "二枚",
    reading: "にまい",
  });
  assert.equal(japaneseCount(2, "people").reading, "ふたり");
  assert.equal(japaneseCount(4, "people").reading, "よにん");
  assert.equal(japaneseCount(8, "people").reading, "はちにん");
  assert.deepEqual(japaneseCount(1, "long"), {
    written: "一本",
    reading: "いっぽん",
  });
  assert.equal(japaneseCount(2, "long").reading, "にほん");
  assert.equal(japaneseCount(3, "long").reading, "さんぼん");
  assert.equal(japaneseCount(8, "long").reading, "はっぽん");
  assert.deepEqual(japaneseCount(3, "animals"), {
    written: "三匹",
    reading: "さんびき",
  });
  assert.equal(japaneseCount(6, "animals").reading, "ろっぴき");
  assert.equal(japaneseCount(10, "animals").reading, "じゅっぴき");
  assert.throws(() => japaneseCount(11, "people"), RangeError);
});

test("counter exercises offer four distinct choices and one answer", () => {
  for (const exercise of counterPractice) {
    assert.equal(new Set(exercise.choices).size, 4);
    assert.equal(
      exercise.choices.filter((choice) => choice === exercise.answer).length,
      1,
    );
  }
});
