export const existence = [
  {
    id: "existence-arimasu",
    title: "Use あります for things",
    explanation:
      "Use あります to say that an object, building, or plant is present. The thing that is present often takes が.",
    japanese: "つくえの うえに ペンが あります。",
    english: "There’s a pen on the desk.",
    prompt: "Complete “There’s a book here.”",
    stem: "ここに ほんが ＿＿。",
    choices: ["いきます", "います", "あります"],
    answer: "あります",
    feedback: "A book is an object, so use あります.",
  },
  {
    id: "existence-imasu",
    title: "Use います for people and animals",
    explanation:
      "Use います to say that a person or animal is present. Use the same location pattern with に.",
    japanese: "こうえんに いぬが います。",
    english: "There’s a dog in the park.",
    prompt: "Complete “There’s a cat under the chair.”",
    stem: "いすの したに ねこが ＿＿。",
    choices: ["あります", "います", "たべます"],
    answer: "います",
    feedback: "A cat is an animal, so use います.",
  },
  {
    id: "existence-location-ni",
    title: "Mark where something is with に",
    explanation:
      "Use に for the location where something exists. Use で when saying where someone does an action.",
    japanese: "えきの となりに コンビニが あります。",
    english: "There’s a convenience store next to the station.",
    prompt: "Mark the place where the convenience store is located.",
    stem: "えきの となり＿＿ コンビニが あります。",
    choices: ["に", "で", "を"],
    answer: "に",
    feedback: "Use に for the place where the store is located.",
  },
  {
    id: "existence-subject-ga",
    title: "Introduce what is present with が",
    explanation:
      "In a sentence like “There’s a book on the desk,” が introduces the thing that is present. The location takes に.",
    japanese: "へやに いすが あります。",
    english: "There’s a chair in the room.",
    prompt: "Complete “There’s a dog in the park” by marking what is present.",
    stem: "こうえんに いぬ＿＿ います。",
    choices: ["を", "に", "が"],
    answer: "が",
    feedback: "いぬが introduces the dog as the animal that is present.",
  },
  {
    id: "existence-position-no",
    title: "Describe relative position with の",
    explanation:
      "Say the reference place or object, then の, then a position word. Common position words include うえ (above or on), した (below or under), and となり (next to).",
    japanese: "かぎは ほんの したに あります。",
    english: "The key is under the book.",
    prompt: "Complete “The key is on the desk.”",
    stem: "かぎは つくえ＿＿ うえに あります。",
    choices: ["が", "の", "で"],
    answer: "の",
    feedback:
      "つくえの うえ means the top of the desk, and つくえの うえに means on the desk.",
  },
] as const;
