import { ChoiceCourse } from "../src/ChoiceCourse";
import { passageListening } from "../src/passageListening";

export default function PassageListening() {
  return (
    <ChoiceCourse
      title="Listen to short passages"
      course="passage-listening"
      groups={passageListening}
      browseTopics
    />
  );
}
