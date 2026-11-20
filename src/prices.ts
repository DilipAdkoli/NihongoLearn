import { japaneseNumber } from "./numbers.ts";

const amount = new Intl.NumberFormat("en-US");

function priceQuestion(title: string, value: number, alternatives: number[]) {
  const { kana, kanji } = japaneseNumber(value);
  return {
    id: String(value),
    title,
    japanese: "",
    english: "",
    explanation: "",
    prompt: "What is the price?",
    stem: `${kanji}円`,
    choices: [value, ...alternatives]
      .sort((a, b) => a - b)
      .map((choice) => `¥${amount.format(choice)}`),
    answer: `¥${amount.format(value)}`,
    feedback: `${kanji}円 is ${kana}えん and means ${amount.format(value)} yen.`,
  };
}

export const prices = [
  {
    title: "Hundreds of yen",
    lessons: [
      priceQuestion("A cup of tea", 300, [30, 600, 3_000]),
      priceQuestion("A snack", 600, [60, 800, 6_000]),
      priceQuestion("Lunch", 850, [85, 805, 8_500]),
    ],
  },
  {
    title: "Thousands and 万",
    lessons: [
      priceQuestion("A book", 3_000, [300, 330, 30_000]),
      priceQuestion("A train ticket", 8_000, [800, 8_300, 80_000]),
      priceQuestion("A night at an inn", 14_500, [1_450, 10_450, 15_400]),
    ],
  },
];
