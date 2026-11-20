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
