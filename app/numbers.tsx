import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { ChoiceCourse } from "../src/ChoiceCourse";
import { countingTable, numberPractice } from "../src/numbers";

export default function Numbers() {
  return (
    <View style={s.page}>
      <Link href="/learn" style={s.back}>
        ‹ Back to Learn
      </Link>
      <Text accessibilityRole="header" style={s.title}>
        Count from 1 to 99
      </Text>
      <Text style={s.body}>
        Learn one through ten. For 11–19, say じゅう and then the ones digit.
        For 20–99, say the tens digit, then じゅう, then the ones digit if there
        is one.
      </Text>
      <Text style={s.body}>
        These are common standalone readings. Counters and dates sometimes use
        different readings.
      </Text>
      <View style={s.chart}>
        {countingTable.map(({ value, kanji, kana }) => (
          <View key={value} style={s.tile}>
            <Text style={s.body}>{value}</Text>
            <Text style={s.kanji}>{kanji}</Text>
            <Text style={s.body}>{kana}</Text>
          </View>
        ))}
      </View>
      <Text style={s.body}>
        For example, 二十四 is にじゅうよん (24) and 九十 is きゅうじゅう (90).
      </Text>
      <ChoiceCourse
        title="Practice counting"
        course="numbers"
        groups={[{ lessons: numberPractice }]}
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
  chart: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  tile: {
    flexGrow: 1,
    flexBasis: 62,
    alignItems: "center",
    gap: 4,
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#dadfd3",
    backgroundColor: "#fffef8",
  },
  kanji: { fontSize: 24, color: "#203730" },
});
