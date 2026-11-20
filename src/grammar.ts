export const grammar = [
  {
    id: "desu",
    title: "Polite statements with です",
    explanation:
      "Put です after a noun to make a polite statement. In これは ほんです, ほん (book) tells us what this is.",
    japanese: "これは ほんです。",
    english: "This is a book.",
    prompt: "Complete the polite statement that means “This is a book.”",
    stem: "これは ほん＿＿。",
    choices: ["か", "です", "を"],
    answer: "です",
    feedback: "ほんです makes a polite statement that something is a book.",
  },
  {
    id: "topic-wa",
    title: "Set the topic with は",
    explanation:
      "The topic marker は tells the listener what you’re talking about. When it’s a particle, は is pronounced wa.",
    japanese: "わたしは がくせいです。",
    english: "I’m a student.",
    prompt: "Choose the particle that marks わたし (I) as the topic.",
    stem: "わたし＿＿ がくせいです。",
    choices: ["は", "です", "か"],
    answer: "は",
    feedback: "は marks わたし as the topic. Read this は as wa.",
  },
  {
    id: "question-ka",
    title: "Ask a question with か",
    explanation:
      "Add か to the end of a polite statement to turn it into a question. You can recognize the question from か even when there’s no question mark.",
    japanese: "これは ほんですか。",
    english: "Is this a book?",
    prompt: "Turn “This is a book” into “Is this a book?”",
    stem: "これは ほんです＿＿。",
    choices: ["を", "は", "か"],
    answer: "か",
    feedback: "Sentence-final か turns the polite statement into a question.",
  },
] as const;

export const grammarKey = (id: string) => `grammar:${id}`;
