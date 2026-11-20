import assert from "node:assert/strict";
import test from "node:test";
import { isSentenceAnswer, writingTasks } from "../src/writing.ts";

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
