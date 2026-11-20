import { Link } from "expo-router";
import { useRef, useState } from "react";
import {
  Linking,
  Pressable,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import {
  ArrowRight,
  AudioLines,
  BookOpen,
  ChevronRight,
  CircleHelp,
  ExternalLink,
  HardDrive,
  RotateCcw,
  Sprout,
} from "lucide-react-native";

import { ActivityChart } from "./ActivityChart";
import { createBackup, parseBackup } from "./backup";
import { pickBackup } from "./pickBackup";
import { saveBackup } from "./saveBackup";
import { dailyGoals } from "./dailyGoal";
import { confusedPairs } from "./confusions";
import { missedGrammar } from "./grammarCourse";
import { kana, lessons, type Script } from "./learning";
import { placementSample } from "./placement";
import { REVIEW_BATCH_SIZE, useReviewQueue } from "./useReviewQueue";
import { startLesson, useStudy } from "./study";
import type { Attempt } from "./storage.types";

const ink = "#203730";
const green = "#215848";
const muted = "#566860";
const coral = "#c95634";
const firstLessonIds = lessons[0].ids;

function Heading({ title, detail }: { title: string; detail: string }) {
  return (
    <View style={s.heading}>
      <Text accessibilityRole="header" style={s.title}>
        {title}
      </Text>
      <Text style={s.subtitle}>{detail}</Text>
    </View>
  );
}

function Action({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [s.action, pressed && s.pressed]}
    >
      <Text style={s.actionLabel}>{label}</Text>
      <ArrowRight size={18} color="white" />
    </Pressable>
  );
}

function KanaChart({
  seen,
  script,
  romaji,
}: {
  seen: readonly string[];
  script: Script;
  romaji: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const characters = kana.filter((item) => item.script === script);
  return (
    <View style={s.list}>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ expanded }}
        onPress={() => setExpanded(!expanded)}
        style={({ pressed }) => [s.row, pressed && s.pressed]}
      >
        <View style={s.grow}>
          <Text style={s.rowTitle}>
            {script === "hiragana" ? "Hiragana" : "Katakana"} chart
          </Text>
          <Text style={s.detail}>
            {characters.filter((item) => seen.includes(item.id)).length} of{" "}
            {characters.length} studied
          </Text>
        </View>
        <ChevronRight
          size={18}
          color={muted}
          style={{ transform: [{ rotate: expanded ? "90deg" : "0deg" }] }}
        />
      </Pressable>
      {expanded && (
        <View style={s.chart}>
          {lessons
            .filter((lesson) => lesson.script === script)
            .map((lesson) => (
              <View key={lesson.title}>
                <Text style={s.rowTitle}>{lesson.notebook}</Text>
                <View style={s.chartRow}>
                  {kana
                    .filter((item) => lesson.ids.includes(item.id))
                    .map((item) => {
                      const studied = seen.includes(item.id);
                      return (
                        <Pressable
                          key={item.id}
                          accessibilityRole="button"
                          accessibilityLabel={`Study ${item.glyph}${romaji ? ", " + item.reading : ""}${studied ? ", already studied" : ""}`}
                          onPress={() => startLesson([item.id])}
                          style={({ pressed }) => [
                            s.chartTile,
                            studied && s.chartStudied,
                            pressed && s.pressed,
                          ]}
                        >
                          <Text style={s.glyph}>{item.glyph}</Text>
                          {romaji && (
                            <Text style={s.detail}>{item.reading}</Text>
                          )}
                        </Pressable>
                      );
                    })}
                </View>
              </View>
            ))}
        </View>
      )}
    </View>
  );
}

const lessonLinks = [
  {
    href: "/starter-path",
    title: "Start learning Japanese",
    detail: "Follow six steps from vowels to first conversations",
    icon: Sprout,
  },
  {
    href: "/numbers",
    title: "Count from 1 to 99",
    detail: "Read Japanese numbers and practice the tens",
    icon: BookOpen,
  },

  {
    href: "/counters",
    title: "Count things and people",
    detail: "Practice つ, 枚, and 人",
    icon: BookOpen,
  },
  {
    href: "/time",
    title: "Tell the time",
    detail: "Read hours, minutes, and half past",
    icon: BookOpen,
  },
  {
    href: "/calendar",
    title: "Read calendar dates",
    detail: "Learn months and irregular day readings",
    icon: BookOpen,
  },
  {
    href: "/conversation",
    title: "Everyday dialogue",
    detail: "Introductions, cafés, and train stations",
    icon: AudioLines,
  },
  {
    href: "/vocabulary",
    title: "Everyday vocabulary",
    detail: "Food, travel, and everyday words",
    icon: BookOpen,
  },
  {
    href: "/word-recall",
    title: "Recall Japanese words",
    detail: "Type kana or kanji from an English clue",
    icon: BookOpen,
  },
  {
    href: "/grammar",
    title: "First Japanese sentences",
    detail: "Polite statements, particles, and verbs",
    icon: BookOpen,
  },
  {
    href: "/writing",
    title: "Build a sentence",
    detail: "Arrange words and particles",
    icon: BookOpen,
  },
  {
    href: "/kanji",
    title: "First kanji in context",
    detail: "The seven days of the week",
    icon: BookOpen,
  },
  {
    href: "/reading",
    title: "Beginner reading",
    detail: "Short passages with questions and optional translations",
    icon: BookOpen,
  },
  {
    href: "/passage-listening",
    title: "Listen to short passages",
    detail: "Two speeds and an optional transcript",
    icon: AudioLines,
  },
  {
    href: "/sound-rules",
    title: "Sound and spelling rules",
    detail: "Small っ and ッ, long vowels, and ー",
    icon: AudioLines,
  },
  {
    href: "/compare-kana",
    title: "Compare similar kana",
    detail: "See and practice the differences between lookalikes",
    icon: BookOpen,
  },
  {
    href: "/loanwords",
    title: "Katakana loanword sounds",
    detail: "Look up ファ, ティ, and other combinations",
    icon: BookOpen,
  },
  {
    href: "/dictionary",
    title: "Lesson glossary",
    detail: "Search Japanese, romaji, or English",
    icon: BookOpen,
  },
] as const;

export function Learn() {
  const { data } = useStudy();
  const [script, setScript] = useState<Script>("hiragana");
  return (
    <View style={s.page}>
      <Heading
        title="Learn"
        detail="Choose a kana lesson or practice everyday Japanese."
      />
      <View style={s.section}>
        <Text accessibilityRole="header" style={s.sectionTitle}>
          Beginner Japanese
        </Text>
        <View style={s.courseGrid}>
          {lessonLinks.map(({ href, title, detail, icon: Icon }) => (
            <Link key={href} href={href} asChild>
              <Pressable
                accessibilityRole="link"
                style={({ pressed }) => [
                  s.list,
                  s.courseLink,
                  pressed && s.pressed,
                ]}
              >
                <Icon size={18} color={green} />
                <Text style={s.rowTitle}>{title}</Text>
                <Text style={s.detail}>{detail}</Text>
              </Pressable>
            </Link>
          ))}
        </View>
      </View>
      <Text accessibilityRole="header" style={s.sectionTitle}>
        Kana lessons
      </Text>
      <View accessibilityRole="tablist" style={s.chartRow}>
        {(["hiragana", "katakana"] as const).map((option) => (
          <Pressable
            key={option}
            accessibilityRole="tab"
            accessibilityState={{ selected: script === option }}
            onPress={() => setScript(option)}
            style={[s.chartTile, script === option && s.chartStudied]}
          >
            <Text style={s.rowTitle}>
              {option === "hiragana" ? "Hiragana" : "Katakana"}
            </Text>
          </Pressable>
        ))}
      </View>
      <KanaChart
        key={script}
        seen={data.seen}
        script={script}
        romaji={data.romaji}
      />
      <View style={s.feature}>
        <Text style={s.featureTitle}>Check your basic {script}</Text>
        <Text style={s.body}>
          Try ten characters across the basic rows. Get a lesson suggestion
          based on your answers.
        </Text>
        <View style={s.featureFooter}>
          <Action
            label="Start kana check"
            onPress={() => startLesson(placementSample(script), "placement")}
          />
        </View>
      </View>
      {lessons
        .filter((lesson) => lesson.script === script)
        .map((lesson, index) => {
          const studied = lesson.ids.filter((id) =>
            data.seen.includes(id),
          ).length;
          return (
            <View key={lesson.title} style={s.feature}>
              <View style={s.iconLabel}>
                <BookOpen size={18} color={green} />
                <Text style={s.kicker}>
                  {script.toUpperCase()} / LESSON {index + 1}
                </Text>
              </View>
              <Text style={s.featureTitle}>{lesson.title}</Text>
              <Text style={s.body}>{lesson.detail}</Text>
              <View style={s.featureFooter}>
                <Action
                  label={
                    studied === lesson.ids.length
                      ? "Revisit lesson"
                      : studied
                        ? "Continue lesson"
                        : "Start lesson"
                  }
                  onPress={() => startLesson(lesson.ids)}
                />
                <Text style={s.detail}>
                  {studied} of {lesson.ids.length} characters studied
                </Text>
              </View>
            </View>
          );
        })}
    </View>
  );
}

function latestResult(attempts: Attempt[], id: string, mode: Attempt["mode"]) {
  let latest: Attempt | undefined;
  for (const attempt of attempts) {
    if (
      attempt.kanaId === id &&
      attempt.mode === mode &&
      (!latest || attempt.at >= latest.at)
    )
      latest = attempt;
  }
  return latest?.correct;
}

export function Review() {
  const { data } = useStudy();
  const { queue, due } = useReviewQueue(data);
  const grammarCount = missedGrammar(data.attempts).length;
  const pairs = confusedPairs(data.attempts, kana).slice(0, 3);
  const missed = queue.filter(
    ({ id }) =>
      latestResult(data.attempts, id, "recognition") === false ||
      latestResult(data.attempts, id, "recall") === false,
  );
  const focus = (due.length ? due : missed.length ? missed : queue).slice(
    0,
    REVIEW_BATCH_SIZE,
  );
  const title = due.length
    ? `${due.length} ready for review`
    : queue.length
      ? "You’re caught up"
      : "Your first review";
  const detail = due.length
    ? `Practice ${focus.length} ${focus.length === 1 ? "character" : "characters"} in this round. Typed recall schedules the next review.`
    : queue.length
      ? `Next review ${new Date(queue[0].dueAt).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })}. You can also practice early.`
      : "Study your first vowel lesson to begin a personal review list.";
  return (
    <View style={s.page}>
      <Heading
        title="Review"
        detail="Revisit kana and grammar from past lessons."
      />
      <View style={s.feature}>
        <View style={s.iconLabel}>
          <RotateCcw size={18} color={green} />
          <Text style={s.kicker}>PERSONAL PRACTICE</Text>
        </View>
        <Text style={s.featureTitle}>{title}</Text>
        <Text style={s.body}>{detail}</Text>
        {focus.length > 0 && (
          <View style={s.chips}>
            {focus.map(({ id }) => (
              <View style={s.chip} key={id}>
                <Text style={s.glyph}>
                  {kana.find((item) => item.id === id)?.glyph}
                </Text>
              </View>
            ))}
          </View>
        )}
        <View style={s.featureFooter}>
          <Action
            label={
              due.length
                ? "Start review"
                : focus.length
                  ? "Practice early"
                  : "Learn the five vowels"
            }
            onPress={() =>
              focus.length
                ? startLesson(
                    focus.map((item) => item.id),
                    "review",
                  )
                : startLesson(firstLessonIds)
            }
          />
          {focus.length > 0 && (
            <Action
              label="Practice listening"
              onPress={() =>
                startLesson(
                  focus.map((card) => card.id),
                  "listening",
                )
              }
            />
          )}
        </View>
      </View>
      {grammarCount > 0 && (
        <View style={s.feature}>
          <Text accessibilityRole="header" style={s.featureTitle}>
            Grammar to try again
          </Text>
          <Text style={s.body}>
            Your latest answer was incorrect on {grammarCount}{" "}
            {grammarCount === 1 ? "question" : "questions"}.
          </Text>
          <Link href="/grammar-review" asChild>
            <Pressable
              accessibilityRole="link"
              style={({ pressed }) => [s.action, pressed && s.pressed]}
            >
              <Text style={s.actionLabel}>Review grammar</Text>
              <ArrowRight size={18} color="white" />
            </Pressable>
          </Link>
        </View>
      )}
      {!!pairs.length && (
        <View style={s.section}>
          <Text accessibilityRole="header" style={s.sectionTitle}>
            Kana you mixed up
          </Text>
          {pairs.map(({ items, count }) => (
            <View
              style={s.feature}
              key={items.map((item) => item.id).join(":")}
            >
              <View style={s.chips}>
                {items.map((item) => (
                  <View key={item.id} style={s.chartTile}>
                    <Text style={s.glyph}>{item.glyph}</Text>
                    <Text style={s.detail}>{item.reading}</Text>
                  </View>
                ))}
              </View>
              <Text style={s.detail}>
                Mixed up {count} {count === 1 ? "time" : "times"} in recognition
                practice.
              </Text>
              <Action
                label={`Practice ${items.map((item) => item.glyph).join(" and ")}`}
                onPress={() =>
                  startLesson(
                    items.map((item) => item.id),
                    "contrast",
                  )
                }
              />
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

function Score({ label, attempts }: { label: string; attempts: Attempt[] }) {
  const correct = attempts.filter((item) => item.correct).length;
  return (
    <View style={s.stat}>
      <Text style={s.rowTitle}>{label}</Text>
      <Text style={s.statValue}>
        {attempts.length
          ? `${Math.round((correct / attempts.length) * 100)}%`
          : "—"}
      </Text>
      <Text style={s.detail}>
        {attempts.length
          ? `${correct} of ${attempts.length} correct`
          : "No attempts yet"}
      </Text>
    </View>
  );
}

export function Progress() {
  const { data } = useStudy();
  const studied = kana.filter((item) => data.seen.includes(item.id)).length;
  const grammarAttempts = data.attempts.filter((a) =>
    a.kanaId.startsWith("grammar:"),
  );
  const vocabularyAttempts = data.attempts.filter((a) =>
    a.kanaId.startsWith("vocabulary:"),
  );
  const readingAttempts = data.attempts.filter((a) =>
    a.kanaId.startsWith("reading:"),
  );
  const passageAttempts = data.attempts.filter((a) =>
    a.kanaId.startsWith("passage-listening:"),
  );
  const writingAttempts = data.attempts.filter((a) =>
    a.kanaId.startsWith("writing:"),
  );
  const kanjiAttempts = data.attempts.filter((a) =>
    a.kanaId.startsWith("kanji:"),
  );
  const conversationAttempts = data.attempts.filter((a) =>
    a.kanaId.startsWith("conversation:"),
  );
  const savedWordAttempts = data.attempts.filter((a) =>
    a.kanaId.startsWith("saved-words:"),
  );
  const loanwordAttempts = data.attempts.filter((attempt) =>
    attempt.kanaId.startsWith("loanwords:"),
  );
  const countingAttempts = data.attempts.filter((attempt) =>
    attempt.kanaId.startsWith("numbers:"),
  );
  const timeAttempts = data.attempts.filter((attempt) =>
    attempt.kanaId.startsWith("time:"),
  );
  const dateAttempts = data.attempts.filter((attempt) =>
    attempt.kanaId.startsWith("calendar:"),
  );
  const wordRecallAttempts = data.attempts.filter((attempt) =>
    attempt.kanaId.startsWith("vocabulary-recall:"),
  );
  const counterAttempts = data.attempts.filter((attempt) =>
    attempt.kanaId.startsWith("counters:"),
  );
  const kanaIds = new Set(kana.map((item) => item.id));
  const kanaAttempts = data.attempts.filter((a) => kanaIds.has(a.kanaId));
  return (
    <View style={s.page}>
      <Heading
        title="Progress"
        detail="See what you’ve studied and how you’re answering."
      />
      <View style={s.feature}>
        <View style={s.iconLabel}>
          <Sprout size={19} color={green} />
          <Text style={s.kicker}>KANA</Text>
        </View>
        <Text style={s.featureTitle}>
          {studied} of {kana.length} studied
        </Text>
        <View
          style={s.track}
          accessibilityLabel={`${studied} of ${kana.length} characters studied`}
        >
          <View
            style={[
              s.progressFill,
              { width: `${(100 * studied) / kana.length}%` },
            ]}
          />
        </View>
        {!studied && (
          <View style={s.featureFooter}>
            <Action
              label="Start learning"
              onPress={() => startLesson(firstLessonIds)}
            />
          </View>
        )}
      </View>
      <View style={s.stats}>
        <Score
          label="Recognition"
          attempts={kanaAttempts.filter((a) => a.mode === "recognition")}
        />
        <Score
          label="Typed recall"
          attempts={kanaAttempts.filter((a) => a.mode === "recall")}
        />
        <Score
          label="Listening"
          attempts={kanaAttempts.filter((a) => a.mode === "listening")}
        />
      </View>
      {!!grammarAttempts.length && (
        <Score label="Grammar" attempts={grammarAttempts} />
      )}
      {!!vocabularyAttempts.length && (
        <Score label="Vocabulary" attempts={vocabularyAttempts} />
      )}
      {!!readingAttempts.length && (
        <Score label="Reading" attempts={readingAttempts} />
      )}
      {!!passageAttempts.length && (
        <Score label="Passage listening" attempts={passageAttempts} />
      )}
      {!!writingAttempts.length && (
        <Score label="Sentence building" attempts={writingAttempts} />
      )}
      {!!kanjiAttempts.length && (
        <Score label="Kanji" attempts={kanjiAttempts} />
      )}
      {!!conversationAttempts.length && (
        <Score label="Dialogue" attempts={conversationAttempts} />
      )}
      {!!savedWordAttempts.length && (
        <Score label="Saved words" attempts={savedWordAttempts} />
      )}
      {!!loanwordAttempts.length && (
        <Score label="Loanword sounds" attempts={loanwordAttempts} />
      )}
      {!!countingAttempts.length && (
        <Score label="Counting" attempts={countingAttempts} />
      )}
      {!!timeAttempts.length && (
        <Score label="Telling time" attempts={timeAttempts} />
      )}
      {!!dateAttempts.length && (
        <Score label="Calendar dates" attempts={dateAttempts} />
      )}
      {!!wordRecallAttempts.length && (
        <Score label="Vocabulary recall" attempts={wordRecallAttempts} />
      )}
      {!!counterAttempts.length && (
        <Score label="Counters" attempts={counterAttempts} />
      )}
      <ActivityChart attempts={data.attempts} />
      <View style={s.section}>
        <Text accessibilityRole="header" style={s.sectionTitle}>
          By character
        </Text>
        <View style={s.list}>
          {kana.map((item, index) => {
            const attempts = data.attempts.filter(
              (attempt) => attempt.kanaId === item.id,
            );
            return (
              <View key={item.id} style={[s.row, index > 0 && s.rule]}>
                <View style={s.glyphTile}>
                  <Text style={s.glyph}>{item.glyph}</Text>
                </View>
                <View style={s.grow}>
                  <Text style={s.rowTitle}>{item.reading}</Text>
                  <Text style={s.detail}>
                    {attempts.length
                      ? `${attempts.filter((attempt) => attempt.correct).length} of ${attempts.length} correct`
                      : data.seen.includes(item.id)
                        ? "Studied · awaiting practice"
                        : "Ready to learn"}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}

export function Settings() {
  const { data, changePreference, changeDailyGoal, mergeProgress } = useStudy();
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  const saving = useRef(false);
  async function savePreference(update: () => Promise<void>) {
    if (saving.current) return;
    saving.current = true;
    setPending(true);
    setMessage("");
    try {
      await update();
    } catch {
      setMessage("Your study preference could not be saved. Try again.");
    } finally {
      saving.current = false;
      setPending(false);
    }
  }
  async function exportProgress() {
    if (saving.current) return;
    saving.current = true;
    setPending(true);
    setMessage("");
    try {
      await saveBackup(createBackup(data, new Date()));
    } catch {
      setMessage("Couldn’t save the backup. Try again.");
    } finally {
      saving.current = false;
      setPending(false);
    }
  }
  async function importProgress() {
    if (saving.current) return;
    saving.current = true;
    setPending(true);
    setMessage("");
    try {
      const file = await pickBackup();
      if (file === null) return;
      const backup = parseBackup(file);
      await mergeProgress(backup);
      setMessage("Backup merged into your local progress.");
    } catch (error) {
      setMessage(
        error instanceof Error && /NihongoLearn/.test(error.message)
          ? error.message
          : "Couldn’t import this backup. Use a JSON export from NihongoLearn and try again.",
      );
    } finally {
      saving.current = false;
      setPending(false);
    }
  }
  return (
    <View style={s.page}>
      <Heading title="Settings" detail="Choose how you study on this device." />
      <View style={s.section}>
        <Text accessibilityRole="header" style={s.sectionTitle}>
          Study preferences
        </Text>
        <View style={s.list}>
          <View style={s.row}>
            <AudioLines size={23} color={green} />
            <View style={s.grow}>
              <Text style={s.rowTitle}>Pronunciation audio</Text>
              <Text style={s.detail}>
                Play the Japanese kana sounds during a lesson.
              </Text>
            </View>
            <Switch
              value={data.sound}
              disabled={pending}
              accessibilityLabel="Pronunciation audio"
              onValueChange={(value) =>
                savePreference(() => changePreference("sound", value))
              }
              trackColor={{ false: "#bbc4be", true: green }}
            />
          </View>
          <View style={[s.row, s.rule]}>
            <BookOpen size={22} color={green} />
            <View style={s.grow}>
              <Text style={s.rowTitle}>Kana reading hints</Text>
              <Text style={s.detail}>
                Show romaji and pronunciation tips on kana study cards and
                charts.
              </Text>
            </View>
            <Switch
              value={data.romaji}
              disabled={pending}
              accessibilityLabel="Kana reading hints"
              onValueChange={(value) =>
                savePreference(() => changePreference("romaji", value))
              }
              trackColor={{ false: "#bbc4be", true: green }}
            />
          </View>
          <View style={[s.row, s.rule]}>
            <HardDrive size={22} color={green} />
            <View style={s.grow}>
              <Text style={s.rowTitle}>Local progress</Text>
              <Text style={s.detail}>
                This device stores your study history and preferences.
              </Text>
            </View>
          </View>
          <View style={[s.row, s.rule]}>
            <View style={s.grow}>
              <Text style={s.rowTitle}>Export study history</Text>
              <Text style={s.detail}>
                Save a JSON copy of your answers, studied kana, saved words, and
                preferences.
              </Text>
              <Pressable
                accessibilityRole="button"
                disabled={pending}
                accessibilityState={{ disabled: pending }}
                onPress={exportProgress}
                style={[
                  s.action,
                  { alignSelf: "flex-start", marginTop: 8 },
                  pending && s.pressed,
                ]}
              >
                <Text style={s.actionLabel}>Export progress</Text>
              </Pressable>
            </View>
          </View>
          <View style={[s.row, s.rule]}>
            <View style={s.grow}>
              <Text style={s.rowTitle}>Restore study history</Text>
              <Text style={s.detail}>
                Merge a NihongoLearn backup with this device’s progress. Local
                preferences stay in effect.
              </Text>
              <Pressable
                accessibilityRole="button"
                disabled={pending}
                accessibilityState={{ disabled: pending }}
                onPress={importProgress}
                style={[
                  s.action,
                  { alignSelf: "flex-start", marginTop: 8 },
                  pending && s.pressed,
                ]}
              >
                <Text style={s.actionLabel}>Import backup</Text>
              </Pressable>
            </View>
          </View>
          <View style={[s.row, s.rule]}>
            <View style={s.grow}>
              <Text style={s.rowTitle}>Daily practice goal</Text>
              <Text style={s.detail}>
                Choose how many questions to answer each day.
              </Text>
              <View style={s.chips} accessibilityRole="tablist">
                {dailyGoals.map((goal) => (
                  <Pressable
                    key={goal}
                    accessibilityRole="tab"
                    accessibilityLabel={
                      goal ? `${goal} questions per day` : "No daily goal"
                    }
                    accessibilityState={{
                      selected: data.dailyGoal === goal,
                      disabled: pending,
                    }}
                    disabled={pending}
                    onPress={() => savePreference(() => changeDailyGoal(goal))}
                    style={[
                      s.chip,
                      { minWidth: 44, minHeight: 44, justifyContent: "center" },
                      data.dailyGoal === goal && s.chartStudied,
                    ]}
                  >
                    <Text style={s.rowTitle}>{goal || "Off"}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
          </View>
          {message ? (
            <Text
              accessibilityRole="alert"
              style={message.startsWith("Backup merged") ? s.detail : s.error}
            >
              {message}
            </Text>
          ) : null}
        </View>
      </View>
      <View style={s.section}>
        <Text accessibilityRole="header" style={s.sectionTitle}>
          Audio credits
        </Text>
        <View style={[s.list, s.credit]}>
          <CircleHelp size={21} color={green} />
          <View style={s.grow}>
            <Text style={s.body}>
              Kana audio synthesized with HTS Voice Mei, © Nagoya Institute of
              Technology, CC BY 3.0.
            </Text>
            <Pressable
              accessibilityRole="link"
              onPress={() =>
                Linking.openURL(
                  "https://creativecommons.org/licenses/by/3.0/",
                ).catch(() =>
                  setMessage(
                    "Open creativecommons.org/licenses/by/3.0/ to read the license.",
                  ),
                )
              }
              style={({ pressed }) => [s.link, pressed && s.pressed]}
            >
              <Text style={s.linkText}>Audio license</Text>
              <ExternalLink size={15} color={green} />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  page: { gap: 26, paddingBottom: 28 },
  heading: { gap: 6 },
  title: {
    fontFamily: "DMSerifText",
    fontSize: 40,
    color: ink,
    lineHeight: 49,
  },
  subtitle: {
    fontFamily: "DMSans",
    fontSize: 16,
    lineHeight: 24,
    color: muted,
  },
  feature: {
    padding: 24,
    borderRadius: 18,
    backgroundColor: "#e8efe3",
    gap: 12,
    alignItems: "flex-start",
  },
  iconLabel: { flexDirection: "row", alignItems: "center", gap: 8 },
  kicker: {
    fontFamily: "DMSansBold",
    fontSize: 11,
    letterSpacing: 1.7,
    color: green,
  },
  featureTitle: {
    fontFamily: "DMSerifText",
    fontSize: 34,
    color: ink,
    lineHeight: 41,
  },
  body: {
    fontFamily: "DMSans",
    fontSize: 16,
    lineHeight: 24,
    color: ink,
    maxWidth: 600,
  },
  featureFooter: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 16,
    marginTop: 5,
  },
  action: {
    minHeight: 46,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 11,
    backgroundColor: green,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 18,
  },
  actionLabel: { fontFamily: "DMSansBold", color: "white", fontSize: 15 },
  pressed: { opacity: 0.72 },
  section: { gap: 13 },
  sectionTitle: { fontFamily: "DMSerifText", fontSize: 26, color: ink },
  list: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#d9dfd3",
    backgroundColor: "#fffef9",
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 15,
    paddingHorizontal: 18,
  },
  rule: { borderTopWidth: 1, borderTopColor: "#e3e5db" },
  grow: { flex: 1, minWidth: 0, gap: 3 },
  glyphTile: {
    width: 48,
    minHeight: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f4eee1",
  },
  glyph: { color: ink, fontSize: 26 },
  rowTitle: { fontFamily: "DMSansBold", color: ink, fontSize: 16 },
  detail: { fontFamily: "DMSans", fontSize: 14, color: muted, lineHeight: 21 },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: 9 },
  chip: {
    minWidth: 48,
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f7f8ed",
    borderRadius: 10,
  },
  stats: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  stat: {
    flexGrow: 1,
    flexBasis: 130,
    borderRadius: 15,
    borderColor: "#d9dfd3",
    borderWidth: 1,
    backgroundColor: "#fffef9",
    padding: 18,
    gap: 4,
  },
  statValue: { fontFamily: "DMSerifText", fontSize: 34, color: green },
  track: {
    backgroundColor: "#ccd9c5",
    borderRadius: 5,
    alignSelf: "stretch",
    maxWidth: 480,
    flexDirection: "row",
    gap: 5,
    marginVertical: 3,
  },
  courseGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  courseLink: {
    flexBasis: "46%",
    flexGrow: 1,
    minHeight: 96,
    padding: 12,
    gap: 5,
  },
  chart: { padding: 14, gap: 12 },
  chartRow: { flexDirection: "row", gap: 6, marginTop: 4 },
  chartTile: {
    flex: 1,
    maxWidth: 110,
    minHeight: 56,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: "#f5f4eb",
  },
  chartStudied: { backgroundColor: "#dfe8d9" },
  progressFill: { height: 7, borderRadius: 5, backgroundColor: green },

  error: {
    fontFamily: "DMSans",
    color: coral,
    marginHorizontal: 18,
    marginBottom: 15,
  },
  credit: {
    flexDirection: "row",
    gap: 14,
    padding: 20,
    alignItems: "flex-start",
  },
  link: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    minHeight: 44,
  },
  linkText: {
    fontFamily: "DMSansBold",
    fontSize: 14,
    color: green,
    textDecorationLine: "underline",
  },
});
