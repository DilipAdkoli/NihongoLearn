import { useState } from "react";
import { ChoiceCourse } from "../src/ChoiceCourse";
import { missedGrammar } from "../src/grammarCourse";
import { useStudy } from "../src/study";

export default function GrammarReview() {
  const { data } = useStudy();
  const [lessons] = useState(() => missedGrammar(data.attempts).slice(0, 6));

  return (
    <ChoiceCourse
      title="Review grammar"
      description={
        lessons.length
          ? "Try the questions you missed most recently. Correct answers clear questions from your next round."
          : "You’re caught up on grammar review."
      }
      course="grammar"
      groups={[{ lessons }]}
      reviewQuestions
      backHref="/review"
      backLabel="‹ Back to Review"
    />
  );
}
