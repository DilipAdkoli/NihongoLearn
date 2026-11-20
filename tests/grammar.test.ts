import assert from "node:assert/strict";
import test from "node:test";
import { grammar, particles, verbs } from "../src/grammar.ts";

test("grammar lessons have stable IDs and a single selectable answer each", () => {
  const lessons = [...grammar, ...particles, ...verbs];
  assert.equal(
    new Set(lessons.map((lesson) => lesson.id)).size,
    lessons.length,
  );
  for (const lesson of lessons) {
    assert.equal(lesson.stem.split("＿＿").length, 2, lesson.id);
    assert.equal(new Set(lesson.choices).size, lesson.choices.length);
    assert.equal(
      lesson.choices.filter((choice) => choice === lesson.answer).length,
      1,
    );
  }
});

test("polite verb practice covers non-past and past in both polarities", () => {
  assert.deepEqual(
    verbs.map((lesson) => lesson.answer),
    ["よみます", "のみません", "たべました", "いきませんでした"],
  );
});
