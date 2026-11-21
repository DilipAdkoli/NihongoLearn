import { StyleSheet } from "react-native";
import { useStudy } from "./study";
import { darkColor, unchangedColor } from "./themeColors";

export function useThemeColor() {
  return useStudy().data.darkMode ? darkColor : unchangedColor;
}

function darkStyleValue(key: string, value: unknown) {
  if (typeof value !== "string") return value;
  if (key.startsWith("border") && key.endsWith("Color"))
    return darkColor(value, "border");
  if (key === "backgroundColor") return darkColor(value, "background");
  if (key === "color" || key === "tintColor") return darkColor(value);
  return value;
}

type Styles = Parameters<typeof StyleSheet.create>[0];

export function createThemedStyles<T extends Styles>(styles: T & Styles) {
  const dark = Object.fromEntries(
    Object.entries(styles).map(([name, style]) => [
      name,
      Object.fromEntries(
        Object.entries(style).map(([key, value]) => [
          key,
          darkStyleValue(key, value),
        ]),
      ),
    ]),
  ) as T;
  const lightStyles = StyleSheet.create(styles);
  const darkStyles = StyleSheet.create(dark);
  return function useStyles() {
    return useStudy().data.darkMode ? darkStyles : lightStyles;
  };
}
