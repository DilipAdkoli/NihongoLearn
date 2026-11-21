import { useState } from "react";
import { ChoiceCourse } from "../src/ChoiceCourse";
import { shuffled } from "../src/learning";
import { soundQuestions } from "../src/soundRules";

export default function SoundListening() {
  const [lessons] = useState(() =>
    shuffled(soundQuestions).map((question, index) => ({
      ...question,
      title: `Sound ${index + 1}`,
    })),
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
