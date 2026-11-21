import { ChoiceCourse } from "../src/ChoiceCourse";
import { kanjiRecall } from "../src/kanjiReading";

export default function KanjiRecall() {
  return (
    <ChoiceCourse
      title="Write kanji words"
      description="Fill in the missing word. Use your Japanese keyboard to convert the kana reading to kanji."
      course="kanji-recall"
      groups={kanjiRecall}
      browseTopics
      backHref="/kanji"
      backLabel="‹ Back to kanji"
    />
  );
}
