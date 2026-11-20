import { searchGlossary } from "./glossary.ts";

export const loanwords = [
  {
    sound: "ファ",
    reading: "fa",
    word: "ファイル",
    romaji: "fairu",
    meaning: "file",
    note: "Combine フ with small ァ.",
  },
  {
    sound: "フィ",
    reading: "fi",
    word: "フィルム",
    romaji: "firumu",
    meaning: "film",
    note: "Combine フ with small ィ.",
  },
  {
    sound: "フェ",
    reading: "fe",
    word: "フェリー",
    romaji: "ferii",
    meaning: "ferry",
    note: "Combine フ with small ェ.",
  },
  {
    sound: "フォ",
    reading: "fo",
    word: "フォーク",
    romaji: "fooku",
    meaning: "fork",
    note: "Combine フ with small ォ.",
  },
  {
    sound: "ティ",
    reading: "ti",
    word: "ティッシュ",
    romaji: "tisshu",
    meaning: "tissue",
    note: "Combine テ with small ィ for a t sound before i.",
  },
  {
    sound: "ディ",
    reading: "di",
    word: "ディスク",
    romaji: "disuku",
    meaning: "disc",
    note: "Combine デ with small ィ for a d sound before i.",
  },
  {
    sound: "ウィ",
    reading: "wi",
    word: "ウィンドウ",
    romaji: "windou",
    meaning: "window",
    note: "Combine ウ with small ィ.",
  },
  {
    sound: "ウェ",
    reading: "we",
    word: "ウェブ",
    romaji: "webu",
    meaning: "web",
    note: "Combine ウ with small ェ.",
  },
  {
    sound: "ウォ",
    reading: "wo",
    word: "ウォーター",
    romaji: "wootaa",
    meaning: "water",
    note: "Combine ウ with small ォ. This loanword spelling is distinct from the particle を.",
  },
  {
    sound: "シェ",
    reading: "she",
    word: "シェフ",
    romaji: "shefu",
    meaning: "chef",
    note: "Combine シ with small ェ.",
  },
  {
    sound: "ジェ",
    reading: "je",
    word: "ジェット",
    romaji: "jetto",
    meaning: "jet",
    note: "Combine ジ with small ェ.",
  },
  {
    sound: "チェ",
    reading: "che",
    word: "チェス",
    romaji: "chesu",
    meaning: "chess",
    note: "Combine チ with small ェ.",
  },
  {
    sound: "ヴァ",
    reading: "va",
    word: "ヴァイオリン",
    romaji: "vaiorin",
    meaning: "violin",
    note: "ヴ is used for foreign v sounds. バイオリン is also a common spelling.",
  },
] as const;

export function searchLoanwords(query: string) {
  const entries = loanwords.map((entry) => ({
    ...entry,
    spelling: entry.word,
    kana: entry.sound,
    romaji: `${entry.reading} ${entry.romaji}`,
  }));
  return searchGlossary(entries, query);
}
