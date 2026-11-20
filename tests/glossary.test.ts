import assert from "node:assert/strict";
import test from "node:test";
import { searchGlossary } from "../src/glossary.ts";

test("glossary search handles case, katakana, full-width input, and multiple terms", () => {
  const water = {
    spelling: "水",
    kana: "みず",
    meaning: "water",
    romaji: "mizu",
  };
  const camera = {
    spelling: "カメラ",
    kana: "カメラ",
    meaning: "camera",
    romaji: "kamera",
  };
  const entries = [water, camera];
  assert.deepEqual(searchGlossary(entries, "ミズ WATER"), [water]);
  assert.deepEqual(searchGlossary(entries, "水"), [water]);
  assert.deepEqual(searchGlossary(entries, "ｶﾒﾗ"), [camera]);
  assert.deepEqual(searchGlossary(entries, "ＫＡＭＥＲＡ"), [camera]);
  assert.deepEqual(searchGlossary(entries, "  "), entries);
  assert.deepEqual(searchGlossary(entries, "coffee"), []);
});
