export const invitations = [
  {
    id: "invite-with-masen-ka",
    title: "Invite someone with ませんか",
    explanation:
      "To invite someone to do something together, change the verb ending from ます to ませんか.",
    japanese: "いっしょに おちゃを のみませんか。",
    english: "Would you like to have tea together?",
    prompt: "Invite someone to go to the park with you.",
    stem: "いっしょに こうえんに ＿＿。",
    choices: ["いきませんか", "いきませんでした", "いきません"],
    answer: "いきませんか",
    feedback:
      "いっしょに means together, and いきませんか invites the listener to go.",
  },
  {
    id: "suggest-with-mashou",
    title: "Suggest a shared action with ましょう",
    explanation:
      "Change ます to ましょう to propose an action you can do together.",
    japanese: "えきで あいましょう。",
    english: "Let’s meet at the station.",
    prompt: "Say “Let’s study tomorrow.”",
    stem: "あした べんきょう ＿＿。",
    choices: ["しました", "しましょう", "しています"],
    answer: "しましょう",
    feedback: "べんきょうしましょう means “Let’s study.” あした says when.",
  },
  {
    id: "suggest-with-dou",
    title: "Offer a date or time with はどうですか",
    explanation:
      "Put a suggested date or time before はどうですか to ask how it would suit the other person.",
    japanese: "にちようびは どうですか。",
    english: "How about Sunday?",
    prompt: "Offer 3 p.m. as a possible time.",
    stem: "ごご さんじは ＿＿。",
    choices: ["どこですか", "だれですか", "どうですか"],
    answer: "どうですか",
    feedback: "ごご さんじ is 3 p.m. はどうですか offers it as a possibility.",
  },
] as const;
