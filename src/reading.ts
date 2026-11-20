import type { ChoiceLesson } from "./ChoiceCourse";

export const reading: readonly {
  title: string;
  passage: { japanese: string; english: string };
  lessons: readonly ChoiceLesson[];
}[] = [
  {
    title: "What’s on the desk?",
    passage: {
      japanese:
        "A: これは ほんですか。\nB: はい、ほんです。\nA: これは かさですか。\nB: いいえ、かぎです。",
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
];
