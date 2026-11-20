import assert from "node:assert/strict";
import test from "node:test";
import { searchGlossary, wordChoices } from "../src/glossary.ts";

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

test("word practice choices omit other senses of the same text and duplicate meanings", () => {
  const entry = { spelling: "かさ", kana: "かさ", meaning: "umbrella" };
  const entries = [
    entry,
    { ...entry, meaning: "bulk" },
    { spelling: "傘", kana: "かさ", meaning: "Umbrella" },
    { spelling: "パン", kana: "パン", meaning: "bread" },
    { spelling: "フード", kana: "フード", meaning: "Bread" },
    { spelling: "水", kana: "みず", meaning: "water" },
    { spelling: "鍵", kana: "かぎ", meaning: "key" },
  ];
  assert.deepEqual(wordChoices(entry, entries), [
    "bread",
    "key",
    "umbrella",
    "water",
  ]);
});
