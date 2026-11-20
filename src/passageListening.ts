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
  {
    id: "train-announcement",
    title: "Train announcement",
    passage: {
      japanese: "つぎは、きょうとです。\nおでぐちは、みぎがわです。",
      english: "The next stop is Kyoto.\nThe doors will open on the right.",
      audio: [
        require("../assets/audio/passage-kyoto-normal.mp3"),
        require("../assets/audio/passage-kyoto-slow.mp3"),
      ],
    },
    lessons: questions(
      {
        id: "train-next-stop",
        title: "Next stop",
        prompt: "Which station is next?",
        choices: ["Tokyo", "Kyoto", "Osaka"],
        answer: "Kyoto",
        feedback: "つぎ means next. きょうと is Kyoto.",
      },
      {
        id: "train-exit-side",
        title: "Exit side",
        prompt: "Which side will the doors open on?",
        choices: ["Right", "Left", "Both sides"],
        answer: "Right",
        feedback: "みぎがわ means the right side. おでぐち refers to the exit.",
      },
    ),
  },
  {
    title: "An evening routine",
    passage: {
      japanese:
        "まいばん、しちじに うちに かえります。\nはちじに ばんごはんを たべます。\nそれから、にほんごを べんきょうします。\nじゅういちじに ねます。",
      english:
        "Every evening, I get home at seven.\nI eat dinner at eight.\nThen I study Japanese.\nI go to bed at eleven.",
      audio: [
        require("../assets/audio/passage-evening-normal.mp3"),
        require("../assets/audio/passage-evening-slow.mp3"),
      ],
    },
    lessons: questions(
      {
        id: "evening-dinner",
        title: "Dinner time",
        prompt: "When does the speaker have dinner?",
        choices: ["At eight", "At seven", "At eleven"],
        answer: "At eight",
        feedback: "ばんごはん means dinner. はちじ is eight o’clock.",
      },
      {
        id: "evening-study",
        title: "After dinner",
        prompt: "What does the speaker do after dinner?",
        choices: ["Goes home", "Studies Japanese", "Goes to work"],
        answer: "Studies Japanese",
        feedback: "にほんごを べんきょうします means I study Japanese.",
      },
      {
        id: "evening-bedtime",
        title: "Bedtime",
        prompt: "When does the speaker go to bed?",
        choices: ["At eight", "At ten", "At eleven"],
        answer: "At eleven",
        feedback: "じゅういちじに ねます means I go to bed at eleven.",
      },
    ),
  },
];
