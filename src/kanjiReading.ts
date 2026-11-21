import type { CourseGroup } from "./ChoiceCourse";
import { glossaryEntries } from "./glossaryEntries";

const topics = [
  {
    title: "Buildings and places",
    questions: [
      {
        id: "school",
        title: "Going to school",
        word: "学校",
        stem: "【学校】へ行きます。",
        choices: ["がこう", "がっこう", "がっこ"],
        answer: "がっこう",
        feedback:
          "学校 is がっこう. The small っ comes before こ, and う extends the o sound.",
      },
      {
        id: "library",
        title: "A quiet library",
        word: "図書館",
        stem: "ここは静かな【図書館】です。",
        choices: ["としょかん", "どしょかん", "としょうかん"],
        answer: "としょかん",
        feedback:
          "図書館 is としょかん. The small ょ combines with し to make しょ.",
      },
      {
        id: "hospital",
        title: "Next to the hospital",
        word: "病院",
        stem: "薬局は【病院】の隣です。",
        choices: ["びよういん", "びょいん", "びょういん"],
        answer: "びょういん",
        feedback:
          "病院 is びょういん. Use a small ょ and hold the o sound for two beats.",
      },
      {
        id: "post-office",
        title: "Find the post office",
        word: "郵便局",
        stem: "【郵便局】はどこですか。",
        choices: ["ゆびんきょく", "ゆうびんきょく", "ゆうびんきよく"],
        answer: "ゆうびんきょく",
        feedback:
          "郵便局 is ゆうびんきょく. ゆう has a long vowel, and きょ uses a small ょ.",
      },
    ],
  },
  {
    title: "Descriptions, days, and directions",
    questions: [
      {
        id: "cheap",
        title: "An inexpensive ticket",
        word: "安い",
        stem: "この切符は【安い】です。",
        choices: ["たかい", "やさい", "やすい"],
        answer: "やすい",
        feedback:
          "安い is やすい. Here it describes a ticket that costs little.",
      },
      {
        id: "friday",
        title: "Plans for Friday",
        word: "金曜日",
        stem: "【金曜日】に友だちと会います。",
        choices: ["きんようび", "きんよび", "ぎんようび"],
        answer: "きんようび",
        feedback: "金曜日 is きんようび. The weekday ending is ようび.",
      },
      {
        id: "left",
        title: "Turn left",
        word: "左",
        stem: "次の角を【左】に曲がってください。",
        choices: ["みぎ", "ひだり", "ひたり"],
        answer: "ひだり",
        feedback: "左 is ひだり. The middle kana is voiced.",
      },
      {
        id: "quiet",
        title: "A quiet park",
        word: "静か",
        stem: "この公園は【静か】です。",
        choices: ["しすか", "しずい", "しずか"],
        answer: "しずか",
        feedback: "静か is しずか. The last kana か is part of the adjective.",
      },
    ],
  },
] as const;

export const kanjiReading: readonly CourseGroup[] = topics.map(
  ({ title, questions }) => ({
    title,
    lessons: questions.map(({ word, ...question }) => ({
      ...question,
      explanation: "",
      japanese: "",
      english: "",
      prompt: "How do you read the word in brackets?",
      answerAudio: glossaryEntries.find((entry) => entry.spelling === word)
        ?.audio,
    })),
  }),
);
