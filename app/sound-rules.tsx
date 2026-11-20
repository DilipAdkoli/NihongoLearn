import { Link } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { playClip } from "../src/audio";

import { soundComparisons, type SoundWord } from "../src/soundRules";

function Word({ word }: { word: SoundWord }) {
  const [failed, setFailed] = useState(false);
  async function listen() {
    setFailed(false);
    try {
      await playClip(word.audio);
    } catch {
      setFailed(true);
    }
  }
  return (
    <View style={s.word}>
      <Text style={s.glyph}>{word.kana}</Text>
      <Text style={s.detail}>{word.reading}</Text>
      <Text style={s.body}>{word.meaning}</Text>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Listen to ${word.kana}`}
        onPress={listen}
        style={({ pressed }) => [s.listen, pressed && s.pressed]}
      >
        <Text style={s.listenText}>♪ Listen</Text>
      </Pressable>
      {failed && (
        <Text accessibilityLiveRegion="polite" style={s.error}>
          Audio couldn’t play. Tap Listen to retry.
        </Text>
      )}
    </View>
  );
}

export default function SoundRules() {
  return (
    <View style={s.page}>
      <Link href="/learn" style={s.back}>
        ‹ Back to Learn
      </Link>
      <Text accessibilityRole="header" style={s.title}>
        Sound and spelling rules
      </Text>
      <Link href="/sound-listening" style={s.back}>
        Practice hearing the differences ›
      </Link>
      {soundComparisons.map(({ title, explanation, words }) => (
        <View key={title} style={s.card}>
          <Text accessibilityRole="header" style={s.heading}>
            {title}
          </Text>
          <Text style={s.body}>{explanation}</Text>
          <View style={s.words}>
            {words.map((word) => (
              <Word key={word.kana} word={word} />
            ))}
          </View>
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
  words: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  word: {
    flex: 1,
    minWidth: 132,
    padding: 10,
    gap: 4,
    borderRadius: 8,
    backgroundColor: "#f4f3ea",
    alignItems: "flex-start",
  },
  glyph: { fontSize: 24, color: "#203730" },
  detail: { fontFamily: "DMSans", color: "#586256", fontSize: 14 },
  listen: {
    minHeight: 44,
    justifyContent: "center",
    paddingHorizontal: 10,
    backgroundColor: "#dfe8d9",
    borderRadius: 6,
    marginTop: 4,
  },
  listenText: { fontFamily: "DMSansBold", color: "#215848" },
  pressed: { opacity: 0.72 },
  error: { fontFamily: "DMSans", color: "#8d392b" },
});
