import type { ChoiceLesson, CourseGroup } from "./ChoiceCourse";

type DialogueGroup = Omit<CourseGroup, "lessons"> & {
  lessons: readonly (ChoiceLesson & { answerEnglish: string })[];
};

export const conversation = [
  {
    id: "introduction",
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
        answerEnglish: "Nice to meet you.",
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
        answerEnglish: "I’m Mika.",
        feedback:
          "わたしは sets the topic to yourself. ミカです gives your name politely.",
      },
    ],
  },
  {
    id: "cafe",
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
        answerEnglish: "Tea, please.",
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
        answerEnglish: "Thank you very much.",
        feedback: "ありがとうございます is a polite way to thank someone.",
      },
    ],
  },
  {
    id: "station",
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
        answerEnglish: "Where is the station?",
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
        answerEnglish: "Does this train go to Kyoto?",
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
        answerEnglish: "One ticket, please.",
        feedback:
          "きっぷ means ticket. いちまい specifies one, and おねがいします makes a polite request.",
      },
    ],
  },
  {
    id: "shop",
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
        answerEnglish: "How much is this notebook?",
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
        answerEnglish: "I’ll take this, please.",
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
        answerEnglish: "May I pay by card?",
        feedback:
          "で marks the payment method. はらっても いいですか asks permission to pay.",
      },
    ],
  },
  {
    id: "help",
    title: "Asking for help in a conversation",
    lessons: [
      {
        id: "help-repeat",
        title: "Ask someone to repeat a phrase",
        explanation:
          "You didn’t catch what someone said and want to hear it again.",
        japanese: "もういちど",
        english: "one more time",
        prompt: "Which response asks them to say it again?",
        stem: "",
        choices: [
          "もういちど おねがいします。",
          "いちまい おねがいします。",
          "もう だいじょうぶです。",
        ],
        answer: "もういちど おねがいします。",
        answerEnglish: "One more time, please.",
        feedback:
          "もういちど おねがいします is a polite request to repeat something.",
      },
      {
        id: "help-slowly",
        title: "Ask someone to speak more slowly",
        explanation: "You want the other person to slow down a little.",
        japanese: "ゆっくり",
        english: "slowly",
        prompt: "Which request means “Please speak a little more slowly”?",
        stem: "",
        choices: [
          "もうすこし まって ください。",
          "もうすこし ゆっくり はなして ください。",
          "もうすこし ゆっくり あるいて ください。",
        ],
        answer: "もうすこし ゆっくり はなして ください。",
        answerEnglish: "Please speak a little more slowly.",
        feedback:
          "もうすこし means a little more. はなして ください means please speak.",
      },
      {
        id: "help-understand",
        title: "Say you don’t quite understand",
        explanation: "You’d like to tell the speaker you’re still unsure.",
        japanese: "すみません。",
        english: "Excuse me.",
        prompt: "Which response means “Sorry, I don’t quite understand”?",
        stem: "",
        choices: [
          "すみません、もう わかりました。",
          "すみません、いそいでいます。",
          "すみません、よく わかりません。",
        ],
        answer: "すみません、よく わかりません。",
        answerEnglish: "Sorry, I don’t quite understand.",
        feedback:
          "よく わかりません says you don’t understand clearly or fully.",
      },
    ],
  },
] as const satisfies readonly DialogueGroup[];
