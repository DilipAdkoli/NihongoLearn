import type { ChoiceLesson, CourseGroup } from "./ChoiceCourse";
import type { Attempt } from "./storage.types";

export function latestQuestionAttempts(
  attempts: readonly Attempt[],
  knownQuestions: Pick<ReadonlySet<string>, "has">,
) {
  const latest = new Map<string, Attempt>();
  for (const attempt of attempts) {
    if (!knownQuestions.has(attempt.kanaId)) continue;
    const previous = latest.get(attempt.kanaId);
    if (!previous || attempt.at >= previous.at)
      latest.set(attempt.kanaId, attempt);
  }
  return latest;
}

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
  const latest = latestQuestionAttempts(attempts, byKey);
  return [...latest.values()]
    .filter((attempt) => !attempt.correct)
    .sort((a, b) => b.at - a.at)
    .map((attempt) => byKey.get(attempt.kanaId)!);
}
