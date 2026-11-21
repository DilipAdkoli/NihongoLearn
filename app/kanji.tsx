import { Link } from "expo-router";
import { ChoiceCourse } from "../src/ChoiceCourse";
import { kanjiCourse } from "../src/kanji";
import { useThemeColor } from "../src/theme";

export default function Kanji() {
  const themeColor = useThemeColor();
  const linkStyle = {
    alignSelf: "flex-start" as const,
    paddingVertical: 10,
    color: themeColor("#215848"),
    fontFamily: "DMSansBold",
  };
  return (
    <ChoiceCourse
      title="First kanji in context"
      course="kanji"
      groups={kanjiCourse}
      browseTopics
    >
      <Link href="/kanji-reading" style={linkStyle}>
        Practice kanji readings ›
      </Link>
      <Link href="/kanji-recall" style={linkStyle}>
        Practice writing kanji words ›
      </Link>
    </ChoiceCourse>
  );
}
