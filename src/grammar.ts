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

export const particles = [
  {
    id: "object-wo",
    title: "Mark the object with を",
    explanation:
      "Put を after the direct object of an action. In おちゃを のみます, tea is what someone drinks. This particle is usually pronounced o.",
    japanese: "おちゃを のみます。",
    english: "I drink tea.",
    prompt: "Mark ほん (book) as the thing being read.",
    stem: "ほん＿＿ よみます。",
    choices: ["を", "に", "で"],
    answer: "を",
    feedback: "ほん is the direct object of よみます (read), so it takes を.",
  },
  {
    id: "action-location-de",
    title: "Say where an action happens with で",
    explanation:
      "Attach で to a place where an action happens. It answers “Where do you do it?”",
    japanese: "いえで パンを たべます。",
    english: "I eat bread at home.",
    prompt: "Mark きっさてん (café) as the place where you drink tea.",
    stem: "きっさてん＿＿ おちゃを のみます。",
    choices: ["を", "で", "か"],
    answer: "で",
    feedback: "The café is the place where the drinking happens. It takes で.",
  },
  {
    id: "destination-ni",
    title: "Mark a destination with に",
    explanation:
      "With a motion verb such as いきます (go), に can mark where you are headed.",
    japanese: "がっこうに いきます。",
    english: "I go to school.",
    prompt: "Mark えき (station) as the destination.",
    stem: "えき＿＿ いきます。",
    choices: ["で", "を", "に"],
    answer: "に",
    feedback: "The station is the destination of いきます, so に fits here.",
  },
] as const;

export const verbs = [
  {
    id: "masu",
    title: "The polite non-past with ます",
    explanation:
      "The ます form is polite and can express a habit or a future action. A time word often tells you which meaning fits.",
    japanese: "まいにち ほんを よみます。",
    english: "I read books every day.",
    prompt: "Choose the polite form meaning “I’ll read tomorrow.”",
    stem: "あした ほんを＿＿。",
    choices: ["よみました", "よみません", "よみます"],
    answer: "よみます",
    feedback:
      "あした means tomorrow, so the non-past よみます has a future meaning here.",
  },
  {
    id: "masen",
    title: "Polite negatives with ません",
    explanation:
      "Replace ます with ません to make a polite non-past negative. よみます becomes よみません.",
    japanese: "きょうは ほんを よみません。",
    english: "I won’t read a book today.",
    prompt: "Choose “I won’t drink coffee.”",
    stem: "コーヒーを＿＿。",
    choices: ["のみません", "のみました", "のみます"],
    answer: "のみません",
    feedback: "のみません is the polite non-past negative of のみます.",
  },
  {
    id: "mashita",
    title: "The polite past with ました",
    explanation:
      "Replace ます with ました to talk politely about an action that happened.",
    japanese: "きのう おちゃを のみました。",
    english: "I drank tea yesterday.",
    prompt: "Complete the statement meaning “I ate bread yesterday.”",
    stem: "きのう パンを＿＿。",
    choices: ["たべます", "たべました", "たべません"],
    answer: "たべました",
    feedback: "たべました is polite past. きのう means yesterday.",
  },
  {
    id: "masendeshita",
    title: "Polite past negatives with ませんでした",
    explanation:
      "Replace ます with ませんでした to say politely that something did not happen.",
    japanese: "きのう コーヒーを のみませんでした。",
    english: "I didn’t drink coffee yesterday.",
    prompt: "Choose the form meaning “I didn’t go to school yesterday.”",
    stem: "きのう がっこうに＿＿。",
    choices: ["いきます", "いきました", "いきませんでした"],
    answer: "いきませんでした",
    feedback: "いきませんでした gives both the negative and the past meaning.",
  },
] as const;

export const adjectives = [
  {
    id: "i-adjective-noun",
    title: "Describe a noun with an い-adjective",
    explanation:
      "An adjective such as おいしい (delicious) goes directly before the noun it describes.",
    japanese: "おいしい パンです。",
    english: "It’s delicious bread.",
    prompt: "Choose the form that fits directly before パン.",
    stem: "＿＿ パンです。",
    choices: ["おいしいな", "おいしい", "おいしいです"],
    answer: "おいしい",
    feedback: "おいしい is an い-adjective. Put it directly before パン.",
  },
  {
    id: "na-adjective-noun",
    title: "Connect a な-adjective to a noun",
    explanation:
      "A な-adjective takes な before a noun. This includes きれい (clean or pretty), even though its kana spelling ends in い.",
    japanese: "きれいな へやです。",
    english: "It’s a clean room.",
    prompt: "Choose the form for “a quiet town.”",
    stem: "＿＿ まちです。",
    choices: ["しずか", "しずかです", "しずかな"],
    answer: "しずかな",
    feedback:
      "Use しずかな before the noun まち. At the end of a sentence, use しずかです.",
  },
  {
    id: "i-adjective-negative",
    title: "Make an い-adjective negative",
    explanation:
      "For many い-adjectives, replace the final い with くない, then add です for politeness. いい (good) is irregular and becomes よくない.",
    japanese: "この スープは あつくないです。",
    english: "This soup isn’t hot.",
    prompt: "Choose the polite form for “The tea isn’t hot.”",
    stem: "おちゃは＿＿。",
    choices: ["あつくないです", "あついです", "あつくなかったです"],
    answer: "あつくないです",
    feedback:
      "あつい becomes あつくない. Add です to make the statement polite.",
  },
  {
    id: "na-adjective-negative",
    title: "Make a な-adjective negative",
    explanation:
      "Use では ありません after a な-adjective for a polite negative. The linking な appears before nouns and drops here.",
    japanese: "この へやは しずかでは ありません。",
    english: "This room isn’t quiet.",
    prompt: "Choose the polite negative for “This room isn’t clean.”",
    stem: "この へやは＿＿。",
    choices: ["きれいです", "きれいでは ありません", "きれいでした"],
    answer: "きれいでは ありません",
    feedback:
      "きれい is a な-adjective and takes では ありません in this polite negative.",
  },
] as const;

export const teForm = [
  {
    id: "te-ichidan",
    title: "Form て with an ichidan verb",
    explanation:
      "For an ichidan verb, drop the final る and add て. For example, たべる becomes たべて. Some verbs that end in る belong to other groups.",
    japanese: "たべて ください。",
    english: "Please eat.",
    prompt: "Use the て-form of みる (to look) to say “Please look.”",
    stem: "＿＿ ください。",
    choices: ["みって", "みて", "みるて"],
    answer: "みて",
    feedback: "みる is an ichidan verb. Drop る and add て to make みて.",
  },
  {
    id: "te-godan-u-tsu-ru",
    title: "Use って for certain godan verbs",
    explanation:
      "Godan verbs ending in う, つ, or る use って in this form. まつ (to wait) becomes まって, and かう (to buy) becomes かって.",
    japanese: "ここで まって ください。",
    english: "Please wait here.",
    prompt: "Use the て-form of かう (to buy) to say “Please buy bread.”",
    stem: "パンを ＿＿ ください。",
    choices: ["かいて", "かうて", "かって"],
    answer: "かって",
    feedback: "The う in かう becomes って in this form.",
  },
  {
    id: "te-godan-mu-bu-nu",
    title: "Use んで with む, ぶ, and ぬ verbs",
    explanation:
      "Godan verbs ending in む, ぶ, or ぬ take んで. For example, よむ (to read) becomes よんで.",
    japanese: "この ほんを よんで ください。",
    english: "Please read this book.",
    prompt: "Use the て-form of のむ (to drink) to say “Please drink water.”",
    stem: "みずを ＿＿ ください。",
    choices: ["のんで", "のむて", "のって"],
    answer: "のんで",
    feedback: "Replace the final む of のむ with んで.",
  },
  {
    id: "te-godan-ku-gu-su",
    title: "Read the endings いて, いで, and して",
    explanation:
      "For most godan verbs ending in く, use いて. For ぐ, use いで, and for す, use して. いく (to go) is a major exception and becomes いって.",
    japanese: "なまえを かいて ください。",
    english: "Please write your name.",
    prompt: "Use the て-form of いく to say “Please go to the station.”",
    stem: "えきに ＿＿ ください。",
    choices: ["いいて", "いって", "いくて"],
    answer: "いって",
    feedback: "いく is an exception. Its て-form is いって.",
  },
  {
    id: "te-irregular",
    title: "Make requests with する and くる",
    explanation:
      "The irregular verbs する (to do) and くる (to come) become して and きて. Put ください after the て-form for a polite request.",
    japanese: "ここに きて ください。",
    english: "Please come here.",
    prompt: "Complete “Please do your homework” using the て-form of する.",
    stem: "しゅくだいを ＿＿ ください。",
    choices: ["すって", "するて", "して"],
    answer: "して",
    feedback: "する becomes して, so して ください means “please do it.”",
  },
] as const;
