import assert from "node:assert/strict";
import test from "node:test";
import { beginnerN5Path } from "../src/beginnerN5Path.ts";
import type { Attempt, StudyData } from "../src/storage.types.ts";

const fresh: StudyData = {
  seen: [],
  savedWords: [],
  attempts: [],
  dailyGoal: 0,
  overviewPath: 5,
  japaneseTextSize: 0,
  darkMode: false,
  sound: true,
  romaji: true,
};

function answer(id: string, at: number): Attempt {
  return {
    id,
    kanaId: id,
    mode: "recognition",
    answer: "",
    correct: true,
    at,
  };
}

test("beginner journey starts with kana and progresses through real lessons", () => {
  assert.deepEqual(
    beginnerN5Path(fresh).map((step) => step.complete),
    Array(9).fill(false),
  );

  const withKana = beginnerN5Path({
    ...fresh,
    seen: [
      "a",
      "i",
      "u",
      "e",
      "o",
      "kata-a",
      "kata-i",
      "kata-u",
      "kata-e",
      "kata-o",
    ],
  });
  assert.deepEqual(
    withKana.filter((step) => step.complete).map((step) => step.id),
    ["hiragana-vowels", "katakana-vowels"],
  );
});

test("beginner journey requires all correct answers in a step", () => {
  const completeSentence = [
    answer("grammar:desu", 1),
    answer("grammar:topic-wa", 2),
  ];
  const partial = beginnerN5Path({ ...fresh, attempts: completeSentence });
  assert.equal(partial[2].complete, false);

  const complete = beginnerN5Path({
    ...fresh,
    attempts: [...completeSentence, answer("grammar:question-ka", 3)],
  });
  assert.equal(complete[2].complete, true);

  const laterWrong = beginnerN5Path({
    ...fresh,
    attempts: [
      answer("grammar:desu", 1),
      answer("grammar:topic-wa", 2),
      {
        ...answer("grammar:question-ka", 3),
        correct: false,
        at: 4,
      },
    ],
  });
  assert.equal(laterWrong[2].complete, false);
});
