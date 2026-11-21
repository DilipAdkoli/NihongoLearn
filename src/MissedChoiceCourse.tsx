import { useState } from "react";
import { ChoiceCourse, type CourseGroup } from "./ChoiceCourse";
import { grammarTopics } from "./grammarCourse";
import { kanjiRecall } from "./kanjiReading";
import { missedQuestions } from "./missedQuestions";
import { passageListening } from "./passageListening";
import { reading } from "./reading";
import { scheduleListening } from "./scheduleListening";
import { soundQuestions } from "./soundRules";
import type { Attempt } from "./storage.types";
import { useStudy } from "./study";
import {
  vocabulary,
  vocabularyListening,
  vocabularyRecall,
} from "./vocabulary";
import { typedSentenceLessons } from "./writing";

const choices = {
  grammar: { title: "Review grammar", groups: grammarTopics },
  vocabulary: { title: "Recognize missed words", groups: vocabulary },
  "vocabulary-recall": {
    title: "Recall missed words",
    groups: vocabularyRecall,
  },
  reading: { title: "Review reading passages", groups: reading },
  "passage-listening": {
    title: "Review listening passages",
    groups: passageListening,
  },
  "kanji-recall": { title: "Review kanji spelling", groups: kanjiRecall },
  "writing-type": {
    title: "Review typed sentences",
    groups: [{ lessons: typedSentenceLessons }],
  },
  "vocabulary-listening": {
    title: "Review spoken words",
    groups: vocabularyListening,
  },
  "schedule-listening": {
    title: "Review spoken dates and times",
    groups: scheduleListening,
  },
  "sound-listening": {
    title: "Review sound differences",
    groups: [{ lessons: soundQuestions }],
  },
};

type ReviewCourse = keyof typeof choices;

export const listeningReviewCourses = [
  { course: "vocabulary-listening", label: "spoken word" },
  { course: "schedule-listening", label: "date or time question" },
  { course: "sound-listening", label: "sound question" },
] as const;

export function missedLessons(
  attempts: readonly Attempt[],
  course: ReviewCourse,
) {
  return missedQuestions(attempts, course, choices[course].groups);
}

export function MissedChoiceCourse({ course }: { course: ReviewCourse }) {
  const { data } = useStudy();
  const [groups] = useState<readonly CourseGroup[]>(() => {
    const lessons = missedLessons(data.attempts, course).slice(0, 6);
    if (!lessons.length) return [];
    if (course !== "reading" && !course.endsWith("-listening")) {
      return [{ lessons }];
    }
    const sources: readonly CourseGroup[] = choices[course].groups;
    return sources
      .map((group) => ({
        ...group,
        lessons: lessons.filter((lesson) => group.lessons.includes(lesson)),
      }))
      .filter((group) => group.lessons.length > 0);
  });
  return (
    <ChoiceCourse
      title={choices[course].title}
      description={
        groups.length
          ? "Try the questions you missed most recently. Correct answers clear questions from your next round."
          : "You’re caught up on this review."
      }
      course={course}
      groups={groups}
      reviewQuestions
      backHref="/review"
      backLabel="‹ Back to Review"
    />
  );
}
