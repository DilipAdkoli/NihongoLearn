import { useState } from "react";
import { ChoiceCourse } from "../src/ChoiceCourse";
import { useStudy } from "../src/study";
import { vocabularyRecall, vocabularyWordIds } from "../src/vocabulary";
import {
  vocabularyRecallCourse,
  vocabularyReviewQueue,
} from "../src/vocabularyReview";

const lessonsById = new Map(
  vocabularyRecall.flatMap(({ lessons }) =>
    lessons.map((lesson) => [lesson.id, lesson] as const),
  ),
);

export default function VocabularyReview() {
  const { data } = useStudy();
  const [lessons] = useState(() => {
    const now = Date.now();
    const queue = vocabularyReviewQueue(data, vocabularyWordIds, now);
    const due = queue.filter(({ dueAt }) => dueAt <= now);
    return (due.length ? due : queue)
      .slice(0, 8)
      .map(({ id }) => lessonsById.get(id)!);
  });
  return (
    <ChoiceCourse
      title="Recall everyday vocabulary"
      description={
        lessons.length
          ? "Type the Japanese words you’ve practiced. Your answers schedule your next review."
          : "Practice everyday vocabulary to start scheduled recall."
      }
      course={vocabularyRecallCourse}
      groups={[{ lessons }]}
      backHref={lessons.length ? "/review" : "/vocabulary"}
      backLabel={
        lessons.length ? "‹ Back to Review" : "‹ Open everyday vocabulary"
      }
    />
  );
}
