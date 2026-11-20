import assert from "node:assert/strict";
import test from "node:test";
import { kana, lessons } from "../src/learning.ts";
import { placementSample, recommendedLesson } from "../src/placement.ts";
import type { Attempt } from "../src/storage.types.ts";

test("each placement sample uses one character from every basic row in one script", () => {
  for (const script of ["hiragana", "katakana"] as const) {
    const ids = placementSample(script);
    assert.equal(ids.length, 10);
    assert.equal(new Set(ids).size, 10);
    assert.ok(
      ids.every((id) => kana.find((item) => item.id === id)?.script === script),
    );
    const basic = lessons
      .filter((lesson) => lesson.script === script)
      .slice(0, 10);
    assert.ok(
      basic.every(
        (lesson) => ids.filter((id) => lesson.ids.includes(id)).length === 1,
      ),
    );
  }
});

test("the placement recommendation prefers the row with a failed recall", () => {
  const base: Attempt = {
    id: "first",
    kanaId: "ka",
    mode: "recognition",
    answer: "き",
    correct: false,
    at: 1,
  };
  const recall: Attempt = {
    ...base,
    id: "second",
    kanaId: "sa",
    mode: "recall",
    answer: "so",
  };
  assert.equal(recommendedLesson([base, recall])?.title, "The S row");
  assert.equal(recommendedLesson([{ ...base, correct: true }]), undefined);
});
