import { japaneseNumber } from "./numbers.ts";

const hourExceptions: Partial<Record<number, string>> = {
  4: "よじ",
  7: "しちじ",
  9: "くじ",
};
const minuteEndings = [
  "じゅっぷん",
  "いっぷん",
  "にふん",
  "さんぷん",
  "よんぷん",
  "ごふん",
  "ろっぷん",
  "ななふん",
  "はっぷん",
  "きゅうふん",
];

export function japaneseTime(hour: number, minute: number) {
  if (
    !Number.isInteger(hour) ||
    hour < 1 ||
    hour > 12 ||
    !Number.isInteger(minute) ||
    minute < 0 ||
    minute > 59
  ) {
    throw new RangeError(
      "Choose an hour from 1 to 12 and minutes from 0 to 59.",
    );
  }
  const number = japaneseNumber(hour);
  const hourReading = hourExceptions[hour] ?? number.kana + "じ";
  let minuteReading = "";
  if (minute > 0) {
    const tens = Math.floor(minute / 10);
    const ones = minute % 10;
    const prefix = tens > 1 ? japaneseNumber(tens).kana : "";
    minuteReading =
      ones === 0
        ? prefix + minuteEndings[0]
        : (tens > 0 ? prefix + "じゅう" : "") + minuteEndings[ones];
  }
  return {
    kana: hourReading + minuteReading,
    japanese: `${hour}時${minute ? minute + "分" : ""}`,
    clock: `${hour}:${String(minute).padStart(2, "0")}`,
  };
}

const practiceTimes = [
  [4, 0, ["7:00", "9:00", "12:00"]],
  [7, 15, ["4:15", "7:05", "7:50"]],
  [9, 6, ["6:09", "9:16", "9:30"]],
  [10, 8, ["8:10", "10:18", "10:48"]],
  [12, 30, ["3:12", "12:03", "12:13"]],
] as const;

export const timePractice = practiceTimes.map(
  ([hour, minute, alternatives], index) => {
    const time = japaneseTime(hour, minute);
    const choices: string[] = [...alternatives];
    choices.splice(index % 4, 0, time.clock);
    return {
      id: `${hour}-${minute}`,
      title: time.kana,
      japanese: "",
      english: "",
      explanation: "",
      prompt: "Which clock time matches this reading?",
      stem: "",
      choices,
      answer: time.clock,
      feedback: `${time.kana} is ${time.japanese}, or ${time.clock}.`,
    };
  },
);
