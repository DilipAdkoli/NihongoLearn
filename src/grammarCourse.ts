import { ability } from "./ability.ts";
import { actionPatterns } from "./actionPatterns.ts";
import type { CourseGroup } from "./ChoiceCourse";
import { comparisons } from "./comparisons.ts";
import { conditionals } from "./conditionals.ts";
import { connectors } from "./connectors.ts";
import { existence } from "./existence.ts";
import {
  adjectives,
  demonstratives,
  grammar,
  particles,
  teForm,
  verbs,
} from "./grammar.ts";
import { nounParticles } from "./nounParticles.ts";
import { nounModifiers } from "./nounModifiers.ts";
import { invitations } from "./invitations.ts";
import { plainVerbs } from "./plainVerbs.ts";
import { questionWords } from "./questions.ts";
import { requests } from "./requests.ts";

export const grammarTopics: readonly (CourseGroup & {
  id: string;
  title: string;
})[] = [
  { id: "statements", title: "Statements and questions", lessons: grammar },
  {
    id: "demonstratives",
    title: "Pointing to things and places",
    lessons: demonstratives,
  },
  { id: "questions", title: "Ask everyday questions", lessons: questionWords },
  {
    id: "existence",
    title: "Say what’s present and where",
    lessons: existence,
  },
  {
    id: "particles",
    title: "Objects, places, and destinations",
    lessons: particles,
  },
  {
    id: "noun-particles",
    title: "Possession, company, and ranges",
    lessons: nounParticles,
  },
  { id: "polite-verbs", title: "Polite verb forms", lessons: verbs },
  { id: "adjectives", title: "Describing things", lessons: adjectives },
  { id: "comparisons", title: "Comparing things", lessons: comparisons },
  { id: "te-form", title: "Requests with the て-form", lessons: teForm },
  {
    id: "action-patterns",
    title: "Actions, permission, and wants",
    lessons: actionPatterns,
  },
  { id: "plain-verbs", title: "Plain verb forms", lessons: plainVerbs },
  {
    id: "noun-modifiers",
    title: "Describe nouns with verbs",
    lessons: nounModifiers,
  },
  { id: "requests", title: "Requests and obligations", lessons: requests },
  {
    id: "invitations",
    title: "Invitations and suggestions",
    lessons: invitations,
  },
  { id: "connectors", title: "Reasons and connections", lessons: connectors },
  { id: "ability", title: "Ability and potential verbs", lessons: ability },
  {
    id: "conditionals",
    title: "Say what happens if something changes",
    lessons: conditionals,
  },
];
