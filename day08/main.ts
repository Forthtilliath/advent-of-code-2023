/// <reference path="main.d.ts"/>

import chalk from "chalk";
import { exec, readFile } from "../utils";

const DAY = 8;

const REGEX = /(?<position>\w{3}) = \((?<from>\w{3}), (?<to>\w{3})\)/;

function main(): void {
  console.clear();
  const input = readFile(DAY, "input", true);
  if (!input.length) {
    console.error("Invalid input data");
    return;
  }

  exec("input1", () => input1(input.slice())); // 21_251
  exec("input2", () => input2(input.slice())); // 11_678_319_315_857
}

function input1(input: string[]): number {
  const directions = input[0];
  let map = generateMap(input.slice(2));
  let currentMap = "AAA";
  let index = 0;

  while (currentMap != "ZZZ") {
    const direction = directions.charAt(index % directions.length) as "L" | "R";

    const nextMap = map.get(currentMap)![direction];
    index++;
    currentMap = nextMap;
  }

  return index;
}

function input2(input: string[]): number {
  const directions = input[0];
  let map = generateMap(input.slice(2));

  const startMaps = [...map.keys()].filter((s) => s.endsWith("A"));
  const endMaps = new Set([...map.keys()].filter((s) => s.endsWith("Z")));
  const pathLengths: number[] = [];

  for (let currentMap of startMaps) {
    let pathLength = 0;
    while (!endMaps.has(currentMap)) {
      const direction = directions[pathLength % directions.length] as "L" | "R";
      currentMap = map.get(currentMap)![direction];
      pathLength++;
    }
    pathLengths.push(pathLength);
  }

  return pathLengths.reduce((a, b) => getPPCM(a, b));;
}

main();

function generateMap(input: string[]): Map<string, { L: string; R: string }> {
  let map = new Map<string, { L: string; R: string }>();

  for (let line of input) {
    const { position, from, to } = REGEX.exec(line)!.groups as Record<
      "position" | "from" | "to",
      string
    >;
    map.set(position, { L: from, R: to });
  }

  return map;
}

function getPPCM(max: number, min: number): number {
  if (min > max) {
    [max, min] = [min, max];
  }
  let result = max;

  while (result % min !== 0) {
    result += max;
  }

  return result;
}
