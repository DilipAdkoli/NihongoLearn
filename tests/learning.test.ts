import assert from "node:assert/strict";
import test from "node:test";
import {
  evaluateAnswer,
  kana,
  lessons,
  latestAttemptResult,
  makeExercises,
  missedKanaIds,
  mixedKanaSample,
} from "../src/learning.ts";
import type { Attempt } from "../src/storage.types.ts";

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
  assert.equal(kana.filter((item) => item.script === "hiragana").length, 104);
  assert.equal(kana.filter((item) => item.script === "katakana").length, 104);
  assert.equal(new Set(kana.map((item) => item.glyph)).size, kana.length);
  const readings = [...kana].sort((a, b) => b.glyph.length - a.glyph.length);
  for (const item of kana) {
    let remaining = item.example;
    let romaji = "";
    while (remaining) {
      const match = readings.find((entry) => remaining.startsWith(entry.glyph));
      assert.ok(match, `Untaught kana in ${item.example}: ${remaining}`);
      romaji += match.reading;
      remaining = remaining.slice(match.glyph.length);
    }
    assert.equal(romaji, item.exampleReading.replaceAll(" ", ""));
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

test("session summaries return unique kana IDs for incorrect answers", () => {
  const attempt = (id: string, kanaId: string, correct: boolean): Attempt => ({
    id,
    kanaId,
    mode: "recognition",
    answer: "",
    correct,
    at: 1,
  });
  assert.deepEqual(
    missedKanaIds([
      attempt("1", "a", false),
      attempt("2", "i", true),
      attempt("3", "a", false),
      attempt("4", "u", false),
    ]),
    ["a", "u"],
  );
  assert.deepEqual(missedKanaIds([attempt("1", "a", true)]), []);
});

test("latest kana result is separate for recognition, recall, and listening", () => {
  const attempts: Attempt[] = [
    {
      id: "1",
      kanaId: "a",
      mode: "recognition",
      answer: "あ",
      correct: true,
      at: 1,
    },
    {
      id: "2",
      kanaId: "a",
      mode: "recognition",
      answer: "い",
      correct: false,
      at: 2,
    },
    {
      id: "3",
      kanaId: "a",
      mode: "recall",
      answer: "a",
      correct: true,
      at: 3,
    },
  ];
  assert.equal(latestAttemptResult(attempts, "a", "recognition"), false);
  assert.equal(latestAttemptResult(attempts, "a", "recall"), true);
  assert.equal(latestAttemptResult(attempts, "a", "listening"), undefined);
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

test("recall accepts systematic romanizations and common Japanese keyboard spellings in both scripts", () => {
  const cases = [
    ["shi", "si"],
    ["chi", "ti"],
    ["tsu", "tu"],
    ["fu", "hu"],
    ["ji", "zi"],
    ["di", "zi"],
    ["sha", "sya"],
    ["shu", "syu"],
    ["sho", "syo"],
    ["cha", "tya", "cya"],
    ["chu", "tyu", "cyu"],
    ["cho", "tyo", "cyo"],
    ["ja", "zya", "jya"],
    ["ju", "zyu", "jyu"],
    ["jo", "zyo", "jyo"],
  ];
  for (const [id, ...aliases] of cases) {
    for (const prefix of ["", "kata-"]) {
      const [, recall] = makeExercises([prefix + id]);
      for (const alias of aliases)
        assert.ok(
          evaluateAnswer(recall, alias),
          prefix + id + " accepts " + alias,
        );
      assert.equal(evaluateAnswer(recall, "a"), false);
    }
  }
  const [, shi] = makeExercises(["shi"]);
  assert.ok(evaluateAnswer(shi, " ＳＩ "));
  assert.equal(evaluateAnswer(shi, "zi"), false);
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

test("listening never offers an alternative spelling of the same sound", () => {
  const ids = ["o", "wo", "ji", "di", "zu", "du", "kata-wo"];
  const questions = makeExercises(ids, "listening");
  assert.equal(questions.length, ids.length);
  for (const question of questions) {
    assert.equal(question.mode, "listening");
    assert.equal(question.choices.length, 4);
    const item = kana.find((entry) => entry.id === question.kanaId)!;
    const phonetic = (reading: string) => (reading === "wo" ? "o" : reading);
    for (const glyph of question.choices) {
      const other = kana.find((entry) => entry.glyph === glyph)!;
      assert.equal(other.script, item.script);
      assert.equal(
        phonetic(other.reading) === phonetic(item.reading),
        evaluateAnswer(question, glyph),
      );
    }
  }
});

test("contrast practice includes the other kana even across rows", () => {
  const questions = makeExercises(["kata-shi", "kata-tsu"], "contrast").filter(
    (q) => q.mode === "recognition",
  );
  assert.equal(questions.length, 2);
  for (const question of questions) {
    assert.ok(question.choices.includes("シ"));
    assert.ok(question.choices.includes("ツ"));
    assert.equal(new Set(question.choices).size, 4);
  }
});

test("mixed practice balances studied scripts and distinguishes matching sounds", () => {
  assert.deepEqual(mixedKanaSample(["a", "i", "unknown"]), []);
  const seen = ["a", "i", "u", "e", "kata-a", "kata-i", "kata-u", "kata-e"];
  const ids = mixedKanaSample(seen);
  assert.equal(ids.length, 6);
  assert.equal(new Set(ids).size, 6);
  assert.equal(ids.filter((id) => id.startsWith("kata-")).length, 3);
  assert.ok(ids.every((id) => seen.includes(id)));
  const questions = makeExercises(ids, "mixed");
  assert.equal(questions.length, 12);
  for (const question of questions.slice(0, 6)) {
    const item = kana.find(({ id }) => id === question.kanaId)!;
    const counterpart = kana.find(
      ({ id }) =>
        id ===
        (item.script === "hiragana" ? `kata-${item.id}` : item.id.slice(5)),
    )!;
    assert.ok(question.choices.includes(counterpart.glyph));
    assert.equal(new Set(question.choices).size, 4);
    assert.deepEqual(
      question.choices.filter((choice) => evaluateAnswer(question, choice)),
      [item.glyph],
    );
  }
});
