import assert from "node:assert/strict";
import test from "node:test";
import {
  dailyStudyPlan,
  selectedPathSteps,
  studySkillIndex,
  type PlanQueues,
} from "../src/dailyStudyPlan.ts";
import type { Attempt, StudyData } from "../src/storage.types.ts";

const now = 100;
const empty: StudyData = {
  seen: [],
  savedWords: [],
  attempts: [],
  dailyGoal: 0,
  overviewPath: 0,
  japaneseTextSize: 0,
  darkMode: false,
  sound: true,
  romaji: true,
};
const noReviews: PlanQueues = { kana: [], vocabulary: [], saved: [] };
const index = studySkillIndex({
  reading: {
    skill: "Reading",
    href: "/passage-review",
    groups: [{ lessons: [{ id: "desk" }] }],
  },
  grammar: {
    skill: "Grammar",
    href: "/grammar-review",
    groups: [{ lessons: [{ id: "wa" }, { id: "ka" }] }],
  },
});
function answer(kanaId: string, correct: boolean, at = 1): Attempt {
  return {
    id: kanaId + at,
    kanaId,
    correct,
    at,
    mode: "recognition",
    answer: "",
  };
}
function plan(data: Partial<StudyData> = {}, reviews = noReviews) {
  return dailyStudyPlan({ ...empty, ...data }, reviews, index, now, 2);
}

test("a new learner gets the first activity of their own path and finishing it advances the plan", () => {
  assert.deepEqual(
    plan().map((item) => item.action),
    [{ kana: ["a", "i", "u", "e", "o"], mode: "study" }],
  );
  assert.deepEqual(plan({ seen: ["a", "i", "u", "e", "o"] })[0].action, {
    href: "/grammar",
  });
  const travel = { ...empty, overviewPath: 1 as const };
  assert.deepEqual(plan(travel)[0].action, {
    href: { pathname: "/vocabulary", params: { topic: "places" } },
  });
  const complete = selectedPathSteps(travel).flatMap((step) =>
    "answers" in step ? step.answers.map((id) => answer(id, true)) : [],
  );
  assert.deepEqual(plan({ ...travel, attempts: complete })[0].action, {
    href: "/learn",
  });
});

test("the earliest due queue precedes targeted practice and the guided activity, with a bounded kana batch", () => {
  const data = { attempts: [answer("reading:desk", false)] };
  const queues = {
    kana: [
      { id: "e", dueAt: 5 },
      { id: "a", dueAt: 8 },
      { id: "u", dueAt: 9 },
    ],
    saved: [{ dueAt: 4 }],
    vocabulary: [{ dueAt: 7 }, { dueAt: now + 1 }],
  };
  const items = plan(data, queues);
  assert.deepEqual(
    items.map((item) => item.title),
    ["Recall saved words", "Practice reading", "Study the five vowels"],
  );
  assert.deepEqual(items[0].action, {
    href: { pathname: "/saved-practice", params: { mode: "recall" } },
  });
  assert.deepEqual(plan(data, { ...queues, saved: [] })[0].action, {
    mode: "review",
    kana: ["e", "a"],
  });
  const words = plan(data, { ...queues, saved: [], kana: [] })[0];
  assert.deepEqual(words.action, { href: "/vocabulary-review" });
  assert.match(words.reason, /1 practiced word is due/);
  assert.equal(
    plan({}, { ...noReviews, vocabulary: [{ dueAt: now + 1 }] }).length,
    1,
  );
});

test("focus uses the lowest latest score across distinct known questions and clears corrected mistakes", () => {
  const attempts = [
    answer("reading:desk", false),
    answer("grammar:wa", false),
    answer("grammar:ka", true),
    answer("reading:desk", true, 3),
    answer("reading:desk", false, 7),
    answer("grammar:obsolete", false),
    answer("reading:desk", true, now + 1),
  ];
  const reading = plan({ attempts })[0];
  assert.equal(reading.title, "Practice reading");
  assert.deepEqual(reading.action, { href: "/passage-review" });
  assert.match(reading.reason, /1 of 1 reading question/);
  attempts.push(answer("reading:desk", true, 8));
  assert.equal(plan({ attempts })[0].title, "Practice grammar");
  attempts.push(answer("grammar:wa", true, 9));
  assert.equal(plan({ attempts }).length, 1);
  attempts.push(answer("beginner-check:writing-water-permission", false, 10));
  assert.deepEqual(plan({ attempts })[0].action, { href: "/write-japanese" });
});
