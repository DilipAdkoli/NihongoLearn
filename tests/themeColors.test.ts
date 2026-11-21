import assert from "node:assert/strict";
import test from "node:test";
import { darkColor } from "../src/themeColors.ts";

function luminance(hex: string) {
  const weights = [0.2126, 0.7152, 0.0722];
  return weights.reduce((total, weight, index) => {
    const channel = parseInt(hex.slice(1 + 2 * index, 3 + 2 * index), 16) / 255;
    const linear =
      channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
    return total + weight * linear;
  }, 0);
}

test("dark theme maintains contrast for text, choices, and actions", () => {
  for (const [foreground, background] of [
    ["#203730", "#fffef8"],
    ["#566860", "#f7f6f0"],
    ["#215848", "#dfe8d9"],
    ["#8d392b", "#f3e8de"],
    ["#fffef8", "#215848"],
    ["#fffdf6", "#ad472d"],
  ]) {
    const text = luminance(darkColor(foreground));
    const surface = luminance(darkColor(background, "background"));
    const ratio =
      (Math.max(text, surface) + 0.05) / (Math.min(text, surface) + 0.05);
    assert.ok(ratio >= 4.5, `${foreground} on ${background} had ${ratio}:1`);
  }
});
