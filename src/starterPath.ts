import { lessons } from "./learning.ts";
import type { StudyData } from "./storage.types";

const steps = [
  {
    id: "vowels",
    title: "Study the five vowels",
    detail: "Learn あ・い・う・え・お with pronunciation.",
    seen: lessons[0].ids,
  },
  {
    id: "sentences",
    title: "Make your first sentences",
    detail: "Practice です, は, and か.",
    href: "/grammar",
    answers: ["grammar:desu", "grammar:topic-wa", "grammar:question-ka"],
  },
  {
    id: "words",
    title: "Recognize four everyday words",
    detail: "Study water, tea, rice, and bread.",
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
    detail: "Read “What’s on the desk?” and answer both questions.",
    href: "/reading",
    answers: ["reading:desk-first", "reading:desk-second"],
  },
  {
    id: "listening",
    title: "Listen to a short passage",
    detail: "Listen to “Yesterday” and answer both questions.",
    href: "/passage-listening",
    answers: [
      "passage-listening:yesterday-place",
      "passage-listening:yesterday-next",
    ],
  },
  {
    id: "conversation",
    title: "Order tea and thank the server",
    detail: "Complete the café exercises in Everyday dialogue.",
    href: "/conversation",
    answers: ["conversation:order-tea", "conversation:thank-server"],
  },
] as const;

export function starterPath(data: Pick<StudyData, "seen" | "attempts">) {
  const seen = new Set(data.seen);
  const correct = new Set(
    data.attempts
      .filter((attempt) => attempt.correct)
      .map((attempt) => attempt.kanaId),
  );
  return steps.map((step) => ({
    ...step,
    complete:
      "seen" in step
        ? step.seen.every((id) => seen.has(id))
        : step.answers.every((id) => correct.has(id)),
  }));
}
