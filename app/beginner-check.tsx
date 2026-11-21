import { createThemedStyles } from "../src/theme";
import { Link } from "expo-router";
import { Text, View } from "react-native";
import {
  beginnerCheck,
  beginnerCheckCourse,
  beginnerCheckProgress,
} from "../src/beginnerCheck";
import { ChoiceCourse } from "../src/ChoiceCourse";
import { useStudy } from "../src/study";

const promptAudio: Readonly<Partial<Record<string, number>>> = {
  "departure-time": require("../assets/audio/check-departure-time.mp3"),
  "drinking-water": require("../assets/audio/check-drinking-water.mp3"),
};

const groups = beginnerCheck.map((group) => ({
  title: group.title,
  passage: "passage" in group ? group.passage : undefined,
  lessons: group.lessons.map((lesson) => ({
    ...lesson,
    japanese: "",
    english: "",
    explanation: "",
    stem: "stem" in lesson ? lesson.stem : "",
    promptAudio: promptAudio[lesson.id],
  })),
}));

export default function BeginnerCheck() {
  const s = useStyles();
  const { data } = useStudy();
  const scores = beginnerCheckProgress(data.attempts);
  const total = scores.reduce((sum, score) => sum + score.total, 0);
  const answered = scores.reduce((sum, score) => sum + score.answered, 0);
  const correct = scores.reduce((sum, score) => sum + score.correct, 0);
  const finished = answered === total;

  return (
    <ChoiceCourse
      title="Beginner skill check"
      description="Answer questions on vocabulary, grammar, reading, and listening. Your latest answer to each question counts."
      course={beginnerCheckCourse}
      groups={groups}
    >
      <View style={s.summary}>
        <Text accessibilityLiveRegion="polite" style={s.score}>
          {finished
            ? `${correct} of ${total} correct`
            : `${answered} of ${total} questions answered`}
        </Text>
        {finished &&
          scores.map((score) => (
            <View key={score.title} style={s.row}>
              <Text style={s.body}>
                {score.title} · {score.correct} of {score.total}
              </Text>
              {score.correct < score.total && (
                <Link href={score.href} style={s.link}>
                  Review {score.title.toLowerCase()} ›
                </Link>
              )}
            </View>
          ))}
      </View>
    </ChoiceCourse>
  );
}

const useStyles = createThemedStyles({
  summary: {
    borderColor: "#cddbc7",
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    gap: 6,
    backgroundColor: "#e9eee2",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 12,
  },
  score: { fontFamily: "DMSansBold", fontSize: 18, color: "#203730" },
  body: { fontFamily: "DMSans", fontSize: 15, color: "#203730" },
  link: { fontFamily: "DMSansBold", color: "#215848", paddingVertical: 10 },
});
