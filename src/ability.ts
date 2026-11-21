export const ability = [
  {
    id: "activity-dekimasu",
    title: "Say you can do an activity with できます",
    explanation:
      "Use an activity noun with が できます to say you can do it. For example, スキーが できます means I can ski.",
    japanese: "スキーが できます。",
    english: "I can ski.",
    prompt: "Say “I can cook,” using りょうり (cooking).",
    stem: "りょうりが ＿＿。",
    choices: ["います", "できます", "です"],
    answer: "できます",
    feedback: "りょうりが できます means I can cook.",
  },
  {
    id: "verb-koto-ga-dekimasu",
    title: "Use the dictionary form with ことができます",
    explanation:
      "Put ことが できます after a verb’s dictionary form to say you can do that action. よむ ことが できます means can read.",
    japanese: "ひらがなを よむ ことが できます。",
    english: "I can read hiragana.",
    prompt: "Say “I can write my name” using かく (to write).",
    stem: "なまえを ＿＿ ことが できます。",
    choices: ["かきます", "かいて", "かく"],
    answer: "かく",
    feedback: "The dictionary form かく goes before ことが できます.",
  },
  {
    id: "potential-godan",
    title: "Make a potential form such as よめます",
    explanation:
      "For う-verbs like よむ, move the last kana to the e row and add ます for the polite potential form. よむ becomes よめます.",
    japanese: "かんたんな ほんが よめます。",
    english: "I can read simple books.",
    prompt:
      "Use the polite potential of いく to say “I can go to the station.”",
    stem: "えきに ＿＿。",
    choices: ["いけます", "いきます", "いきたいです"],
    answer: "いけます",
    feedback: "Change the final く in いく to け and add ます.",
  },
  {
    id: "potential-ichidan",
    title: "Make a potential form such as たべられます",
    explanation:
      "For る-verbs like たべる and みる, the standard polite potential form replaces the final る with られます.",
    japanese: "さかなが たべられます。",
    english: "I can eat fish.",
    prompt:
      "Use the standard polite potential of みる to say “I can see the sea.”",
    stem: "うみが ＿＿。",
    choices: ["みます", "みられます", "みたいです"],
    answer: "みられます",
    feedback: "Replace the final る in みる with られます.",
  },
  {
    id: "activity-dekimasen",
    title: "Say what you can’t do with できません",
    explanation:
      "The polite negative of できます is できません. It can describe a skill you don’t have or an activity you can’t do in a particular situation.",
    japanese: "あめですから、そとで テニスが できません。",
    english: "Because it’s raining, we can’t play tennis outside.",
    prompt: "Say “I can’t read kanji” using the dictionary-form pattern.",
    stem: "かんじを よむ ことが ＿＿。",
    choices: ["あります", "できます", "できません"],
    answer: "できません",
    feedback: "よむ ことが できません means can’t read.",
  },
] as const;
