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
    {
      title: "At the station",
      words: [
        {
          id: "station",
          kana: "えき",
          spelling: "駅",
          romaji: "eki",
          meaning: "station",
          audio: require("../assets/audio/word-station.mp3"),
        },
        {
          id: "train",
          kana: "でんしゃ",
          spelling: "電車",
          romaji: "densha",
          meaning: "train",
          audio: require("../assets/audio/word-train.mp3"),
        },
        {
          id: "bus",
          kana: "バス",
          spelling: "バス",
          romaji: "basu",
          meaning: "bus",
          audio: require("../assets/audio/word-bus.mp3"),
        },
        {
          id: "ticket",
          kana: "きっぷ",
          spelling: "切符",
          romaji: "kippu",
          meaning: "ticket",
          audio: require("../assets/audio/word-ticket.mp3"),
        },
      ],
    },
    {
      title: "People and time",
      words: [
        {
          id: "today",
          kana: "きょう",
          spelling: "今日",
          romaji: "kyou",
          meaning: "today",
          audio: require("../assets/audio/word-today.mp3"),
        },
        {
          id: "tomorrow",
          kana: "あした",
          spelling: "明日",
          romaji: "ashita",
          meaning: "tomorrow",
          audio: require("../assets/audio/word-tomorrow.mp3"),
        },
        {
          id: "friend",
          kana: "ともだち",
          spelling: "友だち",
          romaji: "tomodachi",
          meaning: "friend",
          audio: require("../assets/audio/word-friend.mp3"),
        },
        {
          id: "student",
          kana: "がくせい",
          spelling: "学生",
          romaji: "gakusei",
          meaning: "student",
          audio: require("../assets/audio/word-student.mp3"),
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

export const vocabularyRecall = wordGroups.map(({ title, words }) => ({
  title,
  lessons: words.map((word): ChoiceLesson => ({
    id: word.id,
    title: word.meaning,
    japanese: "",
    english: "",
    explanation: "",
    prompt: "Type the Japanese word in kana or kanji.",
    stem: "",
    choices: [],
    acceptedAnswers: [
      word.kana,
      word.spelling,
      ...(word.id === "friend" ? ["友達"] : []),
    ],
    answer: word.kana,
    feedback: `${word.spelling} (${word.kana}) means ${word.meaning}.`,
  })),
}));
