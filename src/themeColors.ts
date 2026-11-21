type ColorRole = "text" | "background" | "border";

function colors(groups: readonly [string, readonly string[]][]) {
  return new Map(
    groups.flatMap(([dark, light]) =>
      light.map((color) => [color, dark] as const),
    ),
  );
}

const darkColors: Record<ColorRole, ReadonlyMap<string, string>> = {
  text: colors([
    [
      "#e8f1e9",
      [
        "#203730",
        "#233b31",
        "#253c31",
        "#253e32",
        "#294334",
        "#2d4236",
        "#344c3c",
      ],
    ],
    [
      "#b7c8ba",
      [
        "#485748",
        "#4d624f",
        "#51665a",
        "#536348",
        "#536357",
        "#566860",
        "#586256",
        "#59684f",
        "#5b6956",
        "#626b60",
        "#626c5e",
        "#62715f",
        "#63705f",
        "#637465",
        "#667363",
        "#72796f",
        "#727a69",
        "#737a6d",
        "#777d70",
        "#969a8c",
      ],
    ],
    [
      "#a4dbb8",
      ["#1e503f", "#215848", "#245643", "#345b45", "#356446", "#3d664e"],
    ],
    [
      "#ffad94",
      ["#8d392b", "#933f27", "#986045", "#a34e35", "#a94128", "#c95634"],
    ],
    ["#f2d186", ["#927029"]],
  ]),
  background: colors([
    ["#111c17", ["#f7f6f0"]],
    ["#1b2922", ["#fffef8", "#fffef9", "#fffdf7"]],
    ["#202e25", ["#f4f3ea", "#f5f4eb", "#f7f8ed"]],
    ["#263b31", ["#e1eadb", "#e8efe3", "#e9eee2", "#e9eee4", "#e6edde"]],
    ["#2e4637", ["#dbe9d9", "#dfe8d9", "#e3ece2", "#e4ecdf"]],
    [
      "#344b3e",
      [
        "#c9d2c1",
        "#ccd9c5",
        "#d3d9ca",
        "#dce2d7",
        "#dce5d6",
        "#e6e8da",
        "#bbc4be",
      ],
    ],
    ["#3b3225", ["#f2ede0", "#f3ecd6", "#f4eee1"]],
    ["#422c25", ["#f3e8de", "#f6e7dc", "#f7e7db"]],
    ["#193e32", ["#244f41"]],
    ["#2a6b53", ["#215848"]],
    ["#bc6449", ["#a94128", "#ba5034"]],
    ["#a04430", ["#ad472d"]],
    ["#81b795", ["#657669", "#73926a"]],
    ["#e1bc6a", ["#8e6a28"]],
  ]),
  border: colors([
    [
      "#40554a",
      [
        "#cdd3c7",
        "#cddbc7",
        "#d7dccf",
        "#d9ddcf",
        "#d9dfd3",
        "#dadfd3",
        "#dce0d1",
        "#dddfd2",
        "#dddfd3",
        "#dfe2d5",
        "#e3e5db",
        "#e4e8dd",
        "#e5e7d9",
      ],
    ],
    ["#775f3e", ["#dfd4b7"]],
    ["#82988a", ["#8f9d8f", "#9bad9e", "#a8bda9", "#a8bea7", "#b0c0ae"]],
    ["#80b698", ["#215848"]],
    ["#cf8067", ["#ab5236", "#ae563b", "#c95634"]],
  ]),
};

export function darkColor(color: string, role: ColorRole = "text") {
  return darkColors[role].get(color) ?? color;
}

export function unchangedColor(color: string, _role?: ColorRole) {
  return color;
}
