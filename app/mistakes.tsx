import { Link } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { JapaneseText } from "../src/JapaneseText";
import { kana } from "../src/learning";
import {
  mistakeJournal,
  mistakeSkillCounts,
} from "../src/mistakeJournal";
import { reviewCourses } from "../src/reviewCourses";
import { useStudy } from "../src/study";
import { createThemedStyles } from "../src/theme";

export default function Mistakes() {
  const s = useStyles();
  const { data } = useStudy();
  const [skill, setSkill] = useState("All");
  const entries = mistakeJournal(data.attempts, reviewCourses, kana);
  const skills = mistakeSkillCounts(entries);
  const shown =
    skill === "All"
      ? entries
      : entries.filter((entry) => entry.skill === skill);

  return (
    <View style={s.page}>
      <Link href="/review" style={s.back}>
        ‹ Back to Review
      </Link>
      <Text accessibilityRole="header" style={s.title}>
        Mistake journal
      </Text>
      <Text style={s.detail}>
        {entries.length === 0
          ? "No unanswered mistakes in your practice history."
          : `${entries.length} questions to revisit. A correct retry clears each mistake from this journal.`}
      </Text>
      {entries.length > 0 && (
        <View style={s.filters}>
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ selected: skill === "All" }}
            onPress={() => setSkill("All")}
            style={[s.filter, skill === "All" && s.activeFilter]}
          >
            <Text style={[s.filterText, skill === "All" && s.activeText]}>
              All ({entries.length})
            </Text>
          </Pressable>
          {skills.map(({ skill: name, count }) => (
            <Pressable
              key={name}
              accessibilityRole="button"
              accessibilityState={{ selected: skill === name }}
              onPress={() => setSkill(name)}
              style={[s.filter, skill === name && s.activeFilter]}
            >
              <Text style={[s.filterText, skill === name && s.activeText]}>
                {name} ({count})
              </Text>
            </Pressable>
          ))}
        </View>
      )}
      {shown.map((item) => (
        <View key={item.key} style={s.card}>
          <Text style={s.label}>
            {item.skill} · {new Date(item.at).toLocaleDateString()}
          </Text>
          <JapaneseText accessibilityRole="header" style={s.heading}>
            {item.title}
          </JapaneseText>
          <JapaneseText style={s.detail}>{item.prompt}</JapaneseText>
          <View style={s.answer}>
            <Text style={s.answerLabel}>Your answer</Text>
            <JapaneseText style={s.wrong}>
              {item.yourAnswer || "No answer recorded"}
            </JapaneseText>
          </View>
          <View style={s.answer}>
            <Text style={s.answerLabel}>Correct answer</Text>
            <JapaneseText style={s.correct}>{item.correctAnswer}</JapaneseText>
          </View>
          {!!item.feedback && (
            <JapaneseText style={s.detail}>{item.feedback}</JapaneseText>
          )}
          <Link href={item.href} asChild>
            <Pressable accessibilityRole="link" style={s.action}>
              <Text style={s.actionText}>Practice this skill ›</Text>
            </Pressable>
          </Link>
        </View>
      ))}
      {entries.length === 0 && (
        <View style={s.card}>
          <Text style={s.heading}>All caught up</Text>
          <Text style={s.detail}>
            Answer practice questions to see helpful corrections here.
          </Text>
          <Link href="/learn" style={s.back}>
            Explore lessons ›
          </Link>
        </View>
      )}
    </View>
  );
}

const useStyles = createThemedStyles({
  page: { maxWidth: 760, width: "100%", gap: 14 },
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
  heading: {
    fontFamily: "DMSerifText",
    fontSize: 23,
    lineHeight: 29,
    color: "#203730",
  },
  detail: { fontFamily: "DMSans", fontSize: 15, lineHeight: 22, color: "#566860" },
  filters: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  filter: {
    borderWidth: 1,
    borderColor: "#dadfd3",
    backgroundColor: "#fffef8",
    borderRadius: 18,
    paddingVertical: 9,
    paddingHorizontal: 12,
    minHeight: 40,
    justifyContent: "center",
  },
  activeFilter: { backgroundColor: "#215848", borderColor: "#215848" },
  filterText: { fontFamily: "DMSansBold", fontSize: 13, color: "#215848" },
  activeText: { color: "#fffef8" },
  card: {
    backgroundColor: "#fffef8",
    borderWidth: 1,
    borderColor: "#dadfd3",
    borderRadius: 10,
    padding: 16,
    gap: 10,
  },
  label: {
    fontFamily: "DMSansBold",
    fontSize: 12,
    color: "#566860",
  },
  answer: { gap: 4 },
  answerLabel: { fontFamily: "DMSansBold", fontSize: 12, color: "#566860" },
  wrong: { fontFamily: "DMSans", color: "#a94128", fontSize: 17 },
  correct: { fontFamily: "DMSansBold", color: "#215848", fontSize: 17 },
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
