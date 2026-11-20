import assert from "node:assert/strict";
import test from "node:test";
import { comparisons } from "../src/comparisons.ts";
import { existence } from "../src/existence.ts";
import {
  adjectives,
  demonstratives,
  grammar,
  particles,
  teForm,
  verbs,
} from "../src/grammar.ts";
import { questionWords } from "../src/questions.ts";

test("grammar lessons have stable IDs and a single selectable answer each", () => {
  const lessons = [
    ...grammar,
    ...demonstratives,
    ...questionWords,
    ...existence,
    ...particles,
    ...verbs,
    ...adjectives,
    ...comparisons,
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

test("demonstrative questions distinguish standalone words, noun modifiers, and places", () => {
  assert.deepEqual(
    demonstratives.map((lesson) => lesson.answer),
    ["これ", "その", "どの", "あそこ", "どこ"],
  );
});

test("existence practice distinguishes objects and animals and teaches location particles", () => {
  assert.deepEqual(
    existence.map((lesson) => lesson.answer),
    ["あります", "います", "に", "が", "の"],
  );
});

test("everyday questions cover time, people, things, prices, and methods", () => {
  assert.deepEqual(
    questionWords.map((lesson) => lesson.answer),
    ["いつ", "だれ", "なん", "いくら", "どうやって"],
  );
});

test("comparison questions cover より, ほうが, どちら, and いちばん", () => {
  assert.deepEqual(
    comparisons.map((lesson) => lesson.answer),
    ["より", "ほうが", "どちら", "いちばん"],
  );
});
