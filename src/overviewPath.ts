export const overviewPaths = [
  {
    id: 0,
    title: "Beginner starter path",
    href: "/starter-path",
    action: "Open starter path",
  },
  {
    id: 1,
    title: "Japanese for travel",
    href: "/travel-path",
    action: "Open travel path",
  },
] as const;

export type OverviewPath = (typeof overviewPaths)[number]["id"];

export function readOverviewPath(value: unknown): OverviewPath {
  return (
    overviewPaths.find((path) => path.id === value)?.id ?? overviewPaths[0].id
  );
}
