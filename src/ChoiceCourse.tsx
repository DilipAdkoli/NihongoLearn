import { createThemedStyles, useThemeColor } from "./theme";
import { Link, useLocalSearchParams, type Href } from "expo-router";
import { useRef, useState, type ReactNode } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { playClip } from "./audio";
import { glossaryKey } from "./glossary";
import { glossaryEntries } from "./glossaryEntries";
import { JapaneseText, useJapaneseTextStyle } from "./JapaneseText";
import { hasJapanese } from "./japaneseTextSize";
import type { Attempt } from "./storage.types";
import { matchesTypedAnswer } from "./typedAnswer";
import { useStudy } from "./study";
import { useClipPlayback } from "./useClipPlayback";
import { useWordBookmarks } from "./useWordBookmarks";

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
  promptAudio?: number;
  answerAudio?: number;
  acceptedAnswers?: readonly string[];
  normalizeAnswer?: (text: string) => string;
};

type Course =
  | "grammar"
  | "vocabulary"
  | "reading"
  | "passage-listening"
  | "kanji"
  | "kanji-reading"
  | "kanji-recall"
  | "conversation"
  | "saved-words"
  | "saved-word-recall"
  | "loanwords"
  | "numbers"
  | "time"
  | "calendar"
  | "vocabulary-recall"
  | "counters"
  | "prices"
  | "beginner-check"
  | "writing-type"
  | "sound-listening"
  | "schedule-listening";

type PassageData = {
  japanese: string;
  standardJapanese?: string;
  english: string;
  audio?: readonly [number, number];
  lookupWords?: readonly string[];
};

export type CourseGroup = {
  id?: string;
  title?: string;
  passage?: PassageData;
  lessons: readonly ChoiceLesson[];
};

export function lessonKey(course: Course, id: string) {
  return `${course}:${id}`;
}

export function useChoiceTopic() {
  const { topic } = useLocalSearchParams<{ topic?: string }>();
  return typeof topic === "string" ? topic : undefined;
}

function ClipButton({
  clip,
  label,
  accessibilityLabel = label,
}: {
  clip: number;
  label: string;
  accessibilityLabel?: string;
}) {
  const s = useStyles();
  const [audioError, setAudioError] = useState(false);

  return (
    <>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        style={s.choice}
        onPress={async () => {
          try {
            setAudioError(false);
            await playClip(clip);
          } catch {
            setAudioError(true);
          }
        }}
      >
        <Text style={s.choiceLabel}>♪ {label}</Text>
      </Pressable>
      {audioError && (
        <Text accessibilityLiveRegion="polite" style={s.error}>
          Audio couldn’t play. Tap again to retry.
        </Text>
      )}
    </>
  );
}

function PracticeCard({
  course,
  lesson,
  onAnswer,
  reviewQuestions,
}: {
  course: Course;
  lesson: ChoiceLesson;
  onAnswer: (attempt: Attempt) => Promise<void>;
  reviewQuestions: boolean;
}) {
  const s = useStyles();
  const themeColor = useThemeColor();
  const studyFirst =
    !reviewQuestions && (course === "vocabulary" || course === "kanji");
  const questionHeading = reviewQuestions && course === "grammar";
  const [practice, setPractice] = useState(!studyFirst);
  const [choice, setChoice] = useState("");
  const [result, setResult] = useState<Attempt>();
  const [pending, setPending] = useState(false);
  const [failed, setFailed] = useState(false);
  const active = useRef(false);
  const saving = useRef<Attempt | null>(null);
  const accepted = lesson.acceptedAnswers;
  const inputStyle = useJapaneseTextStyle(s.answerInput, !!accepted);
  const heading = questionHeading ? lesson.prompt : lesson.title;
  const canCheck = !!choice.trim() && !pending;

  async function check() {
    if (!canCheck || active.current || result) return;
    active.current = true;
    setPending(true);
    setFailed(false);
    const attempt: Attempt = saving.current ?? {
      id: `${course}-${lesson.id}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      kanaId: lessonKey(course, lesson.id),
      mode: accepted
        ? "recall"
        : lesson.promptAudio === undefined
          ? "recognition"
          : "listening",
      answer: choice.trim(),
      correct: accepted
        ? matchesTypedAnswer(choice, accepted, lesson.normalizeAnswer)
        : choice === lesson.answer,
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
      <JapaneseText
        accessibilityRole="header"
        style={s.heading}
        scaleText={hasJapanese(heading)}
      >
        {heading}
      </JapaneseText>
      {(!practice ||
        (course === "grammar" && !reviewQuestions) ||
        course === "conversation") && (
        <>
          {!!lesson.explanation && (
            <Text style={s.body}>{lesson.explanation}</Text>
          )}
          <View style={s.example}>
            {lesson.japanese !== lesson.title && (
              <JapaneseText
                style={s.japanese}
                scaleText={hasJapanese(lesson.japanese)}
              >
                {lesson.japanese}
              </JapaneseText>
            )}
            <JapaneseText
              style={s.body}
              scaleText={hasJapanese(lesson.english)}
            >
              {lesson.english}
            </JapaneseText>
            {lesson.audio !== undefined && (
              <ClipButton
                clip={lesson.audio}
                label="Listen"
                accessibilityLabel={`Listen to ${lesson.title}`}
              />
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
          {!questionHeading && (
            <JapaneseText style={s.body} scaleText={hasJapanese(lesson.prompt)}>
              {lesson.prompt}
            </JapaneseText>
          )}
          {!!lesson.stem && lesson.stem !== lesson.title && (
            <JapaneseText
              style={s.japanese}
              scaleText={hasJapanese(lesson.stem)}
            >
              {lesson.stem}
            </JapaneseText>
          )}
          {lesson.promptAudio !== undefined && (
            <ClipButton
              clip={lesson.promptAudio}
              label="Listen"
              accessibilityLabel={`Listen to ${lesson.title.toLowerCase()}`}
            />
          )}
          {accepted ? (
            <TextInput
              accessibilityLabel="Your answer in Japanese"
              placeholder="Type in Japanese"
              placeholderTextColor={themeColor("#566860")}
              autoCorrect={false}
              autoCapitalize="none"
              maxLength={course === "writing-type" ? 120 : 50}
              editable={!pending && !failed && !result}
              value={choice}
              onChangeText={setChoice}
              onSubmitEditing={check}
              returnKeyType="done"
              style={inputStyle}
            />
          ) : (
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
                  <JapaneseText
                    style={s.choiceLabel}
                    scaleText={hasJapanese(value)}
                  >
                    {value}
                  </JapaneseText>
                </Pressable>
              ))}
            </View>
          )}
          {!!result && (
            <Text accessibilityLiveRegion="polite" style={s.body}>
              {result.correct
                ? "Correct. "
                : `The answer is ${lesson.answer}. `}
              {lesson.feedback}
            </Text>
          )}
          {result && lesson.answerAudio !== undefined && (
            <ClipButton
              clip={lesson.answerAudio}
              label="Hear the correct response"
            />
          )}
          {failed && (
            <Text accessibilityLiveRegion="polite" style={s.error}>
              This answer couldn’t be saved. Try again.
            </Text>
          )}
          <Pressable
            accessibilityRole="button"
            disabled={!canCheck}
            accessibilityState={{ disabled: !canCheck }}
            onPress={result ? retry : check}
            style={[s.action, !canCheck && s.disabled]}
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

function PassageVocabulary({ terms }: { terms: readonly string[] }) {
  const s = useStyles();
  const [shown, setShown] = useState(false);
  const { saved, saving, saveFailed, toggleWord } = useWordBookmarks();
  const words = terms.flatMap((term) => {
    const entry = glossaryEntries.find(
      (candidate) => candidate.spelling === term,
    );
    return entry ? [entry] : [];
  });
  if (!words.length) return null;

  return (
    <View style={{ gap: 8 }}>
      <Pressable
        accessibilityRole="button"
        aria-expanded={shown}
        onPress={() => setShown((visible) => !visible)}
        style={[s.choice, { alignSelf: "flex-start" }]}
      >
        <Text style={s.body}>
          {shown ? "Hide vocabulary" : "Show vocabulary"}
        </Text>
      </Pressable>
      {shown &&
        words.map((word) => {
          const isSaved = saved.has(glossaryKey(word));
          return (
            <View key={word.spelling} style={s.example}>
              <JapaneseText style={s.japanese}>{word.spelling}</JapaneseText>
              <Text style={s.body}>
                {word.kana !== word.spelling ? word.kana + " · " : ""}
                {word.meaning}
              </Text>
              <View style={s.choices}>
                {word.audio !== undefined && (
                  <ClipButton
                    clip={word.audio}
                    label="Listen"
                    accessibilityLabel={`Listen to ${word.spelling}`}
                  />
                )}
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={`${isSaved ? "Remove saved word" : "Save"} ${word.spelling}`}
                  disabled={saving}
                  onPress={() => toggleWord(word)}
                  style={[s.choice, isSaved && s.selected]}
                >
                  <Text style={s.choiceLabel}>
                    {isSaved ? "Saved" : "Save"}
                  </Text>
                </Pressable>
              </View>
            </View>
          );
        })}
      {shown && saveFailed && (
        <Text accessibilityLiveRegion="polite" style={s.error}>
          Couldn’t update saved words. Try again.
        </Text>
      )}
    </View>
  );
}

function Passage({
  japanese,
  standardJapanese,
  english,
  audio,
  lookupWords,
}: PassageData) {
  const s = useStyles();
  const [translated, setTranslated] = useState(false);
  const [transcript, setTranscript] = useState(false);
  const [showKanji, setShowKanji] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const { play, stop, playing, audioError } = useClipPlayback();

  return (
    <View style={s.card}>
      {audio && (
        <View style={s.choices}>
          <Pressable
            accessibilityRole="button"
            style={s.action}
            onPress={() => play(audio[0], { repeat })}
          >
            <Text style={s.actionLabel}>Listen</Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            style={s.choice}
            onPress={() => play(audio[1], { repeat })}
          >
            <Text style={s.body}>Listen slowly</Text>
          </Pressable>
          <Pressable
            accessibilityRole="checkbox"
            aria-checked={repeat}
            disabled={playing}
            onPress={() => setRepeat((enabled) => !enabled)}
            style={[s.choice, repeat && s.selected, playing && s.disabled]}
          >
            <Text style={s.body}>
              {repeat ? "Repeat playback on" : "Repeat playback off"}
            </Text>
          </Pressable>
          {playing && (
            <Pressable
              accessibilityRole="button"
              style={s.choice}
              onPress={stop}
            >
              <Text style={s.body}>Stop playback</Text>
            </Pressable>
          )}
        </View>
      )}
      {audioError && (
        <Text accessibilityLiveRegion="polite" style={s.error}>
          Audio couldn’t play. Tap Listen to retry.
        </Text>
      )}
      {(!audio || transcript) && (
        <JapaneseText style={s.japanese}>
          {showKanji && standardJapanese ? standardJapanese : japanese}
        </JapaneseText>
      )}
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
        {standardJapanese && (!audio || transcript) && (
          <Pressable
            accessibilityRole="button"
            onPress={() => setShowKanji((shown) => !shown)}
            style={s.choice}
          >
            <Text style={s.body}>{showKanji ? "Show kana" : "Show kanji"}</Text>
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
      {lookupWords && (!audio || transcript) && (
        <PassageVocabulary terms={lookupWords} />
      )}
    </View>
  );
}

export function ChoiceCourse({
  title,
  description,
  children,
  course,
  groups,
  backHref = "/learn",
  backLabel = "‹ Back to Learn",
  showBack = true,
  browseTopics = false,
  initialTopic,
  onTopicChange,
  reviewQuestions = false,
}: {
  title: string;
  description?: string;
  children?: ReactNode;
  course: Course;
  groups: readonly CourseGroup[];
  backHref?: Href;
  backLabel?: string;
  showBack?: boolean;
  browseTopics?: boolean;
  initialTopic?: string;
  onTopicChange?: (id: string | undefined) => void;
  reviewQuestions?: boolean;
}) {
  const s = useStyles();
  const { data, answer } = useStudy();
  const [topic, setTopic] = useState(() =>
    initialTopic
      ? Math.max(
          0,
          groups.findIndex(({ id }) => id === initialTopic),
        )
      : 0,
  );
  const showTopics = browseTopics && groups.length > 1;
  const visibleGroups = showTopics ? groups.slice(topic, topic + 1) : groups;
  const attempted = showTopics
    ? new Set(data.attempts.map((attempt) => attempt.kanaId))
    : undefined;
  return (
    <View style={s.page}>
      {showBack && (
        <Link href={backHref} style={s.back}>
          {backLabel}
        </Link>
      )}
      <Text accessibilityRole="header" style={s.title}>
        {title}
      </Text>
      {description && <Text style={s.body}>{description}</Text>}
      {children}
      {showTopics && (
        <View
          accessibilityRole="tablist"
          accessibilityLabel="Topics"
          style={s.topicGrid}
        >
          {groups.map((group, index) => {
            const tried = group.lessons.filter((lesson) =>
              attempted?.has(lessonKey(course, lesson.id)),
            ).length;
            const label = group.title ?? `Topic ${index + 1}`;
            return (
              <Pressable
                key={label}
                accessibilityRole="tab"
                accessibilityLabel={`${label}, ${tried} of ${group.lessons.length} tried`}
                aria-selected={topic === index}
                onPress={() => {
                  setTopic(index);
                  onTopicChange?.(group.id);
                }}
                style={({ pressed }) => [
                  s.topic,
                  topic === index && s.selected,
                  pressed && s.disabled,
                ]}
              >
                <Text style={s.topicLabel}>{label}</Text>
                <Text style={s.topicCount}>
                  {tried} / {group.lessons.length} tried
                </Text>
              </Pressable>
            );
          })}
        </View>
      )}
      {visibleGroups.map((group) => (
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
              reviewQuestions={reviewQuestions}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

const useStyles = createThemedStyles({
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
  topicGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  topic: {
    flexBasis: 145,
    flexGrow: 1,
    padding: 10,
    gap: 4,
    minHeight: 54,
    justifyContent: "center",
    backgroundColor: "#fffef8",
    borderColor: "#dadfd3",
    borderWidth: 1,
    borderRadius: 8,
  },
  topicLabel: { color: "#203730", fontFamily: "DMSansBold", fontSize: 14 },
  topicCount: { color: "#566860", fontFamily: "DMSans", fontSize: 12 },
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
    maxWidth: "100%",
    minHeight: 44,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#dadfd3",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  choiceLabel: { fontSize: 18, textAlign: "center", color: "#203730" },
  selected: { backgroundColor: "#dfe8d9", borderColor: "#215848" },
  answerInput: {
    paddingHorizontal: 10,
    minHeight: 46,
    color: "#203730",
    borderWidth: 1,
    borderColor: "#9bad9e",
    borderRadius: 8,
    fontSize: 18,
  },
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
