import { latestQuestionAttempts } from "./missedQuestions.ts";
import type { Attempt } from "./storage.types";

export const beginnerCheckCourse = "beginner-check";

const stationReadingAnswers = [
  "きのうえきでほんをよみました",
  "きのうほんをえきでよみました",
  "えきできのうほんをよみました",
  "えきでほんをきのうよみました",
  "ほんをきのうえきでよみました",
  "ほんをえきできのうよみました",
];

export const beginnerCheck = [
  {
    title: "Vocabulary",
    href: "/vocabulary",
    lessons: [
      {
        id: "sign-entrance",
        title: "At the entrance",
        prompt: "Which sign means entrance?",
        choices: ["出口", "駅", "入口"],
        answer: "入口",
        feedback: "入口 (いりぐち) means entrance. 出口 (でぐち) means exit.",
      },
      {
        id: "routine-return",
        title: "Going home",
        prompt: "Which verb means “to go home”?",
        choices: ["かえる", "おきる", "はたらく"],
        answer: "かえる",
        feedback: "帰る (かえる) means to go home or return.",
      },
    ],
  },
  {
    title: "Grammar",
    href: "/grammar",
    lessons: [
      {
        id: "particle-location",
        title: "Where it happens",
        prompt: "Say “I drink tea here.”",
        stem: "わたしは ここ＿＿ おちゃを のみます。",
        choices: ["が", "で", "の"],
        answer: "で",
        feedback: "で marks the place where the action happens.",
      },
      {
        id: "verb-negative",
        title: "Yesterday’s plans",
        prompt: "Say “I didn’t go to school yesterday.”",
        stem: "きのう、がっこうに ＿＿。",
        choices: ["いきませんでした", "いきません", "いきました"],
        answer: "いきませんでした",
        feedback: "いきませんでした is the polite negative past of いく.",
      },
    ],
  },
  {
    title: "Reading",
    href: "/reading",
    passage: {
      japanese:
        "あした、えきの まえで ともだちに あいます。\nそれから、いっしょに こうえんに いきます。",
      standardJapanese:
        "明日、駅の前で友だちに会います。\nそれから、一緒に公園に行きます。",
      english:
        "Tomorrow I’ll meet a friend in front of the station.\nThen we’ll go to the park together.",
    },
    lessons: [
      {
        id: "reading-meeting",
        title: "The meeting place",
        prompt: "Where will the writer meet their friend?",
        choices: ["At the park", "In front of the station", "At school"],
        answer: "In front of the station",
        feedback: "えきの まえで identifies the front of the station.",
      },
      {
        id: "reading-destination",
        title: "Where they go next",
        prompt: "Where will they go together?",
        choices: ["A bookstore", "The station", "The park"],
        answer: "The park",
        feedback: "いっしょに means together, and こうえん means park.",
      },
    ],
  },
  {
    title: "Listening",
    href: "/passage-listening",
    lessons: [
      {
        id: "departure-time",
        title: "A time to leave",
        prompt: "What time will the speaker go to the station?",
        choices: ["At seven", "At eight", "At nine"],
        answer: "At eight",
        feedback: "はちじに means at eight o’clock.",
      },
      {
        id: "drinking-water",
        title: "What is happening now?",
        prompt: "What is the speaker doing right now?",
        choices: ["Reading a book", "Eating bread", "Drinking water"],
        answer: "Drinking water",
        feedback: "みずを のんでいます means I’m drinking water.",
      },
    ],
  },
  {
    title: "Writing",
    href: "/write-japanese",
    lessons: [
      {
        id: "writing-station-reading",
        title: "Reading at the station",
        prompt:
          "Write “I read a book at the station yesterday” in polite Japanese.",
        stem: "Use きのう, えき, ほん, and the polite past of よむ.",
        choices: [],
        answer: stationReadingAnswers[0],
        acceptedAnswers: [
          ...stationReadingAnswers,
          ...stationReadingAnswers.map((answer) => `わたしは${answer}`),
        ],
        feedback:
          "えきで gives the location, ほんを marks the object, and よみました is the polite past of よむ.",
      },
      {
        id: "writing-water-permission",
        title: "Ask for permission",
        prompt: "Write “May I drink water here?” in Japanese.",
        stem: "Ask with 〜てもいいですか.",
        choices: [],
        answer: "ここでみずをのんでもいいですか",
        acceptedAnswers: [
          "ここでみずをのんでもいいですか",
          "みずをここでのんでもいいですか",
        ],
        feedback:
          "ここで gives the place. のむ becomes のんで before もいいですか.",
      },
    ],
  },
] as const;

const knownQuestions = new Set<string>(
  beginnerCheck.flatMap(({ lessons }) =>
    lessons.map((lesson) => `${beginnerCheckCourse}:${lesson.id}`),
  ),
);

export function beginnerCheckProgress(attempts: readonly Attempt[]) {
  const latest = latestQuestionAttempts(attempts, knownQuestions);
  return beginnerCheck.map(({ title, href, lessons }) => {
    const answers = lessons.map(({ id }) =>
      latest.get(`${beginnerCheckCourse}:${id}`),
    );
    return {
      title,
      href,
      total: lessons.length,
      answered: answers.filter(Boolean).length,
      correct: answers.filter((answer) => answer?.correct).length,
    };
  });
}
