import { kanaStrokePaths, smallKanaStrokePaths } from "./kanaStrokePaths.ts";
import { kana } from "./learning.ts";

type GuideStroke = (typeof kanaStrokePaths)[string][number] & {
  transform?: string;
};

const combinationPaths = Object.fromEntries(
  kana
    .filter(({ glyph }) => glyph.length === 2)
    .map(({ glyph }) => {
      const [first, second] = glyph;
      return [
        glyph,
        [
          ...kanaStrokePaths[first].map((stroke) => ({
            ...stroke,
            transform: "translate(2 18) scale(0.66)",
          })),
          ...smallKanaStrokePaths[second].map((stroke) => ({
            ...stroke,
            transform: "translate(42 20) scale(0.66)",
          })),
        ],
      ];
    }),
);

export const kanaStrokeGuide: Readonly<Record<string, readonly GuideStroke[]>> =
  {
    ...kanaStrokePaths,
    ...combinationPaths,
  };
