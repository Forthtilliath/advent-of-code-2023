/// <reference path="./main.d.ts"/>

import { range } from "../helpers/array";
import "../helpers/extends";

export function input1(input: string[]): number {
  return process(input, 2);
}

export function input2(input: string[]): number {
  return process(input, 1_000_000);
}

export function process(input: string[], expension: number): number {
  const galaxies: D11.Coord[] = [];
  let matrix: D11.Tile[][] = input.toMatrix((el, [row, col]) => {
    if (el === "#") {
      galaxies.push({ row, col });
    }
    return { value: el };
  });

  const [emptyRows, emptyCols] = getEmptyRowsAndCols(matrix, galaxies);

  let sum = 0;
  for (let i = 0; i < galaxies.length - 1; i++) {
    for (let j = i + 1; j < galaxies.length; j++) {
      sum += getDistance(galaxies[i], galaxies[j], emptyRows, emptyCols, expension);
    }
  }

  return sum;
}

export function getEmptyRowsAndCols(
  matrix: D11.Tile[][],
  galaxies: D11.Coord[]
): [rows: number[], cols: number[]] {
  const galaxiesRows = galaxies.map((galaxy) => galaxy.row);
  const galaxiesCols = galaxies.map((galaxy) => galaxy.col);

  const rows = Array(matrix.length)
    .fill(0)
    .map((_, i) => i)
    .filter((n) => !galaxiesRows.includes(n));
  const cols = Array(matrix[0].length)
    .fill(0)
    .map((_, i) => i)
    .filter((n) => !galaxiesCols.includes(n));

  return [rows, cols];
}

export function getDistance(
  from: D11.Coord,
  to: D11.Coord,
  emptyRows: number[],
  emptyCols: number[],
  expension: number
): number {
  const rowRange = range(from.row, to.row);
  const colRange = range(from.col, to.col);
  const rowDistance = rowRange.filter((row) => emptyRows.includes(row)).length * (expension - 1);
  const colDistance = colRange.filter((col) => emptyCols.includes(col)).length * (expension - 1);

  return Math.abs(from.row - to.row) + Math.abs(from.col - to.col) + rowDistance + colDistance;
}
