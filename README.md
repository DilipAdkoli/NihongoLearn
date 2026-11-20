# NihongoLearn 🇯🇵

> **Development checkpoint — kana curriculum.** The Expo app teaches all 46 basic hiragana and 25 kana with dakuten or handakuten across 15 lessons, 33 contracted hiragana sounds across 11 lessons, plus matching basic, voiced, and contracted katakana across 26 lessons, with bundled audio, recognition and typed recall. The remaining roadmap is a backlog.

## Run the app

Use Node 24.3 or newer in the 24.x series. From the repository root, run `npm ci`, then `npm run web` for the browser or `npm start` for Expo Go with SDK 58. Android stores study data in SQLite. The web version uses browser local storage. Run `npm run typecheck` and `npm test` for the learning and persistence checks.

For a web build that can reopen offline, run `npm run export:web` and serve `dist/` from the root of an HTTPS origin or from localhost. Open it once with a connection so the service worker can cache the app and audio.

To try the latest pushed web build with Python, download `NihongoLearn-web` from **Artifacts** on the latest successful [App checks run](https://github.com/DilipAdkoli/NihongoLearn/actions/workflows/checks.yml). Unzip it, open the folder containing `index.html` in VS Code, and run `python -m http.server 8000 --bind 127.0.0.1`. Open `http://localhost:8000` in your browser.

The Android test APK workflow builds an ARM64 APK with the JavaScript and audio bundled. Sign in to GitHub and download `NihongoLearn-test-arm64` from **Artifacts** on a successful run. Unzip it, transfer `app-release.apk` to the phone, and open it on the phone. The APK uses the test signing key. New builds also include `SHA256SUMS.txt` with the APK’s SHA-256 checksum. [Android test APK runs](https://github.com/DilipAdkoli/NihongoLearn/actions/workflows/android-apk.yml)

## Current build

- **Kana.** 208 study entries across hiragana and katakana cover the 46 basic characters per script, dakuten and handakuten, and 33 common contracted sounds per script. Study uses bundled synthesized audio, with recognition, typed recall, and listening drills. The sound guide compares small っ and ッ and long vowels. A lookalike guide compares similar kana side by side with audio and practice. A searchable loanword reference covers 13 katakana combinations with bundled examples and quizzes.
- **Beginner lessons.** Grammar covers polite and plain verb forms, the て-form, adjectives, demonstratives, existence, location, questions, comparisons, actions in progress, permission, and wants. Practice 32 everyday words with typed recall, counting through 99, common counters, clock and calendar readings, sentence building for locations, permission, and wants, kanji in weekdays and signs, and scripted dialogue with audio responses for introductions, cafés, and stations. Read station directions, a morning routine, and a casual message from a friend. Listen to a train announcement and an evening routine with two playback speeds, repeat and stop controls, and transcripts. Switch reading passages between kana and standard Japanese with kanji. Reading and listening have optional translations. The glossary searches lesson words by Japanese, romaji, or English and offers practice with saved words.
- **Review and progress.** Overview shows due kana and opens the next review batch. FSRS schedules recall from saved answers. A kana check suggests a lesson, and Review offers targeted drills for pairs learners have mixed up. Review also offers grammar, word recognition, and typed recall questions whose latest answer was incorrect. Progress shows separate skill scores and seven days of activity. Overview tracks an optional daily question goal.
- **Starter path.** Open the starter path from Overview or choose Start learning Japanese in Learn for six guided steps from hiragana vowels through a café exchange. Existing study progress counts toward the path.
- **Local settings.** Pronunciation audio and kana reading hints can be toggled independently. Settings exports study data as JSON and merges imported progress without changing local preferences.

TypeScript, formatting, and 49 automated tests passed. Browser checks covered offline lessons, review, backup export and import, and persistence across reloads. GitHub Actions built, verified, and uploaded the first signed Android test APK. A physical Android airplane-mode check of playback and progress persistence is pending. Draft lesson content and synthesized pronunciation still need human review. [First successful APK build](https://github.com/DilipAdkoli/NihongoLearn/actions/runs/44771830477)

**Vision:** An Android-first, offline-capable Japanese learning app for beginners through advanced learners, combining an evidence-informed curriculum, real-world immersion, spaced repetition, error-aware personalization, and an optional privacy-respecting open-source AI tutor called **Sensei AI**.

This README records the full feature vision developed in the project's planning conversation so that Codex and other contributors have one actionable source of truth. It is deliberately exhaustive: **not every item is a launch requirement**.

## Product principles

1. **Actually teach Japanese.** Optimize delayed recall, listening/reading comprehension, writing/speaking ability, and transfer to unfamiliar situations—not just streaks or XP.
2. **Local first.** Lessons, core quizzes, progress and review should work without an account, Internet connection, or cloud AI.
3. **Adaptive but explainable.** Every learning recommendation should be attributable to observable performance and give learners control.
4. **Accurate before generative.** Curated, verified lesson content and answer keys are authoritative. AI explanations are supplemental and must be evaluated.
5. **Progressively remove assistance.** Fade romaji, translations, furigana and hints as actual mastery improves.
6. **Learn Japanese in context.** Teach grammar, vocabulary, writing, pronunciation and culture alongside realistic usage.
7. **Accessibility and affordability.** Target lower-cost Android devices and slow connections; minimize model downloads, storage and battery requirements.
8. **Responsible commercialization.** Use correctly licensed datasets, audio, images and examples; avoid redistributing copyrighted media without rights.
9. **Evidence over hype.** Experimental learning features are hypotheses to test, not scientifically proven shortcuts.
10. **Maintainable engineering.** Separate content, progress, scheduler, analytics, tutoring engine and presentation layers.

### Status notation

- **C / Core** — initial product and learning foundations.
- **N / Next** — later versions once foundations work.
- **A / Advanced** — complex, expensive, experimental, or optional.
- The checklist describes the full backlog. The current build is summarized above.

## Learner journeys

1. **Absolute beginner:** install → select goal/time → learn kana → hear recordings → answer recognition and recall questions → targeted review → first simple sentence.
2. **Returning learner:** open app → due reviews and weakness priorities → short lesson → recall/listening/production practice → progress update.
3. **Existing Japanese learner:** placement test → skip known material → select grammar, reading, JLPT or conversation path → receive suitable content.
4. **JLPT learner:** choose N5/N4/N3/N2/N1 target → diagnostic → curriculum and practice tests → timed mocks → section-specific revision.
5. **Immersion learner:** read/listen to licensed or imported permitted Japanese → tap unknown words → save to review → practice in context.
6. **AI learner:** optionally ask Sensei AI → grounded explanation or roleplay → corrections and review recommendations → human-verifiable examples.

## Full Japanese curriculum specification

**Foundations:** Japanese writing systems; sounds and morae; vowels and consonants; pronunciation; word order; particles; politeness; basic greetings; keyboard input; sentence segmentation; why romaji is a temporary aid.

**Hiragana:** all 46 basic characters, dakuten, handakuten, yōon/contracted sounds, sokuon/small っ, long vowels, lookalike shapes, reading and writing, meaningful examples and audio.

**Katakana:** all 46 basic characters, modified/extended combinations, length mark ー, loanwords, foreign names, abbreviations, onomatopoeia, lookalikes, reading and writing.

**Kanji:** radicals/components, meaning, readings in actual words, on'yomi and kun'yomi, vocabulary compounds, stroke order, context, confusing shapes, mnemonic aids, common-use Jōyō kanji, and graded paths.

**Vocabulary:** numbers, time/date, greetings, family, food, clothing, colors, places, weather, nature, animals, school, transport, home, common verbs, occupations, health, travel, relationships, media, emotions, social situations, slang/idioms, workplace, abstract/academic/professional terms.

**Grammar progression:**
- Beginner: copula です; ます forms; sentence order; particles; existence ある/いる; demonstratives; questions; counters; adjectives; verbs; past and negative; て-form; requests; comparisons; desire and basic permission.
- Intermediate: clauses and modification; conditionals; potential; passive and causative; receiving/giving; obligation/prohibition; transitivity; modality; reported speech; volitional; honorific foundations; nuanced particles and aspect.
- Advanced: keigo and register; complex embedded clauses; advanced modality and conjunction; discourse structure; academic writing; literary usage; implicit subjects and pragmatic interpretation; regional and conversational nuance.

**Skills:** visual recognition, recall, listening, reading, speaking, writing, culturally appropriate communication and practical task completion.

**Real-life domains:** restaurants, stores, stations, directions, hotels, classrooms, university, jobs, formal meetings, friendship, phone calls, healthcare, emergencies, forms and public signs.

**JLPT:** N5, N4, N3, N2 and N1 learning tracks, plus separately measured speaking/writing (not official current JLPT test sections). Avoid claiming that unofficial word/kanji lists are official level specifications.

**Advanced learning:** authentic reading and listening, novels, news, academic documents, professional communication, pitch-accent awareness, dialects, jokes, culture and conversational naturalness.

## Core pedagogical loop

    Discover → Understand → Recognize → Recall → Apply → Review → Transfer

- Teach with a short explanation and examples before expecting independent production.
- Test recognition and **unassisted recall separately**.
- Use spaced practice (prefer a tested FSRS implementation), cumulative tests, targeted corrective feedback, context and incremental difficulty.
- Interleave old and new learning where appropriate; teach confusable pairs explicitly.
- Add listening, shadowing, guided writing and conversation rather than treating flashcards as fluency.
- Use graded reading/listening, comprehension checks, task-based practice, mnemonic support and voluntary immersion.
- Schedule difficult or forgotten items more often; allow learner rest and backlog recovery.
- Measure effectiveness through delayed recall and transfer tasks rather than number of minutes spent.
- Treat learning-style labels (visual/auditory/etc.) as preferences, **not validated fixed ability categories**.
- A 20-minute smart-session *starting hypothesis* might be 4 min reviews, 5 min new material, 4 min reading/listening, 5 min production, 2 min reflection; adapt based on performance.
- Avoid claims that any one schedule or method guarantees faster learning for everyone.

## Comprehensive feature backlog

Legend: C = Core, N = Next, A = Advanced. All items are proposals until implemented and verified.

### Onboarding, accounts and goals

- [ ] **C** Guest-first access without registration
- [ ] **C** Welcome walkthrough
- [ ] **C** User goal selection: conversation, travel, JLPT, anime, manga, study, work, reading
- [ ] **C** Beginner placement assessment
- [ ] **C** Existing-knowledge skip tests
- [ ] **C** Daily time commitment selection
- [ ] **C** Explanation-language preference
- [ ] **C** Romaji visibility setting
- [ ] **C** Pace selection
- [ ] **C** Goal progress view
- [ ] **N** Optional email account
- [ ] **N** Google sign-in
- [ ] **N** Apple sign-in on supported platforms
- [ ] **N** Optional cloud sync
- [ ] **N** Study preferences and lesson format choices
- [ ] **N** Multiple goal profiles
- [ ] **N** Import previous progress
- [ ] **N** Export/restore learning profile
- [ ] **N** Personalized onboarding questions
- [ ] **N** Goal change without losing history
- [ ] **A** Multiple user profiles on one device
- [ ] **A** Adaptive placement tests across modalities

### Hiragana learning

- [ ] **C** Complete 46 basic hiragana
- [ ] **C** Dakuten syllables
- [ ] **C** Handakuten syllables
- [ ] **C** Yoon combinations such as きゃ and しゅ
- [ ] **C** Small っ and consonant doubling
- [ ] **C** Long vowels and sound combinations
- [ ] **C** Interactive hiragana chart
- [ ] **C** Per-character reading and audio
- [ ] **C** Lookalike character comparison
- [ ] **C** Character recognition quiz
- [ ] **C** Audio-to-kana quiz
- [ ] **C** Kana typing from memory
- [ ] **C** Mixed hiragana drills
- [ ] **C** Words written in hiragana
- [ ] **C** Mastery per character
- [ ] **C** Progressive romaji removal
- [ ] **N** Stroke order animations
- [ ] **N** Trace writing
- [ ] **N** Freehand writing
- [ ] **N** Timed recognition
- [ ] **N** Kana pairing game
- [ ] **N** Handwriting accuracy feedback
- [ ] **N** Personalized kana drill generation
- [ ] **N** Kana completion achievements
- [ ] **A** Camera handwriting recognition
- [ ] **A** Advanced writing-form scoring

### Katakana learning

- [ ] **C** Complete 46 basic katakana
- [ ] **C** Dakuten and handakuten
- [ ] **C** Combined sounds and small kana
- [ ] **C** Prolonged sound mark ー
- [ ] **C** Interactive katakana chart
- [ ] **C** Per-character audio
- [ ] **C** Foreign names and loanwords
- [ ] **C** Word reading and audio exercises
- [ ] **C** Kana recognition and typing quizzes
- [ ] **C** Lookalike character comparison including シ/ツ and ソ/ン
- [ ] **C** Mixed hiragana/katakana quizzes
- [ ] **C** Character mastery and review
- [ ] **N** Foreign-word sound adaptation
- [ ] **N** Modern extended katakana combinations
- [ ] **N** Common katakana abbreviations
- [ ] **N** Onomatopoeia
- [ ] **N** Stroke order and tracing
- [ ] **N** Freehand writing
- [ ] **N** Timed quizzes
- [ ] **N** Personalized troublesome-kana sets
- [ ] **A** Camera-based katakana recognition
- [ ] **A** Handwriting-form assessment

### Kanji, radicals and components

- [ ] **N** Kanji dictionary
- [ ] **N** Jōyō kanji learning path
- [ ] **N** JLPT-oriented kanji organization with appropriate source caveats
- [ ] **N** Kanji grouping by school grade
- [ ] **N** Radicals and semantic/phonetic components
- [ ] **N** On'yomi and kun'yomi
- [ ] **N** Meanings and example words
- [ ] **N** Compounds and usage contexts
- [ ] **N** Reading in real sentences
- [ ] **N** Stroke count and order
- [ ] **N** Animated KanjiVG diagrams
- [ ] **N** Tracing and writing from memory
- [ ] **N** Kanji lookup by radical
- [ ] **N** Kanji lookup by stroke count
- [ ] **N** Kanji decomposition
- [ ] **N** Similar-character comparisons
- [ ] **N** Kanji mnemonics
- [ ] **N** User-created kanji collections
- [ ] **N** Kanji reading quiz
- [ ] **N** Kanji writing exercises
- [ ] **N** Kanji spaced repetition
- [ ] **N** Kanji mastery heatmap
- [ ] **N** Common compounds and frequency metadata
- [ ] **A** Handwriting-based lookup
- [ ] **A** Camera kanji lookup
- [ ] **A** AI mnemonic suggestions
- [ ] **A** Mnemonic illustration generation
- [ ] **A** Kanji component relationship explorer
- [ ] **A** Automated handwriting stroke diagnostics

### Vocabulary and dictionary

- [ ] **C** Themed beginner vocabulary
- [ ] **C** Word readings
- [ ] **C** Meanings and usage
- [ ] **C** Native or verified audio
- [ ] **C** Flashcards
- [ ] **C** Japanese-to-English recognition
- [ ] **C** English-to-Japanese recall
- [ ] **C** Words in useful sentences
- [ ] **C** Save unfamiliar words
- [ ] **C** Daily review of vocabulary
- [ ] **C** Vocabulary mastery
- [ ] **N** Word frequency labels
- [ ] **N** Parts of speech and conjugations
- [ ] **N** Transitive/intransitive verb notes
- [ ] **N** Multiple senses and usage disambiguation
- [ ] **N** Synonyms and antonyms
- [ ] **N** Common collocations
- [ ] **N** Similar-word comparison
- [ ] **N** Visual vocabulary cards
- [ ] **N** Image-based questions
- [ ] **N** User-created vocabulary decks
- [ ] **N** Vocabulary import/export
- [ ] **N** Anki export and interoperability
- [ ] **N** Word of the day
- [ ] **N** Interests-based vocabulary packs
- [ ] **N** Word-family and compound explorer
- [ ] **N** Slang and idiomatic usage
- [ ] **N** Vocabulary learned from readings and conversations
- [ ] **N** Dictionary word bookmarking
- [ ] **N** Regional/formality usage labels
- [ ] **A** Context-dependent semantic similarity search
- [ ] **A** AI example generation constrained by known material
- [ ] **A** Personal content-specific vocabulary prediction

### Grammar curriculum and practice

- [ ] **C** Structured beginner grammar lessons
- [ ] **C** Sentence structure and particles
- [ ] **C** です/ます basics
- [ ] **C** Plain vs polite forms
- [ ] **C** は, が, を, に, で, へ, と, も and related particles
- [ ] **C** I-adjective and na-adjective basics
- [ ] **C** Verb groups and conjugation
- [ ] **C** Negation
- [ ] **C** Past tense
- [ ] **C** Questions and counters
- [ ] **C** て-form basics
- [ ] **C** Sentence building exercises
- [ ] **C** Fill-in-the-blank grammar
- [ ] **C** Word-order rearrangement
- [ ] **C** Particle selection
- [ ] **C** Examples and exceptions
- [ ] **C** Wrong-answer explanations
- [ ] **C** Grammar mastery tracking
- [ ] **N** Relative clauses
- [ ] **N** Conditional forms
- [ ] **N** Potential form
- [ ] **N** Passive and causative
- [ ] **N** Giving and receiving expressions
- [ ] **N** Transitivity
- [ ] **N** Comparisons
- [ ] **N** Reported speech
- [ ] **N** Obligation and permission
- [ ] **N** Verb/adjective transformations
- [ ] **N** Politeness levels and honorific language
- [ ] **N** Contrasting confusing grammar points
- [ ] **N** Common learner-error collection
- [ ] **N** Grammar SRS
- [ ] **N** Grammar reference browser
- [ ] **N** Sentence correction challenges
- [ ] **N** Reverse translation and production
- [ ] **N** Grammar prerequisites map
- [ ] **A** AI-generated graded explanations
- [ ] **A** AI-checked original sentences
- [ ] **A** Grammar dependency graph
- [ ] **A** Causal misconception analysis

### Listening comprehension

- [ ] **C** Clear Japanese audio for core items
- [ ] **C** Normal and slower playback
- [ ] **C** Repeat and loop controls
- [ ] **C** Audio-to-answer questions
- [ ] **C** Beginner dialogue audio
- [ ] **C** Basic comprehension tests
- [ ] **C** Separate listening mastery
- [ ] **N** Sentence looping
- [ ] **N** Dictation
- [ ] **N** Audio/text matching
- [ ] **N** Multiple verified speaker voices
- [ ] **N** Graded listening passages
- [ ] **N** Listening stories
- [ ] **N** Show transcript after attempting
- [ ] **N** Subtitle/hint hiding
- [ ] **N** Listening without subtitles
- [ ] **N** Natural-speed casual dialogue
- [ ] **N** Adjustable listening speed
- [ ] **N** Segmented listening
- [ ] **N** Repeat difficult phrases
- [ ] **N** Adaptive listening difficulty
- [ ] **N** Listening progress reports
- [ ] **A** Dialect-specific listening
- [ ] **A** Real-world noise listening scenarios
- [ ] **A** Podcast import with permission
- [ ] **A** Video comprehension training
- [ ] **A** Automatic segment/transcript alignment

### Speaking and pronunciation

- [ ] **N** Record voice with explicit permission
- [ ] **N** Replay your recording
- [ ] **N** Listen-repeat drills
- [ ] **N** Native/learner recording comparison
- [ ] **N** Shadowing exercises
- [ ] **N** Vowel-length discrimination
- [ ] **N** Small っ and consonant timing
- [ ] **N** Mora rhythm
- [ ] **N** Sound distinction drills
- [ ] **N** Guided speaking tasks
- [ ] **N** Speech transcription for supported devices
- [ ] **N** Speaking progress log
- [ ] **N** Recorded dialogue practice
- [ ] **N** Speaking-confidence self-report
- [ ] **N** Pitch accent awareness and curated examples
- [ ] **A** On-device speech recognition
- [ ] **A** Detailed pronunciation feedback with uncertainty
- [ ] **A** Pitch contour visualization
- [ ] **A** Mora timing comparison
- [ ] **A** Pause and hesitation metrics
- [ ] **A** Speaking tempo analysis
- [ ] **A** Accent contrast feedback
- [ ] **A** Open-ended AI voice partner
- [ ] **A** Voice roleplay
- [ ] **A** Conversation transcript analysis
- [ ] **A** Multiple synthesized voice styles

### Reading

- [ ] **C** Beginner graded reading passages
- [ ] **C** Appropriately segmented sentences
- [ ] **C** Furigana support
- [ ] **C** Translation toggles
- [ ] **C** Reading comprehension questions
- [ ] **C** Basic reading progress
- [ ] **N** Graded stories by skill
- [ ] **N** Read-along audio
- [ ] **N** Tap-to-lookup
- [ ] **N** Tap-to-hear
- [ ] **N** Save words/sentences
- [ ] **N** Highlight unfamiliar words
- [ ] **N** Difficulty estimates
- [ ] **N** Furigana fading
- [ ] **N** Translation fading
- [ ] **N** Reading speed history
- [ ] **N** Daily reading exercises
- [ ] **N** Branching reading stories
- [ ] **N** Japanese-only reading mode
- [ ] **N** Sentence breakdown
- [ ] **N** News-style readings from licensed sources
- [ ] **N** Immersion comprehension checks
- [ ] **A** User-imported text parsing
- [ ] **A** OCR from permitted images
- [ ] **A** Automatic text simplification with clear labels
- [ ] **A** Manga reader with licensed/user-owned material
- [ ] **A** Personalized reading passage generation
- [ ] **A** Reading complexity analysis

### Writing and composition

- [ ] **C** Typed sentence building
- [ ] **C** Construct short original Japanese responses
- [ ] **N** Hiragana writing
- [ ] **N** Katakana writing
- [ ] **N** Kanji stroke order practice
- [ ] **N** Japanese keyboard guide
- [ ] **N** Sentence translation
- [ ] **N** Paragraph writing prompts
- [ ] **N** Daily journal
- [ ] **N** Formal email practice
- [ ] **N** Rewrite incorrect answers
- [ ] **N** Compare natural alternatives
- [ ] **N** Writing progress timeline
- [ ] **N** Common grammar error review
- [ ] **A** AI writing corrections
- [ ] **A** AI naturalness suggestions
- [ ] **A** Formality and register rewriting
- [ ] **A** AI essay grading with transparency
- [ ] **A** Handwriting interpretation
- [ ] **A** Stroke-level handwriting feedback
- [ ] **A** Detailed writing error dashboard

### Conversation and practical situations

- [ ] **C** Scripted dialogues with explanations
- [ ] **C** Basic greetings and self-introduction practice
- [ ] **N** Interactive branching dialogue
- [ ] **N** Ordering food
- [ ] **N** Shopping
- [ ] **N** Asking directions
- [ ] **N** Travel and train stations
- [ ] **N** Hotels and reservations
- [ ] **N** School/university
- [ ] **N** Workplace
- [ ] **N** Health and emergencies
- [ ] **N** Making friends
- [ ] **N** Phone calls
- [ ] **N** Casual vs formal speech
- [ ] **N** Honorific speech
- [ ] **N** Polite requests and refusals
- [ ] **N** Conversation vocabulary practice
- [ ] **N** Communication goals and checklists
- [ ] **N** Dialogue comprehension questions
- [ ] **A** Open-ended text AI conversation
- [ ] **A** AI character roleplays
- [ ] **A** Voice conversation AI
- [ ] **A** Difficulty adjustment within dialogue
- [ ] **A** Task completion scoring
- [ ] **A** Contextual cultural feedback
- [ ] **A** Conversation transcripts and error summaries
- [ ] **A** Replay and retry conversations

### Exercise and quiz engine

- [ ] **C** Multiple choice
- [ ] **C** True/false
- [ ] **C** Matching pairs
- [ ] **C** Fill in blank
- [ ] **C** Type answer
- [ ] **C** Word-block sentence rearrangement
- [ ] **C** Japanese-to-English recognition
- [ ] **C** English-to-Japanese recall
- [ ] **C** Kana recognition
- [ ] **C** Audio matching
- [ ] **C** Particle selection
- [ ] **C** Explain incorrect answers
- [ ] **C** Retry errors
- [ ] **C** Mixed-topic review
- [ ] **C** Untimed mode
- [ ] **C** Cumulative tests
- [ ] **N** Listening transcription
- [ ] **N** Free response short answer
- [ ] **N** Translate sentences both directions
- [ ] **N** Choose most natural sentence
- [ ] **N** Spot an error
- [ ] **N** Correct an incorrect sentence
- [ ] **N** Verb conjugation drills
- [ ] **N** Complete conversation
- [ ] **N** Timed challenge
- [ ] **N** No-hint recall
- [ ] **N** Kanji writing exercise
- [ ] **N** Progressive hints
- [ ] **N** Confidence-rated recall
- [ ] **N** Adaptive question selection
- [ ] **N** Explain your own answer
- [ ] **N** Boss or milestone tests
- [ ] **A** Open-ended AI evaluation with rubric
- [ ] **A** Multi-turn dialogue evaluation
- [ ] **A** Dynamic question generation with answer-key validation

### Memory, retention and review engine

- [ ] **C** FSRS-based spaced repetition or equivalent tested implementation
- [ ] **C** Local review queue
- [ ] **C** Daily review count
- [ ] **C** Overdue item review
- [ ] **C** Learning event recording
- [ ] **C** Review after errors
- [ ] **C** Separate first exposure vs recall
- [ ] **C** Item difficulty history
- [ ] **C** Review before new material as needed
- [ ] **C** Cap new items per day
- [ ] **C** Save review history offline
- [ ] **C** Restart-safe scheduling
- [ ] **N** Predicted recall probability
- [ ] **N** Memory stability metrics
- [ ] **N** Recognition vs production distinction
- [ ] **N** Skill-specific mastery scores
- [ ] **N** Interleaved practice
- [ ] **N** Prerequisite-based revision
- [ ] **N** Personal retention target
- [ ] **N** Configurable review load
- [ ] **N** Backlog recovery mode
- [ ] **N** Study session length planning
- [ ] **N** Exam-targeted review plans
- [ ] **N** Confusable pair emphasis
- [ ] **N** Cumulative delayed tests
- [ ] **N** Mastery visualization
- [ ] **N** Revision notifications
- [ ] **A** Automated retention calibration
- [ ] **A** Review strategy experimentation
- [ ] **A** Personalized workload optimization without overtraining

### Evidence-informed learning methods

- [ ] **C** Spaced practice across days
- [ ] **C** Active recall before showing solutions
- [ ] **C** Regular cumulative retrieval
- [ ] **C** Short feedback explaining errors
- [ ] **C** Contextual example sentences
- [ ] **C** Worked examples before unsupported production
- [ ] **C** Gradual increase in difficulty
- [ ] **C** Comprehension checks
- [ ] **C** Allow retry after explanation
- [ ] **C** Progress from recognition to independent production
- [ ] **N** Interleaving related concepts
- [ ] **N** Contrastive examples for common confusions
- [ ] **N** Graded extensive reading
- [ ] **N** Comprehensible listening
- [ ] **N** Shadowing
- [ ] **N** Mnemonic stories with factual checks
- [ ] **N** Input/output balance across skills
- [ ] **N** Hint fading
- [ ] **N** Teach-back exercises
- [ ] **N** Skill-transfer tasks in new contexts
- [ ] **N** Confidence calibration
- [ ] **N** Short task-based practice
- [ ] **N** Interest-based content selection
- [ ] **N** Goal-aware daily plans
- [ ] **N** Error-driven targeted practice
- [ ] **A** A/B test immediate vs delayed feedback
- [ ] **A** Test different review scheduling policies
- [ ] **A** Experiment with difficulty adaptation
- [ ] **A** Evaluate reading and speaking interventions with delayed outcomes

### Learning plans and personalization

- [ ] **C** Continue lesson button
- [ ] **C** Daily study queue
- [ ] **C** Personal weakness list
- [ ] **C** Suggested next topic
- [ ] **C** Progress per unit
- [ ] **C** Goal dashboard
- [ ] **N** Smart 5/10/20/30 minute study plans
- [ ] **N** Focused practice mode
- [ ] **N** Free exploration mode
- [ ] **N** Weekly recommendations
- [ ] **N** Exam countdown planning
- [ ] **N** Reading vs speaking focus settings
- [ ] **N** Overdue review planning
- [ ] **N** Study plan adaptation after mistakes
- [ ] **N** Study streak recovery without punishment
- [ ] **N** Detect likely missing prerequisites
- [ ] **A** AI-generated weekly personalized plans
- [ ] **A** Plateau detection and intervention tests
- [ ] **A** Learning-path optimization by measured outcomes

### Gamification and motivation

- [ ] **N** XP and levels
- [ ] **N** Optional streaks
- [ ] **N** Streak repair or rest days
- [ ] **N** Daily challenge
- [ ] **N** Weekly challenge
- [ ] **N** Kana completion badges
- [ ] **N** Vocabulary milestone badges
- [ ] **N** Mastery badges
- [ ] **N** Progress maps
- [ ] **N** Lesson unlocks
- [ ] **N** Quests
- [ ] **N** Mini-games
- [ ] **N** Timed skill challenges
- [ ] **N** Achievement cabinet
- [ ] **N** Gentle encouraging feedback
- [ ] **N** Learner-customizable reminders
- [ ] **N** Streak-free setting
- [ ] **A** Avatars
- [ ] **A** Collectible items
- [ ] **A** Story-based map
- [ ] **A** Boss quizzes
- [ ] **A** Optional leaderboards
- [ ] **A** Friend challenges
- [ ] **A** Group cooperative quests

### Immersion, media and exploration

- [ ] **N** Dictionary lookup anywhere in app
- [ ] **N** Share-to-app Japanese text
- [ ] **N** Custom sentences deck
- [ ] **N** Sentence mining
- [ ] **N** Short original Japanese stories
- [ ] **N** Interest/topic packs
- [ ] **N** Anime-themed vocabulary without unlicensed content
- [ ] **N** Manga-style original reading lessons
- [ ] **N** Media vocabulary tracking
- [ ] **N** Word saving from immersion
- [ ] **N** Original song-themed vocabulary practice
- [ ] **N** Reading and listening library
- [ ] **A** Import user-owned texts
- [ ] **A** Import permitted subtitles/transcripts
- [ ] **A** Interactive subtitle lookup
- [ ] **A** Flashcards from subtitle lines
- [ ] **A** User-owned video study
- [ ] **A** Podcast learning
- [ ] **A** News reading from licensed/public sources
- [ ] **A** Image OCR translation and breakdown
- [ ] **A** Study selected book/show vocabulary from licensed data
- [ ] **A** Personal media library
- [ ] **A** Camera reading and explanation
- [ ] **A** Audio segmentation and clipping
- [ ] **A** Immersive story generator

### Japanese culture and real-world knowledge

- [ ] **N** Greetings and introductions
- [ ] **N** Name suffixes さん/さま/くん/ちゃん
- [ ] **N** Bowing and nonverbal etiquette
- [ ] **N** Formal/informal registers
- [ ] **N** Keigo overview and practice
- [ ] **N** Restaurant language and etiquette
- [ ] **N** Convenience-store phrases
- [ ] **N** Train and transportation etiquette
- [ ] **N** Shopping and customer service
- [ ] **N** Festivals and holidays
- [ ] **N** Geography and places
- [ ] **N** Food and ordering
- [ ] **N** School and university terminology
- [ ] **N** Workplace etiquette and expressions
- [ ] **N** Social hierarchy explained without stereotyping
- [ ] **N** Making requests and apologies
- [ ] **N** Indirect expressions and polite refusals
- [ ] **N** Common gestures
- [ ] **N** Signs and public notices
- [ ] **N** Emergency phrases
- [ ] **N** Addresses and forms
- [ ] **N** Regional expressions including Kansai
- [ ] **N** Slang and internet expressions
- [ ] **N** Anime speech vs everyday speech
- [ ] **N** Japanese humor and cultural references
- [ ] **N** Gendered and character-specific fictional speech with context

### JLPT and certification preparation

- [ ] **N** JLPT N5 path
- [ ] **N** JLPT N4 path
- [ ] **N** JLPT N3 path
- [ ] **N** JLPT N2 path
- [ ] **N** JLPT N1 path
- [ ] **N** JLPT-style vocabulary tasks
- [ ] **N** JLPT-style grammar tasks
- [ ] **N** JLPT-style reading tasks
- [ ] **N** JLPT-style listening tasks
- [ ] **N** Level-placement diagnostics
- [ ] **N** Timed mock tests
- [ ] **N** Untimed mock tests
- [ ] **N** Section score breakdown
- [ ] **N** Topic weakness reports
- [ ] **N** Exam countdown
- [ ] **N** Targeted exam revision plan
- [ ] **N** Practice based on past errors
- [ ] **N** Printable reports
- [ ] **N** Unofficial app progress certificates
- [ ] **N** JFT-Basic oriented practical exercises
- [ ] **A** Exam-readiness indicators calibrated with real outcomes
- [ ] **A** Adaptive full-length mock exams

### Accessibility, design and offline experience

- [ ] **C** Android-first clean interface
- [ ] **C** Small screen support
- [ ] **C** Responsive layouts
- [ ] **C** Core offline lessons
- [ ] **C** Offline quiz and revision
- [ ] **C** Light/dark theme
- [ ] **C** Adjustable Japanese text size
- [ ] **C** High contrast correct/incorrect states
- [ ] **C** Accessible touch targets
- [ ] **C** Clear empty/error states
- [ ] **C** Low-memory performance
- [ ] **C** No mandatory account or AI
- [ ] **N** Screen reader labels
- [ ] **N** Furigana size control
- [ ] **N** Adjustable audio speed
- [ ] **N** Captioned audio
- [ ] **N** Reduced-motion mode
- [ ] **N** Haptic feedback settings
- [ ] **N** One-handed navigation
- [ ] **N** Left-hand writing layout
- [ ] **N** Interface localization
- [ ] **N** Downloadable audio/lesson packs
- [ ] **N** Low-data mode
- [ ] **N** Low-storage mode
- [ ] **N** Battery-conscious mode
- [ ] **N** Flexible notifications
- [ ] **N** Notification-free mode
- [ ] **N** Local backup/export
- [ ] **N** Cloud backup when opted in
- [ ] **N** Offline sync conflict handling
- [ ] **A** Advanced accessibility customization
- [ ] **A** Assistive input modes

### Community and collaboration (optional)

- [ ] **A** Friends and study partners
- [ ] **A** Study circles
- [ ] **A** Shared study plans
- [ ] **A** Group revision challenges
- [ ] **A** Shared decks
- [ ] **A** User-created lessons
- [ ] **A** Teacher-created courses
- [ ] **A** Teacher feedback
- [ ] **A** Peer writing feedback
- [ ] **A** Peer pronunciation feedback
- [ ] **A** Language exchange
- [ ] **A** Reading clubs
- [ ] **A** Group quests
- [ ] **A** Optional leaderboards
- [ ] **A** Q&A community
- [ ] **A** User-generated content approval
- [ ] **A** Report/moderation tools
- [ ] **A** Age-aware social safety controls
- [ ] **A** Community content quality review

### Sensei AI: tutoring and adaptive intelligence

- [ ] **N** Optional ask-a-grammar-question assistant
- [ ] **N** Verified-content grounding
- [ ] **N** Explain a wrong answer in simpler words
- [ ] **N** Alternative examples from approved content
- [ ] **N** Personal progress summary
- [ ] **N** Mistake clustering
- [ ] **N** Weakness detection from quiz logs
- [ ] **N** Confusable-character detection
- [ ] **N** Suggested targeted exercises
- [ ] **N** Explain why a recommendation was made
- [ ] **N** AI opt-out without loss of core functionality
- [ ] **N** User-correctable AI learning profile
- [ ] **A** Open-ended Socratic tutoring
- [ ] **A** Personalized learning plans
- [ ] **A** Dynamic proficiency-aware explanations
- [ ] **A** AI-generated practice with validation
- [ ] **A** AI kanji mnemonics
- [ ] **A** AI vocabulary contexts
- [ ] **A** AI sentence feedback
- [ ] **A** AI naturalness and register checks
- [ ] **A** AI reading assistant
- [ ] **A** AI listening assistant
- [ ] **A** AI writing coach
- [ ] **A** AI speaking coach with calibrated uncertainty
- [ ] **A** AI text conversation
- [ ] **A** AI voice conversations
- [ ] **A** Roleplay characters and scenarios
- [ ] **A** AI story generation constrained to lesson levels
- [ ] **A** Dialogue task completion assessments
- [ ] **A** Conversation recap and targeted review
- [ ] **A** Learning plateau detection
- [ ] **A** Knowledge gap diagnosis
- [ ] **A** Estimate skill-specific readiness
- [ ] **A** Confidence vs accuracy analysis
- [ ] **A** Automatic personalized weekly reports
- [ ] **A** Adaptive content difficulty estimator
- [ ] **A** User-chosen conversation personas
- [ ] **A** Language-level constrained question generator

### AI perception, handwriting, camera and audio

- [ ] **A** Japanese audio transcription with consent
- [ ] **A** Audio recording replay and delete
- [ ] **A** Speaker-independent sound recognition experiments
- [ ] **A** Pitch contour visualization
- [ ] **A** Mora timing estimates
- [ ] **A** Handwritten kana recognition
- [ ] **A** Kanji handwriting matching
- [ ] **A** Camera OCR of Japanese writing
- [ ] **A** Camera sign/menu parsing
- [ ] **A** Furigana and grammar overlay for recognized text
- [ ] **A** Speech-to-text correction suggestions
- [ ] **A** Multimodal roleplay using speech and text
- [ ] **A** Voice response synthesis
- [ ] **A** On-device model download manager
- [ ] **A** Model selection by device capability
- [ ] **A** Offline AI inference fallback
- [ ] **A** No passive camera/microphone monitoring

### Security, privacy and responsible AI

- [ ] **C** Explicit microphone/camera permission boundaries
- [ ] **C** No hidden background audio or camera capture
- [ ] **C** Local storage of core learning history
- [ ] **C** No paid API key in mobile source
- [ ] **C** Learning event minimization
- [ ] **C** Clear distinction between AI guesses and verified answers
- [ ] **C** User can learn without AI
- [ ] **C** Error logging without recording sensitive content by default
- [ ] **N** Privacy policy
- [ ] **N** Export and delete learner history
- [ ] **N** Data retention settings
- [ ] **N** Consent for cloud processing
- [ ] **N** Secure cloud authentication
- [ ] **N** Least-privilege database policies
- [ ] **N** Encryption in transit
- [ ] **N** Separate user records
- [ ] **N** Moderation for open-ended generated content
- [ ] **N** Content correction/report action
- [ ] **N** Age-aware protections
- [ ] **N** AI model and prompt version tracking
- [ ] **N** Rights/license inventory for datasets and audio
- [ ] **A** End-to-end encryption for selected personal records
- [ ] **A** Prompt injection defenses for imported texts
- [ ] **A** Safety audits and red-team tests
- [ ] **A** AI response evaluation harness
- [ ] **A** Formal privacy threat modeling
- [ ] **A** Abuse and rate-limit controls for public AI

### Content authoring, administration and quality

- [ ] **N** Lesson editor
- [ ] **N** Curriculum prerequisite management
- [ ] **N** Versioned lesson schemas
- [ ] **N** Glossary and terminology rules
- [ ] **N** Kana chart editor
- [ ] **N** Vocabulary import pipeline
- [ ] **N** Kanji import pipeline
- [ ] **N** Audio asset management
- [ ] **N** Content provenance and license notes
- [ ] **N** Duplicate content detection
- [ ] **N** Grammar reviewer workflow
- [ ] **N** Answer-key validation
- [ ] **N** Lesson publishing states
- [ ] **N** Content corrections workflow
- [ ] **N** Locale translation management
- [ ] **N** User-reported content errors
- [ ] **N** Lesson change history
- [ ] **N** Editorial review before AI content publishing
- [ ] **A** AI draft lesson authoring with review
- [ ] **A** Automated Japanese grammar linting
- [ ] **A** Difficulty/coverage balancing dashboard
- [ ] **A** Administrator analytics dashboard
- [ ] **A** Safe feature flags and experiments

### Engineering, testing and operations

- [ ] **C** Expo and React Native
- [ ] **C** TypeScript
- [ ] **C** Expo Router
- [ ] **C** Expo SQLite
- [ ] **C** Reusable typed lesson model
- [ ] **C** Reusable quiz engine
- [ ] **C** Separate learning engine and UI
- [ ] **C** Basic tests for answer evaluation
- [ ] **C** Progress persistence tests
- [ ] **C** Offline-first release
- [ ] **C** README and development instructions
- [ ] **C** GitHub version control
- [ ] **N** ts-fsrs integration
- [ ] **N** Unit tests for review scheduling
- [ ] **N** Integration tests for lesson flow
- [ ] **N** Local database migrations
- [ ] **N** Automated code checks
- [ ] **N** Accessibility tests
- [ ] **N** Android device testing
- [ ] **N** Crash reporting with privacy controls
- [ ] **N** Error boundaries
- [ ] **N** Downloadable content manifests
- [ ] **N** Optional Supabase sync and authentication
- [ ] **N** API service separation
- [ ] **N** Backend rate limiting
- [ ] **N** Build/release process
- [ ] **N** Versioned content imports
- [ ] **N** GitHub CI pipeline
- [ ] **A** FastAPI AI backend
- [ ] **A** llama.cpp-based local/hosted model interface
- [ ] **A** Offline speech with whisper.cpp or sherpa-onnx
- [ ] **A** Optional Open JTalk speech synthesis
- [ ] **A** Model quantization experiments
- [ ] **A** Performance benchmarks across phones
- [ ] **A** Feature flag system
- [ ] **A** Cross-platform iOS QA
- [ ] **A** Scalable AI inference worker infrastructure
- [ ] **A** App store metrics and monitoring

### Learning effectiveness metrics and experiments

- [ ] **N** Delayed recall accuracy
- [ ] **N** Review workload
- [ ] **N** Independent answer accuracy
- [ ] **N** Recognition vs recall comparison
- [ ] **N** Kana confusion trends
- [ ] **N** Grammar misconception trends
- [ ] **N** Listening comprehension tracking
- [ ] **N** Lesson completion rate
- [ ] **N** Question difficulty statistics
- [ ] **N** Time to stable mastery
- [ ] **N** Opt-in weekly progress reports
- [ ] **N** Crash and startup performance
- [ ] **N** Offline success rate
- [ ] **A** Retention calibrated by cohort
- [ ] **A** A/B tests on spaced schedules
- [ ] **A** Intervention effectiveness estimates
- [ ] **A** Transfer tests with unfamiliar examples
- [ ] **A** Listening improvement studies
- [ ] **A** AI vs non-AI tutoring comparison
- [ ] **A** Cost per AI-assisted study session
- [ ] **A** Privacy-safe aggregate learner research
- [ ] **A** Optional teacher validation study

## Sensei AI — concrete behavioral specification

The AI should act as a learning coach rather than a generic chat box.

### Observable inputs (opt-in where appropriate)

- Quiz attempts, item IDs, chosen answers, timestamps, hint use, time to respond.
- Recall after delays, repeated failures, tricky confusable alternatives and exercise types.
- Lesson progress, skipped content, user goals, session length, practice modes.
- Separately assessed reading, listening, writing, speaking and grammar performance.
- Explicit recordings or handwriting only when the user chooses those exercises.
- No always-on surveillance, passive camera analysis, facial-attention inference or secretly recorded audio.

### Example learning event

    {
      "eventType": "answer_submitted",
      "itemId": "katakana-shi",
      "exerciseType": "recognition",
      "correct": false,
      "selectedAnswer": "ツ",
      "hintUsed": false,
      "responseTimeMs": 3400,
      "timestamp": "2026-11-19T10:30:00Z"
    }

### Example decision workflow

1. The app records repeated confusion between シ and ツ.
2. Deterministic rules group mistakes into a Japanese-specific error taxonomy.
3. A lightweight mastery profile determines that visual discrimination and recall need work.
4. The recommendation engine selects a **verified** side-by-side lesson and targeted exercise set.
5. The scheduler tests retention later; if failures persist, a different explanation or modality is offered.
6. An optional LLM explains the error in appropriate language using retrieval of reviewed lesson content.
7. Learners can inspect/disable/correct personalization; observations are separated from speculative conclusions.

### Error taxonomy

Kana recognition; phonetic reading; vocabulary meaning; word usage; particle confusion; verb or adjective conjugation; word order; formality and register; misheard sounds; vowel length; pitch accent when data supports it; kanji reading; kanji writing; comprehension; missing prerequisites; naturalness vs grammatical correctness.

### AI deployment options

**Local on-device:** smaller quantized models, fully offline and no per-request inference bill. Trade-offs: model size, RAM, startup latency, battery, response quality, native integration requirements.

**Self-hosted/cloud:** model server for stronger tutoring and multi-turn voice. Trade-offs: hosting costs, latency, uptime, security, user data transfer, concurrency limits.

**Hybrid (preferred):** deterministic offline learning engine + local model when practical + optional server-side advanced tutoring. Keep the core app operational without any AI.

Candidate models and tools **to evaluate rather than blindly adopt**:
- Qwen small multilingual/open-weight models (compare current weights, Japanese benchmarks, quantized size and license).
- Gemma mobile-oriented models (verify distinct model licenses).
- llama.cpp for compatible local LLM inference.
- whisper.cpp or sherpa-onnx for offline speech processing.
- Native device TTS and/or Open JTalk for Japanese speech.
- FSRS / ts-fsrs for review scheduling, not an LLM.

**Important:** free model weights do not mean free unlimited hosting. ChatGPT Plus/Codex developer access is not a bundled production API for app users. Small LLMs can confidently give incorrect Japanese grammar explanations; verify outputs against curated examples and a tutor evaluation set.

### AI quality gates

- Ground tutoring in approved lesson content; never silently replace a verified answer key.
- Ask clarifying questions for ambiguous answers; admit uncertainty.
- Test Japanese grammatical accuracy, politeness, register, pitch-accent claims and naturalness.
- Track false corrections, answer inconsistency, hallucinations, prompt injection and unsafe generated content.
- Store model/version, prompt version and evaluation results; allow users to report errors.
- Privacy-preserving processing, opt-in microphone/camera, clear retention and deletion policies.

## Suggested implementation architecture

**Mobile:** React Native + Expo + TypeScript + Expo Router. SQLite stores curriculum caches, attempts, reviews and settings. Keep UI components independent of exercise and mastery logic.

**Learning packages:** typed content schema → quiz evaluation → event log → memory scheduler → mastery/skill estimator → recommendation engine. AI adapters are optional plug-ins.

**Backend (later):** optional Supabase or equivalent for opt-in auth/sync; optional Python FastAPI or equivalent inference service for conversational AI. Use server-side secrets only.

**Native AI:** consider development builds/EAS when native model runtimes, audio processing, camera OCR or custom Android modules are required; Expo Go alone is not sufficient for all native features.

**Deployment:** distribute Android APKs for testing; Google Play typically uses Android App Bundles and imposes current account/testing/policy requirements. Vercel can host a marketing site or some APIs, not the installable Android app itself.

### Logical data entities

- UserProfile, Goal, Preference, Consent
- Curriculum, Course, Unit, Lesson, LessonVersion, Prerequisite
- LearningItem, VocabularyEntry, KanjiEntry, GrammarPoint, ExampleSentence
- AudioAsset, IllustrationAsset, Attribution, LicenseRecord
- Exercise, AnswerKey, Attempt, LearningEvent, ErrorTag
- SkillEstimate, ReviewCard, FSRSState, MasterySnapshot
- StudyPlan, ReviewSession, Recommendation, ProgressReport
- Conversation, Transcript, WritingSubmission, AIResponseFeedback
- SyncCheckpoint, ContentManifest, FeatureFlag, ExperimentAssignment

### Proposed repository layout (not yet created)

    NihongoLearn/
      README.md
      apps/mobile/
      packages/curriculum/
      packages/quiz-engine/
      packages/learning-engine/
      packages/spaced-repetition/
      packages/analytics/
      packages/ai-client/
      data/kana/
      data/vocabulary/
      data/grammar/
      data/lessons/
      services/ai-backend/
      docs/
      tests/
      AGENTS.md

This layout is a possible future monorepo design. **Do not create every directory before it is needed.**

## Data sources and rights review

Potential references for licensed/verified content (check current licenses and attribution requirements before import):

- JMdict: https://www.edrdg.org/wiki/index.php/JMdict-EDICT_Dictionary_Project
- KANJIDIC2: https://www.edrdg.org/wiki/index.php/KANJIDIC_Project
- KanjiVG: https://github.com/KanjiVG/kanjivg
- Tatoeba sentences/audio (licensing varies): https://tatoeba.org/en/downloads
- Irodori teaching reference: https://www.irodori.jpf.go.jp/en/
- Tadoku graded-reading reference: https://tadoku.org/japanese/en/
- FSRS: https://github.com/open-spaced-repetition/ts-fsrs
- JLPT official sample questions/structure: https://www.jlpt.jp/e/samples/forlearners.html
- Expo: https://docs.expo.dev/

Dictionary definitions, examples, vectors, voice recordings and texts have different rights. A publicly downloadable file is not necessarily free to redistribute in a commercial app. Record license, attribution, permitted modifications, share-alike and commercial usage for every imported dataset or media asset. Produce original or reviewed lesson explanations.

## Competitor inspiration — do not clone assets, UI or copyrighted content

- Duolingo: gamified progression, short lessons and streaks.
- Renshuu: integrated Japanese study modes and customizable scheduling.
- WaniKani: kanji radicals, mnemonic structure and reviews.
- Bunpro: focused grammar reference and grammar reviews.
- LingoDeer: structured grammar explanations.
- Anki: user-controlled spaced repetition.
- Satori Reader: annotated reading with supporting audio.
- Migaku: subtitle lookup and sentence mining.
- LingQ: immersion in imported reading/listening.
- Ringotan: handwriting recall.
- MaruMori: learning through story-like progression.
- jpdb: vocabulary priorities connected to media.

These are product inspiration points, not rigorous comparative efficacy findings.

## Implementation phases and acceptance criteria

### Phase 0 — repository and foundation
- [ ] Establish Expo/TypeScript development environment.
- [ ] Decide app naming, target Android devices, accessibility and navigation conventions.
- [ ] Choose license, content rights policy, and local data migration strategy.
- [ ] Add automated formatting/typechecking/testing and contributor notes.

### Phase 1 — fully working beginner vertical slice
- [ ] Home, Learn, Review, Progress and Settings.
- [ ] Reviewed lesson for あ/い/う/え/お with audio support and text.
- [ ] Recognition and typed-answer exercises with validated answer keys.
- [ ] Save attempts and progress in SQLite across restarts.
- [ ] Corrective explanations and offline functionality.
- [ ] Android phone build and smoke test.

**Done when:** a learner can install, learn five kana, answer exercises, close the app, reopen it and see correct retained progress, even without Internet.

### Phase 2 — kana, memory and personalization
- [ ] Full hiragana and katakana curricula.
- [ ] Tested FSRS scheduling and review queue.
- [ ] Difficulty estimates, confusion tagging and personalized revision.
- [ ] Unit, integration and persistence tests.

### Phase 3 — beginner Japanese
- [ ] Reviewed basic vocabulary, grammar, reading and listening.
- [ ] Multi-format exercise engine.
- [ ] Guided daily study plans and usable learning analytics.

### Phase 4 — evaluated optional AI tutor
- [ ] Model benchmarks for Japanese explanations on target devices.
- [ ] Approved-content retrieval/grounding.
- [ ] Explanation, error-based recommendations and opt-out.
- [ ] Safety/privacy checks and AI answer quality tests.

### Phase 5 — production and communication
- [ ] Writing and speaking activities.
- [ ] On-device or hosted speech options.
- [ ] More natural dialogues, roleplay and feedback.
- [ ] Public beta feedback, app stability and performance work.

### Phase 6 — deeper Japanese and immersion
- [ ] Kanji pathway, advanced grammar, reading library.
- [ ] Media import with rights guardrails.
- [ ] JLPT practice paths and mock exams.
- [ ] AI-assisted stories and context-aware practice, as resources allow.

### Phase 7 — optional community and scale
- [ ] Accounts, multi-device synchronization and moderation.
- [ ] Teacher/content admin tools and community content review.
- [ ] User privacy controls, operational monitoring and cloud-cost controls.

## Quality metrics that matter

- Delayed recall after 1, 7 and 30 days; retention vs workload.
- Production without hints vs recognition among choices.
- Improvement on unseen reading/listening/writing/speaking tasks.
- Reduction in recurring Japanese error categories.
- Course completion, user retention and accessibility.
- Offline performance, memory/battery/storage footprint and crash rate.
- AI correctness, user-reported hallucinations, privacy and inference cost.

## Codex contributor instructions

1. Treat this README as the **full vision and backlog**, not an instruction to implement everything in one run.
2. Inspect the repository and pick the smallest complete, testable milestone from the implementation phases.
3. Produce a short architecture/implementation plan for that milestone, then implement code and tests.
4. Keep curriculum content reviewed and versioned; distinguish generated draft material from verified teaching material.
5. Never claim a feature works unless implemented and tested; document unresolved blockers.
6. Do not add paid API dependencies without approval, and do not store secrets in Git.
7. Preserve offline core behavior and performance on lower-memory Android phones.
8. Use meaningful commits for genuine changes; never fabricate commits merely to inflate activity.
9. Report actual build/test output and what the user must do to test on a phone.
10. Update feature checkboxes only after their acceptance criteria are met.

---

**Current implementation and verification status are recorded in the development checkpoint at the top of this README.**
