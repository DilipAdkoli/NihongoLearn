import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import Svg, { Line, Path } from "react-native-svg";
import { JapaneseText } from "../src/JapaneseText";
import { kana, type Kana } from "../src/learning";
import { kanaStrokePaths } from "../src/kanaStrokePaths";
import { createThemedStyles, useThemeColor } from "../src/theme";

const groups = [
  {
    title: "Hiragana",
    items: kana.filter(
      (item) =>
        item.script === "hiragana" &&
        Object.hasOwn(kanaStrokePaths, item.glyph),
    ),
  },
  {
    title: "Katakana",
    items: kana.filter(
      (item) =>
        item.script === "katakana" &&
        Object.hasOwn(kanaStrokePaths, item.glyph),
    ),
  },
];

const strokeDuration = 650;

function StrokeButton({
  label,
  onPress,
  disabled,
  primary,
}: {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  primary?: boolean;
}) {
  const s = useStyles();
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={[s.button, primary && s.primary, disabled && s.disabled]}
    >
      <Text style={[s.buttonText, primary && s.primaryText]}>{label}</Text>
    </Pressable>
  );
}

export default function KanaStrokes() {
  const s = useStyles();
  const themeColor = useThemeColor();
  const [group, setGroup] = useState(0);
  const [item, setItem] = useState(groups[0].items[0]);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const strokes = kanaStrokePaths[item.glyph];
  const total = strokes.length;
  const completed = Math.floor(step);
  const guideColor = themeColor("#a8bea7");
  const inkColor = themeColor("#215848");
  const currentColor = themeColor("#c95634");

  useEffect(() => {
    if (!playing) return;
    let start: number | undefined;
    let frame: number;
    function draw(time: number) {
      start ??= time;
      const next = Math.min((time - start) / strokeDuration, total);
      setStep(next);
      if (next < total) frame = requestAnimationFrame(draw);
      else setPlaying(false);
    }
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [playing, total]);

  function show(next: Kana) {
    setPlaying(false);
    setStep(0);
    setItem(next);
  }

  function togglePlayback() {
    setStep(playing ? Math.ceil(step) : 0);
    setPlaying(!playing);
  }

  return (
    <View style={s.page}>
      <Link href="/learn" style={s.link}>
        ‹ Back to Learn
      </Link>
      <Text accessibilityRole="header" style={s.title}>
        Kana stroke order
      </Text>
      <Text style={s.body}>
        Watch each vowel’s strokes in order, then copy it on paper.
      </Text>
      <View accessibilityRole="tablist" style={s.controls}>
        {groups.map(({ title, items }, index) => (
          <Pressable
            key={title}
            accessibilityRole="tab"
            aria-selected={index === group}
            onPress={() => {
              setGroup(index);
              show(items[0]);
            }}
            style={[s.button, index === group && s.selected]}
          >
            <Text style={s.buttonText}>{title}</Text>
          </Pressable>
        ))}
      </View>
      <View
        style={s.controls}
        accessibilityLabel={`${groups[group].title} vowels`}
      >
        {groups[group].items.map((vowel) => (
          <Pressable
            key={vowel.id}
            accessibilityRole="button"
            accessibilityLabel={`Show ${vowel.glyph}`}
            accessibilityState={{ selected: vowel.id === item.id }}
            onPress={() => show(vowel)}
            style={[s.button, vowel.id === item.id && s.selected]}
          >
            <JapaneseText style={s.glyph}>{vowel.glyph}</JapaneseText>
          </Pressable>
        ))}
      </View>
      <View style={s.card}>
        <Svg
          width={216}
          height={216}
          viewBox="0 0 109 109"
          accessibilityRole="image"
          accessibilityLabel={`Stroke diagram for ${item.glyph}`}
          style={s.diagram}
        >
          <Line
            x1={54.5}
            x2={54.5}
            y1={0}
            y2={109}
            stroke={guideColor}
            strokeWidth={0.4}
            strokeDasharray={[2, 2]}
          />
          <Line
            y1={54.5}
            y2={54.5}
            x1={0}
            x2={109}
            stroke={guideColor}
            strokeWidth={0.4}
            strokeDasharray={[2, 2]}
          />
          {strokes.map(({ d, length }, index) => {
            const amount = Math.min(Math.max(step - index, 0), 1);
            return (
              <Path
                key={d}
                d={d}
                fill="none"
                stroke={
                  amount === 0
                    ? guideColor
                    : index + 1 >= step
                      ? currentColor
                      : inkColor
                }
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={
                  amount > 0 && amount < 1 ? [length, length] : undefined
                }
                strokeDashoffset={length * (1 - amount)}
              />
            );
          })}
        </Svg>
        <Text accessibilityLiveRegion="polite" style={s.body}>
          {completed} of {total} strokes shown
        </Text>
        <View style={s.controls}>
          <StrokeButton
            label={playing ? "Stop animation" : "Play stroke order"}
            onPress={togglePlayback}
            primary
          />
          <StrokeButton
            label="Previous stroke"
            disabled={playing || completed === 0}
            onPress={() => setStep(completed - 1)}
          />
          <StrokeButton
            label="Next stroke"
            disabled={playing || completed === total}
            onPress={() => setStep(completed + 1)}
          />
        </View>
      </View>
      <Text style={s.body}>
        Stroke paths from{" "}
        <Link href="https://kanjivg.tagaini.net/" style={s.link}>
          KanjiVG
        </Link>{" "}
        by Ulrich Apel, licensed under{" "}
        <Link
          href="https://creativecommons.org/licenses/by-sa/3.0/"
          style={s.link}
        >
          CC BY-SA 3.0
        </Link>
        .
      </Text>
    </View>
  );
}

const useStyles = createThemedStyles({
  page: { width: "100%", maxWidth: 760, gap: 14 },
  link: { color: "#215848", fontFamily: "DMSansBold", alignSelf: "flex-start" },
  title: {
    color: "#203730",
    fontFamily: "DMSerifText",
    fontSize: 36,
    lineHeight: 45,
  },
  body: {
    color: "#566860",
    fontFamily: "DMSans",
    fontSize: 15,
    lineHeight: 22,
  },
  controls: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  button: {
    minHeight: 44,
    minWidth: 44,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#a8bea7",
    borderRadius: 8,
  },
  selected: { backgroundColor: "#dfe8d9" },
  buttonText: { color: "#215848", fontFamily: "DMSansBold" },
  primary: { backgroundColor: "#215848", borderColor: "#215848" },
  primaryText: { color: "#fffef8" },
  disabled: { opacity: 0.55 },
  glyph: { color: "#203730", fontSize: 25 },
  card: {
    padding: 12,
    gap: 12,
    alignItems: "flex-start",
    backgroundColor: "#fffef8",
    borderWidth: 1,
    borderColor: "#a8bea7",
    borderRadius: 12,
  },
  diagram: {
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#a8bea7",
    borderRadius: 6,
  },
});
