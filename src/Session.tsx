import { createThemedStyles, useThemeColor } from "./theme";
import { useEffect, useRef, useState, type ComponentRef } from "react";
import {
  Keyboard,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { playKana } from "./audio";
import { JapaneseText } from "./JapaneseText";
import {
  evaluateAnswer,
  kana,
  lessons,
  makeExercises,
  type Kana,
  type SessionMode,
} from "./learning";
import { recommendedLesson } from "./placement";
import type { Attempt } from "./storage.types";

type SessionProps = {
  ids: string[];
  mode: SessionMode;
  sound: boolean;
  romaji: boolean;
  onSeen: (id: string) => Promise<void>;
  onAttempt: (attempt: Attempt) => Promise<void>;
  onClose: () => void;
  onFinish: () => void;
  onRecommendedLesson: (ids: string[]) => void;
};

function Action({
  label,
  disabled,
  onPress,
}: {
  label: string;
  disabled?: boolean;
  onPress: () => void;
}) {
  const s = useStyles();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        s.action,
        disabled && s.disabled,
        pressed && s.pressed,
      ]}
    >
      <Text style={s.actionText}>{label}</Text>
    </Pressable>
  );
}

function ListenButton({ id, label }: { id: string; label: string }) {
  const s = useStyles();
  const [audioError, setAudioError] = useState(false);
  async function listen() {
    try {
      await playKana(id);
      setAudioError(false);
    } catch {
      setAudioError(true);
    }
  }
  return (
    <>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={label}
        style={({ pressed }) => [s.listen, pressed && s.pressed]}
        onPress={listen}
      >
        <Text style={s.listenText}>♪ Listen</Text>
      </Pressable>
      {audioError && (
        <Text accessibilityLiveRegion="polite" style={s.error}>
          Audio couldn’t play. Tap Listen to retry.
        </Text>
      )}
    </>
  );
}

function LessonCard({
  item,
  sound,
  romaji,
}: {
  item: Kana;
  sound: boolean;
  romaji: boolean;
}) {
  const s = useStyles();
  return (
    <>
      <View style={s.studyCard}>
        <JapaneseText
          style={s.glyph}
          accessibilityLabel={
            romaji ? `${item.script} ${item.reading}` : undefined
          }
        >
          {item.glyph}
        </JapaneseText>
        {romaji && <Text style={s.reading}>{item.reading}</Text>}
        {sound && (
          <ListenButton
            id={item.id}
            label={romaji ? `Listen to ${item.reading}` : "Listen to the sound"}
          />
        )}
      </View>
      {romaji && <Text style={s.cue}>{item.cue}</Text>}
      {item.example && (
        <View style={s.example}>
          <Text style={s.label}>IN A WORD</Text>
          <JapaneseText style={s.exampleWord}>
            {item.example}
            {romaji && (
              <Text style={s.exampleReading}> {item.exampleReading}</Text>
            )}
          </JapaneseText>
          <Text style={s.body}>{item.meaning}</Text>
        </View>
      )}
    </>
  );
}

export default function Session({
  ids,
  mode,
  sound,
  romaji,
  onSeen,
  onAttempt,
  onClose,
  onFinish,
  onRecommendedLesson,
}: SessionProps) {
  const s = useStyles();
  const themeColor = useThemeColor();
  const listening = mode === "listening";
  const [items] = useState(() => kana.filter((item) => ids.includes(item.id)));
  const [exercises] = useState(() => makeExercises(ids, mode));
  const [sessionId] = useState(
    () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`,
  );
  const [stage, setStage] = useState<"lesson" | "quiz" | "results">(
    mode === "study" ? "lesson" : "quiz",
  );
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const request = useRef("");
  const pendingAttempt = useRef<Attempt | null>(null);
  const scroll = useRef<ComponentRef<typeof ScrollView>>(null);
  const stepKey = `${stage}-${index}`;
  const exercise = exercises[index];
  const item =
    stage === "lesson"
      ? items[index]
      : kana.find((k) => k.id === exercise?.kanaId);
  const feedback = stage === "quiz" ? attempts[index] : undefined;
  const total = stage === "lesson" ? items.length : exercises.length;
  const last = index + 1 === total;

  useEffect(() => {
    scroll.current?.scrollTo({ y: 0, animated: false });
  }, [stage, index]);

  async function saveStep() {
    if (!item || feedback || request.current === stepKey) return;
    if (stage === "quiz" && !answer.trim()) return;
    request.current = stepKey;
    setBusy(true);
    setError("");
    try {
      if (stage === "lesson") {
        await onSeen(item.id);
        if (last) {
          setStage("quiz");
          setIndex(0);
        } else {
          setIndex(index + 1);
        }
      } else {
        Keyboard.dismiss();
        // A write may succeed before its acknowledgement arrives. Keep the
        // same response, timestamp and id when retrying that operation.
        const attempt: Attempt = pendingAttempt.current ?? {
          id: `${sessionId}-${index}`,
          at: Date.now(),
          kanaId: item.id,
          mode: exercise.mode,
          answer: answer.trim(),
          correct: evaluateAnswer(exercise, answer),
        };
        pendingAttempt.current = attempt;
        await onAttempt(attempt);
        pendingAttempt.current = null;
        setAttempts((previous) => [...previous, attempt]);
      }
    } catch {
      request.current = "";
      setError("Couldn’t save to this device. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  function nextQuestion() {
    setAnswer("");
    if (last) setStage("results");
    else setIndex(index + 1);
  }

  const lesson = lessons.find(
    (entry) =>
      entry.ids.length === items.length &&
      items.every((item) => entry.ids.includes(item.id)),
  );
  const title =
    stage === "lesson"
      ? (lesson?.title ?? "Study kana")
      : stage === "results"
        ? "Practice complete"
        : exercise?.mode !== "recall"
          ? `Choose the ${item?.script ?? "kana"}`
          : "Type the reading";
  const heading =
    mode === "placement"
      ? "Basic kana check"
      : listening
        ? "Listening practice"
        : mode === "contrast"
          ? "Compare kana"
          : mode === "review"
            ? "Review"
            : `${(lesson?.script ?? items[0]?.script) === "katakana" ? "Katakana" : "Hiragana"} lesson`;
  const countCorrect = attempts.filter((a) => a.correct).length;

  const suggestion =
    stage === "results" && mode === "placement"
      ? recommendedLesson(attempts)
      : undefined;
  return (
    <ScrollView
      ref={scroll}
      style={s.screen}
      contentContainerStyle={s.page}
      keyboardShouldPersistTaps="handled"
      onContentSizeChange={() => {
        if (feedback) scroll.current?.scrollToEnd({ animated: false });
      }}
    >
      <View style={s.column}>
        <View style={s.topRow}>
          <Text style={s.section}>{heading}</Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Close session"
            accessibilityState={{ disabled: busy }}
            disabled={busy}
            onPress={onClose}
            style={({ pressed }) => [s.close, pressed && s.pressed]}
          >
            <Text style={s.closeGlyph}>×</Text>
          </Pressable>
        </View>
        {items.length === 0 ? (
          <>
            <Text accessibilityRole="header" style={s.title}>
              No kana selected
            </Text>
            <Action label="Back" onPress={onClose} />
          </>
        ) : (
          <>
            <View style={s.stepRow}>
              <Text style={s.label}>
                {stage === "lesson"
                  ? "STUDY"
                  : stage === "quiz"
                    ? "PRACTICE"
                    : "SESSION SUMMARY"}
              </Text>
              {stage !== "results" && (
                <Text style={s.count}>
                  {index + 1} of {total}
                </Text>
              )}
            </View>
            {stage !== "results" && (
              <View
                style={s.track}
                accessible
                accessibilityRole="progressbar"
                accessibilityValue={{ min: 0, max: total, now: index + 1 }}
              >
                <View
                  style={[s.fill, { width: `${((index + 1) / total) * 100}%` }]}
                />
              </View>
            )}
            <Text accessibilityRole="header" style={s.title}>
              {title}
            </Text>
            {stage === "lesson" && item && (
              <LessonCard
                key={item.id}
                item={item}
                sound={sound}
                romaji={romaji}
              />
            )}
            {stage === "quiz" && item && (
              <>
                {listening ? (
                  <View style={s.prompt}>
                    <ListenButton
                      key={index}
                      id={item.id}
                      label="Listen to the sound"
                    />
                  </View>
                ) : (
                  <View style={s.prompt}>
                    <Text style={s.label}>
                      {exercise.mode === "recognition"
                        ? "ROMAJI"
                        : item.script.toUpperCase()}
                    </Text>
                    <JapaneseText
                      scaleText={exercise.mode !== "recognition"}
                      style={
                        exercise.mode === "recognition"
                          ? s.promptReading
                          : s.promptGlyph
                      }
                    >
                      {exercise.mode === "recognition"
                        ? item.reading
                        : item.glyph}
                    </JapaneseText>
                  </View>
                )}
                {exercise.mode !== "recall" ? (
                  <View style={s.choices}>
                    {exercise.choices.map((choice) => (
                      <Pressable
                        key={choice}
                        accessibilityRole="button"
                        accessibilityLabel={choice}
                        accessibilityState={{
                          selected: answer === choice,
                          disabled: busy || !!feedback || !!error,
                        }}
                        disabled={busy || !!feedback || !!error}
                        onPress={() => setAnswer(choice)}
                        style={({ pressed }) => [
                          s.choice,
                          answer === choice && s.selected,
                          !!feedback && choice === item.glyph && s.rightChoice,
                          !!feedback &&
                            !feedback.correct &&
                            choice === answer &&
                            s.wrongChoice,
                          pressed && s.pressed,
                        ]}
                      >
                        <JapaneseText style={s.choiceGlyph}>
                          {choice}
                        </JapaneseText>
                      </Pressable>
                    ))}
                  </View>
                ) : (
                  <View>
                    <Text style={s.inputLabel}>Your answer in romaji</Text>
                    <TextInput
                      accessibilityLabel="Your answer in romaji"
                      value={answer}
                      onChangeText={setAnswer}
                      autoCapitalize="none"
                      autoCorrect={false}
                      maxLength={32}
                      placeholder="Type here"
                      placeholderTextColor={themeColor("#72796f")}
                      returnKeyType="done"
                      style={s.input}
                      editable={!busy && !feedback && !error}
                      onSubmitEditing={saveStep}
                    />
                  </View>
                )}
                {feedback && (
                  <View
                    accessibilityLiveRegion="polite"
                    style={[s.feedback, !feedback.correct && s.correction]}
                  >
                    <Text style={s.feedbackHeading}>
                      {feedback.correct ? "Correct!" : "Let’s look again"}
                    </Text>
                    <Text style={s.body}>
                      {item.glyph} is read “{item.reading}”.
                      {feedback.correct ? "" : ` ${item.cue}`}
                    </Text>
                  </View>
                )}
              </>
            )}
            {stage === "results" && (
              <>
                <View style={s.resultCard}>
                  <Text style={s.label}>CORRECT ANSWERS</Text>
                  <Text style={s.score}>
                    {countCorrect}{" "}
                    <Text style={s.scoreTotal}>/ {attempts.length}</Text>
                  </Text>
                  {(listening
                    ? (["listening"] as const)
                    : (["recognition", "recall"] as const)
                  ).map((mode) => {
                    const group = attempts.filter((a) => a.mode === mode);
                    return (
                      <View key={mode} style={s.stat}>
                        <Text style={s.body}>
                          {mode === "listening"
                            ? "Listening"
                            : mode === "recognition"
                              ? "Recognition"
                              : "Typed recall"}
                        </Text>
                        <Text style={s.statNumber}>
                          {group.filter((a) => a.correct).length} /{" "}
                          {group.length}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              </>
            )}
            {stage === "results" && mode === "placement" && (
              <View style={s.resultCard}>
                <Text style={s.label}>WHERE TO PRACTICE NEXT</Text>
                <Text style={s.body}>
                  {suggestion
                    ? suggestion.title
                    : "All sampled characters were correct. Try a marked or contracted row next."}
                </Text>
                {suggestion && (
                  <Action
                    label="Open suggested lesson"
                    onPress={() => onRecommendedLesson(suggestion.ids)}
                  />
                )}
              </View>
            )}
            {!!error && (
              <Text accessibilityLiveRegion="polite" style={s.error}>
                {error}
              </Text>
            )}
            {stage === "results" ? (
              <Action label="View progress" onPress={onFinish} />
            ) : feedback ? (
              <Action
                label={last ? "See results" : "Next question"}
                onPress={nextQuestion}
              />
            ) : (
              <Action
                label={
                  busy
                    ? "Saving…"
                    : error
                      ? "Retry save"
                      : stage === "quiz"
                        ? "Check answer"
                        : last
                          ? "Start practice"
                          : "Next kana"
                }
                onPress={saveStep}
                disabled={busy || (stage === "quiz" && !answer.trim())}
              />
            )}
          </>
        )}
      </View>
    </ScrollView>
  );
}

const ink = "#203730";
const green = "#215848";
const border = "#cdd3c7";
const useStyles = createThemedStyles({
  screen: { flex: 1, backgroundColor: "#f7f6f0" },
  page: {
    paddingHorizontal: 22,
    paddingTop: 16,
    paddingBottom: 48,
    alignItems: "center",
  },
  column: { width: "100%", maxWidth: 600 },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 32,
  },
  section: { fontFamily: "DMSansBold", color: green, fontSize: 16 },
  close: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 22,
    borderColor: border,
    borderWidth: 1,
  },
  closeGlyph: { fontSize: 27, color: ink, lineHeight: 31 },
  stepRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontFamily: "DMSansBold",
    fontSize: 11,
    letterSpacing: 1.35,
    color: "#51665a",
  },
  count: { color: "#51665a", fontSize: 13, fontFamily: "DMSans" },
  track: {
    marginTop: 8,
    height: 4,
    borderRadius: 6,
    overflow: "hidden",
    backgroundColor: "#dce2d7",
  },
  fill: { backgroundColor: green, height: "100%" },
  title: {
    color: ink,
    fontFamily: "DMSerifText",
    fontSize: 35,
    lineHeight: 43,
    marginVertical: 20,
  },
  studyCard: {
    alignItems: "center",
    borderWidth: 1,
    borderColor: border,
    borderRadius: 18,
    backgroundColor: "#e9eee4",
    padding: 17,
  },
  glyph: { fontSize: 90, color: ink },
  reading: {
    fontFamily: "DMSerifText",
    fontSize: 35,
    color: green,
    marginTop: -5,
  },
  listen: {
    marginTop: 9,
    minHeight: 44,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#b0c0ae",
    borderRadius: 24,
    paddingHorizontal: 16,
  },
  listenText: { color: green, fontFamily: "DMSansBold", fontSize: 14 },
  cue: {
    color: ink,
    fontFamily: "DMSans",
    fontSize: 17,
    lineHeight: 26,
    marginVertical: 18,
  },
  example: {
    borderLeftWidth: 3,
    borderColor: "#c95634",
    backgroundColor: "#f2ede0",
    paddingVertical: 12,
    paddingHorizontal: 17,
  },
  exampleWord: { color: ink, fontSize: 23, marginVertical: 3 },
  exampleReading: { fontFamily: "DMSans", color: "#536357", fontSize: 16 },
  body: { color: ink, fontFamily: "DMSans", fontSize: 16, lineHeight: 24 },
  prompt: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 162,
    padding: 16,
    backgroundColor: "#e9eee4",
    borderWidth: 1,
    borderColor: border,
    borderRadius: 18,
    marginBottom: 18,
  },
  promptReading: { fontFamily: "DMSerifText", color: ink, fontSize: 70 },
  promptGlyph: { fontSize: 73, color: ink },
  choices: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
  },
  choice: {
    width: "48%",
    minHeight: 67,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: border,
    borderRadius: 12,
    backgroundColor: "#fffdf7",
  },
  selected: { borderColor: green, backgroundColor: "#e3ece2" },
  rightChoice: { borderColor: green, backgroundColor: "#dbe9d9" },
  wrongChoice: { borderColor: "#ae563b", backgroundColor: "#f6e7dc" },
  choiceGlyph: { color: ink, fontSize: 30 },
  inputLabel: {
    fontFamily: "DMSansBold",
    fontSize: 15,
    color: ink,
    marginBottom: 8,
  },
  input: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    minHeight: 54,
    borderWidth: 1.5,
    borderColor: "#8f9d8f",
    backgroundColor: "#fffdf7",
    borderRadius: 10,
    color: ink,
    fontFamily: "DMSans",
    fontSize: 19,
  },
  feedback: {
    backgroundColor: "#e4ecdf",
    borderLeftWidth: 3,
    borderColor: green,
    marginTop: 16,
    padding: 14,
    gap: 4,
  },
  correction: { borderColor: "#ab5236", backgroundColor: "#f3e8de" },
  feedbackHeading: { fontFamily: "DMSansBold", color: ink, fontSize: 17 },
  resultCard: {
    borderWidth: 1,
    borderColor: border,
    backgroundColor: "#e9eee4",
    borderRadius: 18,
    padding: 22,
  },
  score: {
    fontFamily: "DMSerifText",
    fontSize: 60,
    color: ink,
    marginBottom: 12,
  },
  scoreTotal: { fontSize: 34, color: "#637465" },
  stat: {
    justifyContent: "space-between",
    flexDirection: "row",
    borderTopWidth: 1,
    borderColor: border,
    paddingVertical: 10,
  },
  statNumber: { fontFamily: "DMSansBold", color: ink, fontSize: 16 },
  error: {
    color: "#933f27",
    marginTop: 12,
    fontFamily: "DMSans",
    fontSize: 14,
  },
  action: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 50,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: green,
  },
  actionText: { color: "#ffffff", fontFamily: "DMSansBold", fontSize: 16 },
  disabled: { backgroundColor: "#657669" },
  pressed: { opacity: 0.76 },
});
