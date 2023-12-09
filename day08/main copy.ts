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

  // exec("input1", () => input1(input));
  exec("input2", () => input2(input));
}

function input1(input: string[]): number {
  const path = input.shift()!;
  let map = generateMap(input.slice(1));
  let currentMap = "AAA";
  let index = 0;

  while (currentMap != "ZZZ") {
    const direction = path.charAt(index % path.length) as "L" | "R";

    const nextMap = map.get(currentMap)![direction];
    index++;
    currentMap = nextMap;
  }

  return index;
}

function input2(input: string[]): number {
  const path = input.shift()!;
  let map = generateMap(input.slice(1));
  let currentMaps = new Map<string, { length: number; current: string }>();

  const startMaps = [...map.keys()].filter((s) => s.endsWith("A"));
  for (let startMap of startMaps) {
    currentMaps.set(startMap.slice(0, 2), {
      length: 0,
      current: startMap,
    });
  }

  for (let [key] of [...currentMaps]) {
    console.log(chalk.blue`Looking for path of ${key}...`);
    let index = 0;
    do {
      const direction = path.charAt(index % path.length) as "L" | "R";
      const currentMap = map.get(currentMaps.get(key)!.current)!;

      currentMaps.set(key, {
        length: index + 1,
        current: currentMap[direction],
      });

      index++;
    } while (!isFinished(currentMaps, key));
    console.log(chalk.green`Path of ${key} found, length: ${currentMaps.get(key)!.length}.`);
  }

  return Array.from(currentMaps.values()).reduce((res, a) => res * a.length, 1);
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

function isFinished(
  map: Map<
    string,
    {
      length: number;
      current: string;
    }
  >,
  key: string
) {
  const path = map.get(key);
  if (!path) return false;
  return path.current.slice(0, 2) === key && path.current.endsWith("Z");
}

function allFinished(
  maps: Map<string, { length: number; current: string }>
): boolean {
  return [...maps].every(
    ([key, { current }]) => current.slice(0, 2) === key && current.endsWith("Z")
  );
}
