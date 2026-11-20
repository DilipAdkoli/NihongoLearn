import { yoon } from "./yoon.ts";

export type Script = "hiragana" | "katakana";

export type Kana = {
  id: string;
  glyph: string;
  script: Script;
  reading: string;
  aliases?: readonly string[];
  cue: string;
  example: string;
  exampleReading: string;
  meaning: string;
};

const hiragana: readonly Omit<Kana, "script">[] = [
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
    aliases: ["o"],
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
  {
    id: "ga",
    glyph: "が",
    reading: "ga",
    cue: "Add dakuten (two short marks) to か and say “ga”.",
    example: "がか",
    exampleReading: "gaka",
    meaning: "painter",
  },
  {
    id: "gi",
    glyph: "ぎ",
    reading: "gi",
    cue: "Add dakuten (two short marks) to き and say “gi”.",
    example: "かぎ",
    exampleReading: "kagi",
    meaning: "key",
  },
  {
    id: "gu",
    glyph: "ぐ",
    reading: "gu",
    cue: "Add dakuten (two short marks) to く and say “gu”.",
    example: "ぐん",
    exampleReading: "gun",
    meaning: "army",
  },
  {
    id: "ge",
    glyph: "げ",
    reading: "ge",
    cue: "Add dakuten (two short marks) to け and say “ge”.",
    example: "げた",
    exampleReading: "geta",
    meaning: "wooden sandals",
  },
  {
    id: "go",
    glyph: "ご",
    reading: "go",
    cue: "Add dakuten (two short marks) to こ and say “go”.",
    example: "ごま",
    exampleReading: "goma",
    meaning: "sesame",
  },
  {
    id: "za",
    glyph: "ざ",
    reading: "za",
    cue: "Add dakuten (two short marks) to さ and say “za”.",
    example: "ざる",
    exampleReading: "zaru",
    meaning: "basket",
  },
  {
    id: "ji",
    glyph: "じ",
    reading: "ji",
    cue: "Add dakuten (two short marks) to し and say “ji”.",
    example: "じかん",
    exampleReading: "jikan",
    meaning: "time",
  },
  {
    id: "zu",
    glyph: "ず",
    reading: "zu",
    cue: "Add dakuten (two short marks) to す and say “zu”.",
    example: "みず",
    exampleReading: "mizu",
    meaning: "water",
  },
  {
    id: "ze",
    glyph: "ぜ",
    reading: "ze",
    cue: "Add dakuten (two short marks) to せ and say “ze”.",
    example: "かぜ",
    exampleReading: "kaze",
    meaning: "wind",
  },
  {
    id: "zo",
    glyph: "ぞ",
    reading: "zo",
    cue: "Add dakuten (two short marks) to そ and say “zo”.",
    example: "なぞ",
    exampleReading: "nazo",
    meaning: "riddle",
  },
  {
    id: "da",
    glyph: "だ",
    reading: "da",
    cue: "Add dakuten (two short marks) to た and say “da”.",
    example: "だれ",
    exampleReading: "dare",
    meaning: "who",
  },
  {
    id: "di",
    glyph: "ぢ",
    reading: "ji",
    cue: "Add dakuten (two short marks) to ち and say “ji”.",
    example: "はなぢ",
    exampleReading: "hanaji",
    meaning: "nosebleed",
    aliases: ["di"],
  },
  {
    id: "du",
    glyph: "づ",
    reading: "zu",
    cue: "Add dakuten (two short marks) to つ and say “zu”.",
    example: "つづく",
    exampleReading: "tsuzuku",
    meaning: "to continue",
    aliases: ["du"],
  },
  {
    id: "de",
    glyph: "で",
    reading: "de",
    cue: "Add dakuten (two short marks) to て and say “de”.",
    example: "でんわ",
    exampleReading: "denwa",
    meaning: "telephone",
  },
  {
    id: "do",
    glyph: "ど",
    reading: "do",
    cue: "Add dakuten (two short marks) to と and say “do”.",
    example: "まど",
    exampleReading: "mado",
    meaning: "window",
  },
  {
    id: "ba",
    glyph: "ば",
    reading: "ba",
    cue: "Add dakuten (two short marks) to は and say “ba”.",
    example: "ばら",
    exampleReading: "bara",
    meaning: "rose",
  },
  {
    id: "bi",
    glyph: "び",
    reading: "bi",
    cue: "Add dakuten (two short marks) to ひ and say “bi”.",
    example: "えび",
    exampleReading: "ebi",
    meaning: "shrimp",
  },
  {
    id: "bu",
    glyph: "ぶ",
    reading: "bu",
    cue: "Add dakuten (two short marks) to ふ and say “bu”.",
    example: "ぶた",
    exampleReading: "buta",
    meaning: "pig",
  },
  {
    id: "be",
    glyph: "べ",
    reading: "be",
    cue: "Add dakuten (two short marks) to へ and say “be”.",
    example: "なべ",
    exampleReading: "nabe",
    meaning: "cooking pot",
  },
  {
    id: "bo",
    glyph: "ぼ",
    reading: "bo",
    cue: "Add dakuten (two short marks) to ほ and say “bo”.",
    example: "ぼく",
    exampleReading: "boku",
    meaning: "I (informal)",
  },
  {
    id: "pa",
    glyph: "ぱ",
    reading: "pa",
    cue: "Add handakuten (a small circle) to は and say “pa”.",
    example: "ぱらぱら",
    exampleReading: "parapara",
    meaning: "sprinkling lightly",
  },
  {
    id: "pi",
    glyph: "ぴ",
    reading: "pi",
    cue: "Add handakuten (a small circle) to ひ and say “pi”.",
    example: "ぴかぴか",
    exampleReading: "pikapika",
    meaning: "sparkling",
  },
  {
    id: "pu",
    glyph: "ぷ",
    reading: "pu",
    cue: "Add handakuten (a small circle) to ふ and say “pu”.",
    example: "ぷかぷか",
    exampleReading: "pukapuka",
    meaning: "bobbing on water",
  },
  {
    id: "pe",
    glyph: "ぺ",
    reading: "pe",
    cue: "Add handakuten (a small circle) to へ and say “pe”.",
    example: "ぺこぺこ",
    exampleReading: "pekopeko",
    meaning: "very hungry",
  },
  {
    id: "po",
    glyph: "ぽ",
    reading: "po",
    cue: "Add handakuten (a small circle) to ほ and say “po”.",
    example: "ぽかぽか",
    exampleReading: "pokapoka",
    meaning: "pleasantly warm",
  },
];

const hiraganaLessons = [
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
  {
    title: "The G row",
    notebook: "G row",
    detail: "Add dakuten (two short marks) to the K row to make the G row.",
    ids: ["ga", "gi", "gu", "ge", "go"],
  },
  {
    title: "The Z row",
    notebook: "Z row",
    detail: "Add dakuten to the S row to make the Z row. じ is read ji.",
    ids: ["za", "ji", "zu", "ze", "zo"],
  },
  {
    title: "The D row",
    notebook: "D row",
    detail:
      "Add dakuten to the T row. In standard Japanese, ぢ sounds like じ and づ sounds like ず.",
    ids: ["da", "di", "du", "de", "do"],
  },
  {
    title: "The B row",
    notebook: "B row",
    detail: "Add dakuten to the H row to make the B row, including ふ to ぶ.",
    ids: ["ba", "bi", "bu", "be", "bo"],
  },
  {
    title: "The P row",
    notebook: "P row",
    detail:
      "Add a small circle, called handakuten, to the H row to make the P row.",
    ids: ["pa", "pi", "pu", "pe", "po"],
  },
];

const katakanaExamples: readonly [string, string, string, string][] = [
  ["a", "アイス", "aisu", "ice cream"],
  ["i", "インク", "inku", "ink"],
  ["u", "ウニ", "uni", "sea urchin"],
  ["e", "エリア", "eria", "area"],
  ["o", "オイル", "oiru", "oil"],
  ["ka", "カメラ", "kamera", "camera"],
  ["ki", "キウイ", "kiui", "kiwi"],
  ["ku", "クミン", "kumin", "cumin"],
  ["ke", "ケア", "kea", "care"],
  ["ko", "ココア", "kokoa", "cocoa"],
  ["sa", "サイン", "sain", "signature"],
  ["shi", "シアトル", "shiatoru", "Seattle"],
  ["su", "スイス", "suisu", "Switzerland"],
  ["se", "セロリ", "serori", "celery"],
  ["so", "ソフト", "sofuto", "software"],
  ["ta", "タイ", "tai", "Thailand"],
  ["chi", "チタン", "chitan", "titanium"],
  ["tsu", "ツナ", "tsuna", "tuna"],
  ["te", "テニス", "tenisu", "tennis"],
  ["to", "トマト", "tomato", "tomato"],
  ["na", "ナイル", "nairu", "Nile"],
  ["ni", "マニラ", "manira", "Manila"],
  ["nu", "イヌ", "inu", "dog (species name)"],
  ["ne", "ネクタイ", "nekutai", "necktie"],
  ["no", "ノルマ", "noruma", "quota"],
  ["ha", "ハム", "hamu", "ham"],
  ["hi", "ヒント", "hinto", "hint"],
  ["fu", "フランス", "furansu", "France"],
  ["he", "ヘルス", "herusu", "health"],
  ["ho", "ホテル", "hoteru", "hotel"],
  ["ma", "マスク", "masuku", "mask"],
  ["mi", "ミルク", "miruku", "milk"],
  ["mu", "ムスク", "musuku", "musk"],
  ["me", "メモ", "memo", "note"],
  ["mo", "モナコ", "monako", "Monaco"],
  ["ya", "タイヤ", "taiya", "tire"],
  ["yu", "ユニオン", "yunion", "union"],
  ["yo", "ヨハネ", "yohane", "John (biblical name)"],
  ["ra", "ラテン", "raten", "Latin"],
  ["ri", "リスト", "risuto", "list"],
  ["ru", "アルミ", "arumi", "aluminum"],
  ["re", "レモン", "remon", "lemon"],
  ["ro", "ロマン", "roman", "romance"],
  ["wa", "ワイン", "wain", "wine"],
  ["wo", "", "", ""],
  ["n", "インク", "inku", "ink"],
];

const katakana: Kana[] = katakanaExamples.map(
  ([id, example, exampleReading, meaning]) => {
    const source = hiragana.find((item) => item.id === id);
    if (!source) throw new Error(`Missing hiragana counterpart for ${id}`);
    const glyph = String.fromCharCode(source.glyph.charCodeAt(0) + 0x60);
    return {
      ...source,
      id: `kata-${id}`,
      glyph,
      script: "katakana",
      cue:
        id === "wo"
          ? "ヲ is rare in modern writing. It corresponds to を and is usually pronounced o."
          : `This is the katakana counterpart of ${source.glyph}. ${source.cue}`,
      example,
      exampleReading,
      meaning,
    };
  },
);

const contracted: Kana[] = yoon.map(
  ([glyph, reading, example, exampleReading, meaning]) => ({
    id: reading,
    glyph,
    script: "hiragana",
    reading,
    cue: `Combine ${glyph[0]} with small ${glyph[1]}. Read both together as one beat: ${reading}.`,
    example,
    exampleReading,
    meaning,
  }),
);

const contractedLessons = Array.from(
  { length: contracted.length / 3 },
  (_, index) => {
    const row = contracted.slice(index * 3, index * 3 + 3);
    const glyphs = row.map((item) => item.glyph).join("・");
    return {
      script: "hiragana" as const,
      title: `Small や, ゆ, and よ with ${row[0].glyph[0]}`,
      notebook: glyphs,
      detail: `Read ${glyphs} as one beat each. The second kana stays small in writing.`,
      ids: row.map((item) => item.id),
    };
  },
);

export const kana: readonly Kana[] = [
  ...hiragana.map((item): Kana => ({ ...item, script: "hiragana" })),
  ...contracted,
  ...katakana,
];

export const lessons = [
  ...hiraganaLessons.map((lesson) => ({
    ...lesson,
    script: "hiragana" as const,
  })),
  ...contractedLessons,
  ...hiraganaLessons.slice(0, 10).map((lesson) => {
    const ids = lesson.ids.map((id) => `kata-${id}`);
    const glyphs = katakana
      .filter((item) => ids.includes(item.id))
      .map((item) => item.glyph);
    return {
      script: "katakana" as const,
      title: lesson.title.replace("ん", "ン"),
      notebook: lesson.notebook.replace("ん", "ン"),
      detail: `Study ${glyphs.join("・")} and practice recalling each reading.`,
      ids,
    };
  }),
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
        (other) =>
          other.id !== item.id &&
          other.script === item.script &&
          other.glyph.length === item.glyph.length &&
          !row?.ids.includes(other.id) &&
          other.reading !== item.reading,
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
  return reading === item.reading || (item.aliases?.includes(reading) ?? false);
}
