import { ChoiceCourse, useChoiceTopic } from "../src/ChoiceCourse";
import { vocabularyListening } from "../src/vocabulary";

export default function WordListening() {
  const topic = useChoiceTopic();
  return (
    <ChoiceCourse
      key={topic}
      title="Listen to everyday words"
      course="vocabulary-listening"
      groups={vocabularyListening}
      browseTopics
      initialTopic={topic}
      backHref={
        topic ? { pathname: "/vocabulary", params: { topic } } : "/vocabulary"
      }
      backLabel="‹ Back to vocabulary"
    />
  );
}
