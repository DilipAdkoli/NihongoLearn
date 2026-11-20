import { ChoiceCourse } from "../src/ChoiceCourse";
import { reading } from "../src/reading";

export default function Reading() {
  return (
    <ChoiceCourse
      title="Beginner reading"
      course="reading"
      groups={reading}
      browseTopics
    />
  );
}
