/// <reference path="main.d.ts"/>

import chalk from "chalk";
import { exec, readFile, substract, sum } from "../utils";

const DAY = 9;

function main(): void {
  console.clear();
  const input = readFile(DAY, "input", true);
  if (!input.length) {
    console.error("Invalid input data");
    return;
  }

  exec("input1", () => input1(input.slice()));
  exec("input2", () => input2(input.slice()));
}

function input1(input: string[]): number {
  return calculateExtrapolatedSum(input, (sequences) => {
    const lastValues = sequences.map((s) => s.at(-1)!);
    return sum(lastValues);
  });
}

function input2(input: string[]): number {
  return calculateExtrapolatedSum(input, (sequences) => {
    const firstValues = sequences.map((s) => s.at(0)!).reverse();
    return substract(firstValues, true);
  });
}

main();

function calculateExtrapolatedSum(
  input: string[],
  cb: (sequences: number[][]) => number
): number {
  let sum = 0;
  for (let line of input) {
    const history = line.split(" ").map(Number);
    const sequences: number[][] = [history];
    let nextSequence: number[] = history;
    do {
      nextSequence = generateNextSequence(nextSequence);
      sequences.push(nextSequence);
    } while (nextSequence.some((s) => s !== 0));

    sum += cb(sequences);
  }

  return sum;
}

function generateNextSequence(sequence: number[]): number[] {
  let nextSequence: number[] = [];
  for (let i = 0; i < sequence.length - 1; i++) {
    nextSequence.push(sequence[i + 1] - sequence[i]);
  }
  return nextSequence;
}
