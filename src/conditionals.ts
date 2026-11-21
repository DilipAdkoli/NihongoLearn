export const conditionals = [
  {
    id: "conditional-tara",
    title: "Make a plan with たら",
    explanation:
      "Add ら to the plain past form to give a condition. The plan can refer to the future.",
    japanese: "はれたら、こうえんに いきます。",
    english: "If it’s sunny, I’ll go to the park.",
    prompt: "Say “If it rains, I’ll stay home.”",
    stem: "あめが ＿＿、いえに います。",
    choices: ["ふりました", "ふったら", "ふって"],
    answer: "ふったら",
    feedback:
      "ふる (to fall, of rain or snow) becomes ふった in the plain past. Add ら to give the condition.",
  },
  {
    id: "conditional-to",
    title: "Describe a regular result with と",
    explanation:
      "Add と after the dictionary form to describe something that happens regularly or automatically as a result.",
    japanese: "ボタンを おすと、ドアが あきます。",
    english: "When you press the button, the door opens.",
    prompt: "Say “When you turn the key, the door opens.”",
    stem: "かぎを ＿＿、ドアが あきます。",
    choices: ["まわしました", "まわします", "まわすと"],
    answer: "まわすと",
    feedback:
      "まわす means to turn. と introduces opening the door as the regular result.",
  },
  {
    id: "conditional-nara",
    title: "Respond to a proposed plan with なら",
    explanation:
      "Use なら after a proposed day or plan to say what works under that condition.",
    japanese: "どようびなら、ごぜんが いいです。",
    english: "If it’s Saturday, the morning works.",
    prompt: "Say “If it’s tomorrow, I can go.”",
    stem: "あした＿＿、いけます。",
    choices: ["なら", "まで", "から"],
    answer: "なら",
    feedback:
      "あしたなら sets tomorrow as the condition. いけます means you can go.",
  },
  {
    id: "conditional-ba",
    title: "Give a condition with ば",
    explanation:
      "For an う-verb, change the final syllable to its e-row form and add ば. やむ becomes やめば.",
    japanese: "あめが やめば、さんぽを します。",
    english: "If the rain stops, I’ll go for a walk.",
    prompt: "Use ば to say “If you hurry, you’ll make it in time.”",
    stem: "＿＿、まにあいます。",
    choices: ["いそぎます", "いそげば", "いそいだ"],
    answer: "いそげば",
    feedback: "いそぐ means to hurry. Change ぐ to げ and add ば.",
  },
] as const;
