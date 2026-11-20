import type { ChoiceLesson } from "./ChoiceCourse";

type Word = {
  id: string;
  kana: string;
  spelling: string;
  meaning: string;
  romaji: string;
  audio: number;
};

export const wordGroups: readonly { title: string; words: readonly Word[] }[] =
  [
    {
      title: "Drinks and food",
      words: [
        {
          id: "water",
          romaji: "mizu",
          kana: "みず",
          spelling: "水",
          meaning: "water",
          audio: require("../assets/audio/word-water.mp3"),
        },
        {
          id: "tea",
          romaji: "ocha",
          kana: "おちゃ",
          spelling: "お茶",
          meaning: "tea",
          audio: require("../assets/audio/word-tea.mp3"),
        },
        {
          id: "rice",
          romaji: "gohan",
          kana: "ごはん",
          spelling: "ご飯",
          meaning: "cooked rice",
          audio: require("../assets/audio/word-rice.mp3"),
        },
        {
          id: "bread",
          romaji: "pan",
          kana: "パン",
          spelling: "パン",
          meaning: "bread",
          audio: require("../assets/audio/word-bread.mp3"),
        },
      ],
    },
    {
      title: "Things around you",
      words: [
        {
          id: "book",
          romaji: "hon",
          kana: "ほん",
          spelling: "本",
          meaning: "book",
          audio: require("../assets/audio/word-book.mp3"),
        },
        {
          id: "umbrella",
          romaji: "kasa",
          kana: "かさ",
          spelling: "傘",
          meaning: "umbrella",
          audio: require("../assets/audio/word-umbrella.mp3"),
        },
        {
          id: "key",
          romaji: "kagi",
          kana: "かぎ",
          spelling: "鍵",
          meaning: "key",
          audio: require("../assets/audio/word-key.mp3"),
        },
        {
          id: "camera",
          romaji: "kamera",
          kana: "カメラ",
          spelling: "カメラ",
          meaning: "camera",
          audio: require("../assets/audio/word-camera.mp3"),
        },
      ],
    },
  ];

export const vocabulary = wordGroups.map(({ title, words }) => ({
  title,
  lessons: words.map((word): ChoiceLesson => ({
    id: word.id,
    title: word.kana,
    japanese: word.spelling,
    english: word.meaning,
    explanation: "",
    prompt: "What does this word mean?",
    stem: word.kana,
    choices: words.map((entry) => entry.meaning),
    answer: word.meaning,
    feedback: `${word.spelling} (${word.kana}) means ${word.meaning}.`,
    audio: word.audio,
  })),
}));
