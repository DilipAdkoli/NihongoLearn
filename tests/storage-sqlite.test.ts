import assert from "node:assert/strict";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { DatabaseSync } from "node:sqlite";
import test from "node:test";
import {
  createSqliteStorage,
  type StudyDatabase,
} from "../src/storage.sqlite.ts";
import type { Attempt } from "../src/storage.types.ts";

function connect(database: DatabaseSync): StudyDatabase {
  return {
    async execAsync(sql) {
      database.exec(sql);
    },
    async runAsync(sql, ...parameters) {
      return database.prepare(sql).run(...parameters);
    },
    async getFirstAsync<T>(sql: string) {
      return (database.prepare(sql).get() as T | undefined) ?? null;
    },
    async getAllAsync<T>(sql: string) {
      return database.prepare(sql).all() as T[];
    },
  };
}

test("lessons, attempts and preferences persist across closing and reopening the database", async (t) => {
  const directory = await mkdtemp(join(tmpdir(), "nihongo-study-"));
  const filename = join(directory, "study.db");
  let db = new DatabaseSync(filename);
  t.after(async () => {
    db.close();
    await rm(directory, { recursive: true, force: true });
  });
  const store = createSqliteStorage(async () => connect(db));
  assert.deepEqual(await store.loadStudy(), {
    seen: [],
    attempts: [],
    sound: true,
  });
  const first: Attempt = {
    id: "first",
    kanaId: "a",
    mode: "recognition",
    answer: "あ",
    correct: true,
    at: 100,
  };
  const second: Attempt = {
    id: "second",
    kanaId: "i",
    mode: "recall",
    answer: "it's a",
    correct: false,
    at: 150,
  };
  await Promise.all([
    store.markSeen("i"),
    store.markSeen("a"),
    store.markSeen("a"),
  ]);
  await Promise.all([store.recordAttempt(second), store.recordAttempt(first)]);
  await store.recordAttempt({ ...first, answer: "changed" });
  await store.setSound(false);
  db.close();
  db = new DatabaseSync(filename);
  const reopened = createSqliteStorage(async () => connect(db));
  assert.deepEqual(await reopened.loadStudy(), {
    seen: ["a", "i"],
    attempts: [first, second],
    sound: false,
  });
  await reopened.setSound(true);
  assert.equal((await reopened.loadStudy()).sound, true);
});

test("opening a database with an unknown schema preserves its version", async (t) => {
  const db = new DatabaseSync(":memory:");
  t.after(() => db.close());
  db.exec("PRAGMA user_version = 2");
  const store = createSqliteStorage(async () => connect(db));
  await assert.rejects(store.loadStudy(), /different app version/);
  assert.equal(db.prepare("PRAGMA user_version").get()?.user_version, 2);
});
