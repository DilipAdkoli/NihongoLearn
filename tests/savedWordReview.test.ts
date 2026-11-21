import assert from "node:assert/strict";
import test from "node:test";
import { glossaryKey } from "../src/glossary.ts";
import { savedWordRecallQueue } from "../src/savedWordReview.ts";
import type { StudyData } from "../src/storage.types.ts";

test("saved word review schedules typed recall and leaves recognition-only words due", () => {
  const water = { spelling: "水", kana: "みず", meaning: "water" };
  const book = { spelling: "本", kana: "ほん", meaning: "book" };
  const at = Date.parse("2026-01-01T12:00:00Z");
  const data: StudyData = {
    savedWords: [glossaryKey(water), glossaryKey(book)],
    attempts: [
      {
        id: "water-recall",
        kanaId: "saved-word-recall:" + glossaryKey(water),
        mode: "recall",
        correct: true,
        answer: "水",
        at,
      },
      {
        id: "book-recognition",
        kanaId: "saved-words:" + glossaryKey(book),
        mode: "recognition",
        correct: true,
        answer: "book",
        at,
      },
    ],
    seen: [],
    dailyGoal: 0,
    overviewPath: 0,
    japaneseTextSize: 0,
    darkMode: false,
    sound: true,
    romaji: true,
  };
  const now = at + 1000;
  const queue = savedWordRecallQueue(data, [water, book], now);
  assert.deepEqual(queue[0], { entry: book, dueAt: now });
  assert.deepEqual(queue[1].entry, water);
  assert.ok(queue[1].dueAt > now);
  assert.deepEqual(
    savedWordRecallQueue({ ...data, savedWords: [] }, [water, book], now),
    [],
  );
});
