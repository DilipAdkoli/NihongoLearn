import { openDatabaseAsync } from "expo-sqlite";
import { createSqliteStorage } from "./storage.sqlite";
import type { StudyData } from "./storage.types";

export type { Attempt, StudyData } from "./storage.types";

export const {
  loadStudy,
  markSeen,
  recordAttempt,
  setPreference,
  setWordSaved,
  setDailyGoal,
  setOverviewPath,
  setJapaneseTextSize,
} = createSqliteStorage(() => openDatabaseAsync("nihongo-learn.db"));

export function subscribeStudyChanges(_listener: (study: StudyData) => void) {
  return () => {};
}
