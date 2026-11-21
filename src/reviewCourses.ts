import { grammarTopics } from "./grammarCourse";
import { kanjiRecall } from "./kanjiReading";
import { missedQuestions } from "./missedQuestions";
import { passageListening } from "./passageListening";
import { reading } from "./reading";
import { scheduleListening } from "./scheduleListening";
import { soundQuestions } from "./soundRules";
import type { Attempt } from "./storage.types";
import {
  vocabulary,
  vocabularyListening,
  vocabularyRecall,
} from "./vocabulary";
import { typedSentenceLessons } from "./writing";

export const reviewCourses = {
  grammar: {
    skill: "Grammar",
    href: "/grammar-review",
    title: "Review grammar",
    groups: grammarTopics,
  },
  vocabulary: {
    skill: "Vocabulary",
    href: "/word-review",
    title: "Recognize missed words",
    groups: vocabulary,
  },
  "vocabulary-recall": {
    skill: "Vocabulary",
    href: { pathname: "/word-review", params: { mode: "recall" } },
    title: "Recall missed words",
    groups: vocabularyRecall,
  },
  reading: {
    skill: "Reading",
    href: "/passage-review",
    title: "Review reading passages",
    groups: reading,
  },
  "passage-listening": {
    skill: "Listening",
    href: { pathname: "/passage-review", params: { mode: "listening" } },
    title: "Review listening passages",
    groups: passageListening,
  },
  "kanji-recall": {
    skill: "Writing",
    href: { pathname: "/writing-review", params: { mode: "kanji" } },
    title: "Review kanji spelling",
    groups: kanjiRecall,
  },
  "writing-type": {
    skill: "Writing",
    href: "/writing-review",
    title: "Review typed sentences",
    groups: [{ lessons: typedSentenceLessons }],
  },
  "vocabulary-listening": {
    skill: "Listening",
    href: {
      pathname: "/listening-review",
      params: { skill: "vocabulary-listening" },
    },
    title: "Review spoken words",
    groups: vocabularyListening,
  },
  "schedule-listening": {
    skill: "Listening",
    href: {
      pathname: "/listening-review",
      params: { skill: "schedule-listening" },
    },
    title: "Review spoken dates and times",
    groups: scheduleListening,
  },
  "sound-listening": {
    skill: "Listening",
    href: {
      pathname: "/listening-review",
      params: { skill: "sound-listening" },
    },
    title: "Review sound differences",
    groups: [{ lessons: soundQuestions }],
  },
} as const;

export type ReviewCourse = keyof typeof reviewCourses;

export const listeningReviewCourses = [
  { course: "vocabulary-listening", label: "spoken word" },
  { course: "schedule-listening", label: "date or time question" },
  { course: "sound-listening", label: "sound question" },
] as const;

export function missedLessons(
  attempts: readonly Attempt[],
  course: ReviewCourse,
) {
  return missedQuestions(attempts, course, reviewCourses[course].groups);
}
