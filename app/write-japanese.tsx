import { useLocalSearchParams } from "expo-router";
import { ChoiceCourse } from "../src/ChoiceCourse";
import { typedSentenceLessons } from "../src/writing";

export default function WriteJapanese() {
  const { task } = useLocalSearchParams<{ task?: string }>();
  const selected = typedSentenceLessons.find((lesson) => lesson.id === task);
  return (
    <ChoiceCourse
      key={selected?.id}
      title="Write a sentence in Japanese"
      description="Use the polite forms you’ve practiced. You can type kana, kanji, or a mix. Spaces and punctuation are optional."
      course="writing-type"
      groups={[{ lessons: selected ? [selected] : typedSentenceLessons }]}
      backHref="/writing"
      backLabel="‹ Back to sentence building"
    />
  );
}
