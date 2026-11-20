import type { Kana } from "./learning";
import type { Attempt } from "./storage.types";

export function confusedPairs(
  attempts: readonly Attempt[],
  kana: readonly Kana[],
) {
  const byId = new Map(kana.map((entry) => [entry.id, entry]));
  const byGlyph = new Map(kana.map((entry) => [entry.glyph, entry]));
  const pairs = new Map<
    string,
    { items: [Kana, Kana]; count: number; latest: number }
  >();

  for (const attempt of attempts) {
    if (attempt.mode !== "recognition" || attempt.correct) continue;
    const expected = byId.get(attempt.kanaId);
    const selected = byGlyph.get(attempt.answer);
    if (
      !expected ||
      !selected ||
      expected.script !== selected.script ||
      expected.reading === selected.reading ||
      expected.glyph.length !== selected.glyph.length
    )
      continue;
    const items: [Kana, Kana] =
      expected.id < selected.id ? [expected, selected] : [selected, expected];
    const key = items.map((item) => item.id).join(":");
    const pair = pairs.get(key);
    if (pair) {
      pair.count++;
      pair.latest = Math.max(pair.latest, attempt.at);
    } else {
      pairs.set(key, { items, count: 1, latest: attempt.at });
    }
  }

  return [...pairs.values()].sort(
    (a, b) => b.count - a.count || b.latest - a.latest,
  );
}
