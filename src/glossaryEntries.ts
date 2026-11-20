import { glossaryKey, type GlossaryEntry } from "./glossary";
import { weekdayWords } from "./kanji";
import { kana } from "./learning";
import { wordGroups } from "./vocabulary";

const entries = new Map<string, GlossaryEntry>();
function addEntry(entry: GlossaryEntry) {
  const key = glossaryKey(entry);
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
for (const word of weekdayWords) addEntry(word);
for (const item of kana) {
  if (item.example)
    addEntry({
      spelling: item.example,
      kana: item.example,
      meaning: item.meaning,
      romaji: item.exampleReading,
    });
}

export const glossaryEntries = [...entries.values()];
