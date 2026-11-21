import { LearningPath } from "../src/learningPathView";
import { planningPath } from "../src/planningPath";
import { useStudy } from "../src/study";

export default function PlanningPath() {
  const { data } = useStudy();
  return (
    <LearningPath
      title="Make plans in Japanese"
      steps={planningPath(data)}
      completion={{ href: "/review", label: "Open Review" }}
    />
  );
}
