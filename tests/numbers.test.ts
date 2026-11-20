import assert from "node:assert/strict";
import test from "node:test";
import { japaneseNumber, numberPractice } from "../src/numbers.ts";

test("counting composes single digits, teen numbers, and larger tens", () => {
  assert.deepEqual(japaneseNumber(4), { value: 4, kanji: "四", kana: "よん" });
  assert.deepEqual(japaneseNumber(10), {
    value: 10,
    kanji: "十",
    kana: "じゅう",
  });
  assert.deepEqual(japaneseNumber(11), {
    value: 11,
    kanji: "十一",
    kana: "じゅういち",
  });
  assert.deepEqual(japaneseNumber(24), {
    value: 24,
    kanji: "二十四",
    kana: "にじゅうよん",
  });
  assert.deepEqual(japaneseNumber(90), {
    value: 90,
    kanji: "九十",
    kana: "きゅうじゅう",
  });
  assert.deepEqual(japaneseNumber(99), {
    value: 99,
    kanji: "九十九",
    kana: "きゅうじゅうきゅう",
  });
  for (const value of [0, 100_000, 2.4, NaN])
    assert.throws(() => japaneseNumber(value), RangeError);
});

test("larger numbers handle irregular readings and empty places", () => {
  for (const [value, kanji, kana] of [
    [100, "百", "ひゃく"],
    [300, "三百", "さんびゃく"],
    [600, "六百", "ろっぴゃく"],
    [800, "八百", "はっぴゃく"],
    [3_001, "三千一", "さんぜんいち"],
    [8_000, "八千", "はっせん"],
    [10_000, "一万", "いちまん"],
    [14_500, "一万四千五百", "いちまんよんせんごひゃく"],
    [
      99_999,
      "九万九千九百九十九",
      "きゅうまんきゅうせんきゅうひゃくきゅうじゅうきゅう",
    ],
  ] as const) {
    assert.deepEqual(japaneseNumber(value), { value, kanji, kana });
  }
});

test("each counting quiz offers four choices and one correct answer", () => {
  for (const question of numberPractice) {
    assert.equal(new Set(question.choices).size, 4);
    assert.ok(question.choices.includes(question.answer));
    assert.equal(japaneseNumber(Number(question.answer)).kanji, question.stem);
  }
});
