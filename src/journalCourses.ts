import { datePractice } from "./calendar";
import { counterPractice } from "./counters";
import { dialogueGroups } from "./dialogueAudio";
import { kanjiCourse } from "./kanji";
import { kanjiReading } from "./kanjiReading";
import { loanwordPractice } from "./loanwords";
import { numberPractice } from "./numbers";
import { prices } from "./prices";
import { reviewCourses } from "./reviewCourses";
import { timePractice } from "./time";
import { writingTasks } from "./writing";

// The review catalog covers missed exercises from repeatable review courses.
// Add the other everyday lessons so their mistakes can be explained as well.
export const journalCourses = {
  ...reviewCourses,
  kanji: {
    skill: "Kanji",
    href: "/kanji",
    groups: kanjiCourse,
  },
  "kanji-reading": {
    skill: "Kanji",
    href: "/kanji-reading",
    groups: kanjiReading,
  },
  conversation: {
    skill: "Conversation",
    href: "/conversation",
    groups: dialogueGroups,
  },
  numbers: {
    skill: "Numbers",
    href: "/numbers",
    groups: [{ lessons: numberPractice }],
  },
  counters: {
    skill: "Numbers",
    href: "/counters",
    groups: [{ lessons: counterPractice }],
  },
  prices: {
    skill: "Numbers",
    href: "/prices",
    groups: prices,
  },
  time: {
    skill: "Numbers",
    href: "/time",
    groups: [{ lessons: timePractice }],
  },
  calendar: {
    skill: "Numbers",
    href: "/calendar",
    groups: [{ lessons: datePractice }],
  },
  loanwords: {
    skill: "Katakana",
    href: "/loanword-practice",
    groups: [{ lessons: loanwordPractice }],
  },
  writing: {
    skill: "Writing",
    href: "/writing",
    groups: [
      {
        lessons: writingTasks.map((task) => ({
          id: task.id,
          title: task.meaning,
          explanation: "",
          japanese: "",
          english: task.meaning,
          prompt: "Arrange the Japanese sentence.",
          stem: "",
          choices: task.tiles,
          answer: task.answers[0].join(" "),
          feedback: task.feedback,
        })),
      },
    ],
  },
} as const;
