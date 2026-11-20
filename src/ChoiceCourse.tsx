import { Link } from "expo-router";
import { useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { playClip } from "./audio";
import type { Attempt } from "./storage.types";
import { useStudy } from "./study";

export type ChoiceLesson = {
  id: string;
  title: string;
  explanation: string;
  japanese: string;
  english: string;
  prompt: string;
  stem: string;
  choices: readonly string[];
  answer: string;
  feedback: string;
  audio?: number;
};

type Course =
  | "grammar"
  | "vocabulary"
  | "reading"
  | "passage-listening"
  | "kanji"
  | "conversation"
  | "saved-words"
  | "loanwords";

type PassageData = {
  japanese: string;
  english: string;
  audio?: readonly [number, number];
};

export type CourseGroup = {
  title?: string;
  passage?: PassageData;
  lessons: readonly ChoiceLesson[];
};

export function lessonKey(course: Course, id: string) {
  return `${course}:${id}`;
}

function PracticeCard({
  course,
  lesson,
  onAnswer,
}: {
  course: Course;
  lesson: ChoiceLesson;
  onAnswer: (attempt: Attempt) => Promise<void>;
}) {
  const studyFirst = course === "vocabulary" || course === "kanji";
  const [practice, setPractice] = useState(!studyFirst);
  const [audioError, setAudioError] = useState(false);
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
      id: `${course}-${lesson.id}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      kanaId: lessonKey(course, lesson.id),
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
    setPractice(!studyFirst);
    setResult(undefined);
    setChoice("");
  }

  return (
    <View style={s.card}>
      <Text accessibilityRole="header" style={s.heading}>
        {lesson.title}
      </Text>
      {(!practice || course === "grammar" || course === "conversation") && (
        <>
          {!!lesson.explanation && (
            <Text style={s.body}>{lesson.explanation}</Text>
          )}
          <View style={s.example}>
            {lesson.japanese !== lesson.title && (
              <Text style={s.japanese}>{lesson.japanese}</Text>
            )}
            <Text style={s.body}>{lesson.english}</Text>
            {lesson.audio !== undefined && (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`Listen to ${lesson.title}`}
                style={s.choice}
                onPress={async () => {
                  try {
                    setAudioError(false);
                    await playClip(lesson.audio!);
                  } catch {
                    setAudioError(true);
                  }
                }}
              >
                <Text style={s.choiceLabel}>♪ Listen</Text>
              </Pressable>
            )}
            {audioError && (
              <Text style={s.error}>
                Audio couldn’t play. Tap Listen to retry.
              </Text>
            )}
          </View>
        </>
      )}
      {!practice ? (
        <Pressable
          accessibilityRole="button"
          style={s.action}
          onPress={() => setPractice(true)}
        >
          <Text style={s.actionLabel}>
            {course === "kanji" ? "Practice kanji" : "Practice word"}
          </Text>
        </Pressable>
      ) : (
        <>
          <Text style={s.body}>{lesson.prompt}</Text>
          {!!lesson.stem && lesson.stem !== lesson.title && (
            <Text style={s.japanese}>{lesson.stem}</Text>
          )}
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
              {result.correct
                ? "Correct. "
                : `The answer is ${lesson.answer}. `}
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
        </>
      )}
    </View>
  );
}

function Passage({ japanese, english, audio }: PassageData) {
  const [translated, setTranslated] = useState(false);
  const [transcript, setTranscript] = useState(false);
  const [audioError, setAudioError] = useState(false);
  async function listen(clip: number) {
    setAudioError(false);
    try {
      await playClip(clip);
    } catch {
      setAudioError(true);
    }
  }

  return (
    <View style={s.card}>
      {audio && (
        <View style={s.choices}>
          <Pressable
            accessibilityRole="button"
            style={s.action}
            onPress={() => listen(audio[0])}
          >
            <Text style={s.actionLabel}>Listen</Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            style={s.choice}
            onPress={() => listen(audio[1])}
          >
            <Text style={s.body}>Listen slowly</Text>
          </Pressable>
        </View>
      )}
      {audioError && (
        <Text accessibilityLiveRegion="polite" style={s.error}>
          Audio couldn’t play. Tap Listen to retry.
        </Text>
      )}
      {(!audio || transcript) && <Text style={s.japanese}>{japanese}</Text>}
      {translated && <Text style={s.body}>{english}</Text>}
      <View style={s.choices}>
        {audio && (
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ expanded: transcript }}
            onPress={() => setTranscript(!transcript)}
            style={s.choice}
          >
            <Text style={s.body}>
              {transcript ? "Hide transcript" : "Show transcript"}
            </Text>
          </Pressable>
        )}
        <Pressable
          accessibilityRole="button"
          accessibilityState={{ expanded: translated }}
          onPress={() => setTranslated(!translated)}
          style={audio ? s.choice : s.action}
        >
          <Text style={audio ? s.body : s.actionLabel}>
            {translated ? "Hide translation" : "Show translation"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

export function ChoiceCourse({
  title,
  course,
  groups,
  backHref = "/learn",
  backLabel = "‹ Back to Learn",
}: {
  title: string;
  course: Course;
  groups: readonly CourseGroup[];
  backHref?: "/learn" | "/dictionary" | "/loanwords";
  backLabel?: string;
}) {
  const { answer } = useStudy();
  return (
    <View style={s.page}>
      <Link href={backHref} style={s.back}>
        {backLabel}
      </Link>
      <Text accessibilityRole="header" style={s.title}>
        {title}
      </Text>
      {groups.map((group) => (
        <View key={group.title ?? course} style={{ gap: 14 }}>
          {group.title && (
            <Text accessibilityRole="header" style={s.heading}>
              {group.title}
            </Text>
          )}
          {group.passage && <Passage {...group.passage} />}
          {group.lessons.map((lesson) => (
            <PracticeCard
              key={lesson.id}
              course={course}
              lesson={lesson}
              onAnswer={answer}
            />
          ))}
        </View>
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
