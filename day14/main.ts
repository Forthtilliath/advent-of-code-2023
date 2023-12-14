/// <reference path="main.d.ts"/>

import chalk from "chalk";
import "../helpers/extends";

export function input1(input: string[]): number {
  for (let line of input) {
    console.log(chalk.blue`${line}`);
  }

  const matrix = generateInitialMap(input[0].length);

  for (let row = 0; row < input.length; row++) {
    for (let col = 0; col < input[row].length; col++) {
      if (input[row][col] === "#") {
        const previousValue = matrix.get(col) ?? {};
        matrix.set(col, { ...previousValue, [row]: 0 });
      }
      if (input[row][col] === "O") {
        const rocks = matrix.get(col)!;
        let [closestIndex, closestCount] = getNearestRock(rocks, row);
        matrix.set(col, { ...rocks, [closestIndex]: closestCount + 1 });
      }
    }
  }

  let sum = 0;
  for (let col = 0; col < input[0].length; col++) {
    const rocks = matrix.get(col)!;
    for (let [index, count] of Object.entries(rocks)) {
      for (let rangeFromRock = 1; count > 0; count--, rangeFromRock++) {
        const load = input.length - Number(index) - rangeFromRock;
        sum += load;
      }
    }
  }

  return sum;
}

export function input2(input: string[]): number {
  for (let line of input) {
    // console.log(line);
  }
  return 0;
}

export function generateInitialMap(length: number): Map<number, { [row: string]: number }> {
  return new Map<number, { [row: string]: number }>(
    Array.from({ length }, (_, key) => [key, { "-1": 0 }])
  );
}

export function getNearestRock(rocks: { [row: string]: number }, row: number): [string, number] {
  let closestIndex = "-1";
  let closestDiff = Infinity;
  for (const key of Object.keys(rocks)) {
    const diff = row - Number(key);
    if (diff >= 0 && diff < closestDiff) {
      closestIndex = key;
      closestDiff = diff;
    }
  }
  return [closestIndex, rocks[closestIndex]];
}
