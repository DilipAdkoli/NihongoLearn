import type { Href } from "expo-router";
import type { ChoiceLesson } from "./ChoiceCourse";
import { latestQuestionAttempts } from "./missedQuestions";
import type { Attempt } from "./storage.types";

type JournalCourse = {
  skill: string;
  href: Href;
  groups: readonly { lessons: readonly ChoiceLesson[] }[];
};

export type MistakeEntry = {
  key: string;
  skill: string;
  href: Href;
  title: string;
  prompt: string;
  yourAnswer: string;
  correctAnswer: string;
  feedback: string;
  at: number;
};

export function mistakeJournal(
  attempts: readonly Attempt[],
  courses: Readonly<Record<string, JournalCourse>>,
): MistakeEntry[] {
  const catalog = new Map<
    string,
    { lesson: ChoiceLesson; skill: string; href: Href }
  >();
  for (const [course, { skill, href, groups }] of Object.entries(courses)) {
    for (const group of groups) {
      for (const lesson of group.lessons) {
        catalog.set(`${course}:${lesson.id}`, { lesson, skill, href });
      }
    }
  }

  return [...latestQuestionAttempts(attempts, catalog).values()]
    .filter((attempt) => !attempt.correct)
    .sort((a, b) => b.at - a.at || a.kanaId.localeCompare(b.kanaId))
    .map((attempt) => {
      const { lesson, skill, href } = catalog.get(attempt.kanaId)!;
      return {
        key: attempt.kanaId,
        skill,
        href,
        title: lesson.title,
        prompt: lesson.prompt,
        yourAnswer: attempt.answer,
        correctAnswer: lesson.acceptedAnswers?.[0] ?? lesson.answer,
        feedback: lesson.feedback,
        at: attempt.at,
      };
    });
}

export function mistakeSkillCounts(entries: readonly MistakeEntry[]) {
  const counts = new Map<string, number>();
  for (const entry of entries) {
    counts.set(entry.skill, (counts.get(entry.skill) ?? 0) + 1);
  }
  return [...counts].sort(([a], [b]) => a.localeCompare(b)).map(
    ([skill, count]) => ({ skill, count }),
  );
}
