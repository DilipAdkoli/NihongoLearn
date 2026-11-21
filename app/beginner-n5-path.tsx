import { LearningPath } from "../src/learningPathView";
import { beginnerN5Path } from "../src/beginnerN5Path";
import { useStudy } from "../src/study";

export default function BeginnerN5PathScreen() {
  const { data } = useStudy();
  return (
    <LearningPath
      title="Complete beginner journey"
      steps={beginnerN5Path(data)}
      completion={{
        href: "/review",
        label: "Review your beginner skills",
      }}
    />
  );
}
