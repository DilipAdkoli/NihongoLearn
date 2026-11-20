import { ChoiceCourse } from "../src/ChoiceCourse";
import { grammar } from "../src/grammar";

export default function Grammar() {
  return (
    <ChoiceCourse
      title="First Japanese sentences"
      course="grammar"
      groups={[{ lessons: grammar }]}
    />
  );
}
