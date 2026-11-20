import assert from "node:assert/strict";
import test from "node:test";
import {
  adjectives,
  grammar,
  particles,
  teForm,
  verbs,
} from "../src/grammar.ts";

test("grammar lessons have stable IDs and a single selectable answer each", () => {
  const lessons = [
    ...grammar,
    ...particles,
    ...verbs,
    ...adjectives,
    ...teForm,
  ];
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

test("adjective exercises teach both noun modifiers and both negative patterns", () => {
  assert.deepEqual(
    adjectives.map((lesson) => lesson.answer),
    ["おいしい", "しずかな", "あつくないです", "きれいでは ありません"],
  );
});

test("て-form practice includes ichidan, godan, and irregular responses", () => {
  assert.deepEqual(
    teForm.map((lesson) => lesson.answer),
    ["みて", "かって", "のんで", "いって", "して"],
  );
});
