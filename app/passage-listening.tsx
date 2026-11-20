import { ChoiceCourse, useChoiceTopic } from "../src/ChoiceCourse";
import { passageListening } from "../src/passageListening";

export default function PassageListening() {
  const initialTopic = useChoiceTopic();
  return (
    <ChoiceCourse
      key={initialTopic}
      title="Listen to short passages"
      course="passage-listening"
      groups={passageListening}
      browseTopics
      initialTopic={initialTopic}
    />
  );
}
