import assert from "node:assert/strict";
import test from "node:test";
import { kanaComparisons } from "../src/kanaComparisons.ts";
import { kana, makeExercises } from "../src/learning.ts";

test("each curated comparison shows both distinct kana in recognition practice", () => {
  for (const { entries } of kanaComparisons) {
    const ids = entries.map((entry) => entry.id);
    const items = ids.map((id) => {
      const item = kana.find((entry) => entry.id === id);
      assert.ok(item);
      return item;
    });
    assert.equal(items[0].script, items[1].script);
    assert.notEqual(items[0].reading, items[1].reading);
    const quiz = makeExercises(ids, "contrast").filter(
      (question) => question.mode === "recognition",
    );
    assert.equal(quiz.length, 2);
    assert.ok(
      quiz.every((question) =>
        items.every((item) => question.choices.includes(item.glyph)),
      ),
    );
  }
});
