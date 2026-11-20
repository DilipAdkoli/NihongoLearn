import type { CourseGroup } from "./ChoiceCourse";

export const conversation = [
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
  {
    title: "At the station",
    lessons: [
      {
        id: "find-station",
        title: "Ask where the station is",
        explanation:
          "You are on the street and need directions to the station.",
        japanese: "すみません。",
        english: "Excuse me.",
        prompt: "Which question asks where the station is?",
        stem: "",
        choices: [
          "えきは なんじですか。",
          "えきは どこですか。",
          "えきは いくらですか。",
        ],
        answer: "えきは どこですか。",
        feedback:
          "どこ means where. えきは どこですか asks where the station is.",
      },
      {
        id: "ask-train-destination",
        title: "Check the destination",
        explanation:
          "You are on the platform and want to know if this train goes to Kyoto.",
        japanese: "この でんしゃ",
        english: "this train",
        prompt: "Which question checks the destination?",
        stem: "",
        choices: [
          "この でんしゃは きょうとに いきますか。",
          "きょうとから きましたか。",
          "この でんしゃは なんじですか。",
        ],
        answer: "この でんしゃは きょうとに いきますか。",
        feedback:
          "きょうとに marks Kyoto as the destination. いきますか asks whether the train goes there.",
      },
      {
        id: "buy-one-ticket",
        title: "Ask for one ticket",
        explanation:
          "Use the counter 枚 (まい) for flat items such as paper tickets. 一枚 is read いちまい.",
        japanese: "いらっしゃいませ。",
        english: "Welcome.",
        prompt: "Which response asks for one ticket?",
        stem: "",
        choices: [
          "きっぷを にまい おねがいします。",
          "きっぷを いちまい おねがいします。",
          "きっぷは どこですか。",
        ],
        answer: "きっぷを いちまい おねがいします。",
        feedback:
          "きっぷ means ticket. いちまい specifies one, and おねがいします makes a polite request.",
      },
    ],
  },
  {
    title: "At a shop",
    lessons: [
      {
        id: "shop-ask-price",
        title: "Ask how much it costs",
        explanation: "You’re holding a notebook and want to ask its price.",
        japanese: "この ノート",
        english: "this notebook",
        prompt: "Which question means “How much is this notebook?”",
        stem: "",
        choices: [
          "この ノートは どこですか。",
          "この ノートは いくらですか。",
          "これは だれの ノートですか。",
        ],
        answer: "この ノートは いくらですか。",
        feedback: "いくら asks how much the notebook costs.",
      },
      {
        id: "shop-take-item",
        title: "Say you’ll take it",
        explanation: "The clerk tells you the price. You’ve decided to buy it.",
        japanese: "はっぴゃくえんです。",
        english: "That’s 800 yen.",
        prompt: "Which response means “I’ll take this, please”?",
        stem: "",
        choices: [
          "これを ください。",
          "これを みて ください。",
          "これは なんですか。",
        ],
        answer: "これを ください。",
        feedback: "Use [item] を ください to ask for an item politely.",
      },
      {
        id: "shop-card-payment",
        title: "Ask to pay by card",
        explanation:
          "You’re at the register and would like to pay with a card.",
        japanese: "カードで",
        english: "by card",
        prompt: "Which question asks “May I pay by card?”",
        stem: "",
        choices: [
          "カードは どこですか。",
          "カードで はらいません。",
          "カードで はらっても いいですか。",
        ],
        answer: "カードで はらっても いいですか。",
        feedback:
          "で marks the payment method. はらっても いいですか asks permission to pay.",
      },
    ],
  },
] as const satisfies readonly CourseGroup[];
