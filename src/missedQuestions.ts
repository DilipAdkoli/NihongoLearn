import type { ChoiceLesson, CourseGroup } from "./ChoiceCourse";
import type { Attempt } from "./storage.types";

export function missedQuestions(
  attempts: readonly Attempt[],
  course: string,
  groups: readonly CourseGroup[],
) {
  const byKey = new Map<string, ChoiceLesson>(
    groups.flatMap(({ lessons }) =>
      lessons.map((lesson) => [`${course}:${lesson.id}`, lesson] as const),
    ),
  );
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
