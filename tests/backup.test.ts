import assert from "node:assert/strict";
import test from "node:test";
import { createBackup, parseBackup } from "../src/backup.ts";
import type { StudyData } from "../src/storage.types.ts";

test("backup exports versioned Unicode study data and preferences", () => {
  const data: StudyData = {
    seen: ["kata-shi"],
    savedWords: ["みず:water"],
    sound: false,
    dailyGoal: 0,
    overviewPath: 0,
    japaneseTextSize: 0,
    romaji: true,
    attempts: [
      {
        id: "attempt",
        kanaId: "kata-shi",
        answer: "シ",
        correct: true,
        at: 1,
        mode: "listening",
      },
    ],
  };
  const exported = createBackup(data, new Date("2026-01-02T03:04:05Z"));
  assert.equal(exported.filename, "nihongolearn-2026-01-02.json");
  assert.equal(exported.mimeType, "application/json");
  assert.deepEqual(JSON.parse(exported.content), {
    schemaVersion: 1,
    exportedAt: "2026-01-02T03:04:05.000Z",
    study: data,
  });
});

test("import parses exported progress without changing device preferences", () => {
  const attempt = {
    id: "a1",
    kanaId: "a",
    answer: "あ",
    correct: true,
    at: 12,
    mode: "recognition" as const,
  };
  const data: StudyData = {
    seen: ["a"],
    savedWords: ["みず:water"],
    attempts: [attempt],
    sound: true,
    dailyGoal: 0,
    overviewPath: 0,
    japaneseTextSize: 0,
    romaji: false,
  };
  assert.deepEqual(parseBackup(createBackup(data, new Date(0)).content), {
    seen: ["a"],
    savedWords: ["みず:water"],
    attempts: [attempt],
  });
  const stringify = (study: unknown, schemaVersion = 1) =>
    JSON.stringify({ schemaVersion, study });
  assert.deepEqual(
    parseBackup(stringify({ seen: [], attempts: [] })).savedWords,
    [],
  );
  assert.throws(() => parseBackup(stringify(data, 2)), /Unsupported/);
  assert.throws(
    () => parseBackup(stringify({ ...data, seen: [false] })),
    /Invalid/,
  );
  assert.throws(
    () => parseBackup(stringify({ ...data, attempts: [attempt, attempt] })),
    /Duplicate/,
  );
  assert.throws(
    () =>
      parseBackup(stringify({ ...data, attempts: [{ ...attempt, at: -1 }] })),
    /Invalid/,
  );
});
