import { Link, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";
import { ChoiceCourse } from "../src/ChoiceCourse";
import { glossaryKey, wordChoices, wordRecallAnswers } from "../src/glossary";
import { glossaryEntries } from "../src/glossaryEntries";
import { useStudy } from "../src/study";

function SavedPracticeBatch({ recall }: { recall: boolean }) {
  const { data } = useStudy();
  const title = recall ? "Recall saved words" : "Saved word practice";
  const course = recall ? "saved-word-recall" : "saved-words";
  const [batch] = useState(() => {
    const saved = new Set(data.savedWords);
    const prefix = `${course}:`;
    const lastAttempt = new Map<string, number>();
    for (const attempt of data.attempts) {
      if (attempt.kanaId.startsWith(prefix)) {
        const key = attempt.kanaId.slice(prefix.length);
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
          {title}
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
      title={title}
      course={course}
      backHref="/dictionary"
      backLabel="‹ Back to glossary"
      groups={[
        {
          lessons: batch.map((entry) => ({
            id: glossaryKey(entry),
            title: recall ? entry.meaning : entry.kana,
            explanation: "",
            japanese: "",
            english: "",
            prompt: recall
              ? "Type the Japanese word in kana or kanji."
              : "What does this word mean?",
            stem: "",
            answer: recall ? entry.kana : entry.meaning,
            choices: recall ? [] : wordChoices(entry, glossaryEntries),
            acceptedAnswers: recall
              ? wordRecallAnswers(entry, glossaryEntries)
              : undefined,
            feedback: `${entry.spelling} (${entry.kana}) means ${entry.meaning}.`,
          })),
        },
      ]}
    />
  );
}

export default function SavedPractice() {
  const { mode } = useLocalSearchParams<{ mode?: string }>();
  const recall = mode === "recall";
  return (
    <SavedPracticeBatch
      key={recall ? "recall" : "recognition"}
      recall={recall}
    />
  );
}
