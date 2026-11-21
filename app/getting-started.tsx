import { Link, router } from "expo-router";
import { useRef, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { dailyGoals } from "../src/dailyGoal";
import { overviewPaths, type OverviewPath } from "../src/overviewPath";
import { useStudy } from "../src/study";
import { createThemedStyles } from "../src/theme";

export default function GettingStarted() {
  const s = useStyles();
  const { data, changeDailyGoal, changeOverviewPath } = useStudy();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const active = useRef(false);

  async function save(action: () => Promise<void>) {
    if (active.current) return;
    active.current = true;
    setSaving(true);
    setError("");
    try {
      await action();
    } catch {
      setError("Your choice couldn’t be saved. Try again.");
    } finally {
      active.current = false;
      setSaving(false);
    }
  }

  function start(path: OverviewPath) {
    void save(async () => {
      await changeOverviewPath(path);
      router.push(overviewPaths[path].href);
    });
  }

  return (
    <View style={s.page}>
      <Link href="/" style={s.link}>
        ‹ Back to Overview
      </Link>
      <Text accessibilityRole="header" style={s.title}>
        Choose a study path
      </Text>
      <Text style={s.body}>
        Your progress stays on this device. You can change your path and goal
        later in Settings.
      </Text>
      <View style={s.card}>
        <Text accessibilityRole="header" style={s.heading}>
          Daily practice goal
        </Text>
        <View
          accessibilityRole="radiogroup"
          accessibilityLabel="Questions per day"
          style={s.options}
        >
          {dailyGoals.map((goal) => (
            <Pressable
              key={goal}
              accessibilityRole="radio"
              accessibilityLabel={
                goal ? `${goal} questions per day` : "No daily goal"
              }
              aria-checked={data.dailyGoal === goal}
              disabled={saving}
              onPress={() => void save(() => changeDailyGoal(goal))}
              style={[
                s.button,
                data.dailyGoal === goal && s.selected,
                saving && s.disabled,
              ]}
            >
              <Text style={s.buttonLabel}>{goal || "Off"}</Text>
            </Pressable>
          ))}
        </View>
      </View>
      {error && (
        <Text accessibilityRole="alert" style={s.error}>
          {error}
        </Text>
      )}
      {overviewPaths.map((path) => (
        <View key={path.id} style={s.card}>
          <Text accessibilityRole="header" style={s.heading}>
            {path.title}
          </Text>
          <Text style={s.body}>{path.detail}</Text>
          <Pressable
            accessibilityRole="button"
            disabled={saving}
            onPress={() => start(path.id)}
            style={[s.button, s.primary, saving && s.disabled]}
          >
            <Text style={s.primaryLabel}>{path.action}</Text>
          </Pressable>
        </View>
      ))}
    </View>
  );
}

const useStyles = createThemedStyles({
  page: { width: "100%", maxWidth: 760, gap: 14 },
  link: {
    color: "#215848",
    fontFamily: "DMSansBold",
    paddingVertical: 8,
    alignSelf: "flex-start",
  },
  title: {
    color: "#203730",
    fontFamily: "DMSerifText",
    fontSize: 36,
    lineHeight: 45,
  },
  heading: { color: "#203730", fontFamily: "DMSerifText", fontSize: 23 },
  body: {
    color: "#566860",
    fontFamily: "DMSans",
    fontSize: 15,
    lineHeight: 22,
  },
  card: {
    gap: 10,
    padding: 14,
    backgroundColor: "#fffef8",
    borderColor: "#dadfd3",
    borderWidth: 1,
    borderRadius: 10,
  },
  options: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  button: {
    minWidth: 44,
    minHeight: 44,
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
    borderColor: "#dadfd3",
    borderWidth: 1,
    borderRadius: 8,
  },
  selected: { backgroundColor: "#dfe8d9", borderColor: "#a8bea7" },
  buttonLabel: { color: "#215848", fontFamily: "DMSansBold" },
  primary: { backgroundColor: "#215848", borderColor: "#215848" },
  primaryLabel: { color: "#fffef8", fontFamily: "DMSansBold" },
  disabled: { opacity: 0.65 },
  error: { color: "#8d392b", fontFamily: "DMSans" },
});
