import {
  completeSteps,
  type LearningStep,
  type PathStudy,
} from "./learningPath.ts";

const steps = [
  {
    id: "hiragana-vowels",
    title: "Learn the hiragana vowels",
    detail: "Study あ・い・う・え・お.",
    seen: ["a", "i", "u", "e", "o"],
  },
  {
    id: "katakana-vowels",
    title: "Learn the katakana vowels",
    detail: "Study ア・イ・ウ・エ・オ.",
    seen: ["kata-a", "kata-i", "kata-u", "kata-e", "kata-o"],
  },
  {
    id: "first-sentences",
    title: "Make basic sentences",
    detail: "Practice です, は, and か.",
    href: "/grammar",
    answers: ["grammar:desu", "grammar:topic-wa", "grammar:question-ka"],
  },
  {
    id: "everyday-words",
    title: "Recognize everyday words",
    detail: "Practice water, tea, rice, and bread.",
    href: "/vocabulary",
    answers: [
      "vocabulary:water",
      "vocabulary:tea",
      "vocabulary:rice",
      "vocabulary:bread",
    ],
  },
  {
    id: "reading",
    title: "Read a short conversation",
    detail: "Answer the desk and location questions.",
    href: { pathname: "/reading", params: { topic: "desk-objects" } },
    answers: ["reading:desk-first", "reading:desk-second"],
  },
  {
    id: "listening",
    title: "Listen to a short routine",
    detail: "Locate yesterday's place and next item.",
    href: {
      pathname: "/passage-listening",
      params: { topic: "yesterday" },
    },
    answers: [
      "passage-listening:yesterday-place",
      "passage-listening:yesterday-next",
    ],
  },
  {
    id: "calendar",
    title: "Read beginner dates",
    detail: "Practice April 1, July 4, and October 24.",
    href: "/calendar",
    answers: ["calendar:4-1", "calendar:7-4", "calendar:10-24"],
  },
  {
    id: "travel",
    title: "Use Japanese for travel",
    detail: "Read train signs, prices, directions, and a ticket request.",
    href: "/travel-path",
    answers: [
      "vocabulary:entrance",
      "reading:station-park",
      "passage-listening:train-next-stop",
      "prices:3000",
      "conversation:ask-train-destination",
    ],
  },
  {
    id: "plans",
    title: "Make and change plans",
    detail: "Read opening hours, understand a change, and write a request.",
    href: "/planning-path",
    answers: [
      "reading:hours-weekday-close",
      "passage-listening:appointment-original",
      "grammar:request-do-not",
      "writing-type:coming-tomorrow-optional",
    ],
  },
] as const satisfies readonly LearningStep[];

export function beginnerN5Path(data: PathStudy) {
  return completeSteps(steps, data);
}
