import type { Href } from "expo-router";
import type { ChoiceLesson } from "./ChoiceCourse";
import type { Kana } from "./learning";
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

type CatalogEntry =
  | {
      kind: "lesson";
      lesson: ChoiceLesson;
      skill: string;
      href: Href;
    }
  | { kind: "kana"; kana: Kana };

export function mistakeJournal(
  attempts: readonly Attempt[],
  courses: Readonly<Record<string, JournalCourse>>,
  kanaItems: readonly Kana[] = [],
): MistakeEntry[] {
  const catalog = new Map<string, CatalogEntry>();
  for (const [course, { skill, href, groups }] of Object.entries(courses)) {
    for (const group of groups) {
      for (const lesson of group.lessons) {
        catalog.set(`${course}:${lesson.id}`, {
          kind: "lesson",
          lesson,
          skill,
          href,
        });
      }
    }
  }
  for (const item of kanaItems) {
    catalog.set(item.id, { kind: "kana", kana: item });
  }

  // Keep kana recognition, listening, and unaided recall independent.
  // Recognizing a kana must not erase an unresolved recall mistake.
  const latest = new Map<string, Attempt>();
  for (const attempt of attempts) {
    const entry = catalog.get(attempt.kanaId);
    if (!entry) continue;
    const key =
      entry.kind === "kana"
        ? `${attempt.kanaId}:${attempt.mode}`
        : attempt.kanaId;
    const previous = latest.get(key);
    if (!previous || attempt.at >= previous.at) latest.set(key, attempt);
  }

  return [...latest]
    .filter(([, attempt]) => !attempt.correct)
    .sort(([keyA, a], [keyB, b]) => b.at - a.at || keyA.localeCompare(keyB))
    .map(([key, attempt]) => {
      const entry = catalog.get(attempt.kanaId)!;
      if (entry.kind === "kana") {
        const { kana } = entry;
        return {
          key,
          skill: kana.script === "hiragana" ? "Hiragana" : "Katakana",
          href: {
            pathname: "/session",
            params: { ids: kana.id, mode: "review" },
          } as const,
          title: `${kana.script === "hiragana" ? "Hiragana" : "Katakana"} ${kana.glyph}`,
          prompt:
            attempt.mode === "recall"
              ? `What is the reading of ${kana.glyph}?`
              : attempt.mode === "listening"
                ? `Which character matches the sound ${kana.reading}?`
                : `Which character represents ${kana.reading}?`,
          yourAnswer: attempt.answer,
          correctAnswer: attempt.mode === "recall" ? kana.reading : kana.glyph,
          feedback: `${kana.glyph} is read ${kana.reading}. ${kana.cue}`,
          at: attempt.at,
        };
      }
      const { lesson, skill, href } = entry;
      return {
        key,
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
  return [...counts]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([skill, count]) => ({ skill, count }));
}
