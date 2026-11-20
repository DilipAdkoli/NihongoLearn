import { readDailyGoal } from "./dailyGoal.ts";
import { readOverviewPath } from "./overviewPath.ts";
import type { Attempt, StudyStorage } from "./storage.types";

type BindValue = string | number;

export interface StudyDatabase {
  execAsync(sql: string): Promise<void>;
  runAsync(sql: string, ...parameters: BindValue[]): Promise<unknown>;
  getFirstAsync<T>(sql: string): Promise<T | null>;
  getAllAsync<T>(sql: string): Promise<T[]>;
}

const attemptsTable = `
  CREATE TABLE IF NOT EXISTS attempts (
    id TEXT PRIMARY KEY NOT NULL,
    kana_id TEXT NOT NULL,
    mode TEXT NOT NULL CHECK (mode IN ('recognition', 'recall', 'listening')),
    answer TEXT NOT NULL,
    correct INTEGER NOT NULL CHECK (correct IN (0, 1)),
    attempted_at INTEGER NOT NULL
  );
`;

const schema = `
  CREATE TABLE IF NOT EXISTS seen_kana (
    kana_id TEXT PRIMARY KEY NOT NULL
  );
  ${attemptsTable}
  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY NOT NULL,
    value INTEGER NOT NULL
  );
`;

const addListening = `
  ALTER TABLE attempts RENAME TO attempts_v1;
  ${attemptsTable}
  INSERT INTO attempts (id, kana_id, mode, answer, correct, attempted_at)
    SELECT id, kana_id, mode, answer, correct, attempted_at FROM attempts_v1;
  DROP TABLE attempts_v1;
`;

async function initialize(db: StudyDatabase) {
  await db.execAsync("BEGIN IMMEDIATE");
  try {
    const version = (
      await db.getFirstAsync<{ user_version: number }>("PRAGMA user_version")
    )?.user_version;
    if (version === 0 || version === 1) {
      await db.execAsync(version === 0 ? schema : addListening);
      await db.execAsync("PRAGMA user_version = 2");
    } else if (version !== 2) {
      throw new Error("This study database needs a different app version.");
    }
    await db.execAsync("COMMIT");
  } catch (error) {
    await db.execAsync("ROLLBACK");
    throw error;
  }
}

export function createSqliteStorage(
  open: () => Promise<StudyDatabase>,
): StudyStorage {
  let ready: Promise<StudyDatabase> | undefined;

  function database(): Promise<StudyDatabase> {
    ready ??= open()
      .then(async (db) => {
        await initialize(db);
        return db;
      })
      .catch((error) => {
        ready = undefined;
        throw error;
      });
    return ready;
  }

  async function setSetting(key: string, value: number) {
    const db = await database();
    await db.runAsync(
      "INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value",
      key,
      value,
    );
  }

  return {
    async loadStudy() {
      const db = await database();
      const [seen, attempts, settings] = await Promise.all([
        db.getAllAsync<{ kana_id: string }>(
          "SELECT kana_id FROM seen_kana ORDER BY kana_id",
        ),
        db.getAllAsync<Omit<Attempt, "correct"> & { correct: number }>(
          `SELECT id, kana_id AS kanaId, mode, answer, correct, attempted_at AS at
           FROM attempts ORDER BY attempted_at, id`,
        ),
        db.getAllAsync<{ key: string; value: number }>(
          "SELECT key, value FROM settings",
        ),
      ]);
      return {
        savedWords: settings
          .filter(
            (setting) => setting.key.startsWith("word:") && setting.value === 1,
          )
          .map((setting) => setting.key.slice(5))
          .sort(),
        seen: seen.map((row) => row.kana_id),
        attempts: attempts.map((row) => ({
          ...row,
          correct: row.correct === 1,
        })),
        dailyGoal: readDailyGoal(
          settings.find((setting) => setting.key === "daily-goal")?.value,
        ),
        overviewPath: readOverviewPath(
          settings.find((setting) => setting.key === "overview-path")?.value,
        ),
        sound: settings.find((setting) => setting.key === "sound")?.value !== 0,
        romaji:
          settings.find((setting) => setting.key === "romaji")?.value !== 0,
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
    setWordSaved: (id, saved) => setSetting("word:" + id, Number(saved)),
    setPreference: (name, value) => setSetting(name, Number(value)),
    setDailyGoal: (goal) => setSetting("daily-goal", goal),
    setOverviewPath: (path) => setSetting("overview-path", path),
  };
}
