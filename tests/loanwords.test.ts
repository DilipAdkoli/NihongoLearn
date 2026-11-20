import assert from "node:assert/strict";
import test from "node:test";
import { loanwords, searchLoanwords } from "../src/loanwords.ts";

test("each loanword example includes the advertised combination", () => {
  assert.equal(
    new Set(loanwords.map((entry) => entry.sound)).size,
    loanwords.length,
  );
  for (const entry of loanwords) assert.ok(entry.word.includes(entry.sound));
});

test("loanword reference searches combination, full-width romaji, and English together", () => {
  assert.deepEqual(
    searchLoanwords("ﾃｨ tissue").map((entry) => entry.sound),
    ["ティ"],
  );
  assert.deepEqual(
    searchLoanwords("ＦＯ fork").map((entry) => entry.sound),
    ["フォ"],
  );
  assert.deepEqual(searchLoanwords("ヴィ"), []);
});
