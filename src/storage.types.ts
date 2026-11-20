import type { DailyGoal } from "./dailyGoal";
import type { OverviewPath } from "./overviewPath";

export type Attempt = {
  id: string;
  kanaId: string;
  mode: "recognition" | "recall" | "listening";
  answer: string;
  correct: boolean;
  at: number;
};

export type StudyData = {
  seen: string[];
  savedWords: string[];
  attempts: Attempt[];
  dailyGoal: DailyGoal;
  overviewPath: OverviewPath;
  sound: boolean;
  romaji: boolean;
};

export type StudyPreference = "sound" | "romaji";

export type StudyStorage = {
  loadStudy(): Promise<StudyData>;
  markSeen(id: string): Promise<void>;
  recordAttempt(attempt: Attempt): Promise<void>;
  setWordSaved(id: string, saved: boolean): Promise<void>;
  setDailyGoal(goal: DailyGoal): Promise<void>;
  setOverviewPath(path: OverviewPath): Promise<void>;
  setPreference(name: StudyPreference, value: boolean): Promise<void>;
};
