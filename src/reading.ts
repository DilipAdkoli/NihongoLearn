import type { ChoiceLesson } from "./ChoiceCourse";

export const reading: readonly {
  id?: string;
  title: string;
  passage: {
    japanese: string;
    standardJapanese: string;
    english: string;
    lookupWords: readonly string[];
  };
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
      lookupWords: ["本", "傘", "鍵"],
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
      lookupWords: ["お茶", "パン", "友だち"],
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
    id: "station-area",
    title: "Around the station",
    passage: {
      japanese:
        "えきの まえに コンビニが あります。\nえきの ひだりに こうえんが あります。\nコンビニの となりに バスていが あります。",
      standardJapanese:
        "駅の前にコンビニがあります。\n駅の左に公園があります。\nコンビニの隣にバス停があります。",
      english:
        "There’s a convenience store in front of the station.\nThere’s a park to the left of the station.\nThere’s a bus stop next to the convenience store.",
      lookupWords: ["駅", "前", "公園"],
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
      lookupWords: ["起きる", "食べる", "行く"],
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
      lookupWords: ["本屋", "本", "友だち"],
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
  {
    title: "Bookstore opening hours",
    passage: {
      japanese:
        "ほんやの えいぎょうじかん\nげつようびから きんようびまで\nごぜん くじから ごご ろくじまで\nどようび\nごぜん じゅうじから ごご よじまで\nにちようびは やすみです。",
      standardJapanese:
        "本屋の営業時間\n月曜日から金曜日まで\n午前9時から午後6時まで\n土曜日\n午前10時から午後4時まで\n日曜日は休みです。",
      english:
        "Bookstore opening hours\nMonday through Friday\n9 a.m. to 6 p.m.\nSaturday\n10 a.m. to 4 p.m.\nClosed on Sunday.",
      lookupWords: ["営業時間", "金曜日", "休み"],
    },
    lessons: [
      {
        id: "hours-weekday-close",
        title: "Friday closing time",
        explanation: "",
        japanese: "",
        english: "",
        prompt: "What time does the bookstore close on Friday?",
        stem: "",
        choices: ["4 p.m.", "6 p.m.", "9 a.m."],
        answer: "6 p.m.",
        feedback:
          "Friday falls in the Monday-to-Friday range. ごご ろくじまで means until 6 p.m.",
      },
      {
        id: "hours-saturday-open",
        title: "Saturday opening time",
        explanation: "",
        japanese: "",
        english: "",
        prompt: "What time does the bookstore open on Saturday?",
        stem: "",
        choices: ["9 a.m.", "4 p.m.", "10 a.m."],
        answer: "10 a.m.",
        feedback:
          "どようび is Saturday. ごぜん じゅうじから means from 10 a.m.",
      },
      {
        id: "hours-closed-day",
        title: "Closed for the day",
        explanation: "",
        japanese: "",
        english: "",
        prompt: "Which day is the bookstore closed all day?",
        stem: "",
        choices: ["Sunday", "Monday", "Saturday"],
        answer: "Sunday",
        feedback:
          "にちようびは やすみです means the bookstore is closed on Sunday.",
      },
    ],
  },
  {
    id: "post-office-directions",
    title: "How to get to the post office",
    passage: {
      japanese:
        "A: すみません。ゆうびんきょくは どこですか。\nB: この みちを まっすぐ いって、ふたつめの かどを みぎに まがって ください。\nA: あるいて なんぷん かかりますか。\nB: ごふん ぐらいです。ゆうびんきょくは ぎんこうの となりです。",
      standardJapanese:
        "A: すみません。郵便局はどこですか。\nB: この道をまっすぐ行って、二つ目の角を右に曲がってください。\nA: 歩いて何分かかりますか。\nB: 五分ぐらいです。郵便局は銀行の隣です。",
      english:
        "A: Excuse me. Where’s the post office?\nB: Go straight along this road and turn right at the second corner.\nA: How many minutes does it take on foot?\nB: About five minutes. The post office is next to the bank.",
      lookupWords: ["郵便局", "銀行", "まっすぐ", "角", "曲がる"],
    },
    lessons: [
      {
        id: "post-office-destination",
        title: "Where the visitor wants to go",
        explanation: "",
        japanese: "",
        english: "",
        prompt: "What place is the visitor looking for?",
        stem: "",
        choices: ["The library", "The post office", "The hospital"],
        answer: "The post office",
        feedback: "ゆうびんきょく means post office.",
      },
      {
        id: "post-office-turn",
        title: "Where to turn",
        explanation: "",
        japanese: "",
        english: "",
        prompt: "Where does the guide tell the visitor to turn?",
        stem: "",
        choices: [
          "Right at the first corner",
          "Left at the second corner",
          "Right at the second corner",
        ],
        answer: "Right at the second corner",
        feedback:
          "ふたつめの かど means the second corner, and みぎに まがって means turn right.",
      },
      {
        id: "post-office-walk",
        title: "How long it takes",
        explanation: "",
        japanese: "",
        english: "",
        prompt: "How long is the walk?",
        stem: "",
        choices: [
          "About five minutes",
          "About ten minutes",
          "About fifteen minutes",
        ],
        answer: "About five minutes",
        feedback: "ごふん means five minutes, and ぐらい means about.",
      },
      {
        id: "post-office-landmark",
        title: "The nearby landmark",
        explanation: "",
        japanese: "",
        english: "",
        prompt: "What is next to the post office?",
        stem: "",
        choices: ["A supermarket", "A school", "A bank"],
        answer: "A bank",
        feedback: "ぎんこうの となり means next to the bank.",
      },
    ],
  },
  {
    id: "room-options",
    title: "Compare two places to stay",
    passage: {
      japanese:
        "Aの へやは おおきいです。えきから あるいて じゅっぷんです。いっぱく いちまんにせんえんです。\nBの へやは ちいさいですが、しずかです。えきから あるいて ごふんです。いっぱく はっせんえんです。",
      standardJapanese:
        "Aの部屋は大きいです。駅から歩いて十分です。一泊一万二千円です。\nBの部屋は小さいですが、静かです。駅から歩いて五分です。一泊八千円です。",
      english:
        "Room A is large. It’s a ten-minute walk from the station and costs 12,000 yen per night.\nRoom B is small and quiet. It’s a five-minute walk from the station and costs 8,000 yen per night.",
      lookupWords: ["部屋", "大きい", "小さい", "静か", "一泊"],
    },
    lessons: [
      {
        id: "rooms-size",
        title: "Find the bigger room",
        explanation: "",
        japanese: "",
        english: "",
        prompt: "Which room is described as large?",
        stem: "",
        choices: ["Room A", "Room B", "Both rooms"],
        answer: "Room A",
        feedback: "Aの へやは おおきいです means Room A is big.",
      },
      {
        id: "rooms-walk",
        title: "A shorter walk",
        explanation: "",
        japanese: "",
        english: "",
        prompt: "Which room is closer on foot?",
        stem: "",
        choices: ["Room A", "Room B", "They are equally far"],
        answer: "Room B",
        feedback:
          "Room A is じゅっぷん (ten minutes) away. Room B is ごふん (five minutes) away.",
      },
      {
        id: "rooms-price",
        title: "The nightly price",
        explanation: "",
        japanese: "",
        english: "",
        prompt: "How much does Room B cost per night?",
        stem: "",
        choices: ["¥12,000", "¥5,000", "¥8,000"],
        answer: "¥8,000",
        feedback: "いっぱく is one night, and はっせんえん is 8,000 yen.",
      },
      {
        id: "rooms-quiet",
        title: "Find a quiet room",
        explanation: "",
        japanese: "",
        english: "",
        prompt: "Which room is described as quiet?",
        stem: "",
        choices: ["Room B", "Room A", "Both rooms"],
        answer: "Room B",
        feedback: "Room B is described as ちいさい (small) and しずか (quiet).",
      },
    ],
  },
];
