import { ChoiceCourse } from "../src/ChoiceCourse";
import { normalizeSentenceAnswer, writingTasks } from "../src/writing";

const lessons = writingTasks.map((task) => ({
  id: task.id,
  title: task.meaning,
  japanese: "",
  english: "",
  explanation: "",
  stem: "",
  prompt: "Type the sentence in Japanese.",
  choices: [],
  answer: task.answers[0].join(""),
  acceptedAnswers: task.answers.map((order) => order.join("")),
  normalizeAnswer: normalizeSentenceAnswer,
  feedback: task.feedback,
}));

export default function WriteJapanese() {
  return (
    <ChoiceCourse
      title="Write a sentence in Japanese"
      description="Use the polite forms you’ve practiced. You can type kana, kanji, or a mix. Spaces and punctuation are optional."
      course="writing-type"
      groups={[{ lessons }]}
      backHref="/writing"
      backLabel="‹ Back to sentence building"
    />
  );
}
