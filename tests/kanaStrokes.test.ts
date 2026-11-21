import assert from "node:assert/strict";
import test from "node:test";
import { kanaStrokeGuide } from "../src/kanaStrokeGuide.ts";
import {
  kanaStrokePaths,
  smallKanaStrokePaths,
} from "../src/kanaStrokePaths.ts";
import { kana } from "../src/learning.ts";

test("stroke order diagrams cover all kana in the curriculum", () => {
  assert.deepEqual(
    Object.keys(kanaStrokeGuide).sort(),
    kana.map(({ glyph }) => glyph).sort(),
  );
  for (const [glyph, strokes] of Object.entries(kanaStrokeGuide)) {
    assert.ok(strokes.length > 0, glyph);
    for (const { d, length } of strokes) {
      assert.match(d, /^M[\d.]+,[\d.]+/, glyph);
      assert.ok(Number.isFinite(length) && length > 0, glyph);
    }
    if (glyph.length === 2) {
      const [first, second] = glyph;
      const expected = [
        ...kanaStrokePaths[first],
        ...smallKanaStrokePaths[second],
      ];
      assert.deepEqual(
        strokes.map(({ d }) => d),
        expected.map(({ d }) => d),
        glyph,
      );
      assert.ok(
        strokes.every(({ transform }) => typeof transform === "string"),
        glyph,
      );
    }
  }
});
