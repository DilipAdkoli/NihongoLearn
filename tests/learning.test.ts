import assert from "node:assert/strict";
import test from "node:test";
import {
  evaluateAnswer,
  kana,
  lessons,
  makeExercises,
} from "../src/learning.ts";

test("kana lessons have unique glyphs and examples readable with taught characters", () => {
  assert.deepEqual(
    kana
      .filter((item) => lessons[0].ids.includes(item.id))
      .map((item) => [item.glyph, item.reading]),
    [
      ["あ", "a"],
      ["い", "i"],
      ["う", "u"],
      ["え", "e"],
      ["お", "o"],
    ],
  );
  assert.deepEqual(
    lessons.flatMap((lesson) => lesson.ids),
    kana.map((item) => item.id),
  );
  assert.equal(kana.filter((item) => item.script === "hiragana").length, 71);
  assert.equal(kana.filter((item) => item.script === "katakana").length, 46);
  assert.equal(new Set(kana.map((item) => item.glyph)).size, kana.length);
  const readings = new Map(kana.map((item) => [item.glyph, item.reading]));
  for (const item of kana) {
    const letters = Array.from(item.example, (symbol) => readings.get(symbol));
    assert.ok(letters.every(Boolean));
    assert.equal(letters.join(""), item.exampleReading.replaceAll(" ", ""));
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
    assert.ok(
      question.choices.every((glyph) =>
        kana.some(
          (entry) => entry.glyph === glyph && entry.script === item.script,
        ),
      ),
    );
    assert.equal(new Set(question.choices).size, 4);
    const row = lessons.find((lesson) => lesson.ids.includes(item.id));
    const sameRow = question.choices.filter((glyph) =>
      kana.some(
        (entry) => entry.glyph === glyph && row?.ids.includes(entry.id),
      ),
    );
    assert.equal(sameRow.length, Math.min(4, row?.ids.length ?? 0));
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

test("recall accepts both the spelling and common pronunciation of を", () => {
  const [, question] = makeExercises(["wo"]);
  assert.ok(evaluateAnswer(question, "wo"));
  assert.ok(evaluateAnswer(question, "o"));
  assert.equal(evaluateAnswer(question, "w"), false);
});

test("ぢ and づ accept their standard readings and keyboard spellings", () => {
  const [, di] = makeExercises(["di"]);
  const [, du] = makeExercises(["du"]);
  assert.ok(evaluateAnswer(di, "ji"));
  assert.ok(evaluateAnswer(di, "di"));
  assert.ok(evaluateAnswer(du, "zu"));
  assert.ok(evaluateAnswer(du, "du"));
  assert.equal(evaluateAnswer(du, "tsu"), false);
});
