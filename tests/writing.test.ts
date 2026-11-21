import assert from "node:assert/strict";
import test from "node:test";
import { matchesTypedAnswer } from "../src/typedAnswer.ts";
import {
  isSentenceAnswer,
  normalizeSentenceAnswer,
  writingTasks,
} from "../src/writing.ts";

test("sentence exercises accept intended alternates and reject incomplete answers", () => {
  for (const task of writingTasks) {
    for (const order of task.answers) {
      assert.deepEqual([...order].sort(), [...task.tiles].sort());
      assert.equal(isSentenceAnswer(task.answers, order), true);
      assert.equal(isSentenceAnswer(task.answers, order.slice(1)), false);
    }
    assert.equal(
      isSentenceAnswer(task.answers, [...task.answers[0]].reverse()),
      false,
    );
  }
});

test("typed sentences accept the taught kanji spellings and intended word orders", () => {
  const task = writingTasks[0];
  const answers = task.answers.map((order) => order.join(""));
  for (const valid of [
    "昨日、お茶を飲みました。",
    "お茶を 昨日 のみました",
    "きのう　おちゃをのみました．",
  ]) {
    assert.equal(
      matchesTypedAnswer(valid, answers, normalizeSentenceAnswer),
      true,
    );
  }
  for (const invalid of ["明日お茶を飲みました。", "昨日飲みました。", "。"]) {
    assert.equal(
      matchesTypedAnswer(invalid, answers, normalizeSentenceAnswer),
      false,
    );
  }
});
