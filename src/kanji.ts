import type { CourseGroup } from "./ChoiceCourse";
import type { GlossaryEntry } from "./glossary";

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

export const weekdayWords: readonly GlossaryEntry[] = weekdays.map(
  ({ spelling, kana, romaji, meaning, audio }) => ({
    spelling,
    kana,
    romaji,
    meaning,
    audio,
  }),
);

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
];
