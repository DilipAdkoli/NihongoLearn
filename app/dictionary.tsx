import { createThemedStyles, useThemeColor } from "../src/theme";
import { glossaryEntries } from "../src/glossaryEntries";
import { Link } from "expo-router";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { playClip } from "../src/audio";
import { JapaneseText } from "../src/JapaneseText";
import {
  glossaryKey,
  searchGlossary,
  type GlossaryEntry,
} from "../src/glossary";
import { useWordBookmarks } from "../src/useWordBookmarks";

export default function Dictionary() {
  const s = useStyles();
  const themeColor = useThemeColor();
  const { saved, saving, saveFailed, toggleWord } = useWordBookmarks();
  const [savedOnly, setSavedOnly] = useState(false);
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(24);
  const [failed, setFailed] = useState("");
  const source = glossaryEntries.filter(
    (entry) => !savedOnly || saved.has(glossaryKey(entry)),
  );
  const results = searchGlossary(source, query);

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
      <View style={s.actions} accessibilityRole="tablist">
        {(["All words", "Saved words"] as const).map((label, index) => (
          <Pressable
            key={label}
            accessibilityRole="tab"
            accessibilityState={{ selected: savedOnly === Boolean(index) }}
            onPress={() => {
              setSavedOnly(Boolean(index));
              setLimit(24);
            }}
            style={[s.button, savedOnly !== Boolean(index) && s.outline]}
          >
            <Text style={s.buttonLabel}>{label}</Text>
          </Pressable>
        ))}
      </View>
      {savedOnly && source.length > 0 && (
        <View style={s.actions}>
          <Link
            href="/saved-practice"
            style={[s.button, s.more, s.buttonLabel]}
          >
            Practice saved words
          </Link>
          <Link
            href={{ pathname: "/saved-practice", params: { mode: "recall" } }}
            style={[s.button, s.more, s.buttonLabel]}
          >
            Recall saved words
          </Link>
        </View>
      )}
      <TextInput
        accessibilityLabel="Search lesson glossary"
        value={query}
        onChangeText={(value) => {
          setQuery(value);
          setLimit(24);
        }}
        placeholder="Search words"
        placeholderTextColor={themeColor("#566860")}
        autoCorrect={false}
        autoCapitalize="none"
        returnKeyType="search"
        style={s.input}
      />
      {!!failed && (
        <Text accessibilityLiveRegion="polite" style={s.error}>
          Couldn’t play the audio for {failed}. Try again.
        </Text>
      )}
      {saveFailed && (
        <Text accessibilityLiveRegion="polite" style={s.error}>
          Couldn’t update saved words. Try again.
        </Text>
      )}
      {results.length ? (
        <View style={s.list}>
          {results.slice(0, limit).map((entry) => (
            <View key={glossaryKey(entry)} style={s.row}>
              <View style={s.grow}>
                <JapaneseText style={s.word}>{entry.spelling}</JapaneseText>
                <Text style={s.detail}>
                  {entry.kana !== entry.spelling && (
                    <JapaneseText style={s.detail}>
                      {entry.kana} ·{" "}
                    </JapaneseText>
                  )}
                  {entry.meaning}
                  {entry.romaji ? " · " + entry.romaji : ""}
                </Text>
              </View>
              <View style={s.actions}>
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
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={`${saved.has(glossaryKey(entry)) ? "Remove saved word" : "Save"} ${entry.spelling}`}
                  accessibilityState={{ disabled: saving }}
                  onPress={() => toggleWord(entry)}
                  disabled={saving}
                  style={[s.button, s.outline]}
                >
                  <Text style={s.buttonLabel}>
                    {saved.has(glossaryKey(entry)) ? "Saved" : "Save"}
                  </Text>
                </Pressable>
              </View>
            </View>
          ))}
        </View>
      ) : (
        <Text accessibilityLiveRegion="polite" style={s.detail}>
          {savedOnly && !saved.size
            ? "Save a word to see it here."
            : "No matching lesson words."}
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

const useStyles = createThemedStyles({
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
  actions: { flexDirection: "row", gap: 6, flexWrap: "wrap" },
  outline: {
    backgroundColor: "#fffef8",
    borderColor: "#dadfd3",
    borderWidth: 1,
  },
  more: { alignSelf: "flex-start" },
  error: { color: "#8d392b", fontFamily: "DMSans" },
});
