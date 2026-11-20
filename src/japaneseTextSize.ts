export const japaneseTextSizes = [
  { id: 0, title: "Standard", scale: 1 },
  { id: 1, title: "Large", scale: 1.2 },
  { id: 2, title: "Extra large", scale: 1.4 },
] as const;

export type JapaneseTextSize = (typeof japaneseTextSizes)[number]["id"];

export function readJapaneseTextSize(value: unknown): JapaneseTextSize {
  return (
    japaneseTextSizes.find((size) => size.id === value)?.id ??
    japaneseTextSizes[0].id
  );
}

export function hasJapanese(text: string) {
  return /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\u30fc]/u.test(
    text,
  );
}
