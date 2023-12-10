import { mapValues } from "lodash";

type Color = "blue" | "green" | "red";
type Group = Record<"game" | Color, string> | undefined;

export function input1(input: string[]): number {
  const elfCubes = { red: 12, green: 13, blue: 14 };
  let possibleGames = 0;
  const regex =
    /(Game (?<game>\d+))|((?<blue>\d+) blue)|((?<red>\d+) red)|((?<green>\d+) green)/g;

  for (let line of input) {
    let possibleGame = true;
    let idGame = 0;

    for (const cube of line.matchAll(regex)) {
      const { game, ...colors } = mapValues(cube.groups as Group, Number);

      if (game) idGame = game;

      let color: Color;
      for (color in elfCubes) {
        if (elfCubes[color] < colors[color]) {
          possibleGame = false;
          continue;
        }
      }
    }

    if (possibleGame) possibleGames += idGame;
  }

  return possibleGames;
}

export function input2(input: string[]): number {
  const regex = /((?<blue>\d+) blue)|((?<red>\d+) red)|((?<green>\d+) green)/g;
  let power = 0;

  for (let line of input) {
    const minimalSet = { red: -Infinity, green: -Infinity, blue: -Infinity };

    for (const cube of line.matchAll(regex)) {
      const { game, ...colors } = mapValues(cube.groups as Group, Number);

      let color: Color;
      for (color in minimalSet) {
        if (minimalSet[color] < colors[color]) {
          minimalSet[color] = colors[color];
        }
      }
    }
    power += minimalSet.red * minimalSet.green * minimalSet.blue;
  }

  return power;
}
