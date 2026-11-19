import assert from "node:assert/strict";
import test from "node:test";
import { evaluateAnswer, kana, makeExercises } from "../src/learning.ts";

test("the lesson has all five vowel readings and examples readable with those kana", () => {
  assert.deepEqual(
    kana.map((item) => [item.glyph, item.reading]),
    [
      ["あ", "a"],
      ["い", "i"],
      ["う", "u"],
      ["え", "e"],
      ["お", "o"],
    ],
  );
  const readings = new Map(kana.map((item) => [item.glyph, item.reading]));
  for (const item of kana) {
    const letters = Array.from(item.example, (symbol) => readings.get(symbol));
    assert.ok(letters.every(Boolean));
    assert.equal(letters.join(""), item.exampleReading);
  }
});

test("a session quizzes each selected kana once per mode and spaces its recall", () => {
  const exercises = makeExercises(["e", "o", "u", "e", "unknown"]);
  const recognition = exercises.slice(0, 3);
  const recall = exercises.slice(3);
  assert.equal(exercises.length, 6);
  assert.deepEqual(recognition.map((q) => q.kanaId).sort(), ["e", "o", "u"]);
  assert.deepEqual(
    recall.map((q) => q.kanaId),
    recognition.map((q) => q.kanaId),
  );
  assert.ok(recognition.every((q) => q.mode === "recognition"));
  assert.ok(recall.every((q) => q.mode === "recall" && q.choices.length === 0));
  assert.deepEqual(makeExercises([]), []);
});

test("recognition includes exactly one correct glyph among four distinct choices", () => {
  for (const item of kana) {
    const [question] = makeExercises([item.id]);
    assert.equal(question.choices.length, 4);
    assert.equal(new Set(question.choices).size, 4);
    assert.deepEqual(
      question.choices.filter((choice) => evaluateAnswer(question, choice)),
      [item.glyph],
    );
    assert.equal(evaluateAnswer(question, item.reading), false);
  }
});

test("recall accepts romaji with common mobile keyboard variations", () => {
  const [, question] = makeExercises(["u"]);
  for (const answer of ["u", "U", " ｕ ", " Ｕ "])
    assert.ok(evaluateAnswer(question, answer));
  for (const answer of ["", "う", "oo", "ū", "o", "u u"])
    assert.equal(evaluateAnswer(question, answer), false);
  assert.equal(evaluateAnswer({ ...question, kanaId: "missing" }, "u"), false);
});
