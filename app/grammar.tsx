import { ChoiceCourse } from "../src/ChoiceCourse";
import { grammarTopics } from "../src/grammarCourse";

export default function Grammar() {
  return (
    <ChoiceCourse
      title="First Japanese sentences"
      course="grammar"
      browseTopics
      groups={grammarTopics}
    />
  );
}
