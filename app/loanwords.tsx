import { createThemedStyles, useThemeColor } from "../src/theme";
import { Link } from "expo-router";
import { JapaneseText } from "../src/JapaneseText";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { playClip } from "../src/audio";
import { searchLoanwords } from "../src/loanwords";

const audio = {
  fa: require("../assets/audio/loanword-fa.mp3"),
  fi: require("../assets/audio/loanword-fi.mp3"),
  fe: require("../assets/audio/loanword-fe.mp3"),
  fo: require("../assets/audio/loanword-fo.mp3"),
  ti: require("../assets/audio/loanword-ti.mp3"),
  di: require("../assets/audio/loanword-di.mp3"),
  wi: require("../assets/audio/loanword-wi.mp3"),
  we: require("../assets/audio/loanword-we.mp3"),
  wo: require("../assets/audio/loanword-wo.mp3"),
  she: require("../assets/audio/loanword-she.mp3"),
  je: require("../assets/audio/loanword-je.mp3"),
  che: require("../assets/audio/loanword-che.mp3"),
  va: require("../assets/audio/loanword-va.mp3"),
} as const;

export default function Loanwords() {
  const s = useStyles();
  const themeColor = useThemeColor();
  const [query, setQuery] = useState("");
  const results = searchLoanwords(query);
  const [error, setError] = useState("");
  async function listen(reading: keyof typeof audio, word: string) {
    setError("");
    try {
      await playClip(audio[reading]);
    } catch {
      setError(word);
    }
  }

  return (
    <View style={s.page}>
      <Link href="/learn" style={s.back}>
        ‹ Back to Learn
      </Link>
      <Text accessibilityRole="header" style={s.title}>
        Katakana loanword sounds
      </Text>
      <Text style={s.body}>
        Read each combination as one beat. The second kana stays small in
        writing.
      </Text>
      <Link href="/loanword-practice" asChild>
        <Pressable accessibilityRole="link" style={s.listen}>
          <Text style={s.reading}>Practice loanword sounds</Text>
        </Pressable>
      </Link>
      <TextInput
        accessibilityLabel="Search loanword sounds"
        value={query}
        onChangeText={setQuery}
        placeholder="Search ファ, fa, or file"
        placeholderTextColor={themeColor("#566860")}
        autoCorrect={false}
        autoCapitalize="none"
        style={s.input}
      />
      {results.length === 0 && (
        <Text accessibilityLiveRegion="polite" style={s.body}>
          No matching sounds.
        </Text>
      )}
      {!!error && (
        <Text accessibilityLiveRegion="polite" style={s.body}>
          Couldn’t play {error}. Tap Listen to retry.
        </Text>
      )}
      <View style={s.grid}>
        {results.map(({ sound, reading, word, meaning, note }) => (
          <View key={sound} style={s.card}>
            <JapaneseText accessibilityRole="header" style={s.kana}>
              {sound} <Text style={s.reading}>{reading}</Text>
            </JapaneseText>
            <JapaneseText style={s.example}>
              {word} <Text style={s.body}>· {meaning}</Text>
            </JapaneseText>
            <Text style={s.body}>{note}</Text>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`Listen to ${word}`}
              style={s.listen}
              onPress={() => listen(reading, word)}
            >
              <Text style={s.reading}>♪ Listen</Text>
            </Pressable>
          </View>
        ))}
      </View>
    </View>
  );
}

const useStyles = createThemedStyles({
  page: { gap: 14, maxWidth: 900, width: "100%" },
  back: {
    color: "#215848",
    fontFamily: "DMSansBold",
    alignSelf: "flex-start",
    paddingVertical: 8,
  },
  title: { color: "#203730", fontFamily: "DMSerifText", fontSize: 36 },
  body: {
    color: "#566860",
    fontFamily: "DMSans",
    fontSize: 14,
    lineHeight: 21,
  },
  input: {
    borderColor: "#9bad9e",
    borderRadius: 8,
    borderWidth: 1,
    minHeight: 48,
    paddingHorizontal: 12,
    color: "#203730",
    fontFamily: "DMSans",
  },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  card: {
    gap: 5,
    flexGrow: 1,
    flexBasis: 224,
    padding: 13,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#dadfd3",
    backgroundColor: "#fffef8",
  },
  kana: { color: "#203730", fontSize: 27 },
  reading: { color: "#215848", fontSize: 16, fontFamily: "DMSansBold" },
  listen: {
    alignSelf: "flex-start",
    minHeight: 44,
    paddingHorizontal: 10,
    justifyContent: "center",
    borderRadius: 6,
    backgroundColor: "#dfe8d9",
  },
  example: { color: "#203730", fontSize: 17 },
});
