import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

test("web progress survives reopening and retries preserve the original attempt", (t) => {
  const directory = mkdtempSync(join(tmpdir(), "nihongo-web-test-"));
  t.after(() => rmSync(directory, { recursive: true, force: true }));
  const moduleUrl = new URL("../src/storage.web.ts", import.meta.url).href;
  const args = [
    "--experimental-webstorage",
    "--localstorage-file=" + join(directory, "storage"),
    "--input-type=module",
    "-e",
  ];
  const run = (script: string) =>
    execFileSync(
      process.execPath,
      [
        ...args,
        `import * as store from ${JSON.stringify(moduleUrl)};\n` + script,
      ],
      { encoding: "utf8" },
    );
  const reload = () =>
    JSON.parse(run("console.log(JSON.stringify(await store.loadStudy()))"));
  assert.deepEqual(reload(), {
    seen: [],
    savedWords: [],
    attempts: [],
    dailyGoal: 0,
    romaji: true,
    sound: true,
  });

  const first = {
    id: "session-1",
    kanaId: "a",
    mode: "recall",
    answer: "u",
    correct: false,
    at: 1,
  };
  const second = {
    id: "session-2",
    kanaId: "i",
    mode: "recognition",
    answer: "い",
    correct: true,
    at: 2,
  };
  run(`
    localStorage.setItem('another-app', 'unrelated');
    await Promise.all([
      store.markSeen('i'),
      store.markSeen('a'),
      store.markSeen('i'),
      store.recordAttempt(${JSON.stringify(second)}),
      store.recordAttempt(${JSON.stringify(first)}),
      store.setPreference("sound", false),
      store.setPreference("romaji", false),
      store.setWordSaved("みず:water", true),
      store.setDailyGoal(20),
    ]);
  `);
  run(
    `await store.recordAttempt(${JSON.stringify({ ...first, correct: true })})`,
  );
  assert.deepEqual(reload(), {
    seen: ["a", "i"],
    savedWords: ["みず:water"],
    attempts: [first, second],
    dailyGoal: 20,
    romaji: false,
    sound: false,
  });
  run('await store.setPreference("sound", true)');
  assert.equal(reload().sound, true);
  assert.equal(reload().romaji, false);
  run('await store.setWordSaved("みず:water", false)');
  assert.deepEqual(reload().savedWords, []);
});
