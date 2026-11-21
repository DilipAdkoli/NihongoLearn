import { LearningPath } from "../src/LearningPath";
import { katakanaPath } from "../src/kanaPaths";
import { useStudy } from "../src/study";

export default function KatakanaPathScreen() {
  const { data } = useStudy();
  return (
    <LearningPath
      title="Katakana step by step"
      steps={katakanaPath(data)}
      completion={{
        href: "/review",
        label: "Review the katakana you've learned",
      }}
    />
  );
}
