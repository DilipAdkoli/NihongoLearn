import { actionPatterns } from "./actionPatterns.ts";
import type { ChoiceLesson, CourseGroup } from "./ChoiceCourse";
import { comparisons } from "./comparisons.ts";
import { existence } from "./existence.ts";
import {
  adjectives,
  demonstratives,
  grammar,
  particles,
  teForm,
  verbs,
} from "./grammar.ts";
import { questionWords } from "./questions.ts";
import type { Attempt } from "./storage.types";

export const grammarTopics: readonly CourseGroup[] = [
  { title: "Statements and questions", lessons: grammar },
  { title: "Pointing to things and places", lessons: demonstratives },
  { title: "Ask everyday questions", lessons: questionWords },
  { title: "Say what’s present and where", lessons: existence },
  { title: "Objects, places, and destinations", lessons: particles },
  { title: "Polite verb forms", lessons: verbs },
  { title: "Describing things", lessons: adjectives },
  { title: "Comparing things", lessons: comparisons },
  { title: "Requests with the て-form", lessons: teForm },
  { title: "Actions, permission, and wants", lessons: actionPatterns },
];

const lessons = grammarTopics.flatMap((topic) => topic.lessons);
const byKey = new Map(
  lessons.map((lesson) => [`grammar:${lesson.id}`, lesson]),
);

export function missedGrammar(attempts: readonly Attempt[]) {
  const latest = new Map<string, { attempt: Attempt; lesson: ChoiceLesson }>();
  for (const attempt of attempts) {
    const lesson = byKey.get(attempt.kanaId);
    if (!lesson) continue;
    const previous = latest.get(attempt.kanaId);
    if (!previous || attempt.at >= previous.attempt.at)
      latest.set(attempt.kanaId, { attempt, lesson });
  }
  return [...latest.values()]
    .filter(({ attempt }) => !attempt.correct)
    .sort((a, b) => b.attempt.at - a.attempt.at)
    .map(({ lesson }) => lesson);
}
