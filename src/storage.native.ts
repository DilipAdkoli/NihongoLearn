import { openDatabaseAsync } from "expo-sqlite";
import { createSqliteStorage } from "./storage.sqlite";

export type { Attempt, StudyData } from "./storage.types";

export const { loadStudy, markSeen, recordAttempt, setSound } =
  createSqliteStorage(() => openDatabaseAsync("nihongo-learn.db"));
