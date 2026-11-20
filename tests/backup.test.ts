import assert from "node:assert/strict";
import test from "node:test";
import { createBackup } from "../src/backup.ts";
import type { StudyData } from "../src/storage.types.ts";

test("backup exports versioned Unicode study data and preferences", () => {
  const data: StudyData = {
    seen: ["kata-shi"],
    sound: false,
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
