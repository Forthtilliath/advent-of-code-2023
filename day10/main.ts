/// <reference path="main.d.ts"/>

import chalk from "chalk";
import "../helpers/extends";

/**
 * + 1 - Generate the map : {@link generateMap}
 * + 2 - Update the start pipe to remove false connection {@link updateStartPipe}
 * + 3 - Remove useless pipes (S) {@link removeUselessPipes}
 *
 */
export function input1(input: string[]): number {
  const { matrix, start } = generateMatrix(input);
  if (!start) throw new Error("Start not found");

  matrix.printMatrix((el) => el.value);
  const paths: number[] = [];

  start.value = findStartType(matrix, start);
  start.neighbors = getNeighbors(matrix, start.value, start.row, start.col);

  let from: Tile = start;
  let destination: Tile = matrix[start.neighbors[0].row][start.neighbors[0].col];
  let step = 1;
  do {
    const nextDest = getDestination(matrix, from, destination);
    if (!nextDest) break;
    [from, destination] = [destination, nextDest];
    step++;
  } while (destination && destination !== start);

  if (destination === start) {
    paths.push(step / 2);
  }

  return Math.min(...paths);
}

export function input2(input: string[]): number {
  for (let line of input) {
    console.log(line);
  }
  return 0;
}

function generateMatrix(input: string[]) {
  let start: Tile | undefined;
  const matrix: Tile[][] = input.toMatrix(function (el, [row, col], m) {
    const tile = {
      value: el,
      row,
      col,
      neighbors: getNeighbors(m, el, row, col),
    };
    if (el === "S") {
      start = tile;
    }
    return tile;
  });
  return { matrix, start };
}

function getNeighbors(matrix: Tile[][], value: string, row: number, col: number) {
  const neighbors: { row: number; col: number }[] = [];

  switch (value) {
    case ".":
      return [];
    case "|":
      neighbors.push({ row: row - 1, col: col });
      neighbors.push({ row: row + 1, col: col });
      break;
    case "-":
      neighbors.push({ row: row, col: col - 1 });
      neighbors.push({ row: row, col: col + 1 });
      break;
    case "L":
      neighbors.push({ row: row - 1, col: col });
      neighbors.push({ row: row, col: col + 1 });
      break;
    case "J":
      neighbors.push({ row: row - 1, col: col });
      neighbors.push({ row: row, col: col - 1 });
      break;
    case "7":
      neighbors.push({ row: row + 1, col: col });
      neighbors.push({ row: row, col: col - 1 });
      break;
    case "F":
      neighbors.push({ row: row + 1, col: col });
      neighbors.push({ row: row, col: col + 1 });
      break;
  }
  return neighbors.filter((n) => isValidRowCol(matrix, n.row, n.col));
}

function isValidRowCol(matrix: Tile[][], row: number, col: number): boolean {
  return row >= 0 && row < matrix.length && col >= 0 && col < matrix[0].length;
}

function getDestination(matrix: Tile[][], from: Tile, tile: Tile): Tile | null {
  const dest = tile.neighbors.find((n) => n.row !== from.row || n.col !== from.col);
  if (dest === undefined) return null;

  return matrix[dest.row][dest.col];
}

function findStartType(matrix: Tile[][], start: Tile) {
  const top = matrix[start.row - 1][start.col];
  const right = matrix[start.row][start.col + 1];
  const bottom = matrix[start.row + 1][start.col];
  const left = matrix[start.row][start.col - 1];
  let tileTypes = ["|", "-", "L", "J", "7", "F"];

  // Si la tuile est un de gauche est un '|', 'J', '7', elle n'est pas un voisin de start
  // On retire donc toutes les tuiles qui pourraient rejoindre gauche
  if (left && ["|", "J", "7"].includes(left.value)) {
    tileTypes = tileTypes.filter((t) => !["-", "J", "7"].includes(t));
  }
  if (top && ["-", "L", "J"].includes(top.value)) {
    tileTypes = tileTypes.filter((t) => !["|", "L", "J"].includes(t));
  }
  if (right && ["|", "L", "F"].includes(right.value)) {
    tileTypes = tileTypes.filter((t) => !["-", "L", "F"].includes(t));
  }
  if (bottom && ["-", "7", "F"].includes(bottom.value)) {
    tileTypes = tileTypes.filter((t) => !["|", "7", "F"].includes(t));
  }

  if (tileTypes.length !== 1) {
    throw new Error("Start type not found");
  }
  return tileTypes[0];
}
