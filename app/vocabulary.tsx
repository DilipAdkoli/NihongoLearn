import { ChoiceCourse } from "../src/ChoiceCourse";
import { vocabulary } from "../src/vocabulary";

export default function Vocabulary() {
  return (
    <ChoiceCourse
      title="Everyday vocabulary"
      course="vocabulary"
      groups={vocabulary}
    />
  );
}
