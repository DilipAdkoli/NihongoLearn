import { ChoiceCourse } from "../src/ChoiceCourse";
import { kanjiReading } from "../src/kanjiReading";

export default function KanjiReading() {
  return (
    <ChoiceCourse
      title="Read kanji words"
      description="Choose the kana reading for the marked word in each sentence."
      course="kanji-reading"
      groups={kanjiReading}
      browseTopics
      backHref="/kanji"
      backLabel="‹ Back to kanji"
    />
  );
}
