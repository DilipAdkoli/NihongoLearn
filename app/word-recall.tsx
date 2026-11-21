import { ChoiceCourse } from "../src/ChoiceCourse";
import { vocabularyRecall } from "../src/vocabulary";

export default function WordRecall() {
  return (
    <ChoiceCourse
      title="Recall Japanese words"
      course="vocabulary-recall"
      groups={vocabularyRecall}
      browseTopics
      backHref="/vocabulary"
      backLabel="‹ Review everyday vocabulary"
    />
  );
}
