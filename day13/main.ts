/// <reference path="main.d.ts"/>

import "../helpers/extends";
import chalk from "chalk";

export function input1(input: string[]): number {
  return run(input);
}

export function input2(input: string[]): number {
  return run(input, 1);
}

export function run(input: string[], maxDiff = 0): number {
  let res = 0;
  const patterns = input.split("");

  for (let pattern of patterns) {
    let reflectionIndex = getReflectionLineIndex(pattern, maxDiff);
    console.log({reflectionIndex})

    if (reflectionIndex !== -1) {
      res += 100 * reflectionIndex;
      continue;
    }

    reflectionIndex = getReflectionLineIndex(transpose(pattern), maxDiff);
    res += reflectionIndex;
  }
  return res;
}

/**
 * Finds the index of the line in the given array of rows where reflection occurs.
 * 
 * @param {string[]} rows - The array of rows to search for reflection.
 * @param {number} maxDiff - The maximum allowed difference between adjacent rows.
 * @returns {number} - The index of the line where reflection occurs, or -1 if no reflection is found.
 */
export function getReflectionLineIndex(rows: string[], maxDiff: number = 0): number {
  console.log(chalk.yellow`===========`)
  console.log(rows)
  line: for (let i = 0; i < rows.length - 1; i++) {
    let diff = 0;

    for (let top = i, bottom = i + 1; top >= 0 && bottom < rows.length; top--, bottom++) {
      diff += getDifferences(rows[top], rows[bottom]);

      if (diff > maxDiff) {
        diff = 0;
        continue line;
      }
    }

    if (diff === maxDiff) {
      return i + 1;
    }
  }

  return -1;
}

export function transpose(arr: string[]): string[] {
  const result: string[] = [];

  for (let j = 0; j < arr[0].length; j++) {
    let column = "";
    for (let i = 0; i < arr.length; i++) {
      column += arr[i][j];
    }
    result.push(column);
  }

  return result;
}

export function getDifferences(a: string, b: string): number {
  if (a.length !== b.length) {
    throw new Error(`${a} and ${b} are not the same length`);
  }
  
  let diff = 0;
  for (let i = 0, len = a.length; i < len; i++) {
    if (a[i] !== b[i]) {
      diff++;
    }
  }
  
  return diff;
}