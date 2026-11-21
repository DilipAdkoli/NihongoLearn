export const nounModifiers = [
  {
    id: "noun-modifier-past",
    title: "Describe a noun with a past action",
    explanation:
      "A plain verb phrase can go directly before a noun. Use the plain past form to describe a completed action.",
    japanese: "きのう かった カメラ",
    english: "the camera I bought yesterday",
    prompt: "Complete “the book I bought yesterday.”",
    stem: "きのう ＿＿ ほん",
    choices: ["かいます", "かった", "かいました"],
    answer: "かった",
    feedback:
      "かう (to buy) becomes かった in the plain past. きのう かった describes ほん.",
  },
  {
    id: "noun-modifier-habit",
    title: "Describe a person by what they do",
    explanation:
      "Use the dictionary form before a noun when describing an action or habit.",
    japanese: "えきで はたらく ひと",
    english: "a person who works at the station",
    prompt: "Complete “a student who studies at school.”",
    stem: "がっこうで ＿＿ がくせい",
    choices: ["べんきょうします", "べんきょうしました", "べんきょうする"],
    answer: "べんきょうする",
    feedback:
      "がっこうで べんきょうする describes the student who studies at school.",
  },
  {
    id: "noun-modifier-subject",
    title: "Name the subject inside the describing phrase",
    explanation:
      "You can use が to mark who did the action in a phrase that describes a noun.",
    japanese: "ともだちが かった カメラ",
    english: "the camera my friend bought",
    prompt: "Complete “the book I read” by marking yourself as the subject.",
    stem: "わたし＿＿ よんだ ほん",
    choices: ["が", "に", "を"],
    answer: "が",
    feedback:
      "わたしが names the person who read the book. わたしが よんだ goes before ほん.",
  },
  {
    id: "noun-modifier-progress",
    title: "Describe what someone is doing now",
    explanation:
      "Use ている before the noun to describe an action in progress.",
    japanese: "パンを たべている ひと",
    english: "the person who is eating bread",
    prompt: "Complete “the person who is drinking tea.”",
    stem: "おちゃを ＿＿ ひと",
    choices: ["のんでいます", "のんでいる", "のみました"],
    answer: "のんでいる",
    feedback:
      "のむ becomes のんで. Add いる, then put おちゃを のんでいる before ひと.",
  },
] as const;
