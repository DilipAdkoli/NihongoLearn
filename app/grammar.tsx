import { Link } from "expo-router";
import { useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { grammar, grammarKey } from "../src/grammar";
import type { Attempt } from "../src/storage.types";
import { useStudy } from "../src/study";

function GrammarLesson({
  lesson,
  onAnswer,
}: {
  lesson: (typeof grammar)[number];
  onAnswer: (attempt: Attempt) => Promise<void>;
}) {
  const [choice, setChoice] = useState("");
  const [result, setResult] = useState<Attempt>();
  const [pending, setPending] = useState(false);
  const [failed, setFailed] = useState(false);
  const active = useRef(false);
  const saving = useRef<Attempt | null>(null);

  async function check() {
    if (!choice || active.current || result) return;
    active.current = true;
    setPending(true);
    setFailed(false);
    const attempt: Attempt = saving.current ?? {
      id: `grammar-${lesson.id}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      kanaId: grammarKey(lesson.id),
      mode: "recognition",
      answer: choice,
      correct: choice === lesson.answer,
      at: Date.now(),
    };
    saving.current = attempt;
    try {
      await onAnswer(attempt);
      setResult(attempt);
      saving.current = null;
    } catch {
      setFailed(true);
    } finally {
      setPending(false);
      active.current = false;
    }
  }

  function retry() {
    setResult(undefined);
    setChoice("");
  }

  return (
    <View style={s.card}>
      <Text accessibilityRole="header" style={s.heading}>
        {lesson.title}
      </Text>
      <Text style={s.body}>{lesson.explanation}</Text>
      <View style={s.example}>
        <Text style={s.japanese}>{lesson.japanese}</Text>
        <Text style={s.body}>{lesson.english}</Text>
      </View>
      <Text style={s.body}>{lesson.prompt}</Text>
      <Text style={s.japanese}>{lesson.stem}</Text>
      <View style={s.choices}>
        {lesson.choices.map((value) => (
          <Pressable
            key={value}
            accessibilityRole="button"
            accessibilityState={{
              selected: value === choice,
              disabled: pending || failed || !!result,
            }}
            disabled={pending || failed || !!result}
            onPress={() => setChoice(value)}
            style={[s.choice, value === choice && s.selected]}
          >
            <Text style={s.choiceLabel}>{value}</Text>
          </Pressable>
        ))}
      </View>
      {!!result && (
        <Text accessibilityLiveRegion="polite" style={s.body}>
          {result.correct ? "Correct. " : `The answer is ${lesson.answer}. `}
          {lesson.feedback}
        </Text>
      )}
      {failed && (
        <Text accessibilityLiveRegion="polite" style={s.error}>
          This answer couldn’t be saved. Try again.
        </Text>
      )}
      <Pressable
        accessibilityRole="button"
        disabled={!choice || pending}
        accessibilityState={{ disabled: !choice || pending }}
        onPress={result ? retry : check}
        style={[s.action, (!choice || pending) && s.disabled]}
      >
        <Text style={s.actionLabel}>
          {result ? "Try again" : failed ? "Retry save" : "Check answer"}
        </Text>
      </Pressable>
    </View>
  );
}

export default function Grammar() {
  const { answer } = useStudy();
  return (
    <View style={s.page}>
      <Link href="/learn" style={s.back}>
        ‹ Back to Learn
      </Link>
      <Text accessibilityRole="header" style={s.title}>
        First Japanese sentences
      </Text>
      {grammar.map((lesson) => (
        <GrammarLesson key={lesson.id} lesson={lesson} onAnswer={answer} />
      ))}
    </View>
  );
}

const s = StyleSheet.create({
  page: { gap: 17, width: "100%", maxWidth: 760 },
  back: {
    color: "#215848",
    fontFamily: "DMSansBold",
    alignSelf: "flex-start",
    paddingVertical: 8,
  },
  title: {
    color: "#203730",
    fontFamily: "DMSerifText",
    fontSize: 36,
    lineHeight: 45,
  },
  heading: { color: "#203730", fontFamily: "DMSerifText", fontSize: 25 },
  card: {
    padding: 17,
    gap: 10,
    borderColor: "#dadfd3",
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: "#fffef8",
  },
  body: {
    fontFamily: "DMSans",
    fontSize: 15,
    color: "#203730",
    lineHeight: 22,
  },
  example: { borderRadius: 8, backgroundColor: "#f4f3ea", padding: 12, gap: 4 },
  japanese: { fontSize: 22, color: "#203730" },
  choices: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  choice: {
    minWidth: 60,
    minHeight: 44,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#dadfd3",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  choiceLabel: { fontSize: 18, color: "#203730" },
  selected: { backgroundColor: "#dfe8d9", borderColor: "#215848" },
  action: {
    minHeight: 44,
    justifyContent: "center",
    backgroundColor: "#215848",
    borderRadius: 8,
    alignSelf: "flex-start",
    paddingHorizontal: 14,
  },
  actionLabel: { fontFamily: "DMSansBold", color: "#fffef8" },
  disabled: { opacity: 0.65 },
  error: { fontFamily: "DMSans", color: "#8d392b" },
});
