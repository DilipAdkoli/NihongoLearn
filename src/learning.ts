export type Kana = {
  id: string;
  glyph: string;
  reading: string;
  cue: string;
  example: string;
  exampleReading: string;
  meaning: string;
};

export const kana: readonly Kana[] = [
  {
    id: "a",
    glyph: "あ",
    reading: "a",
    cue: "Open your mouth for a short, steady “ah” sound.",
    example: "あい",
    exampleReading: "ai",
    meaning: "love",
  },
  {
    id: "i",
    glyph: "い",
    reading: "i",
    cue: "Say “ee” with a small smile. Keep the vowel short.",
    example: "いえ",
    exampleReading: "ie",
    meaning: "house",
  },
  {
    id: "u",
    glyph: "う",
    reading: "u",
    cue: "Start with a short “oo” sound and keep your lips relaxed.",
    example: "うえ",
    exampleReading: "ue",
    meaning: "above",
  },
  {
    id: "e",
    glyph: "え",
    reading: "e",
    cue: "Aim for a short “eh” sound, close to the vowel in “bed.”",
    example: "え",
    exampleReading: "e",
    meaning: "picture",
  },
  {
    id: "o",
    glyph: "お",
    reading: "o",
    cue: "Round your lips for “oh” and hold their shape for the whole vowel.",
    example: "おおい",
    exampleReading: "ooi",
    meaning: "numerous",
  },
  {
    id: "ka",
    glyph: "か",
    reading: "ka",
    cue: "Add a short k sound before a.",
    example: "あか",
    exampleReading: "aka",
    meaning: "red",
  },
  {
    id: "ki",
    glyph: "き",
    reading: "ki",
    cue: "Add k before i. Keep the vowel short.",
    example: "あき",
    exampleReading: "aki",
    meaning: "autumn",
  },
  {
    id: "ku",
    glyph: "く",
    reading: "ku",
    cue: "Add k before u. Keep your lips relaxed.",
    example: "いく",
    exampleReading: "iku",
    meaning: "to go",
  },
  {
    id: "ke",
    glyph: "け",
    reading: "ke",
    cue: "Add a short k sound before e.",
    example: "いけ",
    exampleReading: "ike",
    meaning: "pond",
  },
  {
    id: "ko",
    glyph: "こ",
    reading: "ko",
    cue: "Add a short k sound before o.",
    example: "こえ",
    exampleReading: "koe",
    meaning: "voice",
  },
];

export const lessons = [
  {
    title: "The five vowels",
    notebook: "Vowel row",
    detail:
      "Meet あ, い, う, え, and お. Hear each sound, then practice reading it from memory.",
    ids: ["a", "i", "u", "e", "o"],
  },
  {
    title: "The K row",
    notebook: "K row",
    detail: "Add a k sound to the five vowels to read か, き, く, け, and こ.",
    ids: ["ka", "ki", "ku", "ke", "ko"],
  },
];

export type Exercise = {
  kanaId: string;
  mode: "recognition" | "recall";
  choices: string[];
};

function shuffled<T>(items: readonly T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function makeExercises(ids: string[]): Exercise[] {
  const selected = shuffled(kana.filter((item) => ids.includes(item.id)));
  const recognition = selected.map((item): Exercise => {
    const row = lessons.find((lesson) => lesson.ids.includes(item.id));
    const otherGlyphs = kana
      .filter((other) => other.id !== item.id && row?.ids.includes(other.id))
      .map((other) => other.glyph);
    const distractors = shuffled(otherGlyphs).slice(0, 3);
    return {
      kanaId: item.id,
      mode: "recognition",
      choices: shuffled([item.glyph, ...distractors]),
    };
  });
  // Repeat the first round's order to leave other questions between seeing a
  // character with answer choices and having to recall it independently.
  const recall = selected.map((item): Exercise => ({
    kanaId: item.id,
    mode: "recall",
    choices: [],
  }));
  return [...recognition, ...recall];
}

export function evaluateAnswer(exercise: Exercise, answer: string): boolean {
  const item = kana.find((entry) => entry.id === exercise.kanaId);
  if (!item) return false;
  if (exercise.mode === "recognition") return answer === item.glyph;
  return answer.normalize("NFKC").trim().toLowerCase() === item.reading;
}
