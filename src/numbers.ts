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
const hundredsReadings = [
  "",
  "ひゃく",
  "にひゃく",
  "さんびゃく",
  "よんひゃく",
  "ごひゃく",
  "ろっぴゃく",
  "ななひゃく",
  "はっぴゃく",
  "きゅうひゃく",
];
const thousandsReadings = [
  "",
  "せん",
  "にせん",
  "さんぜん",
  "よんせん",
  "ごせん",
  "ろくせん",
  "ななせん",
  "はっせん",
  "きゅうせん",
];

function kanjiPlace(digit: number, unit: "十" | "百" | "千" | "万") {
  if (digit === 0) return "";
  return (digit === 1 && unit !== "万" ? "" : digits[digit]) + unit;
}

export function japaneseNumber(value: number) {
  if (!Number.isInteger(value) || value < 1 || value > 99_999) {
    throw new RangeError("Choose a whole number from 1 to 99,999.");
  }
  const tenThousands = Math.floor(value / 10_000);
  const thousands = Math.floor(value / 1_000) % 10;
  const hundreds = Math.floor(value / 100) % 10;
  const tens = Math.floor(value / 10) % 10;
  const ones = value % 10;
  return {
    value,
    kanji:
      kanjiPlace(tenThousands, "万") +
      kanjiPlace(thousands, "千") +
      kanjiPlace(hundreds, "百") +
      kanjiPlace(tens, "十") +
      digits[ones],
    kana:
      (tenThousands ? readings[tenThousands] + "まん" : "") +
      thousandsReadings[thousands] +
      hundredsReadings[hundreds] +
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
