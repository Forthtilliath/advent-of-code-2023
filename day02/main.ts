import { exec, readFile } from "../utils";
import { mapValues } from "lodash";

type Color = "blue" | "green" | "red";

const REGEX_1 =
  /(Game (?<game>\d+))|((?<blue>\d+) blue)|((?<red>\d+) red)|((?<green>\d+) green)/g;
type Group = Record<"game" | Color, string> | undefined;
const REGEX_2 = /((?<blue>\d+) blue)|((?<red>\d+) red)|((?<green>\d+) green)/g;

function main() {
  console.clear();
  const input = readFile(2, "input");
  if (!input.length) return;

  exec("input1", () => input1(input));
  exec("input2", () => input2(input));
}

function input1(input: string[]): number {
  const elfCubes = { red: 12, green: 13, blue: 14 };
  let possibleGames = 0;

  input.forEach((line) => {
    let possibleGame = true;
    let idGame = 0;

    for (const cube of line.matchAll(REGEX_1)) {
      const { game, ...colors } = mapValues(cube.groups as Group, Number);

      if (game) idGame = game;

      let color: Color;
      for (color in elfCubes) {
        if (elfCubes[color] < colors[color]) {
          possibleGame = false;
          return;
        }
      }
    }

    if (possibleGame) possibleGames += idGame;
  });

  return possibleGames;
}

function input2(input: string[]): number {
  let power = 0;

  input.forEach((line) => {
    const minimalSet = { red: -Infinity, green: -Infinity, blue: -Infinity };

    for (const cube of line.matchAll(REGEX_2)) {
      const { game, ...colors } = mapValues(cube.groups as Group, Number);

      let color: Color;
      for (color in minimalSet) {
        if (minimalSet[color] < colors[color]) {
          minimalSet[color] = colors[color];
        }
      }
    }
    power += minimalSet.red * minimalSet.green * minimalSet.blue;
  });

  return power;
}

main();
