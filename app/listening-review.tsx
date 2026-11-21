import { useLocalSearchParams } from "expo-router";
import {
  listeningReviewCourses,
  MissedChoiceCourse,
} from "../src/MissedChoiceCourse";

export default function ListeningReview() {
  const { skill } = useLocalSearchParams<{ skill?: string }>();
  const course =
    listeningReviewCourses.find((option) => option.course === skill)?.course ??
    listeningReviewCourses[0].course;
  return <MissedChoiceCourse key={course} course={course} />;
}
