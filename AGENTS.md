# NihongoLearn — coding agent instructions

**Read `docs/AI_HANDOFF.md` before making any changes.** It is the designated
handoff record for ChatGPT, Codex, and other agents. The README is a proposed
feature roadmap, not proof that all its checkboxes are implemented.

## Safe workflow

1. Read the handoff, latest branch head, and relevant source and tests.
2. Work on `codex/nihongolearn` by default. Do not merge into `main` or
   change production settings without explicit user authorization.
3. Implement a coherent user-visible improvement with focused regression
   tests. Preserve local study progress and offline behavior.
4. Run `npm ci`, `npm run typecheck`, `npm test`,
   `npm run format:check`, and `npm run export:web`.
5. Commit meaningful changes. Do not create fake or empty commits to
   manipulate GitHub activity.
6. **Before each substantive commit, update `docs/AI_HANDOFF.md`** with:
   what changed; affected files; checks and observed results; outstanding
   limitations; and the concrete next task. After commit, report the commit
   hash and any Vercel preview status to the user. If a check has not run,
   label it as unverified.

## Product principles

- Teach Japanese correctly and clearly; do not claim unreviewed audio or
  language content has been validated by native speakers.
- Design for Android, web, offline access, accessibility, and low-end phones.
- Keep learner progress local by default. Never commit secrets, private user
  data, paid model API keys, or credentials.
- An AI tutor is *not* yet implemented; do not label rule-based recommendations
  as LLM-driven learning intelligence.
- Keep a small, usable beginner journey working while the broader JLPT and AI
  roadmap is expanded.
