import type { Attempt, StudyStorage } from "./storage.types";

type BindValue = string | number;

export interface StudyDatabase {
  execAsync(sql: string): Promise<void>;
  runAsync(sql: string, ...parameters: BindValue[]): Promise<unknown>;
  getFirstAsync<T>(sql: string): Promise<T | null>;
  getAllAsync<T>(sql: string): Promise<T[]>;
}

const schema = `
  CREATE TABLE IF NOT EXISTS seen_kana (
    kana_id TEXT PRIMARY KEY NOT NULL
  );
  CREATE TABLE IF NOT EXISTS attempts (
    id TEXT PRIMARY KEY NOT NULL,
    kana_id TEXT NOT NULL,
    mode TEXT NOT NULL CHECK (mode IN ('recognition', 'recall')),
    answer TEXT NOT NULL,
    correct INTEGER NOT NULL CHECK (correct IN (0, 1)),
    attempted_at INTEGER NOT NULL
  );
  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY NOT NULL,
    value INTEGER NOT NULL
  );
  PRAGMA user_version = 1;
`;

export function createSqliteStorage(
  open: () => Promise<StudyDatabase>,
): StudyStorage {
  let ready: Promise<StudyDatabase> | undefined;

  function database(): Promise<StudyDatabase> {
    ready ??= open()
      .then(async (db) => {
        const version = await db.getFirstAsync<{ user_version: number }>(
          "PRAGMA user_version",
        );
        if (version?.user_version === 0) {
          await db.execAsync(schema);
        } else if (version?.user_version !== 1) {
          throw new Error("This study database needs a different app version.");
        }
        return db;
      })
      .catch((error) => {
        ready = undefined;
        throw error;
      });
    return ready;
  }

  return {
    async loadStudy() {
      const db = await database();
      const [seen, attempts, sound] = await Promise.all([
        db.getAllAsync<{ kana_id: string }>(
          "SELECT kana_id FROM seen_kana ORDER BY kana_id",
        ),
        db.getAllAsync<Omit<Attempt, "correct"> & { correct: number }>(
          `SELECT id, kana_id AS kanaId, mode, answer, correct, attempted_at AS at
           FROM attempts ORDER BY attempted_at, id`,
        ),
        db.getFirstAsync<{ value: number }>(
          "SELECT value FROM settings WHERE key = 'sound'",
        ),
      ]);
      return {
        seen: seen.map((row) => row.kana_id),
        attempts: attempts.map((row) => ({
          ...row,
          correct: row.correct === 1,
        })),
        sound: sound?.value !== 0,
      };
    },
    async markSeen(id) {
      const db = await database();
      await db.runAsync(
        "INSERT INTO seen_kana (kana_id) VALUES (?) ON CONFLICT(kana_id) DO NOTHING",
        id,
      );
    },
    async recordAttempt(attempt) {
      const db = await database();
      await db.runAsync(
        `INSERT INTO attempts (id, kana_id, mode, answer, correct, attempted_at)
         VALUES (?, ?, ?, ?, ?, ?) ON CONFLICT(id) DO NOTHING`,
        attempt.id,
        attempt.kanaId,
        attempt.mode,
        attempt.answer,
        Number(attempt.correct),
        attempt.at,
      );
    },
    async setSound(value) {
      const db = await database();
      await db.runAsync(
        "INSERT INTO settings (key, value) VALUES ('sound', ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value",
        Number(value),
      );
    },
  };
}
