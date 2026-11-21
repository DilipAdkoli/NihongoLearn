export const writingTasks = [
  {
    id: "tea-yesterday",
    meaning: "I drank tea yesterday.",
    tiles: ["を", "のみました", "おちゃ", "きのう"],
    answers: [
      ["きのう", "おちゃ", "を", "のみました"],
      ["おちゃ", "を", "きのう", "のみました"],
    ],
    feedback: "Attach を to おちゃ. Use のみました for a polite past action.",
  },
  {
    id: "station-tomorrow",
    meaning: "I’ll go to the station tomorrow.",
    tiles: ["えき", "いきます", "あした", "に"],
    answers: [
      ["あした", "えき", "に", "いきます"],
      ["えき", "に", "あした", "いきます"],
    ],
    feedback:
      "えきに tells you where the speaker is going. あした gives the time.",
  },
  {
    id: "read-at-home",
    meaning: "I read books at home.",
    tiles: ["ほん", "よみます", "で", "を", "いえ"],
    answers: [
      ["いえ", "で", "ほん", "を", "よみます"],
      ["ほん", "を", "いえ", "で", "よみます"],
    ],
    feedback: "で marks where the reading happens. を marks what is read.",
  },
  {
    id: "park-left-of-station",
    meaning: "There’s a park to the left of the station.",
    tiles: ["が", "ひだり", "えき", "あります", "こうえん", "の", "に"],
    answers: [
      ["えき", "の", "ひだり", "に", "こうえん", "が", "あります"],
      ["こうえん", "が", "えき", "の", "ひだり", "に", "あります"],
    ],
    feedback:
      "えきの ひだりに gives the location. こうえんが marks what’s there.",
  },
  {
    id: "photo-permission",
    meaning: "May I take a photo here?",
    tiles: ["を", "いいですか", "ここ", "しゃしん", "で", "とっても"],
    answers: [
      ["ここ", "で", "しゃしん", "を", "とっても", "いいですか"],
      ["しゃしん", "を", "ここ", "で", "とっても", "いいですか"],
    ],
    feedback:
      "ここで gives the place of the action. とっても いいですか asks permission to take the photo.",
  },
  {
    id: "want-tea-at-cafe",
    meaning: "I want to drink tea at the café.",
    tiles: ["のみたいです", "を", "きっさてん", "おちゃ", "で"],
    answers: [
      ["きっさてん", "で", "おちゃ", "を", "のみたいです"],
      ["おちゃ", "を", "きっさてん", "で", "のみたいです"],
    ],
    feedback:
      "きっさてんで means at the café. のみたいです means I want to drink.",
  },
  {
    id: "no-photos-here",
    meaning: "Please don’t take photos here.",
    tiles: ["しゃしん", "とらないで", "で", "ください", "ここ", "を"],
    answers: [
      ["ここ", "で", "しゃしん", "を", "とらないで", "ください"],
      ["しゃしん", "を", "ここ", "で", "とらないで", "ください"],
    ],
    feedback:
      "とる becomes とらない. Add でください to make the negative request.",
  },
  {
    id: "coming-tomorrow-optional",
    meaning: "You don’t have to come tomorrow.",
    tiles: ["こなくても", "いいです", "あした", "は"],
    answers: [["あした", "は", "こなくても", "いいです"]],
    feedback:
      "こない becomes こなくてもいいです to say that coming is optional.",
  },
] as const;

export function isSentenceAnswer(
  accepted: readonly (readonly string[])[],
  answer: readonly string[],
) {
  return accepted.some(
    (order) =>
      order.length === answer.length &&
      order.every((token, i) => token === answer[i]),
  );
}

const spellings = [
  ["昨日", "きのう"],
  ["明日", "あした"],
  ["お茶", "おちゃ"],
  ["飲", "の"],
  ["駅", "えき"],
  ["行", "い"],
  ["家", "いえ"],
  ["本", "ほん"],
  ["読", "よ"],
  ["左", "ひだり"],
  ["公園", "こうえん"],
  ["写真", "しゃしん"],
  ["撮", "と"],
  ["良い", "いい"],
  ["喫茶店", "きっさてん"],
  ["来なく", "こなく"],
] as const;

export function normalizeSentenceAnswer(text: string) {
  const compact = text.normalize("NFKC").replace(/[\s。．、，,.!?？！]/gu, "");
  return spellings.reduce(
    (normalized, [spelling, reading]) =>
      normalized.replaceAll(spelling, reading),
    compact,
  );
}
