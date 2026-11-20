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
  attempts: Attempt[];
  sound: boolean;
  romaji: boolean;
};

export type StudyPreference = "sound" | "romaji";

export type StudyStorage = {
  loadStudy(): Promise<StudyData>;
  markSeen(id: string): Promise<void>;
  recordAttempt(attempt: Attempt): Promise<void>;
  setPreference(name: StudyPreference, value: boolean): Promise<void>;
};
