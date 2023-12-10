/// <reference path="main.d.ts"/>

import { substract, sum } from '../helpers/array';
import '../helpers/extends'

export function input1(input: string[]): number {
  return calculateExtrapolatedSum(input, (sequences) => {
    const lastValues = sequences.map((s) => s.at(-1)!);
    return sum(lastValues);
  });
}

export function input2(input: string[]): number {
  return calculateExtrapolatedSum(input, (sequences) => {
    const firstValues = sequences.map((s) => s.at(0)!).reverse();
    return substract(firstValues, true);
  });
}

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

export function generateNextSequence(sequence: number[]): number[] {
  let nextSequence: number[] = [];
  for (let i = 0; i < sequence.length - 1; i++) {
    nextSequence.push(sequence[i + 1] - sequence[i]);
  }
  return nextSequence;
}
