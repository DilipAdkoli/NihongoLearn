import { ChoiceCourse, useChoiceTopic } from "../src/ChoiceCourse";
import { vocabulary } from "../src/vocabulary";

export default function Vocabulary() {
  const initialTopic = useChoiceTopic();
  return (
    <ChoiceCourse
      key={initialTopic}
      title="Everyday vocabulary"
      course="vocabulary"
      groups={vocabulary}
      browseTopics
      initialTopic={initialTopic}
    />
  );
}
