/// <reference path="main.d.ts"/>

import "../helpers/extends";
import { getPPCM } from "../helpers/number";

const REGEX = /(?<position>\w{3}) = \((?<from>\w{3}), (?<to>\w{3})\)/;

export function input1(input: string[]): number {
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

export function input2(input: string[]): number {
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

  return pathLengths.reduce((a, b) => getPPCM(a, b));
}

export function generateMap(input: string[]): Map<string, { L: string; R: string }> {
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
