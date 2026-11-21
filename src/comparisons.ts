export const comparisons = [
  {
    id: "comparison-yori",
    title: "Compare two things with より",
    explanation:
      "In A は B より [adjective] です, B is the point of comparison. A is more [adjective] than B.",
    japanese: "でんしゃは バスより はやいです。",
    english: "The train is faster than the bus.",
    prompt: "Mark the bus as the point of comparison.",
    stem: "でんしゃは バス＿＿ はやいです。",
    choices: ["まで", "の", "より"],
    answer: "より",
    feedback: "バスより means “than the bus” here.",
  },
  {
    id: "comparison-hou",
    title: "Say which of two is more with ほうが",
    explanation:
      "After mentioning two options, use [noun] の ほうが to pick the one that is more [adjective].",
    japanese: "おちゃの ほうが あついです。",
    english: "The tea is hotter.",
    prompt: "Use the comparison pattern to say “The train is faster.”",
    stem: "でんしゃの ＿＿ はやいです。",
    choices: ["ほうが", "となりに", "いちばん"],
    answer: "ほうが",
    feedback:
      "でんしゃの ほうが picks the train as the faster of the two options.",
  },
  {
    id: "comparison-dochira",
    title: "Ask which of two with どちら",
    explanation:
      "When you have two options, use どちら to ask which one. A と B identifies the two options.",
    japanese: "おちゃと コーヒーと、どちらが すきですか。",
    english: "Which do you like better, tea or coffee?",
    prompt: "Ask which of the two is faster.",
    stem: "バスと でんしゃと、＿＿が はやいですか。",
    choices: ["いくら", "どちら", "いつ"],
    answer: "どちら",
    feedback:
      "どちら asks the listener to choose between the bus and the train.",
  },
  {
    id: "comparison-ichiban",
    title: "Choose the most with いちばん",
    explanation:
      "いちばん before an adjective can mean most, as in いちばん はやい (the fastest). Name a group with [noun] の なかで to say what you’re comparing.",
    japanese: "くだものの なかで、りんごが いちばん すきです。",
    english: "Out of all fruits, I like apples best.",
    prompt: "Say that the train is the fastest among the choices.",
    stem: "この なかで、でんしゃが ＿＿ はやいです。",
    choices: ["どの", "より", "いちばん"],
    answer: "いちばん",
    feedback:
      "いちばん はやい means the fastest in the group you’re talking about.",
  },
] as const;
