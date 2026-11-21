import { Link } from "expo-router";
import { Text, View, Pressable } from "react-native";
import { dailyGoalProgress } from "../src/dailyGoal";
import { dailyStudyPlan, reviewForecast, studySkillIndex } from "../src/dailyStudyPlan";
import { glossaryEntries } from "../src/glossaryEntries";
import { reviewCourses } from "../src/reviewCourses";
import { savedWordRecallQueue } from "../src/savedWordReview";
import { startLesson, useStudy } from "../src/study";
import { createThemedStyles } from "../src/theme";
import { REVIEW_BATCH_SIZE, useReviewQueue } from "../src/useReviewQueue";
import { vocabularyWordIds } from "../src/vocabulary";
import { vocabularyReviewQueue } from "../src/vocabularyReview";

const questions = studySkillIndex(reviewCourses);

export default function DailyPlan() {
  const s = useStyles();
  const { data } = useStudy();
  const { queue, now } = useReviewQueue(data);
  const queues = {
    kana: queue,
    vocabulary: vocabularyReviewQueue(data, vocabularyWordIds, now),
    saved: savedWordRecallQueue(data, glossaryEntries, now),
  };
  const items = dailyStudyPlan(data, queues, questions, now, REVIEW_BATCH_SIZE);
  const forecast = reviewForecast(queues, now);
  const goal = dailyGoalProgress(data.attempts, data.dailyGoal, new Date(now));
  return (
    <View style={s.page}>
      <Link href="/" style={s.back}>
        ‹ Back to Overview
      </Link>
      <Text accessibilityRole="header" style={s.title}>
        Today’s study plan
      </Text>
      <Text style={s.detail} accessibilityRole="summary">
        {forecast.dueNow} due now · {forecast.dueNext24Hours} due in the next 24 hours
      </Text>
      <Link href="/mistakes" style={s.back}>
        See explanations for mistakes ›
      </Link>
      {data.dailyGoal > 0 && (
        <Text style={s.detail}>
          {goal.complete ? "Daily goal reached" : "Daily goal"} ·{" "}
          {goal.answered} of {data.dailyGoal} questions answered
        </Text>
      )}
      {items.map(({ title, reason, action }, i) => (
        <View style={[s.card, i === 0 && s.firstCard]} key={title}>
          <Text accessibilityRole="header" style={s.heading}>
            {title}
          </Text>
          <Text style={s.detail}>{reason}</Text>
          {"href" in action ? (
            <Link href={action.href} asChild>
              <Pressable
                accessibilityRole="link"
                accessibilityLabel={title}
                style={s.action}
              >
                <Text style={s.actionText}>Open activity</Text>
              </Pressable>
            </Link>
          ) : (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={title}
              onPress={() => startLesson([...action.kana], action.mode)}
              style={s.action}
            >
              <Text style={s.actionText}>Start lesson</Text>
            </Pressable>
          )}
        </View>
      ))}
    </View>
  );
}

const useStyles = createThemedStyles({
  page: { maxWidth: 760, width: "100%", gap: 12 },
  back: {
    alignSelf: "flex-start",
    paddingVertical: 8,
    color: "#215848",
    fontFamily: "DMSansBold",
  },
  title: {
    fontFamily: "DMSerifText",
    fontSize: 36,
    lineHeight: 45,
    color: "#203730",
  },
  heading: { fontFamily: "DMSerifText", fontSize: 23, color: "#203730" },
  detail: {
    fontFamily: "DMSans",
    fontSize: 15,
    lineHeight: 22,
    color: "#566860",
  },
  card: {
    backgroundColor: "#fffef8",
    borderWidth: 1,
    borderColor: "#dadfd3",
    borderRadius: 10,
    padding: 16,
    gap: 8,
  },
  firstCard: { backgroundColor: "#e9eee2", borderColor: "#a8bea7" },
  action: {
    alignSelf: "flex-start",
    minHeight: 44,
    justifyContent: "center",
    paddingHorizontal: 14,
    borderRadius: 6,
    backgroundColor: "#215848",
  },
  actionText: { fontFamily: "DMSansBold", color: "#fffef8" },
});
