import assert from "node:assert/strict";
import test from "node:test";
import { kanaStrokePaths } from "../src/kanaStrokePaths.ts";
import { kana } from "../src/learning.ts";

test("stroke order diagrams cover every basic hiragana and katakana", () => {
  const basicGlyphs = ["hiragana", "katakana"].flatMap((script) =>
    kana
      .filter((item) => item.script === script)
      .slice(0, 46)
      .map(({ glyph }) => glyph),
  );
  assert.deepEqual(Object.keys(kanaStrokePaths).sort(), basicGlyphs.sort());
  for (const [glyph, strokes] of Object.entries(kanaStrokePaths)) {
    assert.ok(strokes.length && strokes.length <= 4, glyph);
    for (const { d, length } of strokes) {
      assert.match(d, /^M[\d.]+,[\d.]+/, glyph);
      assert.ok(Number.isFinite(length) && length > 0, glyph);
    }
  }
});
