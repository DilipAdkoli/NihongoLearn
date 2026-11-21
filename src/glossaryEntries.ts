import { glossaryKey, type GlossaryEntry } from "./glossary";
import { kanjiWords } from "./kanji";
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
for (const word of kanjiWords) addEntry(word);
addEntry({
  spelling: "本屋",
  kana: "ほんや",
  meaning: "bookstore",
  romaji: "honya",
});
addEntry({
  spelling: "営業時間",
  kana: "えいぎょうじかん",
  meaning: "opening hours",
  romaji: "eigyou jikan",
});
addEntry({
  spelling: "明後日",
  kana: "あさって",
  meaning: "the day after tomorrow",
  romaji: "asatte",
});
addEntry({
  spelling: "まっすぐ",
  kana: "まっすぐ",
  meaning: "straight ahead",
  romaji: "massugu",
});
addEntry({ spelling: "角", kana: "かど", meaning: "corner", romaji: "kado" });
addEntry({ spelling: "部屋", kana: "へや", meaning: "room", romaji: "heya" });
addEntry({
  spelling: "一泊",
  kana: "いっぱく",
  meaning: "one night’s stay",
  romaji: "ippaku",
});
addEntry({
  spelling: "曲がる",
  kana: "まがる",
  meaning: "to turn",
  romaji: "magaru",
});
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
