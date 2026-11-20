import { openDatabaseAsync } from "expo-sqlite";
import { createSqliteStorage } from "./storage.sqlite";

export type { Attempt, StudyData } from "./storage.types";

export const { loadStudy, markSeen, recordAttempt, setPreference } =
  createSqliteStorage(() => openDatabaseAsync("nihongo-learn.db"));
