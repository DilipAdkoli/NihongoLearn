import { Link } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { dialogueGroups } from "../src/dialogueAudio";
import { JapaneseText } from "../src/JapaneseText";
import { useClipPlayback } from "../src/useClipPlayback";

const phrases = dialogueGroups.flatMap((group) =>
  group.lessons.map((lesson) => ({
    japanese: lesson.answer,
    english: lesson.answerEnglish,
    clip: lesson.answerAudio,
    topic: group.title,
  })),
);

export default function RepeatPhrases() {
  const [index, setIndex] = useState(0);
  const [translation, setTranslation] = useState(false);
  const { play, stop, playing, audioError } = useClipPlayback();
  const phrase = phrases[index];

  function goTo(next: number) {
    stop();
    setIndex(next);
    setTranslation(false);
  }

  return (
    <View style={s.page}>
      <Link href="/conversation" style={s.link}>
        ‹ Back to Everyday dialogue
      </Link>
      <Text accessibilityRole="header" style={s.title}>
        Listen and repeat
      </Text>
      <Text style={s.body}>Listen, then say the phrase aloud.</Text>
      <View style={s.card}>
        <Text accessibilityLiveRegion="polite" style={s.body}>
          {phrase.topic} · {index + 1} of {phrases.length}
        </Text>
        <JapaneseText style={s.phrase}>{phrase.japanese}</JapaneseText>
        {translation && <Text style={s.body}>{phrase.english}</Text>}
        <View style={s.controls}>
          <Pressable
            accessibilityRole="button"
            onPress={() => play(phrase.clip)}
            style={[s.button, s.primary]}
          >
            <Text style={s.primaryText}>Listen</Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            onPress={() => play(phrase.clip, { rate: 0.8 })}
            style={s.button}
          >
            <Text style={s.buttonText}>Listen slowly</Text>
          </Pressable>
          {playing && (
            <Pressable
              accessibilityRole="button"
              onPress={stop}
              style={s.button}
            >
              <Text style={s.buttonText}>Stop playback</Text>
            </Pressable>
          )}
          <Pressable
            accessibilityRole="button"
            aria-expanded={translation}
            onPress={() => setTranslation((shown) => !shown)}
            style={s.button}
          >
            <Text style={s.buttonText}>
              {translation ? "Hide translation" : "Show translation"}
            </Text>
          </Pressable>
        </View>
        {audioError && (
          <Text accessibilityLiveRegion="polite" style={s.error}>
            Audio couldn’t play. Tap Listen to retry.
          </Text>
        )}
      </View>
      <View style={s.controls}>
        <Pressable
          accessibilityRole="button"
          disabled={index === 0}
          onPress={() => goTo(index - 1)}
          style={[s.button, index === 0 && s.disabled]}
        >
          <Text style={s.buttonText}>Previous phrase</Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          onPress={() => goTo(index + 1 === phrases.length ? 0 : index + 1)}
          style={s.button}
        >
          <Text style={s.buttonText}>
            {index + 1 === phrases.length ? "Start again" : "Next phrase"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  page: { width: "100%", maxWidth: 760, gap: 14 },
  title: {
    color: "#203730",
    fontFamily: "DMSerifText",
    fontSize: 36,
    lineHeight: 45,
  },
  phrase: { color: "#203730", fontSize: 28 },
  body: {
    color: "#566860",
    fontFamily: "DMSans",
    fontSize: 15,
    lineHeight: 22,
  },
  error: { color: "#8d392b", fontFamily: "DMSans" },
  link: {
    color: "#215848",
    fontFamily: "DMSansBold",
    alignSelf: "flex-start",
    paddingVertical: 8,
  },
  card: {
    padding: 16,
    gap: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#dadfd3",
    backgroundColor: "#fffef8",
  },
  controls: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  button: {
    minHeight: 44,
    justifyContent: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#dadfd3",
    paddingHorizontal: 12,
  },
  primary: { backgroundColor: "#215848", borderColor: "#215848" },
  primaryText: { color: "#fffef8", fontFamily: "DMSansBold" },
  buttonText: { color: "#215848", fontFamily: "DMSansBold" },
  disabled: { opacity: 0.6 },
});
