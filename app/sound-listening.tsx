import { useState } from "react";
import { ChoiceCourse } from "../src/ChoiceCourse";
import { shuffled } from "../src/learning";
import { soundComparisons } from "../src/soundRules";

export default function SoundListening() {
  const [lessons] = useState(() =>
    shuffled(
      soundComparisons.flatMap(({ explanation, words }) =>
        words.map((word) => ({
          id: word.reading,
          explanation: "",
          japanese: "",
          english: "",
          stem: "",
          prompt: "Which word did you hear?",
          choices: words.map((option) => option.kana),
          answer: word.kana,
          feedback: `${word.kana} means ${word.meaning}. ${explanation}`,
          promptAudio: word.audio,
        })),
      ),
    ).map((question, index) => ({ ...question, title: `Sound ${index + 1}` })),
  );

  return (
    <ChoiceCourse
      title="Hear the differences"
      description="Listen for an extra beat in a vowel or a consonant, then choose the word you heard."
      course="sound-listening"
      groups={[{ lessons }]}
      backHref="/sound-rules"
      backLabel="‹ Review sound and spelling rules"
    />
  );
}
