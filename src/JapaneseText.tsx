import {
  StyleSheet,
  Text,
  type StyleProp,
  type TextProps,
  type TextStyle,
} from "react-native";
import { japaneseTextSizes } from "./japaneseTextSize";
import { useStudy } from "./study";

export function useJapaneseTextStyle(
  style: StyleProp<TextStyle>,
  scaleText = true,
): StyleProp<TextStyle> {
  const { data } = useStudy();
  const { scale } = japaneseTextSizes[data.japaneseTextSize];
  if (!scaleText || scale === 1) return style;

  const base = StyleSheet.flatten(style);
  return [
    style,
    {
      fontSize: (base?.fontSize ?? 14) * scale,
      lineHeight: base?.lineHeight ? base.lineHeight * scale : undefined,
    },
  ];
}

export function JapaneseText({
  style,
  scaleText = true,
  ...props
}: TextProps & { scaleText?: boolean }) {
  const readingStyle = useJapaneseTextStyle(style, scaleText);
  return <Text {...props} style={readingStyle} />;
}
