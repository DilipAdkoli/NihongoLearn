import {
  completeSteps,
  type LearningStep,
  type PathStudy,
} from "./learningPath.ts";

const steps = [
  {
    id: "dates",
    title: "Read dates on a calendar",
    detail: "Practice April 1, July 4, and October 24.",
    href: "/calendar",
    answers: ["calendar:4-1", "calendar:7-4", "calendar:10-24"],
  },
  {
    id: "hours",
    title: "Decide when to visit a bookstore",
    detail: "Read the weekday and weekend hours and answer three questions.",
    href: { pathname: "/reading", params: { topic: "bookstore-hours" } },
    answers: [
      "reading:hours-weekday-close",
      "reading:hours-saturday-open",
      "reading:hours-closed-day",
    ],
  },
  {
    id: "appointment",
    title: "Understand an appointment change",
    detail: "Listen for the old date, the reason it changes, and the new time.",
    href: {
      pathname: "/passage-listening",
      params: { topic: "appointment-change" },
    },
    answers: [
      "passage-listening:appointment-original",
      "passage-listening:appointment-reason",
      "passage-listening:appointment-new",
    ],
  },
  {
    id: "requests",
    title: "Explain what’s required or optional",
    detail: "Practice three requests and obligations with the ない-form.",
    href: { pathname: "/grammar", params: { topic: "requests" } },
    answers: [
      "grammar:request-do-not",
      "grammar:request-optional",
      "grammar:request-have-to",
    ],
  },
  {
    id: "message",
    title: "Write a message about tomorrow",
    detail: "Type a sentence that tells someone they don’t have to come.",
    href: {
      pathname: "/write-japanese",
      params: { task: "coming-tomorrow-optional" },
    },
    answers: ["writing-type:coming-tomorrow-optional"],
  },
] as const satisfies readonly LearningStep[];

export function planningPath(data: PathStudy) {
  return completeSteps(steps, data);
}
