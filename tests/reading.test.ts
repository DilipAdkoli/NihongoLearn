import assert from "node:assert/strict";
import test from "node:test";
import { reading } from "../src/reading.ts";

test("each reading passage has text, a translation, and questions with unique keys", () => {
  const ids = new Set<string>();
  for (const group of reading) {
    assert.ok(group.passage.japanese.trim());
    assert.match(group.passage.standardJapanese, /\p{Script=Han}/u);
    assert.ok(group.passage.english.trim());
    assert.ok(group.lessons.length > 0);
    for (const lesson of group.lessons) {
      assert.ok(!ids.has(lesson.id));
      ids.add(lesson.id);
      assert.equal(
        lesson.choices.filter((choice) => choice === lesson.answer).length,
        1,
      );
      assert.equal(new Set(lesson.choices).size, lesson.choices.length);
    }
  }
});
