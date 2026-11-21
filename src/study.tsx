import type { DailyGoal } from "./dailyGoal";
import type { parseBackup } from "./backup";
import type { JapaneseTextSize } from "./japaneseTextSize";
import type { SessionMode } from "./learning";
import type { OverviewPath } from "./overviewPath";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import { ActivityIndicator, Button, Text, View } from "react-native";
import { router } from "expo-router";
import * as storage from "./storage";
import type { Attempt, StudyData, StudyPreference } from "./storage.types";

type StudyContext = {
  data: StudyData;
  see: (id: string) => Promise<void>;
  answer: (attempt: Attempt) => Promise<void>;
  mergeProgress: (backup: ReturnType<typeof parseBackup>) => Promise<void>;
  saveWord: (id: string, saved: boolean) => Promise<void>;
  changeDailyGoal: (goal: DailyGoal) => Promise<void>;
  changeOverviewPath: (path: OverviewPath) => Promise<void>;
  changeJapaneseTextSize: (size: JapaneseTextSize) => Promise<void>;
  changePreference: (name: StudyPreference, enabled: boolean) => Promise<void>;
};

const Context = createContext<StudyContext | null>(null);

export function StudyProvider({ children }: PropsWithChildren) {
  const [data, setData] = useState<StudyData | null>(null);
  const [failed, setFailed] = useState(false);
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    let active = true;
    storage
      .loadStudy()
      .then((value) => {
        if (active) setData(value);
      })
      .catch(() => {
        if (active) setFailed(true);
      });
    return () => {
      active = false;
    };
  }, [retry]);
  useEffect(() => storage.subscribeStudyChanges(setData), []);

  if (!data)
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#f7f6f0",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
        }}
      >
        {failed ? (
          <>
            <Text>Your saved study data couldn’t be opened.</Text>
            <Button
              title="Try again"
              onPress={() => {
                setFailed(false);
                setRetry((value) => value + 1);
              }}
            />
          </>
        ) : (
          <ActivityIndicator
            accessibilityLabel="Opening your study desk"
            color="#215848"
          />
        )}
      </View>
    );
  const value: StudyContext = {
    data,
    async see(id) {
      await storage.markSeen(id);
      setData((old) =>
        old && !old.seen.includes(id)
          ? { ...old, seen: [...old.seen, id] }
          : old,
      );
    },
    async answer(attempt) {
      await storage.recordAttempt(attempt);
      setData((old) =>
        old && !old.attempts.some((a) => a.id === attempt.id)
          ? { ...old, attempts: [...old.attempts, attempt] }
          : old,
      );
    },
    async mergeProgress(backup) {
      const seen = new Set(data.seen);
      const answers = new Set(data.attempts.map((attempt) => attempt.id));
      try {
        for (const id of backup.seen) {
          if (!seen.has(id)) await storage.markSeen(id);
        }
        for (const id of backup.savedWords) {
          await storage.setWordSaved(id, true);
        }
        for (const attempt of backup.attempts) {
          if (!answers.has(attempt.id)) await storage.recordAttempt(attempt);
        }
      } finally {
        const persisted = await storage.loadStudy();
        setData((old) => {
          if (!old) return persisted;
          const attempts = new Map(
            persisted.attempts.map((attempt) => [attempt.id, attempt]),
          );
          for (const attempt of old.attempts) {
            if (!attempts.has(attempt.id)) attempts.set(attempt.id, attempt);
          }
          return {
            ...old,
            seen: [...new Set([...old.seen, ...persisted.seen])],
            savedWords: [
              ...new Set([...old.savedWords, ...persisted.savedWords]),
            ],
            attempts: [...attempts.values()],
          };
        });
      }
    },
    async saveWord(id, saved) {
      await storage.setWordSaved(id, saved);
      setData((old) => {
        if (!old) return old;
        const words = new Set(old.savedWords);
        if (saved) words.add(id);
        else words.delete(id);
        return { ...old, savedWords: [...words] };
      });
    },
    async changeDailyGoal(goal) {
      await storage.setDailyGoal(goal);
      setData((old) => old && { ...old, dailyGoal: goal });
    },
    async changeOverviewPath(path) {
      await storage.setOverviewPath(path);
      setData((old) => old && { ...old, overviewPath: path });
    },
    async changeJapaneseTextSize(size) {
      await storage.setJapaneseTextSize(size);
      setData((old) => old && { ...old, japaneseTextSize: size });
    },
    async changePreference(name, enabled) {
      await storage.setPreference(name, enabled);
      setData((old) => old && { ...old, [name]: enabled });
    },
  };
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useStudy() {
  const context = useContext(Context);
  if (!context) throw new Error("StudyProvider is required.");
  return context;
}

export function startLesson(ids: string[], mode: SessionMode = "study") {
  router.push({ pathname: "/session", params: { ids: ids.join(","), mode } });
}
