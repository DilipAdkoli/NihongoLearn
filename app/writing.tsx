import { Link } from "expo-router";
import { useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import type { Attempt } from "../src/storage.types";
import { useStudy } from "../src/study";
import { isSentenceAnswer, writingTasks } from "../src/writing";

function Sentence({ task }: { task: (typeof writingTasks)[number] }) {
  const { answer } = useStudy();
  const [selected, setSelected] = useState<number[]>([]);
  const [result, setResult] = useState<Attempt>();
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);
  const saving = useRef(false);
  const pending = useRef<Attempt | null>(null);
  const locked = busy || failed || !!result;

  async function check() {
    if (selected.length !== task.tiles.length || result || saving.current)
      return;
    saving.current = true;
    setBusy(true);
    setFailed(false);
    const tokens = selected.map((index) => task.tiles[index]);
    const attempt =
      pending.current ??
      ({
        id: `writing-${task.id}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
        kanaId: `writing:${task.id}`,
        mode: "recall",
        answer: tokens.join(" "),
        correct: isSentenceAnswer(task.answers, tokens),
        at: Date.now(),
      } satisfies Attempt);
    pending.current = attempt;
    try {
      await answer(attempt);
      setResult(attempt);
      pending.current = null;
    } catch {
      setFailed(true);
    } finally {
      saving.current = false;
      setBusy(false);
    }
  }

  function reset() {
    setSelected([]);
    setResult(undefined);
  }

  return (
    <View style={s.card}>
      <Text accessibilityRole="header" style={s.heading}>
        {task.meaning}
      </Text>
      <Text style={s.detail}>Your sentence</Text>
      <View style={[s.tiles, s.answer]}>
        {selected.map((index) => (
          <Pressable
            key={index}
            accessibilityRole="button"
            accessibilityLabel={`Remove ${task.tiles[index]}`}
            disabled={locked}
            onPress={() =>
              setSelected((prior) => prior.filter((token) => token !== index))
            }
            style={[s.tile, s.added]}
          >
            <Text style={s.tileText}>{task.tiles[index]}</Text>
          </Pressable>
        ))}
      </View>
      <View style={s.tiles}>
        {task.tiles.map((tile, index) => {
          const chosen = selected.includes(index);
          return (
            <Pressable
              key={index}
              accessibilityRole="button"
              accessibilityLabel={`Add ${tile}`}
              accessibilityState={{ disabled: chosen || locked }}
              disabled={chosen || locked}
              onPress={() =>
                setSelected((prior) =>
                  prior.includes(index) ? prior : [...prior, index],
                )
              }
              style={[s.tile, chosen && s.muted]}
            >
              <Text style={s.tileText}>{tile}</Text>
            </Pressable>
          );
        })}
      </View>
      {result && (
        <Text accessibilityLiveRegion="polite" style={s.detail}>
          {result.correct
            ? "Correct! "
            : `One valid answer is ${task.answers[0].join(" ")}. `}
          {task.feedback}
        </Text>
      )}
      {failed && (
        <Text accessibilityLiveRegion="polite" style={[s.detail, s.error]}>
          This answer couldn’t be saved. Try again.
        </Text>
      )}
      <Pressable
        accessibilityRole="button"
        disabled={busy || selected.length < task.tiles.length}
        onPress={result ? reset : check}
        style={[
          s.action,
          (busy || selected.length < task.tiles.length) && s.muted,
        ]}
      >
        <Text style={s.actionLabel}>
          {result ? "Build it again" : failed ? "Retry save" : "Check sentence"}
        </Text>
      </Pressable>
    </View>
  );
}

export default function Writing() {
  return (
    <View style={s.page}>
      <Link href="/learn" style={s.back}>
        ‹ Back to Learn
      </Link>
      <Text accessibilityRole="header" style={s.title}>
        Build a sentence
      </Text>
      <Text style={s.detail}>
        Tap words to put them in order. Tap a word in your sentence to remove
        it.
      </Text>
      {writingTasks.map((task) => (
        <Sentence key={task.id} task={task} />
      ))}
    </View>
  );
}

const s = StyleSheet.create({
  page: { gap: 16, width: "100%", maxWidth: 760 },
  title: { color: "#203730", fontFamily: "DMSerifText", fontSize: 36 },
  heading: { color: "#203730", fontFamily: "DMSerifText", fontSize: 23 },
  detail: {
    color: "#566860",
    fontFamily: "DMSans",
    fontSize: 15,
    lineHeight: 22,
  },
  back: {
    color: "#215848",
    fontFamily: "DMSansBold",
    alignSelf: "flex-start",
    paddingVertical: 8,
  },
  card: {
    gap: 10,
    padding: 16,
    borderColor: "#dadfd3",
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: "#fffef8",
  },
  tiles: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  answer: {
    minHeight: 57,
    padding: 6,
    backgroundColor: "#f4f3ea",
    borderRadius: 8,
  },
  tile: {
    borderWidth: 1,
    borderColor: "#a8bda9",
    borderRadius: 8,
    minHeight: 44,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  tileText: { color: "#203730", fontSize: 17 },
  added: { backgroundColor: "#dfe8d9" },
  muted: { opacity: 0.55 },
  action: {
    alignSelf: "flex-start",
    borderRadius: 8,
    paddingHorizontal: 14,
    minHeight: 44,
    justifyContent: "center",
    backgroundColor: "#215848",
  },
  actionLabel: { color: "#fffef8", fontFamily: "DMSansBold" },
  error: { color: "#8d392b" },
});
