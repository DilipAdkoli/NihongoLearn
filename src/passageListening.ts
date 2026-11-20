import type { ChoiceLesson, CourseGroup } from "./ChoiceCourse";

function questions(
  ...lessons: {
    id: string;
    title: string;
    prompt: string;
    choices: readonly string[];
    answer: string;
    feedback: string;
  }[]
): ChoiceLesson[] {
  return lessons.map((lesson) => ({
    ...lesson,
    explanation: "",
    japanese: "",
    english: "",
    stem: "",
  }));
}

export const passageListening: readonly CourseGroup[] = [
  {
    title: "Yesterday",
    passage: {
      japanese:
        "きのう、いえで ほんを よみました。\nそれから、おちゃを のみました。",
      english: "Yesterday, I read a book at home.\nAfter that, I drank tea.",
      audio: [
        require("../assets/audio/passage-yesterday-normal.mp3"),
        require("../assets/audio/passage-yesterday-slow.mp3"),
      ],
    },
    lessons: questions(
      {
        id: "yesterday-place",
        title: "Where",
        prompt: "Where did the speaker read?",
        choices: ["At school", "At home", "At the station"],
        answer: "At home",
        feedback:
          "いえで means at home. で marks the place where the action happened.",
      },
      {
        id: "yesterday-next",
        title: "What happened next",
        prompt: "What did the speaker do after reading?",
        choices: ["Ate bread", "Went to school", "Drank tea"],
        answer: "Drank tea",
        feedback:
          "おちゃを のみました means drank tea. それから means after that.",
      },
    ),
  },
  {
    title: "Tomorrow’s plans",
    passage: {
      japanese: "あした、えきに いきます。\nえきで ともだちに あいます。",
      english: "Tomorrow, I’ll go to the station.\nI’ll meet a friend there.",
      audio: [
        require("../assets/audio/passage-tomorrow-normal.mp3"),
        require("../assets/audio/passage-tomorrow-slow.mp3"),
      ],
    },
    lessons: questions(
      {
        id: "tomorrow-place",
        title: "Destination",
        prompt: "Where will the speaker go?",
        choices: ["A café", "The station", "A friend’s home"],
        answer: "The station",
        feedback: "えきに いきます means go to the station.",
      },
      {
        id: "tomorrow-who",
        title: "Who",
        prompt: "Who will the speaker meet?",
        choices: ["A friend", "A teacher", "A sibling"],
        answer: "A friend",
        feedback: "ともだちに あいます means meet a friend.",
      },
    ),
  },
];
