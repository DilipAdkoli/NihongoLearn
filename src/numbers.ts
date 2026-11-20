const digits = ["", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
const readings = [
  "",
  "いち",
  "に",
  "さん",
  "よん",
  "ご",
  "ろく",
  "なな",
  "はち",
  "きゅう",
];

export function japaneseNumber(value: number) {
  if (!Number.isInteger(value) || value < 1 || value > 99) {
    throw new RangeError("Choose a whole number from 1 to 99.");
  }
  const tens = Math.floor(value / 10);
  const ones = value % 10;
  return {
    value,
    kanji: (tens ? (tens === 1 ? "" : digits[tens]) + "十" : "") + digits[ones],
    kana:
      (tens ? (tens === 1 ? "" : readings[tens]) + "じゅう" : "") +
      readings[ones],
  };
}

export const countingTable = Array.from({ length: 10 }, (_, i) =>
  japaneseNumber(i + 1),
);

const examples = [
  [7, 4, 9, 10],
  [10, 1, 12, 20],
  [11, 12, 20, 21],
  [24, 14, 42, 34],
  [47, 74, 44, 57],
  [90, 9, 19, 99],
  [99, 90, 89, 79],
];

export const numberPractice = examples.map(([value, ...alternatives]) => {
  const { kana, kanji } = japaneseNumber(value);
  return {
    id: String(value),
    title: kana,
    japanese: "",
    english: "",
    explanation: "",
    prompt: "Which number is this?",
    stem: kanji,
    choices: [value, ...alternatives].sort((a, b) => a - b).map(String),
    answer: String(value),
    feedback: `${kanji} is ${kana} and means ${value}.`,
  };
});
