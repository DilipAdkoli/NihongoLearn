import type { Attempt, StudyData } from "./storage.types";

export type { Attempt, StudyData } from "./storage.types";

// Separate keys keep writes from different tabs from replacing each other's progress.
const namespace = "nihongolearn:v1:";
const seenPrefix = namespace + "seen:";
const attemptPrefix = namespace + "attempt:";
const soundKey = namespace + "sound";

export async function loadStudy(): Promise<StudyData> {
  const storage = globalThis.localStorage;
  const seen: string[] = [];
  const attempts: Attempt[] = [];

  for (let i = 0; i < storage.length; i++) {
    const key = storage.key(i);
    if (key?.startsWith(seenPrefix)) {
      seen.push(key.slice(seenPrefix.length));
    } else if (key?.startsWith(attemptPrefix)) {
      const value = storage.getItem(key);
      if (value !== null) attempts.push(JSON.parse(value) as Attempt);
    }
  }

  seen.sort();
  attempts.sort((a, b) => a.at - b.at || a.id.localeCompare(b.id));
  return { seen, attempts, sound: storage.getItem(soundKey) !== "off" };
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

export async function setSound(value: boolean): Promise<void> {
  globalThis.localStorage.setItem(soundKey, value ? "on" : "off");
}
