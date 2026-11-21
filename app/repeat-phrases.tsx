import { createThemedStyles } from "../src/theme";
import { Link, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { dialogueGroups } from "../src/dialogueAudio";
import { JapaneseText } from "../src/JapaneseText";
import { useClipPlayback } from "../src/useClipPlayback";
import {
  useVoiceRecording,
  voiceRecordingLimit,
} from "../src/useVoiceRecording";

export default function RepeatPhrases() {
  const { topic } = useLocalSearchParams<{ topic?: string }>();
  const initialTopic = Math.max(
    0,
    dialogueGroups.findIndex((group) => group.id === topic),
  );
  return <PhrasePractice key={initialTopic} initialTopic={initialTopic} />;
}

function PhrasePractice({ initialTopic }: { initialTopic: number }) {
  const s = useStyles();
  const [topic, setTopic] = useState(initialTopic);
  const [index, setIndex] = useState(0);
  const [translation, setTranslation] = useState(false);
  const { play, stop, playing, audioError } = useClipPlayback();
  const voice = useVoiceRecording();
  const recordingUri = voice.uri;
  const recording = voice.phase === "recording";
  const audioBusy = voice.phase !== "idle";
  const group = dialogueGroups[topic];
  const phrase = group.lessons[index];
  const last = index + 1 === group.lessons.length;

  function goTo(next: number, nextTopic = topic) {
    stop();
    voice.reset();
    setIndex(next);
    setTopic(nextTopic);
    setTranslation(false);
  }

  return (
    <View style={s.page}>
      <Link
        href={{ pathname: "/conversation", params: { topic: group.id } }}
        style={s.link}
      >
        ‹ Back to Everyday dialogue
      </Link>
      <Text accessibilityRole="header" style={s.title}>
        Listen and repeat
      </Text>
      <Text style={s.body}>Listen, then say the phrase aloud.</Text>
      <View
        accessibilityRole="tablist"
        accessibilityLabel="Phrase topics"
        style={s.controls}
      >
        {dialogueGroups.map(({ id, title }, next) => (
          <Pressable
            key={id}
            accessibilityRole="tab"
            aria-selected={next === topic}
            onPress={() => {
              if (next !== topic) goTo(0, next);
            }}
            style={[s.button, next === topic && s.selected]}
          >
            <Text style={s.buttonText}>{title}</Text>
          </Pressable>
        ))}
      </View>
      <View style={s.card}>
        <Text accessibilityLiveRegion="polite" style={s.body}>
          {group.title} · {index + 1} of {group.lessons.length}
        </Text>
        <JapaneseText style={s.phrase}>{phrase.answer}</JapaneseText>
        {translation && <Text style={s.body}>{phrase.answerEnglish}</Text>}
        <View style={s.controls}>
          <Pressable
            accessibilityRole="button"
            disabled={audioBusy}
            onPress={() => play(phrase.answerAudio)}
            style={[s.button, s.primary, audioBusy && s.disabled]}
          >
            <Text style={s.primaryText}>Listen</Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            disabled={audioBusy}
            onPress={() => play(phrase.answerAudio, { rate: 0.8 })}
            style={[s.button, audioBusy && s.disabled]}
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
            onPress={() => goTo(last ? 0 : index + 1)}
            style={s.button}
          >
            <Text style={s.buttonText}>
              {last ? "Start again" : "Next phrase"}
            </Text>
          </Pressable>
        </View>
      </View>
      <View style={s.card}>
        <Text accessibilityRole="header" style={s.sectionTitle}>
          Record yourself
        </Text>
        <Text style={s.body}>
          Record up to {voiceRecordingLimit} seconds. Your recording stays on
          this device and is cleared when you change phrases or leave this
          screen.
        </Text>
        <View style={s.controls}>
          <Pressable
            accessibilityRole="button"
            disabled={audioBusy && !recording}
            onPress={() => {
              if (recording) {
                void voice.stop();
              } else {
                stop();
                void voice.start();
              }
            }}
            style={[s.button, audioBusy && !recording && s.disabled]}
          >
            <Text style={s.buttonText}>
              {recording
                ? "Stop recording"
                : voice.phase === "requesting"
                  ? "Opening microphone…"
                  : voice.phase === "stopping"
                    ? "Finishing recording…"
                    : recordingUri
                      ? "Record again"
                      : "Start recording"}
            </Text>
          </Pressable>
          {recordingUri && (
            <>
              <Pressable
                accessibilityRole="button"
                onPress={() => play(recordingUri)}
                style={s.button}
              >
                <Text style={s.buttonText}>Play my recording</Text>
              </Pressable>
              <Pressable
                accessibilityRole="button"
                onPress={() => {
                  stop();
                  voice.reset();
                }}
                style={s.button}
              >
                <Text style={s.buttonText}>Discard recording</Text>
              </Pressable>
            </>
          )}
        </View>
        {recording && (
          <Text accessibilityLiveRegion="polite" style={s.body}>
            Recording now
          </Text>
        )}
        {voice.error && (
          <Text accessibilityLiveRegion="polite" style={s.error}>
            {voice.error}
          </Text>
        )}
      </View>
    </View>
  );
}

const useStyles = createThemedStyles({
  page: { width: "100%", maxWidth: 760, gap: 14 },
  title: {
    color: "#203730",
    fontFamily: "DMSerifText",
    fontSize: 36,
    lineHeight: 45,
  },
  phrase: { color: "#203730", fontSize: 28 },
  sectionTitle: { color: "#203730", fontFamily: "DMSansBold", fontSize: 19 },
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
  selected: { backgroundColor: "#dfe8d9" },
  primaryText: { color: "#fffef8", fontFamily: "DMSansBold" },
  buttonText: { color: "#215848", fontFamily: "DMSansBold" },
  disabled: { opacity: 0.6 },
});
