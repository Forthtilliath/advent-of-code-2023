/// <reference path="main.d.ts"/>

import "../helpers/extends";

export function input1(input: string[]): number {
  let sum = 0;
  for (const line of input) {
    const [springs, sDamagedSprings] = line.split(" ");
    const damagedSprings = sDamagedSprings.split(",").map(Number);
    sum += countArrangements(springs.split(""), damagedSprings);
  }

  return sum;
}

export function input2(input: string[]): number {
  let sum = 0;
  for (const line of input) {
    const [springs, sDamagedSprings] = line.split(" ");
    const damagedSprings = sDamagedSprings.split(",").map(Number);
    sum += countArrangements(springs.repeatWithSep(5, "?").split(""), damagedSprings.repeat(5));
  }
  return sum;
}

function countArrangements(line: string[], damagedSprings: number[]): number {
  const memo: Record<string, number> = {};

  function memoizedCountArrangements(iLine = 0, iDamagedSprings = 0, count = 0): number {
    const key = `${iLine},${iDamagedSprings},${count}`;

    if (key in memo) return memo[key];

    if (iLine === line.length) {
      const isLastPositionValid =
        (count === damagedSprings[damagedSprings.length - 1] &&
          iDamagedSprings === damagedSprings.length - 1) ||
        (count === 0 && iDamagedSprings === damagedSprings.length);

      return isLastPositionValid ? 1 : 0;
    }

    let result = 0;

    if (line[iLine] === "?" || line[iLine] === "#") {
      result += memoizedCountArrangements(iLine + 1, iDamagedSprings, count + 1);
    }

    if (line[iLine] === "?" || line[iLine] === ".") {
      if (count === 0) {
        result += memoizedCountArrangements(iLine + 1, iDamagedSprings, 0);
      } else if (
        count > 0 &&
        iDamagedSprings < damagedSprings.length &&
        damagedSprings[iDamagedSprings] === count
      ) {
        result += memoizedCountArrangements(iLine + 1, iDamagedSprings + 1, 0);
      }
    }

    memo[key] = result;

    return result;
  }

  return memoizedCountArrangements();
}
