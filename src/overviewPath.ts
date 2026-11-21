export const overviewPaths = [
  {
    id: 0,
    title: "Beginner starter path",
    detail:
      "Learn your first kana, read short sentences, and order tea in Japanese.",
    href: "/starter-path",
    action: "Open starter path",
  },
  {
    id: 1,
    title: "Japanese for travel",
    detail:
      "Read signs and prices, follow directions, and ask for a train ticket.",
    href: "/travel-path",
    action: "Open travel path",
  },
  {
    id: 2,
    title: "Make plans in Japanese",
    detail:
      "Read dates and opening hours, understand an appointment change, and write a message.",
    href: "/planning-path",
    action: "Open planning path",
  },
  {
    id: 3,
    title: "Hiragana step by step",
    detail:
      "Learn every hiragana study row in small sessions, including voiced and combined sounds.",
    href: "/hiragana-path",
    action: "Learn hiragana",
  },
  {
    id: 4,
    title: "Katakana step by step",
    detail:
      "Learn every katakana study row in small sessions, including voiced and combined sounds.",
    href: "/katakana-path",
    action: "Learn katakana",
  },
] as const;

export type OverviewPath = (typeof overviewPaths)[number]["id"];

export function readOverviewPath(value: unknown): OverviewPath {
  return (
    overviewPaths.find((path) => path.id === value)?.id ?? overviewPaths[0].id
  );
}
