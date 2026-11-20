import { Link } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";
import { ChoiceCourse } from "../src/ChoiceCourse";
import { glossaryKey, wordChoices } from "../src/glossary";
import { glossaryEntries } from "../src/glossaryEntries";
import { useStudy } from "../src/study";

export default function SavedPractice() {
  const { data } = useStudy();
  const [batch] = useState(() => {
    const saved = new Set(data.savedWords);
    const lastAttempt = new Map<string, number>();
    for (const attempt of data.attempts) {
      if (attempt.kanaId.startsWith("saved-words:")) {
        const key = attempt.kanaId.slice("saved-words:".length);
        lastAttempt.set(key, Math.max(lastAttempt.get(key) ?? -1, attempt.at));
      }
    }
    return glossaryEntries
      .filter((entry) => saved.has(glossaryKey(entry)))
      .sort(
        (a, b) =>
          (lastAttempt.get(glossaryKey(a)) ?? -1) -
          (lastAttempt.get(glossaryKey(b)) ?? -1),
      )
      .slice(0, 8);
  });
  if (!batch.length)
    return (
      <View style={{ gap: 14 }}>
        <Text
          accessibilityRole="header"
          style={{ fontFamily: "DMSerifText", fontSize: 30, color: "#203730" }}
        >
          Saved word practice
        </Text>
        <Text style={{ fontFamily: "DMSans", color: "#566860" }}>
          Save a glossary word to start practicing.
        </Text>
        <Link
          href="/dictionary"
          style={{ color: "#215848", fontFamily: "DMSansBold" }}
        >
          Open glossary
        </Link>
      </View>
    );

  return (
    <ChoiceCourse
      title="Saved word practice"
      course="saved-words"
      backHref="/dictionary"
      backLabel="‹ Back to glossary"
      groups={[
        {
          lessons: batch.map((entry) => ({
            id: glossaryKey(entry),
            title: entry.kana,
            explanation: "",
            japanese: "",
            english: "",
            prompt: "What does this word mean?",
            stem: "",
            answer: entry.meaning,
            choices: wordChoices(entry, glossaryEntries),
            feedback: `${entry.spelling} means ${entry.meaning}.`,
          })),
        },
      ]}
    />
  );
}
