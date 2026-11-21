import assert from "node:assert/strict";
import test from "node:test";
import { selectedPathSteps } from "../src/dailyStudyPlan.ts";
import { hiraganaPath, katakanaPath } from "../src/kanaPaths.ts";
import { kana, lessons, type Script } from "../src/learning.ts";
import { readOverviewPath } from "../src/overviewPath.ts";
import type { Attempt, StudyData } from "../src/storage.types.ts";

const fresh: StudyData = {
  seen: [],
  savedWords: [],
  attempts: [],
  dailyGoal: 0,
  overviewPath: 0,
  japaneseTextSize: 0,
  darkMode: false,
  sound: true,
  romaji: true,
};

for (const [script, createPath] of [
  ["hiragana", hiraganaPath],
  ["katakana", katakanaPath],
] as const) {
  test(`${script} guided path covers each lesson and character once`, () => {
    const path = createPath(fresh);
    const expectedLessons = lessons.filter(
      (lesson) => lesson.script === script,
    );
    const expectedIds = kana
      .filter((item) => item.script === script)
      .map((item) => item.id)
      .sort();
    const ids = path.flatMap((step) => ("seen" in step ? step.seen : []));
    assert.equal(path.length, expectedLessons.length);
    assert.equal(new Set(ids).size, ids.length);
    assert.deepEqual([...ids].sort(), expectedIds);
    assert.ok(path.every((step) => !step.complete));
    assert.ok(path.every((step) => "seen" in step && step.seen.length <= 5));
  });

  test(`${script} path progresses one row at a time`, () => {
    const path = createPath(fresh);
    const first = path[0];
    assert.ok("seen" in first);
    const resumed = createPath({ ...fresh, seen: [...first.seen] });
    assert.equal(resumed[0].complete, false);
    assert.equal(resumed[1].complete, false);
  });

  test(`${script} path requires correct recall and listening mastery`, () => {
    const path = createPath(fresh);
    const first = path[0];
    assert.ok("seen" in first);
    const attempt = (
      kanaId: string,
      mode: Attempt["mode"],
      correct: boolean,
      at: number,
    ): Attempt => ({
      id: `${kanaId}-${mode}-${at}`,
      kanaId,
      mode,
      answer: "",
      correct,
      at,
    });
    const seen = { ...fresh, seen: [...first.seen] };
    const recallAttempts = first.seen.map((kanaId, index) =>
      attempt(kanaId, "recall", true, index + 1),
    );
    assert.equal(
      createPath({ ...seen, attempts: recallAttempts })[0].complete,
      false,
    );
    const listeningAttempts = first.seen.map((kanaId, index) =>
      attempt(kanaId, "listening", true, index + 10),
    );
    const mastered = createPath({
      ...seen,
      attempts: [...recallAttempts, ...listeningAttempts],
    });
    assert.equal(mastered[0].complete, true);
    const forgotten = createPath({
      ...seen,
      attempts: [
        ...recallAttempts,
        ...listeningAttempts,
        ...first.seen.map((kanaId, index) =>
          attempt(kanaId, "recall", false, index + 20),
        ),
      ],
    });
    assert.equal(forgotten[0].complete, false);
  });
}

test("both scripts can be selected as the learner's personal daily path", () => {
  assert.equal(readOverviewPath(3), 3);
  assert.equal(readOverviewPath(4), 4);
  assert.equal(readOverviewPath(1000), 0);
  assert.deepEqual(
    selectedPathSteps({ ...fresh, overviewPath: 3 }).map((step) => step.id),
    hiraganaPath(fresh).map((step) => step.id),
  );
  assert.deepEqual(
    selectedPathSteps({ ...fresh, overviewPath: 4 }).map((step) => step.id),
    katakanaPath(fresh).map((step) => step.id),
  );
});
