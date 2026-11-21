import { useState } from "react";
import { ChoiceCourse, type CourseGroup } from "./ChoiceCourse";
import {
  missedLessons,
  reviewCourses,
  type ReviewCourse,
} from "./reviewCourses";
import { useStudy } from "./study";

export { listeningReviewCourses, missedLessons } from "./reviewCourses";

export function MissedChoiceCourse({ course }: { course: ReviewCourse }) {
  const { data } = useStudy();
  const [groups] = useState<readonly CourseGroup[]>(() => {
    const lessons = missedLessons(data.attempts, course).slice(0, 6);
    if (!lessons.length) return [];
    if (course !== "reading" && !course.endsWith("-listening")) {
      return [{ lessons }];
    }
    const sources: readonly CourseGroup[] = reviewCourses[course].groups;
    return sources
      .map((group) => ({
        ...group,
        lessons: lessons.filter((lesson) => group.lessons.includes(lesson)),
      }))
      .filter((group) => group.lessons.length > 0);
  });
  return (
    <ChoiceCourse
      title={reviewCourses[course].title}
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
