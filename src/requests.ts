export const requests = [
  {
    id: "request-do-not",
    title: "Make a negative request with ないでください",
    explanation:
      "Add でください to the ない-form of a verb to make a polite negative request. とる (to take) becomes とらないでください (please don’t take).",
    japanese: "ここで しゃしんを とらないでください。",
    english: "Please don’t take photos here.",
    prompt: "Ask someone not to read the message yet.",
    stem: "まだ メッセージを ＿＿。",
    choices: ["よんでください", "よまないでください", "よまなくても いいです"],
    answer: "よまないでください",
    feedback:
      "よむ becomes よまない. Add でください to ask someone not to read it yet.",
  },
  {
    id: "request-optional",
    title: "Say something is optional with なくてもいいです",
    explanation:
      "Replace ない with なくてもいいです to say that skipping an action is fine. こない (to not come) becomes こなくてもいいです (you don’t have to come).",
    japanese: "あしたは こなくても いいです。",
    english: "You don’t have to come tomorrow.",
    prompt: "Say “You don’t have to buy a ticket.”",
    stem: "きっぷを ＿＿。",
    choices: [
      "かわないでください",
      "かわないと いけません",
      "かわなくても いいです",
    ],
    answer: "かわなくても いいです",
    feedback:
      "かう becomes かわない. Use かわなくてもいいです to say buying a ticket is optional.",
  },
  {
    id: "request-have-to",
    title: "Say what you have to do with ないといけません",
    explanation:
      "Add といけません to the ない-form of a verb to express an obligation. おきないといけません means that you have to get up.",
    japanese: "あしたは はやく おきないと いけません。",
    english: "I have to get up early tomorrow.",
    prompt: "Say “I have to go to the bank today.”",
    stem: "きょうは ぎんこうに ＿＿。",
    choices: [
      "いかないと いけません",
      "いっては いけません",
      "いかなくても いいです",
    ],
    answer: "いかないと いけません",
    feedback:
      "いく becomes いかない. Add といけません to say that going is necessary.",
  },
] as const;
