import type { CourseGroup } from "./ChoiceCourse";

export const conversation: readonly CourseGroup[] = [
  {
    title: "Meeting someone",
    lessons: [
      {
        id: "greeting",
        title: "Say hello",
        explanation: "You are meeting someone for the first time.",
        japanese: "はじめまして。",
        english: "Nice to meet you.",
        prompt: "Which response fits a first meeting?",
        stem: "",
        choices: ["いただきます。", "はじめまして。", "おやすみなさい。"],
        answer: "はじめまして。",
        feedback: "はじめまして is a standard greeting at a first meeting.",
      },
      {
        id: "introduce-yourself",
        title: "Introduce yourself",
        explanation: "Your name is Mika. You want to say your name politely.",
        japanese: "おなまえは なんですか。",
        english: "What’s your name?",
        prompt: "How would you say “I’m Mika”?",
        stem: "",
        choices: [
          "わたしは ミカです。",
          "ミカですか。",
          "ミカでは ありません。",
        ],
        answer: "わたしは ミカです。",
        feedback:
          "わたしは sets the topic to yourself. ミカです gives your name politely.",
      },
    ],
  },
  {
    title: "At a café",
    lessons: [
      {
        id: "order-tea",
        title: "Order tea",
        explanation: "The server asks what you would like. You want tea.",
        japanese: "なにに しますか。",
        english: "What would you like?",
        prompt: "Which response asks for tea?",
        stem: "",
        choices: [
          "みずを おねがいします。",
          "おちゃを おねがいします。",
          "おちゃですか。",
        ],
        answer: "おちゃを おねがいします。",
        feedback:
          "おちゃ means tea. を おねがいします is a polite way to ask for an item.",
      },
      {
        id: "thank-server",
        title: "Thank the server",
        explanation: "The server hands you the tea.",
        japanese: "どうぞ。",
        english: "Here you are.",
        prompt: "How do you thank the server politely?",
        stem: "",
        choices: [
          "ありがとうございます。",
          "おはようございます。",
          "はじめまして。",
        ],
        answer: "ありがとうございます。",
        feedback: "ありがとうございます is a polite way to thank someone.",
      },
    ],
  },
];
