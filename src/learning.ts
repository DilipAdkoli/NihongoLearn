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
  {
    id: "sa",
    glyph: "さ",
    reading: "sa",
    cue: "Add a light s sound before a.",
    example: "かさ",
    exampleReading: "kasa",
    meaning: "umbrella",
  },
  {
    id: "shi",
    glyph: "し",
    reading: "shi",
    cue: "Start with a soft “sh” sound. Follow it with a short i.",
    example: "しお",
    exampleReading: "shio",
    meaning: "salt",
  },
  {
    id: "su",
    glyph: "す",
    reading: "su",
    cue: "Add a light s sound before u.",
    example: "すし",
    exampleReading: "sushi",
    meaning: "sushi",
  },
  {
    id: "se",
    glyph: "せ",
    reading: "se",
    cue: "Add a light s sound before e.",
    example: "あせ",
    exampleReading: "ase",
    meaning: "sweat",
  },
  {
    id: "so",
    glyph: "そ",
    reading: "so",
    cue: "Add a light s sound before o.",
    example: "そこ",
    exampleReading: "soko",
    meaning: "there",
  },
  {
    id: "ta",
    glyph: "た",
    reading: "ta",
    cue: "Add a light t sound before a.",
    example: "うた",
    exampleReading: "uta",
    meaning: "song",
  },
  {
    id: "chi",
    glyph: "ち",
    reading: "chi",
    cue: "Start with a light “ch” sound. Follow it with a short i.",
    example: "ちち",
    exampleReading: "chichi",
    meaning: "my father",
  },
  {
    id: "tsu",
    glyph: "つ",
    reading: "tsu",
    cue: "Say “ts” as one sound, then add a short u.",
    example: "つき",
    exampleReading: "tsuki",
    meaning: "moon",
  },
  {
    id: "te",
    glyph: "て",
    reading: "te",
    cue: "Add a light t sound before e.",
    example: "て",
    exampleReading: "te",
    meaning: "hand",
  },
  {
    id: "to",
    glyph: "と",
    reading: "to",
    cue: "Add a light t sound before o.",
    example: "おと",
    exampleReading: "oto",
    meaning: "sound",
  },
  {
    id: "na",
    glyph: "な",
    reading: "na",
    cue: "Add a light n sound before a.",
    example: "なつ",
    exampleReading: "natsu",
    meaning: "summer",
  },
  {
    id: "ni",
    glyph: "に",
    reading: "ni",
    cue: "Add a light n sound before i.",
    example: "にし",
    exampleReading: "nishi",
    meaning: "west",
  },
  {
    id: "nu",
    glyph: "ぬ",
    reading: "nu",
    cue: "Add a light n sound before u.",
    example: "ぬの",
    exampleReading: "nuno",
    meaning: "cloth",
  },
  {
    id: "ne",
    glyph: "ね",
    reading: "ne",
    cue: "Add a light n sound before e.",
    example: "ねこ",
    exampleReading: "neko",
    meaning: "cat",
  },
  {
    id: "no",
    glyph: "の",
    reading: "no",
    cue: "Add a light n sound before o.",
    example: "きのこ",
    exampleReading: "kinoko",
    meaning: "mushroom",
  },
  {
    id: "ha",
    glyph: "は",
    reading: "ha",
    cue: "Add a light h sound before a.",
    example: "はな",
    exampleReading: "hana",
    meaning: "flower",
  },
  {
    id: "hi",
    glyph: "ひ",
    reading: "hi",
    cue: "Add a light h sound before i.",
    example: "ひ",
    exampleReading: "hi",
    meaning: "fire",
  },
  {
    id: "fu",
    glyph: "ふ",
    reading: "fu",
    cue: "Blow gently between your lips, then add a short u.",
    example: "ふね",
    exampleReading: "fune",
    meaning: "ship",
  },
  {
    id: "he",
    glyph: "へ",
    reading: "he",
    cue: "Add a light h sound before e.",
    example: "へそ",
    exampleReading: "heso",
    meaning: "belly button",
  },
  {
    id: "ho",
    glyph: "ほ",
    reading: "ho",
    cue: "Add a light h sound before o.",
    example: "ほし",
    exampleReading: "hoshi",
    meaning: "star",
  },
  {
    id: "ma",
    glyph: "ま",
    reading: "ma",
    cue: "Add a light m sound before a.",
    example: "まち",
    exampleReading: "machi",
    meaning: "town",
  },
  {
    id: "mi",
    glyph: "み",
    reading: "mi",
    cue: "Add a light m sound before i.",
    example: "みみ",
    exampleReading: "mimi",
    meaning: "ear",
  },
  {
    id: "mu",
    glyph: "む",
    reading: "mu",
    cue: "Add a light m sound before u.",
    example: "むし",
    exampleReading: "mushi",
    meaning: "insect",
  },
  {
    id: "me",
    glyph: "め",
    reading: "me",
    cue: "Add a light m sound before e.",
    example: "め",
    exampleReading: "me",
    meaning: "eye",
  },
  {
    id: "mo",
    glyph: "も",
    reading: "mo",
    cue: "Add a light m sound before o.",
    example: "もも",
    exampleReading: "momo",
    meaning: "peach",
  },
  {
    id: "ya",
    glyph: "や",
    reading: "ya",
    cue: "Add a light y sound before a.",
    example: "やま",
    exampleReading: "yama",
    meaning: "mountain",
  },
  {
    id: "yu",
    glyph: "ゆ",
    reading: "yu",
    cue: "Add a light y sound before u.",
    example: "ゆめ",
    exampleReading: "yume",
    meaning: "dream",
  },
  {
    id: "yo",
    glyph: "よ",
    reading: "yo",
    cue: "Add a light y sound before o.",
    example: "よる",
    exampleReading: "yoru",
    meaning: "night",
  },
  {
    id: "ra",
    glyph: "ら",
    reading: "ra",
    cue: "Tap the tip of your tongue once behind your upper teeth, then say a.",
    example: "そら",
    exampleReading: "sora",
    meaning: "sky",
  },
  {
    id: "ri",
    glyph: "り",
    reading: "ri",
    cue: "Tap the tip of your tongue once behind your upper teeth, then say i.",
    example: "とり",
    exampleReading: "tori",
    meaning: "bird",
  },
  {
    id: "ru",
    glyph: "る",
    reading: "ru",
    cue: "Tap the tip of your tongue once behind your upper teeth, then say u.",
    example: "くる",
    exampleReading: "kuru",
    meaning: "to come",
  },
  {
    id: "re",
    glyph: "れ",
    reading: "re",
    cue: "Tap the tip of your tongue once behind your upper teeth, then say e.",
    example: "はれ",
    exampleReading: "hare",
    meaning: "clear weather",
  },
  {
    id: "ro",
    glyph: "ろ",
    reading: "ro",
    cue: "Tap the tip of your tongue once behind your upper teeth, then say o.",
    example: "いろ",
    exampleReading: "iro",
    meaning: "color",
  },
  {
    id: "wa",
    glyph: "わ",
    reading: "wa",
    cue: "Glide from a gentle w into a short a.",
    example: "かわ",
    exampleReading: "kawa",
    meaning: "river",
  },
  {
    id: "wo",
    glyph: "を",
    reading: "wo",
    cue: "Usually pronounced o. The kana を marks the object of a verb.",
    example: "ほんをよむ",
    exampleReading: "hon wo yomu",
    meaning: "to read a book",
  },
  {
    id: "n",
    glyph: "ん",
    reading: "n",
    cue: "Make one nasal beat without adding a vowel. Its sound shifts with the next consonant.",
    example: "ほん",
    exampleReading: "hon",
    meaning: "book",
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
  {
    title: "The S row",
    notebook: "S row",
    detail: "Study さ・し・す・せ・そ and practice recalling each reading.",
    ids: ["sa", "shi", "su", "se", "so"],
  },
  {
    title: "The T row",
    notebook: "T row",
    detail: "Study た・ち・つ・て・と and practice recalling each reading.",
    ids: ["ta", "chi", "tsu", "te", "to"],
  },
  {
    title: "The N row",
    notebook: "N row",
    detail: "Study な・に・ぬ・ね・の and practice recalling each reading.",
    ids: ["na", "ni", "nu", "ne", "no"],
  },
  {
    title: "The H row",
    notebook: "H row",
    detail: "Study は・ひ・ふ・へ・ほ and practice recalling each reading.",
    ids: ["ha", "hi", "fu", "he", "ho"],
  },
  {
    title: "The M row",
    notebook: "M row",
    detail: "Study ま・み・む・め・も and practice recalling each reading.",
    ids: ["ma", "mi", "mu", "me", "mo"],
  },
  {
    title: "The Y row",
    notebook: "Y row",
    detail: "Study や・ゆ・よ and practice recalling each reading.",
    ids: ["ya", "yu", "yo"],
  },
  {
    title: "The R row",
    notebook: "R row",
    detail: "Study ら・り・る・れ・ろ and practice recalling each reading.",
    ids: ["ra", "ri", "ru", "re", "ro"],
  },
  {
    title: "The W row and ん",
    notebook: "W row and ん",
    detail: "Study わ・を・ん and practice recalling each reading.",
    ids: ["wa", "wo", "n"],
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
    const neighbors = kana.filter(
      (other) => other.id !== item.id && row?.ids.includes(other.id),
    );
    const nearby = shuffled(neighbors).slice(0, 3);
    const fill = shuffled(
      kana.filter(
        (other) => other.id !== item.id && !row?.ids.includes(other.id),
      ),
    ).slice(0, 3 - nearby.length);
    const distractors = [...nearby, ...fill].map((other) => other.glyph);
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
  const reading = answer.normalize("NFKC").trim().toLowerCase();
  return reading === item.reading || (item.id === "wo" && reading === "o");
}
