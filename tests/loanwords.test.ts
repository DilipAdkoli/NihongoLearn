import assert from "node:assert/strict";
import test from "node:test";
import {
  loanwords,
  loanwordPractice,
  searchLoanwords,
} from "../src/loanwords.ts";

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

test("each loanword quiz has one correct answer that restores the example", () => {
  for (const entry of loanwords) {
    const question = loanwordPractice.find((item) => item.id === entry.reading);
    assert.ok(question);
    assert.equal(question.choices.length, 4);
    assert.equal(new Set(question.choices).size, 4);
    assert.equal(
      question.choices.filter((choice) => choice === question.answer).length,
      1,
    );
    assert.equal(question.stem.replace("＿＿", question.answer), entry.word);
  }
});
