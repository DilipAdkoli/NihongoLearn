import type { ChoiceLesson, CourseGroup } from "./ChoiceCourse";

function questions(
  ...lessons: {
    id: string;
    title: string;
    prompt: string;
    choices: readonly string[];
    answer: string;
    feedback: string;
  }[]
): ChoiceLesson[] {
  return lessons.map((lesson) => ({
    ...lesson,
    explanation: "",
    japanese: "",
    english: "",
    stem: "",
  }));
}

export const passageListening: readonly CourseGroup[] = [
  {
    title: "Yesterday",
    passage: {
      japanese:
        "きのう、いえで ほんを よみました。\nそれから、おちゃを のみました。",
      standardJapanese:
        "昨日、家で本を読みました。\nそれから、お茶を飲みました。",
      english: "Yesterday, I read a book at home.\nAfter that, I drank tea.",
      lookupWords: ["本", "お茶"],
      audio: [
        require("../assets/audio/passage-yesterday-normal.mp3"),
        require("../assets/audio/passage-yesterday-slow.mp3"),
      ],
    },
    lessons: questions(
      {
        id: "yesterday-place",
        title: "Where",
        prompt: "Where did the speaker read?",
        choices: ["At school", "At home", "At the station"],
        answer: "At home",
        feedback:
          "いえで means at home. で marks the place where the action happened.",
      },
      {
        id: "yesterday-next",
        title: "What happened next",
        prompt: "What did the speaker do after reading?",
        choices: ["Ate bread", "Went to school", "Drank tea"],
        answer: "Drank tea",
        feedback:
          "おちゃを のみました means drank tea. それから means after that.",
      },
    ),
  },
  {
    title: "Tomorrow’s plans",
    passage: {
      japanese: "あした、えきに いきます。\nえきで ともだちに あいます。",
      standardJapanese: "明日、駅に行きます。\n駅で友だちに会います。",
      english: "Tomorrow, I’ll go to the station.\nI’ll meet a friend there.",
      lookupWords: ["駅", "友だち", "行く"],
      audio: [
        require("../assets/audio/passage-tomorrow-normal.mp3"),
        require("../assets/audio/passage-tomorrow-slow.mp3"),
      ],
    },
    lessons: questions(
      {
        id: "tomorrow-place",
        title: "Destination",
        prompt: "Where will the speaker go?",
        choices: ["A café", "The station", "A friend’s home"],
        answer: "The station",
        feedback: "えきに いきます means go to the station.",
      },
      {
        id: "tomorrow-who",
        title: "Who",
        prompt: "Who will the speaker meet?",
        choices: ["A friend", "A teacher", "A sibling"],
        answer: "A friend",
        feedback: "ともだちに あいます means meet a friend.",
      },
    ),
  },
  {
    id: "train-announcement",
    title: "Train announcement",
    passage: {
      japanese: "つぎは、きょうとです。\nおでぐちは、みぎがわです。",
      standardJapanese: "次は、京都です。\nお出口は、右側です。",
      english: "The next stop is Kyoto.\nThe doors will open on the right.",
      lookupWords: ["次", "出口", "右"],
      audio: [
        require("../assets/audio/passage-kyoto-normal.mp3"),
        require("../assets/audio/passage-kyoto-slow.mp3"),
      ],
    },
    lessons: questions(
      {
        id: "train-next-stop",
        title: "Next stop",
        prompt: "Which station is next?",
        choices: ["Tokyo", "Kyoto", "Osaka"],
        answer: "Kyoto",
        feedback: "つぎ means next. きょうと is Kyoto.",
      },
      {
        id: "train-exit-side",
        title: "Exit side",
        prompt: "Which side will the doors open on?",
        choices: ["Right", "Left", "Both sides"],
        answer: "Right",
        feedback: "みぎがわ means the right side. おでぐち refers to the exit.",
      },
    ),
  },
  {
    title: "An evening routine",
    passage: {
      japanese:
        "まいばん、しちじに うちに かえります。\nはちじに ばんごはんを たべます。\nそれから、にほんごを べんきょうします。\nじゅういちじに ねます。",
      standardJapanese:
        "毎晩、七時にうちに帰ります。\n八時に晩ごはんを食べます。\nそれから、日本語を勉強します。\n十一時に寝ます。",
      english:
        "Every evening, I get home at seven.\nI eat dinner at eight.\nThen I study Japanese.\nI go to bed at eleven.",
      lookupWords: ["帰る", "食べる", "寝る"],
      audio: [
        require("../assets/audio/passage-evening-normal.mp3"),
        require("../assets/audio/passage-evening-slow.mp3"),
      ],
    },
    lessons: questions(
      {
        id: "evening-dinner",
        title: "Dinner time",
        prompt: "When does the speaker have dinner?",
        choices: ["At eight", "At seven", "At eleven"],
        answer: "At eight",
        feedback: "ばんごはん means dinner. はちじ is eight o’clock.",
      },
      {
        id: "evening-study",
        title: "After dinner",
        prompt: "What does the speaker do after dinner?",
        choices: ["Goes home", "Studies Japanese", "Goes to work"],
        answer: "Studies Japanese",
        feedback: "にほんごを べんきょうします means I study Japanese.",
      },
      {
        id: "evening-bedtime",
        title: "Bedtime",
        prompt: "When does the speaker go to bed?",
        choices: ["At eight", "At ten", "At eleven"],
        answer: "At eleven",
        feedback: "じゅういちじに ねます means I go to bed at eleven.",
      },
    ),
  },
  {
    id: "forecast",
    title: "A short weather forecast",
    passage: {
      japanese:
        "きょうは くもりです。\nあしたは あめです。\nあさっては はれです。",
      standardJapanese: "今日は曇りです。\n明日は雨です。\n明後日は晴れです。",
      english:
        "It’s cloudy today.\nIt will rain tomorrow.\nIt will be sunny the day after tomorrow.",
      lookupWords: ["曇り", "雨", "晴れ", "明後日"],
      audio: [
        require("../assets/audio/passage-forecast-normal.mp3"),
        require("../assets/audio/passage-forecast-slow.mp3"),
      ],
    },
    lessons: questions(
      {
        id: "forecast-today",
        title: "Today’s weather",
        prompt: "What’s the weather like today?",
        choices: ["Rainy", "Cloudy", "Sunny"],
        answer: "Cloudy",
        feedback: "きょう means today, and くもり describes cloudy weather.",
      },
      {
        id: "forecast-tomorrow",
        title: "Tomorrow’s weather",
        prompt: "What kind of weather is forecast for tomorrow?",
        choices: ["Sunny", "Snowy", "Rainy"],
        answer: "Rainy",
        feedback: "あした means tomorrow, and あめ means rain.",
      },
      {
        id: "forecast-sun",
        title: "The sunny day",
        prompt: "When will it be sunny?",
        choices: ["The day after tomorrow", "Tomorrow", "Today"],
        answer: "The day after tomorrow",
        feedback:
          "あさって is the day after tomorrow. はれ means sunny weather.",
      },
    ),
  },
  {
    id: "pharmacy-directions",
    title: "Listen to directions to a pharmacy",
    passage: {
      japanese:
        "A: やっきょくは どこですか。\nB: この みちを まっすぐ いって、ひとつめの かどを ひだりに まがって ください。\nA: あるいて なんぷん かかりますか。\nB: さんぷん ぐらいです。やっきょくは びょういんの となりです。",
      standardJapanese:
        "A: 薬局はどこですか。\nB: この道をまっすぐ行って、一つ目の角を左に曲がってください。\nA: 歩いて何分かかりますか。\nB: 三分ぐらいです。薬局は病院の隣です。",
      english:
        "A: Where’s the pharmacy?\nB: Go straight along this road and turn left at the first corner.\nA: How many minutes does it take on foot?\nB: About three minutes. The pharmacy is next to the hospital.",
      lookupWords: ["薬局", "病院", "角", "曲がる"],
      audio: [
        require("../assets/audio/passage-pharmacy-directions-normal.mp3"),
        require("../assets/audio/passage-pharmacy-directions-slow.mp3"),
      ],
    },
    lessons: questions(
      {
        id: "pharmacy-turn",
        title: "The visitor’s turn",
        prompt: "Where should the visitor turn?",
        choices: [
          "Left at the second corner",
          "Right at the first corner",
          "Left at the first corner",
        ],
        answer: "Left at the first corner",
        feedback:
          "ひとつめの かど is the first corner. ひだりに means to the left.",
      },
      {
        id: "pharmacy-walk",
        title: "On foot",
        prompt: "How long is the walk?",
        choices: [
          "About three minutes",
          "About five minutes",
          "About eight minutes",
        ],
        answer: "About three minutes",
        feedback: "さんぷん ぐらい means about three minutes.",
      },
      {
        id: "pharmacy-landmark",
        title: "Find the pharmacy",
        prompt: "What is the pharmacy next to?",
        choices: ["A school", "A hospital", "A bank"],
        answer: "A hospital",
        feedback: "びょういん means hospital, and の となり means next to.",
      },
    ),
  },
  {
    id: "appointment-change",
    title: "Change an appointment",
    passage: {
      japanese:
        "A: はいしゃの よやくは ろくがつ よっかの ごぜん くじです。\nB: すみません、その ひは しごとが あります。\nA: ろくがつ とおかの ごご さんじは どうですか。\nB: はい、ろくがつ とおかの ごご さんじで おねがいします。",
      standardJapanese:
        "A: 歯医者の予約は六月四日の午前九時です。\nB: すみません、その日は仕事があります。\nA: 六月十日の午後三時はどうですか。\nB: はい、六月十日の午後三時でお願いします。",
      english:
        "A: Your dentist appointment is on June 4 at 9 a.m.\nB: I’m sorry, I have work that day.\nA: How about June 10 at 3 p.m.?\nB: Yes, June 10 at 3 p.m., please.",
      lookupWords: ["歯医者", "予約", "午前", "午後"],
      audio: [
        require("../assets/audio/passage-appointment-change-normal.mp3"),
        require("../assets/audio/passage-appointment-change-slow.mp3"),
      ],
    },
    lessons: questions(
      {
        id: "appointment-original",
        title: "The original appointment",
        prompt: "When was the appointment originally scheduled?",
        choices: ["June 4 at 9 a.m.", "June 4 at 9 p.m.", "June 10 at 9 a.m."],
        answer: "June 4 at 9 a.m.",
        feedback: "ろくがつ よっか is June 4. ごぜん くじ means 9 a.m.",
      },
      {
        id: "appointment-reason",
        title: "The reason for changing",
        prompt: "Why does the patient need to change the appointment?",
        choices: [
          "They have class",
          "They have work",
          "They will be out of town",
        ],
        answer: "They have work",
        feedback: "その ひ is that day. しごとが あります means I have work.",
      },
      {
        id: "appointment-new",
        title: "The new appointment",
        prompt: "Which date and time do they agree on?",
        choices: ["June 10 at 3 a.m.", "June 4 at 3 p.m.", "June 10 at 3 p.m."],
        answer: "June 10 at 3 p.m.",
        feedback:
          "ろくがつ とおか is June 10. ごご さんじ means 3 p.m., and おねがいします accepts the suggested time here.",
      },
    ),
  },
];
