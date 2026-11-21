import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Platform, Pressable, Text, View, type ViewStyle } from "react-native";
import Svg, { Line, Path } from "react-native-svg";
import { JapaneseText } from "../src/JapaneseText";
import { kana, lessons, type Kana } from "../src/learning";
import { kanaStrokeGuide } from "../src/kanaStrokeGuide";
import { createThemedStyles, useThemeColor } from "../src/theme";
import { kanaDiagramSize, useKanaTrace } from "../src/useKanaTrace";

const kanaById = new Map(kana.map((item) => [item.id, item]));
const categories = ["Basic", "Marked", "Combinations"] as const;

function strokeCategory(glyph: string): (typeof categories)[number] {
  if (glyph.length > 1) return "Combinations";
  return glyph.normalize("NFD").length > 1 ? "Marked" : "Basic";
}

const groups = [
  { title: "Hiragana", script: "hiragana" },
  { title: "Katakana", script: "katakana" },
].map(({ title, script }) => {
  const rows = lessons
    .filter((lesson) => lesson.script === script)
    .map(({ notebook, ids }) => ({
      title: notebook,
      items: ids.map((id) => kanaById.get(id)!),
      glyph: kanaById.get(ids[0])!.glyph,
    }));
  return {
    title,
    sections: categories.map((category) => ({
      title: category,
      rows: rows.filter(({ glyph }) => strokeCategory(glyph) === category),
    })),
  };
});

const strokeDuration = 650;
const drawOnWeb: ViewStyle & { touchAction: "none" } = { touchAction: "none" };

function StrokeTabs({
  label,
  options,
  selected,
  onSelect,
}: {
  label: string;
  options: readonly { title: string; glyph?: string }[];
  selected: number;
  onSelect: (index: number) => void;
}) {
  const s = useStyles();
  return (
    <View
      accessibilityRole="tablist"
      accessibilityLabel={label}
      style={s.controls}
    >
      {options.map(({ title, glyph }, index) => (
        <Pressable
          key={title}
          accessibilityRole="tab"
          accessibilityLabel={title}
          aria-selected={index === selected}
          onPress={() => onSelect(index)}
          style={[s.button, index === selected && s.selected]}
        >
          {glyph ? (
            <JapaneseText style={s.rowGlyph}>{glyph}</JapaneseText>
          ) : (
            <Text style={s.buttonText}>{title}</Text>
          )}
        </Pressable>
      ))}
    </View>
  );
}

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
  const [section, setSection] = useState(0);
  const [row, setRow] = useState(0);
  const [item, setItem] = useState(groups[0].sections[0].rows[0].items[0]);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [tracing, setTracing] = useState(false);
  const trace = useKanaTrace();
  const activeGroup = groups[group];
  const activeSection = activeGroup.sections[section];
  const activeRow = activeSection.rows[row];
  const strokes = kanaStrokeGuide[item.glyph];
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
    trace.clear();
  }

  function togglePlayback() {
    setStep(playing ? Math.ceil(step) : 0);
    setPlaying(!playing);
  }

  function toggleTracing() {
    setPlaying(false);
    setStep(0);
    trace.clear();
    setTracing(!tracing);
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
        Watch or trace hiragana and katakana, including combinations with small
        kana.
      </Text>
      <StrokeTabs
        label="Writing systems"
        options={groups}
        selected={group}
        onSelect={(next) => {
          setGroup(next);
          setSection(0);
          setRow(0);
          show(groups[next].sections[0].rows[0].items[0]);
        }}
      />
      <StrokeTabs
        label="Kana type"
        options={activeGroup.sections}
        selected={section}
        onSelect={(next) => {
          setSection(next);
          setRow(0);
          show(activeGroup.sections[next].rows[0].items[0]);
        }}
      />
      <StrokeTabs
        label="Kana rows"
        options={activeSection.rows}
        selected={row}
        onSelect={(next) => {
          setRow(next);
          show(activeSection.rows[next].items[0]);
        }}
      />
      <View
        style={s.controls}
        accessibilityLabel={`${activeGroup.title} ${activeRow.title}`}
      >
        {activeRow.items.map((character) => (
          <Pressable
            key={character.id}
            accessibilityRole="button"
            accessibilityLabel={`Show ${character.glyph}`}
            accessibilityState={{ selected: character.id === item.id }}
            onPress={() => show(character)}
            style={[s.button, character.id === item.id && s.selected]}
          >
            <JapaneseText style={s.glyph}>{character.glyph}</JapaneseText>
          </Pressable>
        ))}
      </View>
      <View style={s.card}>
        <StrokeButton
          label={tracing ? "Back to stroke order" : "Try tracing"}
          onPress={toggleTracing}
        />
        {tracing && (
          <Text style={s.body}>Draw over the guide, one stroke at a time.</Text>
        )}
        <View
          accessibilityLabel={
            tracing ? `Drawing area for ${item.glyph}` : undefined
          }
          style={[s.board, tracing && Platform.OS === "web" && drawOnWeb]}
          {...(tracing ? trace.panHandlers : {})}
        >
          <Svg
            width={kanaDiagramSize}
            height={kanaDiagramSize}
            viewBox="0 0 109 109"
            accessibilityRole="image"
            accessibilityLabel={`Stroke diagram for ${item.glyph}`}
            style={s.diagram}
            pointerEvents="none"
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
            {strokes.map(({ d, length, transform }, index) => {
              const amount = Math.min(Math.max(step - index, 0), 1);
              return (
                <Path
                  key={index}
                  d={d}
                  transform={transform}
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
            {tracing &&
              [...trace.strokes, ...(trace.draft ? [trace.draft] : [])].map(
                (path, index) => (
                  <Path
                    key={index}
                    d={path}
                    fill="none"
                    stroke={inkColor}
                    strokeWidth={3}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                ),
              )}
          </Svg>
        </View>
        {tracing ? (
          <>
            <Text accessibilityLiveRegion="polite" style={s.body}>
              {trace.strokes.length}{" "}
              {trace.strokes.length === 1 ? "stroke" : "strokes"} drawn
            </Text>
            <View style={s.controls}>
              <StrokeButton
                label="Undo last stroke"
                disabled={!trace.strokes.length}
                onPress={trace.undo}
              />
              <StrokeButton
                label="Clear drawing"
                disabled={!trace.strokes.length}
                onPress={trace.clear}
              />
            </View>
          </>
        ) : (
          <>
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
          </>
        )}
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
  rowGlyph: { color: "#215848", fontSize: 18 },
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
  board: {
    alignSelf: "center",
    width: kanaDiagramSize,
    height: kanaDiagramSize,
  },
});
