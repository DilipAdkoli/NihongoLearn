import { createThemedStyles } from "./theme";
import { Link, type Href } from "expo-router";
import { Pressable, Text, View } from "react-native";
import type { completeSteps } from "./learningPath";
import { startLesson } from "./study";

type Step = ReturnType<typeof completeSteps>[number];

function StepAction({ step }: { step: Step }) {
  const s = useStyles();
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
    <View style={s.actions}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${label} ${step.title}`}
        onPress={() => startLesson([...step.seen])}
        style={style}
      >
        {text}
      </Pressable>
      {step.mastery && (
        <Link href={step.mastery.href} asChild>
          <Pressable
            accessibilityRole="link"
            accessibilityLabel={`Listening check ${step.title}`}
            style={[s.button, s.checkButton]}
          >
            <Text style={s.checkButtonText}>Listening check</Text>
          </Pressable>
        </Link>
      )}
    </View>
  );
}

export function LearningPath({
  title,
  steps,
  completion,
}: {
  title: string;
  steps: readonly Step[];
  completion?: { href: Href; label: string };
}) {
  const s = useStyles();
  const completed = steps.filter((step) => step.complete).length;
  const next = steps.find((step) => !step.complete);

  return (
    <View style={s.page}>
      <Link href="/learn" style={s.back}>
        ‹ Back to Learn
      </Link>
      <Text accessibilityRole="header" style={s.title}>
        {title}
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
      {!next && completion && (
        <Link href={completion.href} style={s.back}>
          {completion.label} ›
        </Link>
      )}
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
  actions: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
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
  checkButton: {
    backgroundColor: "#fffef8",
    borderWidth: 1,
    borderColor: "#215848",
  },
  checkButtonText: { color: "#215848", fontFamily: "DMSansBold" },
});
