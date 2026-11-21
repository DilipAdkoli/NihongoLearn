import { LearningPath } from "../src/learningPathView";
import { hiraganaPath } from "../src/kanaPaths";
import { useStudy } from "../src/study";

export default function HiraganaPathScreen() {
  const { data } = useStudy();
  return (
    <LearningPath
      title="Hiragana step by step"
      steps={hiraganaPath(data)}
      completion={{
        href: "/review",
        label: "Review the hiragana you've learned",
      }}
    />
  );
}
