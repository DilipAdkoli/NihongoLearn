import assert from "node:assert/strict";
import test from "node:test";
import { matchesTypedAnswer } from "../src/typedAnswer.ts";

test("typed Japanese accepts lesson spellings and normalizes IME variants", () => {
  assert.ok(matchesTypedAnswer(" 水　", ["みず", "水"]));
  assert.ok(matchesTypedAnswer("みす\u3099", ["みず", "水"]));
  assert.ok(matchesTypedAnswer("ﾊﾟﾝ", ["パン"]));
  assert.ok(matchesTypedAnswer("友達", ["ともだち", "友だち", "友達"]));
  assert.equal(matchesTypedAnswer("mizu", ["みず", "水"]), false);
  assert.equal(matchesTypedAnswer("みす", ["みず", "水"]), false);
  assert.equal(matchesTypedAnswer(" ", [""]), false);
});
