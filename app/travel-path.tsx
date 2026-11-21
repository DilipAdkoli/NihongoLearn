import { LearningPath } from "../src/learningPathView";
import { useStudy } from "../src/study";
import { travelPath } from "../src/travelPath";

export default function TravelPath() {
  const { data } = useStudy();
  return <LearningPath title="Japanese for travel" steps={travelPath(data)} />;
}
