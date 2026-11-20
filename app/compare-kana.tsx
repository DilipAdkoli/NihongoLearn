import { Link } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { playKana } from "../src/audio";
import { kanaComparisons } from "../src/kanaComparisons";
import { kana } from "../src/learning";
import { startLesson, useStudy } from "../src/study";

const byId = new Map(kana.map((item) => [item.id, item]));
const comparisons = kanaComparisons.map(({ title, entries }) => ({
  title,
  items: entries.map(({ id, tip }) => {
    const item = byId.get(id);
    if (!item) throw new Error(`Unknown kana in comparison: ${id}`);
    return { ...item, tip };
  }),
}));

export default function CompareKana() {
  const { data } = useStudy();
  const [audioError, setAudioError] = useState("");

  async function listen(id: string, glyph: string) {
    setAudioError("");
    try {
      await playKana(id);
    } catch {
      setAudioError(`Couldn’t play ${glyph}. Try again.`);
    }
  }

  return (
    <View style={s.page}>
      <Link href="/learn" style={s.back}>
        ‹ Back to Learn
      </Link>
      <Text accessibilityRole="header" style={s.title}>
        Compare similar kana
      </Text>
      {comparisons.map(({ title, items }) => (
        <View key={title} style={s.group}>
          <Text accessibilityRole="header" style={s.heading}>
            {title}
          </Text>
          <View style={s.row}>
            {items.map(({ glyph, id, reading, tip }) => (
              <View key={id} style={s.card}>
                <Text style={s.glyph}>{glyph}</Text>
                {data.romaji && <Text style={s.detail}>{reading}</Text>}
                <Text style={s.detail}>{tip}</Text>
                {data.sound && (
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={`Listen to ${glyph}`}
                    onPress={() => listen(id, glyph)}
                    style={s.button}
                  >
                    <Text style={s.buttonText}>♪ Listen</Text>
                  </Pressable>
                )}
              </View>
            ))}
          </View>
          <Pressable
            accessibilityRole="button"
            onPress={() =>
              startLesson(
                items.map((item) => item.id),
                "contrast",
              )
            }
            style={[s.button, s.practice]}
          >
            <Text style={s.practiceText}>Practice {title}</Text>
          </Pressable>
        </View>
      ))}
      {!!audioError && (
        <Text accessibilityLiveRegion="polite" style={s.detail}>
          {audioError}
        </Text>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  page: { width: "100%", maxWidth: 760, gap: 15 },
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
  group: { gap: 10 },
  row: { flexDirection: "row", gap: 8 },
  card: {
    flex: 1,
    minWidth: 0,
    padding: 12,
    gap: 6,
    backgroundColor: "#fffef8",
    borderColor: "#dadfd3",
    borderWidth: 1,
    borderRadius: 8,
  },
  glyph: { fontSize: 36, color: "#203730" },
  detail: {
    color: "#566860",
    fontFamily: "DMSans",
    fontSize: 14,
    lineHeight: 21,
  },
  button: {
    alignSelf: "flex-start",
    minHeight: 44,
    paddingHorizontal: 12,
    justifyContent: "center",
    borderRadius: 6,
    backgroundColor: "#dfe8d9",
  },
  buttonText: { color: "#215848", fontFamily: "DMSansBold" },
  practice: { backgroundColor: "#215848" },
  practiceText: { color: "#fffef8", fontFamily: "DMSansBold" },
});
