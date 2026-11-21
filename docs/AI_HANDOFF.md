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
- Added a selectable **Complete beginner journey** overview path covering
  hiragana, katakana, basic sentences, everyday words, reading, listening,
  dates, travel, and planning. It routes through existing reviewed lesson
  content and does not claim official JLPT N5 certification.
- Fixed shared path completion logic so a later wrong answer removes a step
  from completion, while `seen` and local attempts remain unchanged.
- Files changed: `src/beginnerN5Path.ts`, `app/beginner-n5-path.tsx`,
  `src/learningPath.ts`, `src/dailyStudyPlan.ts`, `src/overviewPath.ts`,
  `tests/beginnerN5Path.test.ts`, `tests/kanaPaths.test.ts`, `README.md`,
  and this document.
- Verification for the beginner journey: `npm run typecheck` succeeded,
  `npm test` passed **80/80 tests**, changed files pass Prettier, and
  `npm run export:web` succeeded.
- Updated Android APK workflow triggers so app, source, asset, public, script,
  package, lockfile, app configuration, and workflow changes all request a
  test-arm64 build.
- Android work is paused until the user explicitly requests it to resume.
  Do not add Android features, broaden APK triggers, or claim device validation
  until that request.
- Corrected the beginner journey reading route to open the real `desk-objects`
  passage and added topic-integrity coverage for its reading and listening steps.
- Verification after the routing fix: `npm run typecheck` succeeded,
  `npm test` passed **81/81 tests**, changed files pass Prettier, and
  `npm run export:web` succeeded.
- Added session-summary retry for missed kana: incorrect items are deduplicated
  and routed into a listening or review session. Correct items are not repeated.
- Verification after missed-answer retry: `npm run typecheck` succeeded,
  `npm test` passed **82/82 tests**, changed files pass Prettier, and
  `npm run export:web` succeeded.
- Added separate recognition, recall, and listening status to the Progress
  by-character list, with each skill using the latest attempt for that mode.
- Exposed the Complete beginner journey and katakana loanword practice directly
  in the Learn catalog, and added discoverability coverage for both routes.
- Verification after catalog and progress updates: `npm run typecheck` succeeded,
  `npm test` passed **84/84 tests**, changed files pass Prettier, and
  `npm run export:web` succeeded.

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

1. Verify this beginner-journey and latest-answer commit's preview deployment.
2. Continue core app features and polish without claiming unreviewed language
   or audio content is native-speaker validated.
3. Plan a reviewed development-to-production merge, checking divergence.
4. Android APK and physical-device work remain paused until the user asks.

**Handoff rule:** Every coding agent should read this document first and
append/update the sprint summary and next actions whenever code changes.
Do not claim checks passed until they actually run.
