import assert from "node:assert/strict";
import test from "node:test";
import type { ChoiceLesson } from "../src/ChoiceCourse.tsx";
import { conversation } from "../src/conversation.ts";

test("dialogue prompts have unique IDs and one valid listed response", () => {
  const lessons = conversation.flatMap<ChoiceLesson>((group) => group.lessons);
  assert.equal(
    new Set(lessons.map((lesson) => lesson.id)).size,
    lessons.length,
  );
  for (const lesson of lessons) {
    assert.equal(
      lesson.choices.filter((choice) => choice === lesson.answer).length,
      1,
    );
    assert.equal(new Set(lesson.choices).size, lesson.choices.length);
  }
  assert.deepEqual(
    conversation
      .find((group) => group.title === "At the station")
      ?.lessons.map((lesson) => lesson.id),
    ["find-station", "ask-train-destination", "buy-one-ticket"],
  );
});
