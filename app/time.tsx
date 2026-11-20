import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { ChoiceCourse } from "../src/ChoiceCourse";
import { japaneseTime, timePractice } from "../src/time";

export default function TimeLesson() {
  return (
    <View style={s.page}>
      <Link href="/learn" style={s.back}>
        ‹ Back to Learn
      </Link>
      <Text accessibilityRole="header" style={s.title}>
        Tell the time
      </Text>
      <Text style={s.body}>
        Add 時 (じ) for hours and 分 (ふん or ぷん) for minutes. The readings
        for 4, 7, and 9 o’clock are よじ, しちじ, and くじ.
      </Text>
      <Text style={s.body}>
        Minute endings can change. For example, 1 minute is いっぷん, 6 is
        ろっぷん, and 8 is はっぷん. You can also say 半 (はん) for half past.
      </Text>
      <View style={s.examples}>
        {[japaneseTime(4, 0), japaneseTime(7, 15), japaneseTime(12, 30)].map(
          ({ japanese, kana, clock }) => (
            <View key={clock} style={s.example}>
              <Text style={s.word}>{japanese}</Text>
              <Text style={s.body}>
                {kana} · {clock}
              </Text>
            </View>
          ),
        )}
      </View>
      <ChoiceCourse
        title="Practice reading the time"
        course="time"
        groups={[{ lessons: timePractice }]}
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
  body: {
    fontFamily: "DMSans",
    fontSize: 15,
    color: "#203730",
    lineHeight: 22,
  },
  examples: { gap: 8 },
  example: {
    backgroundColor: "#fffef8",
    borderWidth: 1,
    borderColor: "#dadfd3",
    borderRadius: 8,
    padding: 12,
    gap: 4,
  },
  word: { color: "#203730", fontSize: 21 },
});
