import { LearningPath } from "../src/LearningPath";
import { starterPath } from "../src/starterPath";
import { useStudy } from "../src/study";

export default function StarterPath() {
  const { data } = useStudy();
  return (
    <LearningPath
      title="Start learning Japanese"
      steps={starterPath(data)}
      completion={{
        href: "/beginner-check",
        label: "Try the beginner skill check",
      }}
    />
  );
}
