import { readDailyGoal, type DailyGoal } from "./dailyGoal.ts";
import type { Attempt, StudyData, StudyPreference } from "./storage.types";

export type { Attempt, StudyData } from "./storage.types";

// Separate keys keep writes from different tabs from replacing each other's progress.
const namespace = "nihongolearn:v1:";
const seenPrefix = namespace + "seen:";
const wordPrefix = namespace + "word:";
const attemptPrefix = namespace + "attempt:";

export async function loadStudy(): Promise<StudyData> {
  const storage = globalThis.localStorage;
  const seen: string[] = [];
  const savedWords: string[] = [];
  const attempts: Attempt[] = [];

  for (let i = 0; i < storage.length; i++) {
    const key = storage.key(i);
    if (key?.startsWith(seenPrefix)) {
      seen.push(key.slice(seenPrefix.length));
    } else if (key?.startsWith(wordPrefix) && storage.getItem(key) === "on") {
      savedWords.push(key.slice(wordPrefix.length));
    } else if (key?.startsWith(attemptPrefix)) {
      const value = storage.getItem(key);
      if (value !== null) attempts.push(JSON.parse(value) as Attempt);
    }
  }

  seen.sort();
  attempts.sort((a, b) => a.at - b.at || a.id.localeCompare(b.id));
  return {
    seen,
    savedWords: savedWords.sort(),
    attempts,
    dailyGoal: readDailyGoal(Number(storage.getItem(namespace + "daily-goal"))),
    sound: storage.getItem(namespace + "sound") !== "off",
    romaji: storage.getItem(namespace + "romaji") !== "off",
  };
}

export async function markSeen(id: string): Promise<void> {
  globalThis.localStorage.setItem(seenPrefix + id, "1");
}

export async function recordAttempt(attempt: Attempt): Promise<void> {
  const key = attemptPrefix + attempt.id;
  if (globalThis.localStorage.getItem(key) === null) {
    globalThis.localStorage.setItem(key, JSON.stringify(attempt));
  }
}

export async function setPreference(
  name: StudyPreference,
  value: boolean,
): Promise<void> {
  globalThis.localStorage.setItem(namespace + name, value ? "on" : "off");
}

export async function setWordSaved(id: string, saved: boolean): Promise<void> {
  const key = wordPrefix + id;
  if (saved) globalThis.localStorage.setItem(key, "on");
  else globalThis.localStorage.removeItem(key);
}

export async function setDailyGoal(goal: DailyGoal): Promise<void> {
  globalThis.localStorage.setItem(namespace + "daily-goal", String(goal));
}
