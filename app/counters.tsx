import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { ChoiceCourse } from "../src/ChoiceCourse";
import { counterPractice, japaneseCount, type Counter } from "../src/counters";

const examples: readonly {
  counter: Counter;
  label: string;
  clue: string;
  samples?: readonly number[];
}[] = [
  {
    counter: "general",
    label: "General things",
    clue: "Use 一つ, 二つ, 三つ for a simple count of things. The readings follow their own pattern.",
  },
  {
    counter: "flat",
    label: "Tickets and flat objects",
    clue: "Use 枚 (まい) for sheets of paper, photos, and paper tickets.",
  },
  {
    counter: "people",
    label: "People",
    clue: "Use 人 when counting people. 一人 and 二人 are read ひとり and ふたり. 四人 is よにん.",
  },
  {
    counter: "long",
    label: "Bottles and long objects",
    clue: "Use 本 (ほん) for long things such as bottles, pens, and umbrellas. The first sound changes in readings such as いっぽん and さんぼん. 十本 can also be read じっぽん.",
    samples: [1, 2, 3, 6, 8, 10],
  },
  {
    counter: "animals",
    label: "Small animals",
    clue: "Use 匹 (ひき) for animals such as cats and dogs. The first sound changes from ひ to ぴ or び in いっぴき and さんびき. 十匹 can also be read じっぴき.",
    samples: [1, 2, 3, 6, 8, 10],
  },
];

export default function Counters() {
  return (
    <View style={s.page}>
      <Link href="/learn" style={s.back}>
        ‹ Back to Learn
      </Link>
      <Text accessibilityRole="header" style={s.title}>
        Count things, people, and animals
      </Text>
      <Text style={s.body}>
        Japanese often uses a counter with the number. Choose the counter for
        what you’re counting.
      </Text>
      {examples.map(({ counter, label, clue, samples = [1, 2, 3, 4, 10] }) => (
        <View key={counter} style={s.card}>
          <Text accessibilityRole="header" style={s.heading}>
            {label}
          </Text>
          <Text style={s.body}>{clue}</Text>
          <View style={s.examples}>
            {samples.map((value) => {
              const { written, reading } = japaneseCount(value, counter);
              return (
                <Text key={value} style={s.example}>
                  {written} · {reading}
                </Text>
              );
            })}
          </View>
        </View>
      ))}
      <ChoiceCourse
        title="Practice counters"
        course="counters"
        groups={[{ lessons: counterPractice }]}
        showBack={false}
      />
    </View>
  );
}

const s = StyleSheet.create({
  page: { width: "100%", maxWidth: 760, gap: 12 },
  back: {
    color: "#215848",
    fontFamily: "DMSansBold",
    alignSelf: "flex-start",
    paddingVertical: 8,
  },
  title: {
    color: "#203730",
    fontFamily: "DMSerifText",
    fontSize: 36,
    lineHeight: 45,
  },
  heading: { color: "#203730", fontFamily: "DMSerifText", fontSize: 23 },
  body: {
    fontFamily: "DMSans",
    fontSize: 15,
    color: "#203730",
    lineHeight: 22,
  },
  card: {
    backgroundColor: "#fffef8",
    borderWidth: 1,
    borderColor: "#dadfd3",
    borderRadius: 8,
    padding: 12,
    gap: 6,
  },
  examples: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  example: {
    backgroundColor: "#f4f3ea",
    borderRadius: 6,
    padding: 8,
    color: "#203730",
    fontSize: 16,
  },
});
