import { useLocalSearchParams } from "expo-router";
import { MissedChoiceCourse } from "../src/MissedChoiceCourse";

export default function WordReview() {
  const { mode } = useLocalSearchParams<{ mode?: string }>();
  const course = mode === "recall" ? "vocabulary-recall" : "vocabulary";
  return <MissedChoiceCourse key={course} course={course} />;
}
