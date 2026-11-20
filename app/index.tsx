import { Link, router } from "expo-router";
import {
  ArrowRight,
  BookMarked,
  BookOpen,
  CalendarDays,
  Check,
  Clock3,
  Crosshair,
  ListChecks,
  type LucideIcon,
} from "lucide-react-native";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { dailyGoalProgress } from "../src/dailyGoal";
import { JapaneseText } from "../src/JapaneseText";
import { kana, lessons } from "../src/learning";
import { overviewPaths } from "../src/overviewPath";
import { starterPath } from "../src/starterPath";
import { travelPath } from "../src/travelPath";
import { REVIEW_BATCH_SIZE, useReviewQueue } from "../src/useReviewQueue";
import { startLesson, useStudy } from "../src/study";

function Metric({
  label,
  value,
  icon: Icon,
  tone,
}: {
  label: string;
  value: string;
  icon: LucideIcon;
  tone: "sage" | "clay" | "gold";
}) {
  const colors = {
    sage: ["#e6edde", "#3d664e"],
    clay: ["#f7e7db", "#a34e35"],
    gold: ["#f3ecd6", "#927029"],
  }[tone];
  return (
    <View style={s.metric}>
      <View style={[s.metricIcon, { backgroundColor: colors[0] }]}>
        <Icon size={20} strokeWidth={1.8} color={colors[1]} />
      </View>
      <View style={{ flexShrink: 1 }}>
        <Text style={s.metricValue}>{value}</Text>
        <Text style={s.metricLabel}>{label}</Text>
      </View>
    </View>
  );
}

function SectionTitle({
  title,
  link,
  onPress,
}: {
  title: string;
  link: string;
  onPress: () => void;
}) {
  return (
    <View style={s.sectionTitle}>
      <Text accessibilityRole="header" style={s.h2}>
        {title}
      </Text>
      <Pressable
        onPress={onPress}
        accessibilityRole="link"
        style={({ pressed }) => [s.link, pressed && s.pressed]}
      >
        <Text style={s.linkText}>{link}</Text>
        <ArrowRight size={15} color="#345b45" />
      </Pressable>
    </View>
  );
}

export default function Home() {
  const { data } = useStudy();
  const { due } = useReviewQueue(data);
  const pathInfo = overviewPaths[data.overviewPath];
  const path =
    pathInfo.href === "/travel-path" ? travelPath(data) : starterPath(data);
  const nextStep = path.find((step) => !step.complete);
  const completedSteps = path.filter((step) => step.complete).length;
  const goal = data.dailyGoal;
  const goalStatus = dailyGoalProgress(data.attempts, goal, new Date());
  const { width } = useWindowDimensions();
  const narrow = width < 700;
  const phone = width < 520;
  const seen = kana.filter((item) => data.seen.includes(item.id)).length;
  const nextIndex = lessons.findIndex((lesson) =>
    lesson.ids.some((id) => !data.seen.includes(id)),
  );
  const lessonIndex = nextIndex < 0 ? lessons.length - 1 : nextIndex;
  const lesson = lessons[lessonIndex];
  const lessonNumber = lessons
    .slice(0, lessonIndex + 1)
    .filter((entry) => entry.script === lesson.script).length;
  const notebook = kana.filter((item) => lesson.ids.includes(item.id));
  const correct = data.attempts.filter((a) => a.correct).length;
  const date = new Intl.DateTimeFormat("en", {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(new Date());
  return (
    <View>
      <View style={s.headingRow}>
        <Text
          accessibilityRole="header"
          style={[s.heading, phone && { fontSize: 36 }]}
        >
          Your study desk
        </Text>
        {!phone && (
          <View style={s.date}>
            <CalendarDays size={15} color="#727a69" />
            <Text style={s.dateText}>{date}</Text>
          </View>
        )}
      </View>
      <View style={[s.hero, narrow && { flexDirection: "column-reverse" }]}>
        <View
          style={[s.heroCopy, !narrow && { flex: 1 }, phone && { padding: 22 }]}
        >
          <View style={s.lessonTag}>
            <View style={s.tagLine} />
            <Text style={s.tagText}>
              {lesson.script.toUpperCase()} / LESSON{" "}
              {String(lessonNumber).padStart(2, "0")}
            </Text>
          </View>
          <Text
            accessibilityRole="header"
            style={[s.heroTitle, phone && { fontSize: 37, lineHeight: 44 }]}
          >
            {lesson.title}
          </Text>
          <Text style={s.heroDetail}>{lesson.detail}</Text>
          <View style={s.heroActions}>
            <Pressable
              accessibilityRole="button"
              onPress={() => startLesson(lesson.ids)}
              style={({ pressed }) => [s.start, pressed && s.pressed]}
            >
              <Text style={s.startText}>
                {nextIndex < 0 ? "Revisit lesson" : "Start lesson"}
              </Text>
              <ArrowRight size={17} color="#fffdf6" />
            </Pressable>
            <View style={s.time}>
              <Clock3 size={15} color="#d4dfd0" />
              <Text style={s.timeText}>~5 min</Text>
            </View>
          </View>
        </View>
        <View
          style={
            narrow
              ? { height: phone ? 151 : 190 }
              : { flex: 0.99, minHeight: 247 }
          }
        >
          <Image
            source={require("../assets/fuji.jpg")}
            accessibilityLabel="Woodblock-style illustration of Mount Fuji across a lake"
            resizeMode="cover"
            style={s.fill}
          />
        </View>
      </View>
      {!!due.length && (
        <View style={s.reviewCard}>
          <View style={s.reviewCopy}>
            <Text accessibilityRole="header" style={s.reviewTitle}>
              {due.length} kana ready for review
            </Text>
            <Text style={s.metricLabel}>
              Refresh them before your next lesson.
            </Text>
          </View>
          <Pressable
            accessibilityRole="button"
            onPress={() =>
              startLesson(
                due.slice(0, REVIEW_BATCH_SIZE).map((card) => card.id),
                "review",
              )
            }
            style={({ pressed }) => [s.reviewButton, pressed && s.pressed]}
          >
            <Text style={s.linkText}>Start review</Text>
            <ArrowRight size={16} color="#345b45" />
          </Pressable>
        </View>
      )}
      {nextStep && (
        <View style={s.starterCard}>
          <View style={s.reviewCopy}>
            <Text accessibilityRole="header" style={s.reviewTitle}>
              {pathInfo.title}
            </Text>
            <Text style={s.metricLabel}>
              {completedSteps} of {path.length} steps complete
            </Text>
            <Text style={s.nextStep}>{nextStep.title}</Text>
          </View>
          <Link href={pathInfo.href} asChild>
            <Pressable
              accessibilityRole="link"
              style={({ pressed }) => [s.reviewButton, pressed && s.pressed]}
            >
              <Text style={s.linkText}>
                {completedSteps ? "Continue path" : pathInfo.action}
              </Text>
              <ArrowRight size={16} color="#345b45" />
            </Pressable>
          </Link>
        </View>
      )}
      {goal > 0 && (
        <View style={s.goalCard}>
          <Text accessibilityRole="header" style={s.reviewTitle}>
            Today’s practice goal
          </Text>
          <Text style={s.metricLabel}>
            {goalStatus.answered} of {goal} questions answered
            {goalStatus.complete ? " · Goal reached" : ""}
          </Text>
          <View
            style={s.goalTrack}
            accessible
            accessibilityRole="progressbar"
            accessibilityValue={{
              min: 0,
              max: goal,
              now: Math.min(goal, goalStatus.answered),
            }}
          >
            <View style={[s.goalFill, { width: `${goalStatus.percent}%` }]} />
          </View>
        </View>
      )}
      <SectionTitle
        title="Study snapshot"
        link="View progress"
        onPress={() => router.navigate("/progress")}
      />
      <View style={[s.metrics, phone && s.phoneMetrics]}>
        <Metric
          label="Kana studied"
          value={seen + " / " + kana.length}
          icon={BookOpen}
          tone="sage"
        />
        <Metric
          label="Answers given"
          value={String(data.attempts.length)}
          icon={ListChecks}
          tone="clay"
        />
        <Metric
          label="Accuracy"
          value={
            data.attempts.length
              ? Math.round((correct / data.attempts.length) * 100) + "%"
              : "—"
          }
          icon={Crosshair}
          tone="gold"
        />
      </View>
      <SectionTitle
        title="Kana notebook"
        link="Open Learn"
        onPress={() => router.navigate("/learn")}
      />
      <View style={s.notebook}>
        <View style={s.bookHead}>
          <BookMarked size={17} color="#5b6956" />
          <Text style={s.bookLabel}>{lesson.script.toUpperCase()}</Text>
          <View style={s.separator} />
          <Text style={s.bookGroup}>{lesson.notebook}</Text>
        </View>
        <View style={s.tiles}>
          {notebook.map((item) => (
            <Pressable
              key={item.id}
              accessibilityRole="button"
              accessibilityLabel={
                "Study " + item.glyph + (data.romaji ? ", " + item.reading : "")
              }
              onPress={() => startLesson([item.id])}
              style={({ pressed }) => [
                s.tile,
                phone && { minHeight: 77 },
                pressed && s.tilePressed,
              ]}
            >
              {data.seen.includes(item.id) && (
                <View style={s.seen}>
                  <Check size={12} color="#356446" />
                </View>
              )}
              <JapaneseText style={[s.character, phone && { fontSize: 31 }]}>
                {item.glyph}
              </JapaneseText>
              {data.romaji && <Text style={s.romaji}>{item.reading}</Text>}
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
}
const s = StyleSheet.create({
  headingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 20,
  },
  heading: {
    fontFamily: "DMSerifText",
    fontSize: 44,
    letterSpacing: -1.6,
    lineHeight: 54,
    color: "#233b31",
  },
  date: { flexDirection: "row", gap: 7, alignItems: "center" },
  dateText: { fontFamily: "DMSans", fontSize: 13, color: "#63705f" },
  hero: {
    flexDirection: "row",
    overflow: "hidden",
    backgroundColor: "#244f41",
    borderRadius: 15,
  },
  heroCopy: {
    paddingHorizontal: 28,
    paddingVertical: 26,
    justifyContent: "center",
  },
  lessonTag: { flexDirection: "row", alignItems: "center", gap: 9 },
  tagLine: { width: 19, height: 2, backgroundColor: "#e49b71" },
  tagText: {
    fontFamily: "DMSansBold",
    letterSpacing: 1.65,
    fontSize: 10,
    color: "#e0e8d5",
  },
  heroTitle: {
    fontFamily: "DMSerifText",
    fontSize: 44,
    lineHeight: 55,
    letterSpacing: -1.3,
    color: "#fff9e9",
    marginTop: 10,
  },
  heroDetail: {
    fontFamily: "DMSans",
    fontSize: 15,
    lineHeight: 22,
    color: "#e2e9dc",
    maxWidth: 390,
    marginTop: 5,
  },
  heroActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 17,
    marginTop: 22,
  },
  start: {
    backgroundColor: "#ad472d",
    borderRadius: 7,
    minHeight: 43,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  startText: { color: "#fffdf6", fontFamily: "DMSansBold", fontSize: 14 },
  time: { flexDirection: "row", alignItems: "center", gap: 6 },
  timeText: { fontFamily: "DMSans", fontSize: 12, color: "#e1e8da" },
  fill: { width: "100%", height: "100%", position: "absolute" },
  reviewCard: {
    backgroundColor: "#e9eee2",
    borderColor: "#cddbc7",
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    marginTop: 14,
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
  },
  reviewCopy: { flexGrow: 1, flexShrink: 1, gap: 3 },
  reviewTitle: { color: "#253e32", fontSize: 18, fontFamily: "DMSansBold" },
  starterCard: {
    backgroundColor: "#f3ecd6",
    borderColor: "#dfd4b7",
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    marginTop: 14,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 10,
  },
  nextStep: { fontFamily: "DMSansBold", fontSize: 14, color: "#253e32" },
  reviewButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    minHeight: 44,
    borderRadius: 7,
    paddingHorizontal: 12,
    backgroundColor: "#fffef8",
  },
  goalCard: {
    backgroundColor: "#fffef8",
    borderColor: "#d9dfd3",
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    marginTop: 14,
    gap: 6,
  },
  goalTrack: {
    height: 7,
    borderRadius: 4,
    backgroundColor: "#dce5d6",
    overflow: "hidden",
  },
  goalFill: { height: 7, backgroundColor: "#215848" },
  sectionTitle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    marginTop: 25,
    marginBottom: 12,
  },
  h2: {
    fontFamily: "DMSerifText",
    fontSize: 26,
    letterSpacing: -0.7,
    color: "#253e32",
  },
  link: { flexDirection: "row", alignItems: "center", gap: 7, minHeight: 40 },
  linkText: { fontFamily: "DMSansBold", fontSize: 12, color: "#345b45" },
  pressed: { opacity: 0.79 },
  metrics: { flexDirection: "row", gap: 13 },
  phoneMetrics: { gap: 6 },
  metric: {
    flex: 1,
    minWidth: 0,
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 10,
    backgroundColor: "#fffef8",
    paddingHorizontal: 14,
    paddingVertical: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#dfe2d5",
  },
  metricIcon: {
    width: 37,
    height: 37,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  metricValue: {
    fontSize: 24,
    lineHeight: 28,
    fontFamily: "DMSansBold",
    color: "#294334",
    letterSpacing: -0.7,
  },
  metricLabel: { fontSize: 12, fontFamily: "DMSans", color: "#626c5e" },
  notebook: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#dce0d1",
    padding: 15,
    backgroundColor: "#fffef8",
  },
  bookHead: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    marginBottom: 13,
  },
  bookLabel: {
    fontFamily: "DMSansBold",
    letterSpacing: 1.45,
    fontSize: 10,
    color: "#4d624f",
  },
  separator: { width: 1, height: 12, backgroundColor: "#d3d9ca" },
  bookGroup: { fontFamily: "DMSans", fontSize: 12, color: "#62715f" },
  tiles: { flexDirection: "row", gap: 7 },
  tile: {
    flex: 1,
    minWidth: 0,
    minHeight: 93,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f4eb",
    borderWidth: 1,
    borderColor: "#e5e7d9",
    borderRadius: 8,
  },
  tilePressed: { backgroundColor: "#e1eadb" },
  character: { fontSize: 40, color: "#344c3c", lineHeight: 52 },
  romaji: { fontFamily: "DMSansBold", fontSize: 13, color: "#986045" },
  seen: { position: "absolute", right: 5, top: 5 },
});
