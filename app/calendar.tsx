import { createThemedStyles } from "../src/theme";
import { Link } from "expo-router";
import { Text, View } from "react-native";
import { ChoiceCourse } from "../src/ChoiceCourse";
import { JapaneseText } from "../src/JapaneseText";
import { datePractice, japaneseDate } from "../src/calendar";

export default function CalendarLesson() {
  const s = useStyles();
  return (
    <View style={s.page}>
      <Link href="/learn" style={s.back}>
        ‹ Back to Learn
      </Link>
      <Text accessibilityRole="header" style={s.title}>
        Read calendar dates
      </Text>
      <Text style={s.body}>
        Write the month first with 月, then the day with 日. April, July, and
        September are しがつ, しちがつ, and くがつ.
      </Text>
      <Text accessibilityRole="header" style={s.heading}>
        The first ten days
      </Text>
      <View style={s.days}>
        {Array.from({ length: 10 }, (_, index) => index + 1).map((day) => (
          <View key={day} style={s.day}>
            <JapaneseText style={s.japanese}>{day}日</JapaneseText>
            <JapaneseText style={s.body}>
              {japaneseDate(1, day).kana.split(" ")[1]}
            </JapaneseText>
          </View>
        ))}
      </View>
      <Text style={s.body}>
        Many later days use the number plus にち. Watch for readings like
        じゅうよっか (14日), はつか (20日), and にじゅうよっか (24日).
      </Text>
      <ChoiceCourse
        title="Practice reading dates"
        course="calendar"
        groups={[{ lessons: datePractice }]}
        showBack={false}
      />
    </View>
  );
}

const useStyles = createThemedStyles({
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
  days: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  day: {
    flexBasis: 76,
    flexGrow: 1,
    alignItems: "center",
    padding: 9,
    gap: 4,
    backgroundColor: "#fffef8",
    borderWidth: 1,
    borderColor: "#dadfd3",
    borderRadius: 8,
  },
  japanese: { fontSize: 21, color: "#203730" },
});
