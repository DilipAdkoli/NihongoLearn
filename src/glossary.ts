export type GlossaryEntry = {
  spelling: string;
  kana: string;
  meaning: string;
  romaji?: string;
  audio?: number;
};

export function glossaryKey(entry: GlossaryEntry) {
  return `${entry.kana}:${entry.meaning.toLowerCase()}`;
}

function normalizeQuery(value: string) {
  return value
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[ァ-ヶ]/g, (letter) =>
      String.fromCharCode(letter.charCodeAt(0) - 0x60),
    )
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function searchGlossary(
  entries: readonly GlossaryEntry[],
  query: string,
) {
  const terms = normalizeQuery(query).split(" ").filter(Boolean);
  return entries.filter((entry) => {
    const searchable = normalizeQuery(
      [entry.spelling, entry.kana, entry.meaning, entry.romaji].join(" "),
    );
    return terms.every((term) => searchable.includes(term));
  });
}
