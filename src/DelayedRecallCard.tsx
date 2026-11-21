import { Text, View } from "react-native";
import { delayedRecall, practiceItemKeys } from "./delayedRecall";
import { glossaryEntries } from "./glossaryEntries";
import { kana } from "./learning";
import type { Attempt } from "./storage.types";
import { createThemedStyles } from "./theme";
import { wordGroups } from "./vocabulary";

const itemKeys = practiceItemKeys(
  kana,
  wordGroups.flatMap((group) => group.words),
  glossaryEntries,
);
const modes = [
  ["recall", "Typed recall"],
  ["recognition", "Recognition"],
  ["listening", "Listening"],
] as const;

export function DelayedRecallCard({
  attempts,
}: {
  attempts: readonly Attempt[];
}) {
  const s = useStyles();
  const results = delayedRecall(attempts, itemKeys, Date.now()).filter((row) =>
    modes.some(([mode]) => row[mode].total > 0),
  );
  return (
    <View style={s.card}>
      <Text accessibilityRole="header" style={s.title}>
        Practice after a break
      </Text>
      <Text style={s.detail}>
        {results.length
          ? "Your first answer after a break from the same item in kana, everyday vocabulary, or saved word practice."
          : "Try the same kana or word again after at least 24 hours to see how you do."}
      </Text>
      {results.map((row) => (
        <View key={row.label} style={s.interval}>
          <Text style={s.intervalTitle}>{row.label}</Text>
          {modes
            .filter(([mode]) => row[mode].total > 0)
            .map(([mode, label]) => {
              const { correct, total } = row[mode];
              return (
                <Text key={mode} style={s.score}>
                  {label} · {correct} of {total} correct (
                  {Math.round((100 * correct) / total)}%)
                </Text>
              );
            })}
        </View>
      ))}
    </View>
  );
}

const useStyles = createThemedStyles({
  card: {
    padding: 16,
    gap: 6,
    borderColor: "#dadfd3",
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: "#fffef8",
  },
  title: { fontFamily: "DMSerifText", fontSize: 24, color: "#203730" },
  detail: { fontFamily: "DMSans", fontSize: 14, color: "#566860" },
  interval: { gap: 3, marginTop: 6 },
  intervalTitle: { fontFamily: "DMSansBold", fontSize: 15, color: "#203730" },
  score: { fontFamily: "DMSans", fontSize: 14, color: "#203730" },
});
