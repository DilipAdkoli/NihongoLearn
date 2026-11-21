import { japaneseNumber } from "./numbers.ts";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const daysInMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const monthOverrides: Partial<Record<number, string>> = {
  4: "しがつ",
  7: "しちがつ",
  9: "くがつ",
};
const dayOverrides: Partial<Record<number, string>> = {
  1: "ついたち",
  2: "ふつか",
  3: "みっか",
  4: "よっか",
  5: "いつか",
  6: "むいか",
  7: "なのか",
  8: "ようか",
  9: "ここのか",
  10: "とおか",
  14: "じゅうよっか",
  17: "じゅうしちにち",
  19: "じゅうくにち",
  20: "はつか",
  24: "にじゅうよっか",
  27: "にじゅうしちにち",
  29: "にじゅうくにち",
};

export function japaneseDate(month: number, day: number) {
  if (
    !Number.isInteger(month) ||
    month < 1 ||
    month > 12 ||
    !Number.isInteger(day) ||
    day < 1 ||
    day > daysInMonth[month - 1]
  ) {
    throw new RangeError("Choose a valid month and day.");
  }
  return {
    japanese: `${month}月${day}日`,
    kana:
      (monthOverrides[month] ?? japaneseNumber(month).kana + "がつ") +
      " " +
      (dayOverrides[day] ?? japaneseNumber(day).kana + "にち"),
    english: `${months[month - 1]} ${day}`,
  };
}

const dateDrills = [
  [4, 1, ["April 4", "January 4", "April 10"]],
  [7, 4, ["July 7", "April 7", "July 14"]],
  [9, 20, ["September 2", "September 24", "October 20"]],
  [2, 14, ["February 4", "April 2", "February 24"]],
  [10, 24, ["October 4", "October 14", "April 24"]],
] as const;

export const datePractice = dateDrills.map(
  ([month, day, alternatives], index) => {
    const date = japaneseDate(month, day);
    const choices: string[] = [...alternatives];
    choices.splice(index % 4, 0, date.english);
    return {
      id: `${month}-${day}`,
      title: date.kana,
      japanese: "",
      english: "",
      explanation: "",
      prompt: "Which date matches this reading?",
      stem: "",
      choices,
      answer: date.english,
      feedback: `${date.kana} is ${date.japanese}, or ${date.english}.`,
    };
  },
);
