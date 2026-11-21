import type { Href } from "expo-router";
import { beginnerCheck, beginnerCheckCourse } from "./beginnerCheck.ts";
import { beginnerN5Path } from "./beginnerN5Path.ts";
import { hiraganaPath, katakanaPath } from "./kanaPaths.ts";
import { latestQuestionAttempts } from "./missedQuestions.ts";
import { overviewPaths } from "./overviewPath.ts";
import { planningPath } from "./planningPath.ts";
import { starterPath } from "./starterPath.ts";
import type { Attempt, StudyData } from "./storage.types";
import { travelPath } from "./travelPath.ts";

const paths = {
  "/starter-path": starterPath,
  "/travel-path": travelPath,
  "/planning-path": planningPath,
  "/hiragana-path": hiraganaPath,
  "/katakana-path": katakanaPath,
  "/beginner-n5-path": beginnerN5Path,
};

export function selectedPathSteps(data: StudyData) {
  return paths[overviewPaths[data.overviewPath].href](data);
}

type PracticeSource = {
  skill: string;
  href: Href;
  groups: readonly { lessons: readonly { id: string }[] }[];
};

export function studySkillIndex(
  courses: Readonly<Record<string, PracticeSource>>,
) {
  const index = new Map<string, { skill: string; href: Href }>();
  for (const [course, { skill, href, groups }] of Object.entries(courses)) {
    for (const group of groups) {
      for (const lesson of group.lessons)
        index.set(`${course}:${lesson.id}`, { skill, href });
    }
  }
  for (const { title, href, lessons } of beginnerCheck) {
    for (const lesson of lessons)
      index.set(`${beginnerCheckCourse}:${lesson.id}`, { skill: title, href });
  }
  return index;
}

type PlanAction =
  { href: Href } | { kana: readonly string[]; mode: "review" | "study" };

type PlanItem = {
  title: string;
  reason: string;
  action: PlanAction;
};

type Queue = readonly { dueAt: number }[];

export type PlanQueues = {
  kana: readonly { id: string; dueAt: number }[];
  vocabulary: Queue;
  saved: Queue;
};

function dueReviews(
  queues: PlanQueues,
  now: number,
  kanaBatchSize: number,
): PlanItem[] {
  const kana = queues.kana
    .filter((card) => card.dueAt <= now)
    .sort((a, b) => a.dueAt - b.dueAt);
  const words = queues.vocabulary
    .filter((card) => card.dueAt <= now)
    .sort((a, b) => a.dueAt - b.dueAt);
  const saved = queues.saved
    .filter((card) => card.dueAt <= now)
    .sort((a, b) => a.dueAt - b.dueAt);
  const candidates: { firstDue: number; item: PlanItem }[] = [];
  if (kana.length)
    candidates.push({
      firstDue: kana[0].dueAt,
      item: {
        title: "Review due kana",
        reason: `${kana.length} ${kana.length === 1 ? "character is" : "characters are"} ready for recall.`,
        action: {
          kana: kana.slice(0, kanaBatchSize).map((card) => card.id),
          mode: "review",
        },
      },
    });
  if (words.length)
    candidates.push({
      firstDue: words[0].dueAt,
      item: {
        title: "Recall everyday vocabulary",
        reason: `${words.length} ${words.length === 1 ? "practiced word is" : "practiced words are"} due for review.`,
        action: { href: "/vocabulary-review" },
      },
    });
  if (saved.length)
    candidates.push({
      firstDue: saved[0].dueAt,
      item: {
        title: "Recall saved words",
        reason: `${saved.length} ${saved.length === 1 ? "word from your glossary is" : "words from your glossary are"} due for review.`,
        action: {
          href: { pathname: "/saved-practice", params: { mode: "recall" } },
        },
      },
    });
  return candidates
    .sort((a, b) => a.firstDue - b.firstDue)
    .map(({ item }) => item);
}

export function reviewForecast(queues: PlanQueues, now: number) {
  const nextDay = now + 24 * 60 * 60 * 1000;
  let dueNow = 0;
  let dueNext24Hours = 0;
  for (const queue of [queues.kana, queues.vocabulary, queues.saved]) {
    for (const card of queue) {
      if (card.dueAt <= now) dueNow++;
      else if (card.dueAt <= nextDay) dueNext24Hours++;
    }
  }
  return { dueNow, dueNext24Hours };
}

function practiceFocus(
  attempts: readonly Attempt[],
  index: ReturnType<typeof studySkillIndex>,
  now: number,
): PlanItem | undefined {
  const latest = latestQuestionAttempts(
    attempts.filter((attempt) => attempt.at <= now),
    index,
  );
  const skills = new Map<
    string,
    { tried: number; missed: number; latestMiss?: Attempt }
  >();
  for (const attempt of latest.values()) {
    const { skill } = index.get(attempt.kanaId)!;
    const score = skills.get(skill) ?? { tried: 0, missed: 0 };
    score.tried++;
    if (!attempt.correct) {
      score.missed++;
      if (!score.latestMiss || score.latestMiss.at <= attempt.at)
        score.latestMiss = attempt;
    }
    skills.set(skill, score);
  }
  const [weakest] = [...skills]
    .filter(([, score]) => score.missed)
    .sort(
      ([, a], [, b]) =>
        b.missed / b.tried - a.missed / a.tried ||
        b.missed - a.missed ||
        b.latestMiss!.at - a.latestMiss!.at,
    );
  if (!weakest) return;
  const [skill, score] = weakest;
  return {
    title: `Practice ${skill.toLowerCase()}`,
    reason: `You missed ${score.missed} of ${score.tried} ${skill.toLowerCase()} ${score.tried === 1 ? "question" : "questions"} on your latest try.`,
    action: { href: index.get(score.latestMiss!.kanaId)!.href },
  };
}

export function dailyStudyPlan(
  data: StudyData,
  queues: PlanQueues,
  index: ReturnType<typeof studySkillIndex>,
  now: number,
  kanaBatchSize: number,
): PlanItem[] {
  const reviews = dueReviews(queues, now, kanaBatchSize);
  const focus = practiceFocus(data.attempts, index, now);
  const nextStep = selectedPathSteps(data).find((step) => !step.complete);
  const items: PlanItem[] = [...reviews];
  if (focus) items.push(focus);
  if (nextStep) {
    items.push({
      title: nextStep.title,
      reason: `Up next in ${overviewPaths[data.overviewPath].title}. ${nextStep.detail}`,
      action:
        "href" in nextStep
          ? { href: nextStep.href }
          : { kana: nextStep.seen, mode: "study" },
    });
  } else {
    items.push({
      title: "Explore another lesson",
      reason: `You’ve completed ${overviewPaths[data.overviewPath].title}.`,
      action: { href: "/learn" },
    });
  }
  return items;
}
