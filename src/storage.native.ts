import { openDatabaseAsync } from "expo-sqlite";
import { createSqliteStorage } from "./storage.sqlite";

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
