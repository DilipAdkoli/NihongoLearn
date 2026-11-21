# NihongoLearn — AI development handoff

**Last updated:** 2026-11-22 (Asia/Kolkata)
**Repository:** DilipAdkoli/NihongoLearn
**Work branch:** `codex/nihongolearn`
**Release branch:** `main` (older, do not assume it has branch features)

## Current sprint: guided kana paths

- Added **Hiragana step by step** and **Katakana step by step** as selectable
  onboarding/daily-study paths and as entries on the Learn page.
- Both reuse the existing kana lesson rows, preserving the small lesson
  groups, offline sound, practice behavior, and local seen-progress.
- The path lists automatically include future row additions to `src/learning.ts`.
- Added `tests/kanaPaths.test.ts` for complete script coverage, stepwise
  progress, and selected daily-path routing.
- Files changed: `src/kanaPaths.ts`, `app/hiragana-path.tsx`,
  `app/katakana-path.tsx`, `src/overviewPath.ts`,
  `src/dailyStudyPlan.ts`, `src/LibraryScreens.tsx`,
  `tests/kanaPaths.test.ts`, `README.md`, `AGENTS.md`, and this document.
- **Verification:** On the feature commit plus these format-only corrections:
  `npm ci` succeeded, `npm run typecheck` succeeded, `npm test` passed
  **76/76 tests**, `npm run format:check` succeeded, and
  `npm run export:web` succeeded with **337 offline assets**.
  The feature commit's Vercel preview was READY. The final formatting/handoff
  commit needs its own preview build status checked before release.
- These paths track whether each character has been *studied*; they are **not**
  yet proficiency certifications.
- Updated the Hiragana and Katakana guided paths to require latest correct
  recall and listening attempts for every character in a row before marking
  that lesson step complete. Existing `seen` progress remains saved, and a
  learner is not re-certified until they complete the measured checks. Each
  row now exposes a direct listening-check action.
- Renamed the learning-path UI module from `LearningPath.tsx` to
  `learningPathView.tsx` to remove a Windows-only filename casing collision
  with `learningPath.ts`.
- Verification for this mastery update: `npm ci` succeeded,
  `npm run typecheck` succeeded, `npm test` passed **78/78 tests**, changed
  implementation files pass Prettier, and `npm run export:web` succeeded.
  The repository-wide `npm run format:check` remains a baseline failure,
  reporting 182 existing or line-ending-sensitive files; changed files were
  formatted and checked separately.

## Recently completed in prior sprints

- `e1fcbbbb`: Mistake Journal with corrections, history filtering by skill,
  review links, and kana recognition/listening/recall separation.
- `c2c8ba4`: Daily plan with multiple due-review categories and 24-hour
  review forecast.
- Earlier: Expo/React Native learning platform, local storage, kana study
  and audio, grammar/vocabulary/reading/listening, guided study paths,
  FSRS reviews, offline web, and an Android test-build workflow.

## Known limitations and guardrails

- The public production branch lags the development branch. Avoid
  automatically merging hundreds of diverged changes without review.
- Physical Android install, audio, microphone, offline/caching, and low-end
  performance are not yet verified on a device.
- Japanese lesson content and synthesized pronunciations require qualified
  language review before claiming educational accuracy.
- AI conversational tutor and full JLPT N5–N1 content remain unimplemented.
- Learner progress is stored locally. Cloud accounts/sync are not present.
- Vercel preview protection can require sign-in.
- Node engine range currently allows Vercel to use Node 26, despite a
  configured project preference for Node 24.

## Next concrete development tasks

1. Verify this measured-mastery commit's preview deployment.
2. Expand and verify a cohesive beginner N5 learning sequence.
3. Validate the Android APK and offline audio on a real phone.
4. Plan a reviewed development-to-production merge, checking divergence.

**Handoff rule:** Every coding agent should read this document first and
append/update the sprint summary and next actions whenever code changes.
Do not claim checks passed until they actually run.
