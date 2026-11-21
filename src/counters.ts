import { japaneseNumber } from "./numbers.ts";

const generalReadings = [
  "ひとつ",
  "ふたつ",
  "みっつ",
  "よっつ",
  "いつつ",
  "むっつ",
  "ななつ",
  "やっつ",
  "ここのつ",
  "とお",
];
const peopleReadings: Partial<Record<number, string>> = {
  1: "ひとり",
  2: "ふたり",
  4: "よにん",
  7: "しちにん",
};
const doubledPrefixes: Partial<Record<number, string>> = {
  1: "いっ",
  6: "ろっ",
  8: "はっ",
  10: "じゅっ",
};
const soundChangingCounters = {
  long: { kanji: "本", plain: "ほん", voiced: "ぼん", doubled: "ぽん" },
  animals: { kanji: "匹", plain: "ひき", voiced: "びき", doubled: "ぴき" },
};

export type Counter =
  "general" | "flat" | "people" | keyof typeof soundChangingCounters;

export function japaneseCount(value: number, counter: Counter) {
  if (!Number.isInteger(value) || value < 1 || value > 10) {
    throw new RangeError("This lesson covers whole numbers from 1 to 10.");
  }
  const { kanji, kana } = japaneseNumber(value);
  switch (counter) {
    case "general":
      return {
        written: kanji + (value === 10 ? "" : "つ"),
        reading: generalReadings[value - 1],
      };
    case "flat":
      return { written: kanji + "枚", reading: kana + "まい" };
    case "people":
      return {
        written: kanji + "人",
        reading: peopleReadings[value] ?? kana + "にん",
      };
    case "long":
    case "animals": {
      const ending = soundChangingCounters[counter];
      const prefix = doubledPrefixes[value];
      return {
        written: kanji + ending.kanji,
        reading: prefix
          ? prefix + ending.doubled
          : kana + (value === 3 ? ending.voiced : ending.plain),
      };
    }
  }
}

const drills = [
  {
    counter: "general",
    number: 3,
    title: "Three things",
    alternatives: ["さんまい", "ふたつ", "よっつ"],
  },
  {
    counter: "flat",
    number: 2,
    title: "Two paper tickets",
    alternatives: ["ふたり", "ふたつ", "いちまい"],
  },
  {
    counter: "people",
    number: 1,
    title: "One person",
    alternatives: ["ひとつ", "いちまい", "いちにん"],
  },
  {
    counter: "people",
    number: 4,
    title: "Four people",
    alternatives: ["よんにん", "よんまい", "ふたり"],
  },
  {
    counter: "long",
    number: 1,
    title: "One bottle",
    alternatives: ["いちほん", "いちまい", "にほん"],
  },
  {
    counter: "long",
    number: 3,
    title: "Three pencils",
    alternatives: ["さんほん", "さんびき", "ろっぽん"],
  },
  {
    counter: "animals",
    number: 3,
    title: "Three cats",
    alternatives: ["さんひき", "さんぼん", "はっぴき"],
  },
  {
    counter: "animals",
    number: 6,
    title: "Six small dogs",
    alternatives: ["ろくひき", "ろっぽん", "ごひき"],
  },
] as const;

export const counterPractice = drills.map((drill, index) => {
  const { written, reading } = japaneseCount(drill.number, drill.counter);
  const choices: string[] = [...drill.alternatives];
  choices.splice(index % (choices.length + 1), 0, reading);
  return {
    id: `${drill.counter}-${drill.number}`,
    title: drill.title,
    japanese: "",
    english: "",
    explanation: "",
    prompt: "Choose the Japanese reading for this quantity.",
    stem: written,
    choices,
    answer: reading,
    feedback: `${written} is read ${reading} in this context.`,
  };
});
