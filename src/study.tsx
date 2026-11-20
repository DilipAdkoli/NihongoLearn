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
import type { Attempt, StudyData } from "./storage.types";

type StudyContext = {
  data: StudyData;
  see: (id: string) => Promise<void>;
  answer: (attempt: Attempt) => Promise<void>;
  changeSound: (enabled: boolean) => Promise<void>;
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
    async changeSound(enabled) {
      await storage.setSound(enabled);
      setData((old) => old && { ...old, sound: enabled });
    },
  };
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useStudy() {
  const context = useContext(Context);
  if (!context) throw new Error("StudyProvider is required.");
  return context;
}

export function startLesson(ids: string[], review = false, listening = false) {
  router.push({
    pathname: "/session",
    params: {
      ids: ids.join(","),
      review: review ? "1" : "0",
      listening: listening ? "1" : "0",
    },
  });
}
