import { ChoiceCourse, useChoiceTopic } from "../src/ChoiceCourse";
import { reading } from "../src/reading";

export default function Reading() {
  const initialTopic = useChoiceTopic();
  return (
    <ChoiceCourse
      key={initialTopic}
      title="Beginner reading"
      course="reading"
      groups={reading}
      browseTopics
      initialTopic={initialTopic}
    />
  );
}
