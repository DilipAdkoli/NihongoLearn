import assert from "node:assert/strict";
import test from "node:test";
import { datePractice, japaneseDate } from "../src/calendar.ts";

test("calendar dates use month and day exceptions", () => {
  assert.deepEqual(japaneseDate(4, 1), {
    japanese: "4月1日",
    kana: "しがつ ついたち",
    english: "April 1",
  });
  assert.equal(japaneseDate(7, 4).kana, "しちがつ よっか");
  assert.equal(japaneseDate(9, 20).kana, "くがつ はつか");
  assert.equal(japaneseDate(12, 24).kana, "じゅうにがつ にじゅうよっか");
  assert.equal(japaneseDate(2, 29).kana, "にがつ にじゅうくにち");
  assert.equal(japaneseDate(6, 11).kana, "ろくがつ じゅういちにち");
  for (const [month, day] of [
    [0, 1],
    [2, 30],
    [4, 31],
    [1, 0],
    [1, 1.4],
  ]) {
    assert.throws(() => japaneseDate(month, day), RangeError);
  }
});

test("calendar questions contain four distinct dates and one answer each", () => {
  for (const question of datePractice) {
    assert.equal(new Set(question.choices).size, 4);
    assert.equal(
      question.choices.filter((choice) => choice === question.answer).length,
      1,
    );
  }
});
