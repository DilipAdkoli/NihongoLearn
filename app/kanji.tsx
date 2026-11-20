import { ChoiceCourse } from "../src/ChoiceCourse";
import { kanjiCourse } from "../src/kanji";

export default function Kanji() {
  return (
    <ChoiceCourse
      title="First kanji in context"
      course="kanji"
      groups={kanjiCourse}
      browseTopics
    />
  );
}
