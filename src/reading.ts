import type { ChoiceLesson } from "./ChoiceCourse";

export const reading: readonly {
  title: string;
  passage: { japanese: string; standardJapanese: string; english: string };
  lessons: readonly ChoiceLesson[];
}[] = [
  {
    title: "What’s on the desk?",
    passage: {
      japanese:
        "A: これは ほんですか。\nB: はい、ほんです。\nA: これは かさですか。\nB: いいえ、かぎです。",
      standardJapanese:
        "A: これは本ですか。\nB: はい、本です。\nA: これは傘ですか。\nB: いいえ、鍵です。",
      english:
        "A: Is this a book?\nB: Yes, it’s a book.\nA: Is this an umbrella?\nB: No, it’s a key.",
    },
    lessons: [
      {
        id: "desk-first",
        title: "The first object",
        explanation: "",
        japanese: "",
        english: "",
        prompt: "What does B say the first object is?",
        stem: "",
        choices: ["A key", "A book", "An umbrella"],
        answer: "A book",
        feedback: "B answers はい、ほんです. ほん means book.",
      },
      {
        id: "desk-second",
        title: "The second object",
        explanation: "",
        japanese: "",
        english: "",
        prompt: "What does B say the second object is?",
        stem: "",
        choices: ["An umbrella", "A camera", "A key"],
        answer: "A key",
        feedback: "B says いいえ、かぎです: “No, it’s a key.”",
      },
    ],
  },
  {
    title: "At the café",
    passage: {
      japanese:
        "ここは きっさてんです。\nわたしは おちゃを のみます。\nともだちは パンを たべます。",
      standardJapanese:
        "ここは喫茶店です。\n私はお茶を飲みます。\n友だちはパンを食べます。",
      english: "This is a café.\nI drink tea.\nMy friend eats bread.",
    },
    lessons: [
      {
        id: "cafe-drink",
        title: "Something to drink",
        explanation: "",
        japanese: "",
        english: "",
        prompt: "What does the narrator drink?",
        stem: "",
        choices: ["Tea", "Water", "Coffee"],
        answer: "Tea",
        feedback: "おちゃ means tea. のみます means drink.",
      },
      {
        id: "cafe-food",
        title: "Something to eat",
        explanation: "",
        japanese: "",
        english: "",
        prompt: "What does the friend eat?",
        stem: "",
        choices: ["Rice", "Bread", "A sandwich"],
        answer: "Bread",
        feedback: "パン means bread. たべます means eat.",
      },
    ],
  },
  {
    title: "Around the station",
    passage: {
      japanese:
        "えきの まえに コンビニが あります。\nえきの ひだりに こうえんが あります。\nコンビニの となりに バスていが あります。",
      standardJapanese:
        "駅の前にコンビニがあります。\n駅の左に公園があります。\nコンビニの隣にバス停があります。",
      english:
        "There’s a convenience store in front of the station.\nThere’s a park to the left of the station.\nThere’s a bus stop next to the convenience store.",
    },
    lessons: [
      {
        id: "station-park",
        title: "Find the park",
        explanation: "",
        japanese: "",
        english: "",
        stem: "",
        prompt: "Where is the park?",
        choices: [
          "In front of the station",
          "To the left of the station",
          "To the right of the station",
        ],
        answer: "To the left of the station",
        feedback:
          "えきの ひだり means to the left of the station. こうえん means park.",
      },
      {
        id: "station-store",
        title: "Find the convenience store",
        explanation: "",
        japanese: "",
        english: "",
        stem: "",
        prompt: "What’s in front of the station?",
        choices: ["A convenience store", "A café", "A bus stop"],
        answer: "A convenience store",
        feedback:
          "えきの まえに コンビニが あります means there’s a convenience store in front of the station.",
      },
      {
        id: "station-bus-stop",
        title: "Find the bus stop",
        explanation: "",
        japanese: "",
        english: "",
        stem: "",
        prompt: "What is the bus stop next to?",
        choices: ["A park", "A ticket office", "A convenience store"],
        answer: "A convenience store",
        feedback:
          "バスてい means bus stop. コンビニの となり means next to the convenience store.",
      },
    ],
  },
  {
    title: "A morning routine",
    passage: {
      japanese:
        "まいあさ、しちじに おきます。\nパンを たべて、それから おちゃを のみます。\nはちじに がっこうに いきます。",
      standardJapanese:
        "毎朝、七時に起きます。\nパンを食べて、それからお茶を飲みます。\n八時に学校に行きます。",
      english:
        "Every morning, I get up at seven.\nI eat bread and then drink tea.\nI go to school at eight.",
    },
    lessons: [
      {
        id: "routine-wake-time",
        title: "Getting up",
        explanation: "",
        japanese: "",
        english: "",
        prompt: "When does the narrator get up?",
        stem: "",
        choices: ["At six", "At seven", "At eight"],
        answer: "At seven",
        feedback: "しちじに おきます means I get up at seven.",
      },
      {
        id: "routine-after-bread",
        title: "After eating",
        explanation: "",
        japanese: "",
        english: "",
        prompt: "What does the narrator do right after eating bread?",
        stem: "",
        choices: ["Drinks water", "Goes to school", "Drinks tea"],
        answer: "Drinks tea",
        feedback: "それから means then. おちゃを のみます means I drink tea.",
      },
      {
        id: "routine-go-time",
        title: "At eight o’clock",
        explanation: "",
        japanese: "",
        english: "",
        prompt: "What does the narrator do at eight?",
        stem: "",
        choices: ["Goes to school", "Gets up", "Eats bread"],
        answer: "Goes to school",
        feedback: "はちじに がっこうに いきます means I go to school at eight.",
      },
    ],
  },
  {
    title: "A message from a friend",
    passage: {
      japanese:
        "きのう、ほんやに いった。\nでも、ほんは かわなかった。\nあした、ともだちと もういちど いく。",
      standardJapanese:
        "昨日、本屋に行った。\nでも、本は買わなかった。\n明日、友だちともう一度行く。",
      english:
        "Yesterday I went to a bookstore.\nBut I didn’t buy a book.\nTomorrow I’ll go back with a friend.",
    },
    lessons: [
      {
        id: "message-yesterday",
        title: "Yesterday’s trip",
        explanation: "",
        japanese: "",
        english: "",
        prompt: "Where did the writer go yesterday?",
        stem: "",
        choices: ["To a library", "To a bookstore", "To the station"],
        answer: "To a bookstore",
        feedback: "ほんや means bookstore. いった is the plain past of いく.",
      },
      {
        id: "message-no-purchase",
        title: "At the bookstore",
        explanation: "",
        japanese: "",
        english: "",
        prompt: "Did the writer buy a book yesterday?",
        stem: "",
        choices: ["Yes", "No", "The message doesn’t say"],
        answer: "No",
        feedback: "かわなかった is the plain past negative of かう (to buy).",
      },
      {
        id: "message-tomorrow",
        title: "Tomorrow’s plans",
        explanation: "",
        japanese: "",
        english: "",
        prompt: "Who will go with the writer tomorrow?",
        stem: "",
        choices: ["A teacher", "A sibling", "A friend"],
        answer: "A friend",
        feedback: "ともだちと means with a friend. もういちど means once more.",
      },
    ],
  },
];
