import type { CourseGroup } from "./ChoiceCourse";
import type { GlossaryEntry } from "./glossary";
import { wordGroups } from "./vocabulary";

const weekdays = [
  {
    id: "sun",
    glyph: "日",
    spelling: "日曜日",
    kana: "にちようび",
    romaji: "nichiyoubi",
    meaning: "Sunday",
    gloss: "day or sun",
    audio: require("../assets/audio/day-sun.mp3"),
  },
  {
    id: "mon",
    glyph: "月",
    spelling: "月曜日",
    kana: "げつようび",
    romaji: "getsuyoubi",
    meaning: "Monday",
    gloss: "moon or month",
    audio: require("../assets/audio/day-mon.mp3"),
  },
  {
    id: "tue",
    glyph: "火",
    spelling: "火曜日",
    kana: "かようび",
    romaji: "kayoubi",
    meaning: "Tuesday",
    gloss: "fire",
    audio: require("../assets/audio/day-tue.mp3"),
  },
  {
    id: "wed",
    glyph: "水",
    spelling: "水曜日",
    kana: "すいようび",
    romaji: "suiyoubi",
    meaning: "Wednesday",
    gloss: "water",
    audio: require("../assets/audio/day-wed.mp3"),
  },
  {
    id: "thu",
    glyph: "木",
    spelling: "木曜日",
    kana: "もくようび",
    romaji: "mokuyoubi",
    meaning: "Thursday",
    gloss: "tree or wood",
    audio: require("../assets/audio/day-thu.mp3"),
  },
  {
    id: "fri",
    glyph: "金",
    spelling: "金曜日",
    kana: "きんようび",
    romaji: "kinyoubi",
    meaning: "Friday",
    gloss: "gold or money",
    audio: require("../assets/audio/day-fri.mp3"),
  },
  {
    id: "sat",
    glyph: "土",
    spelling: "土曜日",
    kana: "どようび",
    romaji: "doyoubi",
    meaning: "Saturday",
    gloss: "earth or soil",
    audio: require("../assets/audio/day-sat.mp3"),
  },
];

const componentWords = [
  {
    id: "rest",
    glyph: "休",
    spelling: "休み",
    kana: "やすみ",
    romaji: "yasumi",
    meaning: "a break or day off",
    explanation:
      "休 contains 亻, a form of 人 (person), beside 木 (tree). In 休み, the word can mean a break or a day off.",
    audio: require("../assets/audio/kanji-rest.mp3"),
  },
  {
    id: "grove",
    glyph: "林",
    spelling: "林",
    kana: "はやし",
    romaji: "hayashi",
    meaning: "a grove",
    explanation: "林 is written with two 木 (tree) characters side by side.",
    audio: require("../assets/audio/kanji-grove.mp3"),
  },
  {
    id: "forest",
    glyph: "森",
    spelling: "森",
    kana: "もり",
    romaji: "mori",
    meaning: "a forest",
    explanation: "森 contains three 木 (tree) characters.",
    audio: require("../assets/audio/kanji-forest.mp3"),
  },
  {
    id: "bright",
    glyph: "明",
    spelling: "明るい",
    kana: "あかるい",
    romaji: "akarui",
    meaning: "bright",
    explanation:
      "You can spot 日 and 月 side by side in 明. The whole word 明るい means bright.",
    audio: require("../assets/audio/kanji-bright.mp3"),
  },
];

const weekdaysById = Object.fromEntries(weekdays.map((day) => [day.id, day]));

const readingExamples = [
  {
    weekday: weekdaysById.sun,
    kana: "ひ",
    romaji: "hi",
    meaning: "sun or day",
    audio: require("../assets/audio/kanji-alone-sun.mp3"),
    quizWord: "日",
    quizReading: "ひ",
    choices: ["にち", "ひ", "び"],
    explanation:
      "日 can be ひ on its own. In 日曜日, the first 日 is にち and the final 日 is び.",
  },
  {
    weekday: weekdaysById.mon,
    kana: "つき",
    romaji: "tsuki",
    meaning: "moon",
    audio: require("../assets/audio/kanji-alone-moon.mp3"),
    quizWord: "月曜日",
    quizReading: "げつようび",
    choices: ["つきようび", "がつようび", "げつようび"],
    explanation:
      "月 is つき when it means the moon. It is げつ in 月曜日 and がつ in dates such as 四月.",
  },
  {
    weekday: weekdaysById.thu,
    kana: "き",
    romaji: "ki",
    meaning: "tree",
    audio: require("../assets/audio/kanji-alone-tree.mp3"),
    quizWord: "木",
    quizReading: "き",
    choices: ["もく", "き", "こう"],
    explanation: "木 is き when it means a tree. It is もく in 木曜日.",
  },
  {
    weekday: weekdaysById.wed,
    kana: "みず",
    romaji: "mizu",
    meaning: "water",
    audio: require("../assets/audio/word-water.mp3"),
    quizWord: "水曜日",
    quizReading: "すいようび",
    choices: ["すいようび", "みずようび", "ずいようび"],
    explanation: "水 is みず when it means water. It is すい in 水曜日.",
  },
];

export const kanjiWords: readonly GlossaryEntry[] = [
  ...weekdays,
  ...componentWords,
  ...readingExamples.map(({ weekday, ...word }) => ({
    ...word,
    spelling: weekday.glyph,
  })),
].map(({ spelling, kana, romaji, meaning, audio }) => ({
  spelling,
  kana,
  romaji,
  meaning,
  audio,
}));

const signKanji = new Map([
  ["station", { glyph: "駅", explanation: "駅 is the kanji for a station." }],
  ["right", { glyph: "右", explanation: "右 means right, as in turn right." }],
  ["left", { glyph: "左", explanation: "左 means left, as in turn left." }],
  [
    "in-front",
    { glyph: "前", explanation: "前 can mean the front of a place." },
  ],
  [
    "exit",
    {
      glyph: "出",
      explanation:
        "出 is the character for going out. Look for it in 出口 on exit signs.",
    },
  ],
  [
    "entrance",
    {
      glyph: "入",
      explanation:
        "入 is the character for going in. Look for it in 入口 on entrance signs.",
    },
  ],
  [
    "park",
    {
      glyph: "園",
      explanation: "園 appears in words for gardens and parks, including 公園.",
    },
  ],
]);

const signWords = wordGroups
  .flatMap((group) => group.words)
  .flatMap((word) => {
    const character = signKanji.get(word.id);
    return character ? [{ ...word, ...character }] : [];
  });

export const kanjiCourse: readonly CourseGroup[] = [
  {
    title: "Days of the week",
    lessons: weekdays.map((day, index) => ({
      id: `weekday-${day.id}`,
      title: day.glyph,
      explanation: `${day.glyph} can mean ${day.gloss}. Read it in the full weekday word below.`,
      japanese: day.spelling,
      english: `${day.kana} · ${day.meaning}`,
      prompt: "Which day of the week does this word mean?",
      stem: day.spelling,
      choices: [
        weekdays[(index + 2) % 7].meaning,
        day.meaning,
        weekdays[(index + 5) % 7].meaning,
        weekdays[(index + 3) % 7].meaning,
      ].sort(
        (a, b) =>
          weekdays.findIndex((entry) => entry.meaning === a) -
          weekdays.findIndex((entry) => entry.meaning === b),
      ),
      answer: day.meaning,
      feedback: `${day.spelling} is read ${day.kana} and means ${day.meaning}.`,
      audio: day.audio,
    })),
  },
  {
    title: "Places and directions",
    lessons: signWords.map((word, index) => ({
      id: `sign-${word.id}`,
      title: word.glyph,
      explanation: word.explanation,
      japanese: word.spelling,
      english: `${word.kana} · ${word.meaning}`,
      prompt: "What does this word mean?",
      stem: word.spelling,
      choices: [0, 1, 3, 5]
        .map((offset) => signWords[(index + offset) % signWords.length].meaning)
        .sort(),
      answer: word.meaning,
      feedback: `${word.spelling} is read ${word.kana} and means ${word.meaning}.`,
      audio: word.audio,
    })),
  },
  {
    title: "Parts of common kanji",
    lessons: componentWords.map((word) => ({
      id: `component-${word.id}`,
      title: word.glyph,
      explanation: word.explanation,
      japanese: word.spelling,
      english: `${word.kana} · ${word.meaning}`,
      prompt: "What does this word mean?",
      stem: word.spelling,
      choices: componentWords.map((option) => option.meaning),
      answer: word.meaning,
      feedback: `${word.spelling} is read ${word.kana} and means ${word.meaning}.`,
      audio: word.audio,
    })),
  },
  {
    title: "One kanji, several readings",
    lessons: readingExamples.map((example) => ({
      id: `readings-${example.weekday.id}`,
      title: example.weekday.glyph,
      explanation: example.explanation,
      japanese: `${example.weekday.glyph}　${example.kana}\n${example.weekday.spelling}　${example.weekday.kana}`,
      english: `${example.meaning} · ${example.weekday.meaning}`,
      prompt: `How do you read ${example.quizWord} here?`,
      stem: example.quizWord,
      choices: example.choices,
      answer: example.quizReading,
      feedback: example.explanation,
      audio: example.audio,
      answerAudio:
        example.quizWord === example.weekday.spelling
          ? example.weekday.audio
          : example.audio,
    })),
  },
];
