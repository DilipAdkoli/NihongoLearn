import { Link } from "expo-router";
import { ChoiceCourse } from "../src/ChoiceCourse";
import { kanjiCourse } from "../src/kanji";
import { useThemeColor } from "../src/theme";

export default function Kanji() {
  const themeColor = useThemeColor();
  return (
    <ChoiceCourse
      title="First kanji in context"
      course="kanji"
      groups={kanjiCourse}
      browseTopics
    >
      <Link
        href="/kanji-reading"
        style={{
          alignSelf: "flex-start",
          paddingVertical: 10,
          color: themeColor("#215848"),
          fontFamily: "DMSansBold",
        }}
      >
        Practice kanji readings ›
      </Link>
    </ChoiceCourse>
  );
}
