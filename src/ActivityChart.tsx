import { createThemedStyles, useThemeColor } from "./theme";
import { Text, View } from "react-native";
import { recentActivity } from "./activity";
import type { Attempt } from "./storage.types";

export function ActivityChart({ attempts }: { attempts: readonly Attempt[] }) {
  const s = useStyles();
  const themeColor = useThemeColor();
  const days = recentActivity(attempts, new Date());
  const maximum = Math.max(1, ...days.map((day) => day.answered));
  const practiced = days.filter((day) => day.answered > 0).length;
  const labels = new Intl.DateTimeFormat(undefined, { weekday: "short" });
  const dates = new Intl.DateTimeFormat(undefined, {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
  return (
    <View style={s.card}>
      <Text accessibilityRole="header" style={s.title}>
        Last seven days
      </Text>
      <Text style={s.detail}>
        {practiced
          ? `Practiced on ${practiced} of the last 7 days.`
          : "Your answers will appear here after you practice."}
      </Text>
      <View style={s.columns}>
        {days.map(({ date, answered, correct }) => (
          <View
            key={date.getTime()}
            style={s.column}
            accessible
            accessibilityLabel={`${dates.format(date)}, ${answered} answered, ${correct} correct`}
          >
            <Text style={s.count}>{answered}</Text>
            <View style={s.barSpace}>
              <View
                style={[
                  s.bar,
                  {
                    height: answered
                      ? Math.max(5, (54 * answered) / maximum)
                      : 3,
                    backgroundColor: themeColor(
                      answered ? "#215848" : "#c9d2c1",
                      "background",
                    ),
                  },
                ]}
              />
            </View>
            <Text style={s.detail} numberOfLines={1}>
              {labels.format(date)}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const useStyles = createThemedStyles({
  card: {
    padding: 16,
    gap: 6,
    borderColor: "#dadfd3",
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: "#fffef8",
  },
  title: { fontFamily: "DMSerifText", fontSize: 24, color: "#203730" },
  detail: { fontFamily: "DMSans", fontSize: 12, color: "#566860" },
  columns: { flexDirection: "row", gap: 4, marginTop: 8 },
  column: { flex: 1, minWidth: 0, alignItems: "center", gap: 4 },
  count: { color: "#203730", fontSize: 12, fontFamily: "DMSansBold" },
  barSpace: {
    width: "100%",
    maxWidth: 38,
    height: 54,
    justifyContent: "flex-end",
    alignItems: "stretch",
  },
  bar: { borderRadius: 4 },
});
