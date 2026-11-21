import { useLocalSearchParams } from "expo-router";
import { MissedChoiceCourse } from "../src/MissedChoiceCourse";

export default function PassageReview() {
  const { mode } = useLocalSearchParams<{ mode?: string }>();
  const course = mode === "listening" ? "passage-listening" : "reading";
  return <MissedChoiceCourse key={course} course={course} />;
}
