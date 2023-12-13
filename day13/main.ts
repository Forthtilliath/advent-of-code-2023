/// <reference path="main.d.ts"/>

import "../helpers/extends";
import chalk from "chalk";

export function input1(input: string[]): number {
  let res = 0;
  const patterns = input.split("");
  
  for (let pattern of patterns) {
    console.log(chalk.blue`${pattern.join('\n')}`);
    let reflectionIndex = getReflectionLineIndex(pattern);

    if (reflectionIndex !== -1) { 
      console.log(chalk.green`reflectionIndex found: ${reflectionIndex}`);
      res += 100 * reflectionIndex;
      continue; 
    }

    pattern = transpose(pattern);
    console.log(chalk.blue`rotate:\n${pattern.join('\n')}`);

    reflectionIndex = getReflectionLineIndex(pattern);
    console.log(chalk.green`reflectionIndex found: ${reflectionIndex}`);
    res += reflectionIndex;
  }
  return res;
}

export function input2(input: string[]): number {
  for (let line of input) {
    // console.log(line);
  }
  return 0;
}

function getReflectionLineIndex(rows: string[], index = 0): number {
  line: for (let i = 0; i < rows.length - 1; i++) {
    let top = i;
    let bottom = i + 1;
    let diff = 0; 
    while (top >= 0 && bottom < rows.length) {
      console.log({top: rows[top], bottom: rows[bottom]})
      if (rows[top] !== rows[bottom]) {
        console.log(chalk.red`Lines are different`)
        for (let c = 0; c < rows[top].length; c++) {
          console.log({ctop: rows[top][c], cbottom: rows[bottom][c]})
          if (rows[top][c] === rows[bottom][c]) {
            continue line;
          }
          diff++;
        }
      }

      top--;
      bottom++;
    }

    if (diff === index) {
      return i + 1;
    }
  }

  return -1;
}

function transpose(arr: string[]): string[] {
  return arr[0].split('').map((_, j) => arr.map((_, i) => arr[i][j]).join(''));
}