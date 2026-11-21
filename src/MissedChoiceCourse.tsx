import { useState } from "react";
import { ChoiceCourse, type CourseGroup } from "./ChoiceCourse";
import { grammarTopics } from "./grammarCourse";
import { kanjiRecall } from "./kanjiReading";
import { missedQuestions } from "./missedQuestions";
import { passageListening } from "./passageListening";
import { reading } from "./reading";
import type { Attempt } from "./storage.types";
import { useStudy } from "./study";
import { vocabulary, vocabularyRecall } from "./vocabulary";
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
};

type ReviewCourse = keyof typeof choices;

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
    if (course !== "reading" && course !== "passage-listening") {
      return [{ lessons }];
    }
    return choices[course].groups
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
