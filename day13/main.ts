/// <reference path="main.d.ts"/>

import "../helpers/extends";
import chalk from "chalk";

export function input1(input: string[]): number {
  let res = 0;
  const patterns = input.split("");

  for (let pattern of patterns) {
    let reflectionIndex = getReflectionLineIndex(pattern);

    if (reflectionIndex !== -1) {
      res += 100 * reflectionIndex;
      continue;
    }

    pattern = transpose(pattern);
    reflectionIndex = getReflectionLineIndex(pattern);
    res += reflectionIndex;
  }
  return res;
}

export function input2(input: string[]): number {
  let res = 0;
  const patterns = input.split("");

  for (let pattern of patterns) {
    console.log(chalk.blue`${pattern.join("\n")}`);
    let reflectionIndex = getReflectionLineIndex(pattern, 1);

    if (reflectionIndex !== -1) {
      res += 100 * reflectionIndex;
      continue;
    }

    pattern = transpose(pattern);

    reflectionIndex = getReflectionLineIndex(pattern, 1);
    console.log(chalk.green`reflectionIndex found: ${reflectionIndex}`);
    res += reflectionIndex;
  }
  return res;
}

function getReflectionLineIndex(rows: string[], maxDiff = 0): number {
  line: for (let i = 0; i < rows.length - 1; i++) {
    let diff = 0;
    console.log(chalk.yellow`===================`);

    for (let top = i, bottom = i + 1; top >= 0 && bottom < rows.length; top--, bottom++) {
      diff += getDifferences(rows[top], rows[bottom]);
      console.log({ diff });
      if (diff > maxDiff) {
        // for (let c = 0; c < rows[top].length; c++) {
        //   console.log({ctop: rows[top][c], cbottom: rows[bottom][c]})
        // if (rows[top][c] === rows[bottom][c] && fixeLeft) {
        //     fixeLeft--;
        diff = 0;
        continue line;
        //   }
        //   diff++;
        // }
      }
    }

    if (diff === maxDiff) {
      return i + 1;
    }
  }

  return -1;
}

function transpose(arr: string[]): string[] {
  return arr[0].split("").map((_, j) => arr.map((_, i) => arr[i][j]).join(""));
}

function getDifferences(a: string, b: string): number {
  let diff = 0;
  if (a.length !== b.length) throw new Error("Not the same length");
  if (a === b) return 0;

  for (let i = 0; i < a.length; i++) {
    if (a.charAt(i) !== b.charAt(i)) {
      diff++;
    }
  }
  return diff;
}

// function areEquals(a: string, b: string, differencesAccepted = 0): boolean {
//   console.log({ a, b, differencesAccepted });
//   if (a.length !== b.length) throw new Error("Not the same length");
//   if (a === b) return true;

//   for (let i = 0; i < a.length && differencesAccepted >= 0; i++) {
//     if (a.charAt(i) !== b.charAt(i)) {
//       differencesAccepted--;
//     }
//   }
//   return differencesAccepted >= 0;
// }
