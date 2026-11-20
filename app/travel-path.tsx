import { LearningPath } from "../src/LearningPath";
import { useStudy } from "../src/study";
import { travelPath } from "../src/travelPath";

export default function TravelPath() {
  const { data } = useStudy();
  return <LearningPath title="Japanese for travel" steps={travelPath(data)} />;
}
