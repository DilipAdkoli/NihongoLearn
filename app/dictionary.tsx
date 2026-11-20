import { Link } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { playClip } from "../src/audio";
import { searchGlossary, type GlossaryEntry } from "../src/glossary";
import { kana } from "../src/learning";
import { wordGroups } from "../src/vocabulary";

const entries = new Map<string, GlossaryEntry>();
function addEntry(entry: GlossaryEntry) {
  const key = [entry.kana, entry.meaning.toLowerCase()].join(":");
  const existing = entries.get(key);
  entries.set(
    key,
    existing
      ? { ...entry, ...existing, romaji: existing.romaji ?? entry.romaji }
      : entry,
  );
}
for (const group of wordGroups) {
  for (const word of group.words)
    addEntry({
      spelling: word.spelling,
      kana: word.kana,
      meaning: word.meaning,
      romaji: word.romaji,
      audio: word.audio,
    });
}
for (const item of kana) {
  if (item.example)
    addEntry({
      spelling: item.example,
      kana: item.example,
      meaning: item.meaning,
      romaji: item.exampleReading,
    });
}

export default function Dictionary() {
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(24);
  const [failed, setFailed] = useState("");
  const results = searchGlossary([...entries.values()], query);

  async function listen(entry: GlossaryEntry) {
    if (entry.audio === undefined) return;
    setFailed("");
    try {
      await playClip(entry.audio);
    } catch {
      setFailed(entry.spelling);
    }
  }

  return (
    <View style={s.page}>
      <Link href="/learn" style={s.back}>
        ‹ Back to Learn
      </Link>
      <Text accessibilityRole="header" style={s.title}>
        Lesson glossary
      </Text>
      <Text style={s.detail}>
        Search words from the lessons by Japanese, romaji, or English.
      </Text>
      <TextInput
        accessibilityLabel="Search lesson glossary"
        value={query}
        onChangeText={(value) => {
          setQuery(value);
          setLimit(24);
        }}
        placeholder="Search words"
        placeholderTextColor="#566860"
        autoCorrect={false}
        autoCapitalize="none"
        returnKeyType="search"
        style={s.input}
      />
      {failed && (
        <Text accessibilityLiveRegion="polite" style={s.error}>
          Couldn’t play the audio for {failed}. Try again.
        </Text>
      )}
      {results.length ? (
        <View style={s.list}>
          {results.slice(0, limit).map((entry) => (
            <View key={entry.kana + ":" + entry.meaning} style={s.row}>
              <View style={s.grow}>
                <Text style={s.word}>{entry.spelling}</Text>
                <Text style={s.detail}>
                  {entry.kana !== entry.spelling ? entry.kana + " · " : ""}
                  {entry.meaning}
                  {entry.romaji ? " · " + entry.romaji : ""}
                </Text>
              </View>
              {entry.audio !== undefined && (
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={`Listen to ${entry.kana}`}
                  onPress={() => listen(entry)}
                  style={s.button}
                >
                  <Text style={s.buttonLabel}>♪ Listen</Text>
                </Pressable>
              )}
            </View>
          ))}
        </View>
      ) : (
        <Text accessibilityLiveRegion="polite" style={s.detail}>
          No matching lesson words.
        </Text>
      )}
      {limit < results.length && (
        <Pressable
          accessibilityRole="button"
          onPress={() => setLimit(limit + 24)}
          style={[s.button, s.more]}
        >
          <Text style={s.buttonLabel}>Show more</Text>
        </Pressable>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  page: { gap: 14, width: "100%", maxWidth: 760 },
  back: {
    color: "#215848",
    fontFamily: "DMSansBold",
    alignSelf: "flex-start",
    paddingVertical: 8,
  },
  title: { color: "#203730", fontFamily: "DMSerifText", fontSize: 36 },
  detail: { color: "#566860", fontSize: 15, fontFamily: "DMSans" },
  input: {
    borderColor: "#9bad9e",
    borderWidth: 1,
    borderRadius: 8,
    minHeight: 48,
    paddingHorizontal: 12,
    color: "#203730",
    fontFamily: "DMSans",
  },
  list: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#dadfd3",
    backgroundColor: "#fffef8",
    overflow: "hidden",
  },
  row: {
    minHeight: 66,
    padding: 12,
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#e4e8dd",
  },
  grow: { flex: 1 },
  word: { color: "#203730", fontSize: 20 },
  button: {
    minHeight: 44,
    paddingHorizontal: 12,
    justifyContent: "center",
    borderRadius: 6,
    backgroundColor: "#dfe8d9",
  },
  buttonLabel: { color: "#215848", fontFamily: "DMSansBold" },
  more: { alignSelf: "flex-start" },
  error: { color: "#8d392b", fontFamily: "DMSans" },
});
