export type Attempt = {
  id: string;
  kanaId: string;
  mode: "recognition" | "recall";
  answer: string;
  correct: boolean;
  at: number;
};

export type StudyData = {
  seen: string[];
  attempts: Attempt[];
  sound: boolean;
};

export type StudyStorage = {
  loadStudy(): Promise<StudyData>;
  markSeen(id: string): Promise<void>;
  recordAttempt(attempt: Attempt): Promise<void>;
  setSound(value: boolean): Promise<void>;
};
