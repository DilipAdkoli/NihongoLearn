export type SoundWord = {
  kana: string;
  reading: string;
  meaning: string;
  audio: number;
};

export const soundComparisons = [
  {
    title: "Small っ and ッ",
    explanation:
      "A small っ or ッ takes one beat. Before t or k, hold a brief silence before releasing the next consonant. Before an s sound, hold the hiss. In romaji this is often written with a doubled consonant.",
    words: [
      {
        kana: "きて",
        reading: "kite",
        meaning: "come (a request)",
        audio: require("../assets/audio/kite.mp3"),
      },
      {
        kana: "きって",
        reading: "kitte",
        meaning: "postage stamp",
        audio: require("../assets/audio/kitte.mp3"),
      },
    ],
  },
  {
    title: "Long vowels in hiragana",
    explanation:
      "A long vowel lasts two beats. Sometimes a second vowel kana lengthens the first. Here, あ extends the a sound after ば.",
    words: [
      {
        kana: "おばさん",
        reading: "obasan",
        meaning: "aunt",
        audio: require("../assets/audio/obasan.mp3"),
      },
      {
        kana: "おばあさん",
        reading: "obaasan",
        meaning: "grandmother",
        audio: require("../assets/audio/obaasan.mp3"),
      },
    ],
  },
  {
    title: "The katakana long-vowel mark",
    explanation:
      "The mark ー adds another beat to the vowel just before it. In ビール, it turns the short i of ビ into a long i.",
    words: [
      {
        kana: "ビル",
        reading: "biru",
        meaning: "building",
        audio: require("../assets/audio/biru.mp3"),
      },
      {
        kana: "ビール",
        reading: "biiru",
        meaning: "beer",
        audio: require("../assets/audio/biiru.mp3"),
      },
    ],
  },
];
