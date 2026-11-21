import assert from "node:assert/strict";
import test from "node:test";
import { japaneseTime, timePractice } from "../src/time.ts";

test("clock readings use the correct exceptions and minute sound changes", () => {
  assert.deepEqual(japaneseTime(4, 0), {
    kana: "よじ",
    japanese: "4時",
    clock: "4:00",
  });
  assert.equal(japaneseTime(7, 15).kana, "しちじじゅうごふん");
  assert.equal(japaneseTime(9, 6).kana, "くじろっぷん");
  assert.equal(japaneseTime(10, 8).kana, "じゅうじはっぷん");
  assert.equal(japaneseTime(12, 30).kana, "じゅうにじさんじゅっぷん");
  assert.equal(japaneseTime(1, 21).kana, "いちじにじゅういっぷん");
  for (const [hours, minutes] of [
    [0, 1],
    [13, 0],
    [12, 60],
    [1.5, 0],
    [9, -1],
  ]) {
    assert.throws(() => japaneseTime(hours, minutes), RangeError);
  }
});

test("time exercises offer four distinct options with one answer", () => {
  for (const exercise of timePractice) {
    assert.equal(new Set(exercise.choices).size, 4);
    assert.equal(
      exercise.choices.filter((answer) => answer === exercise.answer).length,
      1,
    );
  }
});
