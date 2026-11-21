export const actionPatterns = [
  {
    id: "action-in-progress",
    title: "Say what’s happening now with ています",
    explanation:
      "Add います to the て-form to describe an action in progress. This works with forms ending in て or で.",
    japanese: "いま、ほんを よんでいます。",
    english: "I’m reading a book right now.",
    prompt: "Say “I’m drinking water right now.”",
    stem: "いま、みずを ＿＿。",
    choices: ["のんでいます", "のみました", "のみません"],
    answer: "のんでいます",
    feedback:
      "のむ (to drink) becomes のんで. Add います for an action in progress.",
  },
  {
    id: "action-permission",
    title: "Ask permission with てもいいですか",
    explanation:
      "Add も いいですか to the て-form to ask whether an action is okay. This is a polite way to say “May I …?”",
    japanese: "ここに すわっても いいですか。",
    english: "May I sit here?",
    prompt: "Ask “May I take a photo?”",
    stem: "しゃしんを とっても ＿＿。",
    choices: ["いません", "ください", "いいですか"],
    answer: "いいですか",
    feedback:
      "とっても いいですか asks if it’s okay for you to take the photo.",
  },
  {
    id: "action-prohibition",
    title: "Say what’s prohibited with てはいけません",
    explanation:
      "Add は いけません to the て-form to say that something is prohibited. This は is pronounced wa.",
    japanese: "ここで しゃしんを とっては いけません。",
    english: "You mustn’t take photos here.",
    prompt: "Say “You mustn’t eat here.”",
    stem: "ここで たべては ＿＿。",
    choices: ["いけません", "いいですか", "います"],
    answer: "いけません",
    feedback: "たべては いけません means that eating is prohibited.",
  },
  {
    id: "action-desire",
    title: "Say what you want to do with たいです",
    explanation:
      "Remove ます from the polite verb and add たいです to say what you want to do. いきます (to go) becomes いきたいです.",
    japanese: "にほんに いきたいです。",
    english: "I want to go to Japan.",
    prompt: "Say “I want to see the sea” using みます (to see).",
    stem: "うみを ＿＿。",
    choices: ["みました", "みたいです", "みてください"],
    answer: "みたいです",
    feedback: "Replace ます in みます with たいです to say “I want to see.”",
  },
] as const;
