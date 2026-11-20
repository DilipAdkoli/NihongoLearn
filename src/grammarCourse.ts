import { actionPatterns } from "./actionPatterns.ts";
import type { CourseGroup } from "./ChoiceCourse";
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
import { plainVerbs } from "./plainVerbs.ts";
import { questionWords } from "./questions.ts";

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
  { title: "Plain verb forms", lessons: plainVerbs },
];
