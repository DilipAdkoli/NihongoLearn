import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { starterPath } from "../src/starterPath";
import { startLesson, useStudy } from "../src/study";

type Step = ReturnType<typeof starterPath>[number];

function StepAction({ step }: { step: Step }) {
  const label = step.complete ? "Practice again" : "Open";
  const text = (
    <Text style={[s.buttonText, step.complete && s.doneButtonText]}>
      {label}
    </Text>
  );
  const style = [s.button, step.complete && s.doneButton];
  if ("href" in step) {
    return (
      <Link href={step.href} asChild>
        <Pressable
          accessibilityRole="link"
          accessibilityLabel={`${label} ${step.title}`}
          style={() => style}
        >
          {text}
        </Pressable>
      </Link>
    );
  }
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${label} ${step.title}`}
      onPress={() => startLesson(step.seen)}
      style={style}
    >
      {text}
    </Pressable>
  );
}

export default function StarterPath() {
  const { data } = useStudy();
  const steps = starterPath(data);
  const completed = steps.filter((step) => step.complete).length;
  const next = steps.find((step) => !step.complete);

  return (
    <View style={s.page}>
      <Link href="/learn" style={s.back}>
        ‹ Back to Learn
      </Link>
      <Text accessibilityRole="header" style={s.title}>
        Start learning Japanese
      </Text>
      <Text style={s.detail}>
        {completed} of {steps.length} steps complete
      </Text>
      <View
        accessible
        accessibilityRole="progressbar"
        accessibilityValue={{ min: 0, max: steps.length, now: completed }}
        style={s.track}
      >
        <View
          style={[s.fill, { width: `${(100 * completed) / steps.length}%` }]}
        />
      </View>
      {steps.map((step) => (
        <View
          key={step.id}
          style={[s.card, step.id === next?.id && s.nextCard]}
        >
          {(step.complete || step.id === next?.id) && (
            <Text style={s.status}>
              {step.complete ? "Complete" : "Up next"}
            </Text>
          )}
          <Text accessibilityRole="header" style={s.heading}>
            {step.title}
          </Text>
          <Text style={s.detail}>{step.detail}</Text>
          <StepAction step={step} />
        </View>
      ))}
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
  heading: { color: "#203730", fontFamily: "DMSerifText", fontSize: 23 },
  detail: {
    fontFamily: "DMSans",
    fontSize: 15,
    color: "#566860",
    lineHeight: 22,
  },
  status: { fontFamily: "DMSansBold", fontSize: 12, color: "#215848" },
  card: {
    backgroundColor: "#fffef8",
    borderWidth: 1,
    borderColor: "#dadfd3",
    borderRadius: 8,
    padding: 12,
    gap: 6,
  },
  nextCard: { backgroundColor: "#e9eee2", borderColor: "#a8bea7" },
  track: {
    height: 7,
    borderRadius: 4,
    backgroundColor: "#dce5d6",
    overflow: "hidden",
  },
  fill: { height: 7, backgroundColor: "#215848" },
  button: {
    alignSelf: "flex-start",
    minHeight: 44,
    paddingHorizontal: 14,
    justifyContent: "center",
    borderRadius: 6,
    backgroundColor: "#215848",
  },
  buttonText: { color: "#fffef8", fontFamily: "DMSansBold" },
  doneButton: { backgroundColor: "#dfe8d9" },
  doneButtonText: { color: "#215848" },
});
