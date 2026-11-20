import { useState } from "react";
import { ChoiceCourse } from "./ChoiceCourse";
import { grammarTopics } from "./grammarCourse";
import { missedQuestions } from "./missedQuestions";
import type { Attempt } from "./storage.types";
import { useStudy } from "./study";
import { vocabulary, vocabularyRecall } from "./vocabulary";

const choices = {
  grammar: { title: "Review grammar", groups: grammarTopics },
  vocabulary: { title: "Recognize missed words", groups: vocabulary },
  "vocabulary-recall": {
    title: "Recall missed words",
    groups: vocabularyRecall,
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
  const [lessons] = useState(() =>
    missedLessons(data.attempts, course).slice(0, 6),
  );
  return (
    <ChoiceCourse
      title={choices[course].title}
      description={
        lessons.length
          ? "Try the questions you missed most recently. Correct answers clear questions from your next round."
          : "You’re caught up on this review."
      }
      course={course}
      groups={[{ lessons }]}
      reviewQuestions
      backHref="/review"
      backLabel="‹ Back to Review"
    />
  );
}
