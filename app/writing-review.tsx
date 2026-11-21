import { useLocalSearchParams } from "expo-router";
import { MissedChoiceCourse } from "../src/MissedChoiceCourse";

export default function WritingReview() {
  const { mode } = useLocalSearchParams<{ mode?: string }>();
  const course = mode === "kanji" ? "kanji-recall" : "writing-type";
  return <MissedChoiceCourse key={course} course={course} />;
}
