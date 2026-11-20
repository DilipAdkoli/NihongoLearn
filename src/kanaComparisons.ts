export const kanaComparisons = [
  {
    title: "め and ぬ",
    entries: [
      {
        id: "me",
        tip: "Look at the right end. め has a simple curve without the small loop.",
      },
      { id: "nu", tip: "Look for the extra loop on the lower right of ぬ." },
    ],
  },
  {
    title: "れ and ね",
    entries: [
      { id: "re", tip: "The right side of れ ends in an outward sweep." },
      { id: "ne", tip: "The right side of ね curls around into a small loop." },
    ],
  },
  {
    title: "シ and ツ",
    entries: [
      {
        id: "kata-shi",
        tip: "The two small strokes are arranged vertically on the left. The long stroke sweeps up toward the right.",
      },
      {
        id: "kata-tsu",
        tip: "The small strokes sit across the top. The long stroke sweeps down toward the left.",
      },
    ],
  },
  {
    title: "ソ and ン",
    entries: [
      {
        id: "kata-so",
        tip: "Look for the steeper short stroke. The long stroke sweeps down toward the left.",
      },
      {
        id: "kata-n",
        tip: "Look for the flatter short stroke. The long stroke sweeps up toward the right.",
      },
    ],
  },
] as const;
