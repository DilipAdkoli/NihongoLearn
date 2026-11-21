import assert from "node:assert/strict";
import test from "node:test";
import { mistakeJournal, mistakeSkillCounts } from "../src/mistakeJournal.ts";
import type { Attempt } from "../src/storage.types.ts";

const courses = {
  grammar: {
    skill: "Grammar",
    href: "/grammar-review" as const,
    groups: [
      {
        lessons: [
          {
            id: "particle",
            title: "Choose the particle",
            explanation: "",
            japanese: "わたしはがくせいです",
            english: "I am a student.",
            prompt: "Which particle marks the topic?",
            stem: "わたし＿がくせいです",
            choices: ["は", "を", "に"],
            answer: "は",
            feedback: "Use は for the topic.",
          },
        ],
      },
    ],
  },
  writing: {
    skill: "Writing",
    href: "/writing-review" as const,
    groups: [
      {
        lessons: [
          {
            id: "greeting",
            title: "Write hello",
            explanation: "",
            japanese: "こんにちは",
            english: "Hello",
            prompt: "Write hello in Japanese",
            stem: "",
            choices: [],
            answer: "こんにちは",
            acceptedAnswers: ["こんにちは", "今日は"],
            feedback: "Use こんにちは as a greeting.",
          },
        ],
      },
    ],
  },
};

function attempt(
  key: string,
  correct: boolean,
  at: number,
  answer = "を",
): Attempt {
  return {
    id: `${key}-${at}`,
    kanaId: key,
    mode: "recognition",
    answer,
    correct,
    at,
  };
}

test("mistake journal shows the latest wrong answer with its correction and practice destination", () => {
  const entries = mistakeJournal(
    [attempt("grammar:particle", false, 5)],
    courses,
  );
  assert.equal(entries.length, 1);
  assert.deepEqual(entries[0], {
    key: "grammar:particle",
    skill: "Grammar",
    href: "/grammar-review",
    title: "Choose the particle",
    prompt: "Which particle marks the topic?",
    yourAnswer: "を",
    correctAnswer: "は",
    feedback: "Use は for the topic.",
    at: 5,
  });
});

test("a correct retry removes a mistake, but a later wrong answer brings it back", () => {
  const history = [
    attempt("grammar:particle", false, 1),
    attempt("grammar:particle", true, 3, "は"),
  ];
  assert.deepEqual(mistakeJournal(history, courses), []);
  history.push(attempt("grammar:particle", false, 4));
  assert.equal(mistakeJournal(history, courses).length, 1);
});

test("unknown removed questions are ignored and valid mistakes appear newest first", () => {
  const entries = mistakeJournal(
    [
      attempt("grammar:particle", false, 5),
      attempt("missing:deleted", false, 100),
      attempt("writing:greeting", false, 10, "hello"),
      attempt("grammar:particle", true, 1, "は"),
    ],
    courses,
  );
  assert.deepEqual(entries.map((entry) => entry.key), [
    "writing:greeting",
    "grammar:particle",
  ]);
  assert.equal(entries[0].correctAnswer, "こんにちは");
  assert.deepEqual(mistakeSkillCounts(entries), [
    { skill: "Grammar", count: 1 },
    { skill: "Writing", count: 1 },
  ]);
});

test("the journal is empty for new learners and never changes stored attempts", () => {
  const history = [attempt("grammar:particle", false, 4)];
  const snapshot = JSON.stringify(history);
  assert.deepEqual(mistakeJournal([], courses), []);
  mistakeJournal(history, courses);
  assert.equal(JSON.stringify(history), snapshot);
});
