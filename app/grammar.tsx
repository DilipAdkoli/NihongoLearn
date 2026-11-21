import { ChoiceCourse, useChoiceTopic } from "../src/ChoiceCourse";
import { grammarTopics } from "../src/grammarCourse";

export default function Grammar() {
  const initialTopic = useChoiceTopic();
  return (
    <ChoiceCourse
      key={initialTopic}
      title="First Japanese sentences"
      course="grammar"
      browseTopics
      initialTopic={initialTopic}
      groups={grammarTopics}
    />
  );
}
