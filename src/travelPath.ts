import {
  completeSteps,
  type LearningStep,
  type PathStudy,
} from "./learningPath.ts";

const steps = [
  {
    id: "signs",
    title: "Recognize entrances and exits",
    detail: "Learn to read 入口 and 出口 on signs.",
    href: { pathname: "/vocabulary", params: { topic: "places" } },
    answers: ["vocabulary:entrance", "vocabulary:exit"],
  },
  {
    id: "directions",
    title: "Read directions around a station",
    detail: "Locate the park, convenience store, and bus stop.",
    href: { pathname: "/reading", params: { topic: "station-area" } },
    answers: [
      "reading:station-park",
      "reading:station-store",
      "reading:station-bus-stop",
    ],
  },
  {
    id: "announcement",
    title: "Understand a train announcement",
    detail: "Listen for the next stop and the side where the doors open.",
    href: {
      pathname: "/passage-listening",
      params: { topic: "train-announcement" },
    },
    answers: [
      "passage-listening:train-next-stop",
      "passage-listening:train-exit-side",
    ],
  },
  {
    id: "prices",
    title: "Read prices in the thousands",
    detail: "Work out the prices of a book and a train ticket.",
    href: { pathname: "/prices", params: { topic: "thousands" } },
    answers: ["prices:3000", "prices:8000"],
  },
  {
    id: "ticket",
    title: "Check a destination and ask for a ticket",
    detail: "Ask if the train goes to Kyoto and request one ticket.",
    href: { pathname: "/conversation", params: { topic: "station" } },
    answers: [
      "conversation:ask-train-destination",
      "conversation:buy-one-ticket",
    ],
  },
] as const satisfies readonly LearningStep[];

export function travelPath(data: PathStudy) {
  return completeSteps(steps, data);
}
