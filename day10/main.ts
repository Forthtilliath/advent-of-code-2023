/// <reference path="main.d.ts"/>

import "../helpers/extends";

const BLOCK = "0";

export function input1(input: string[]): number {
  const { matrix, start } = generateMatrix(input);
  if (!start) throw new Error("Start not found");

  start.value = getStartType(matrix, start);
  start.neighbors = getNeighbors(matrix, start.value, start.row, start.col);

  const paths: Tile[] = getPath(matrix, start);

  return paths.length / 2;
}

export function input2(input: string[]): number {
  const { matrix, start } = generateMatrix(input);
  if (!start) throw new Error("Start not found");

  start.value = getStartType(matrix, start);
  start.neighbors = getNeighbors(matrix, start.value, start.row, start.col);

  const matrixDoubled: Tile[][] = generatedMatrixDoubled(matrix);

  const path: Tile[] = getPath(matrix, start);
  fillPath(matrixDoubled, path);
  fillOutsidePath(matrixDoubled);
  matrixDoubled.printMatrix((el) => el.value);

  let sum = 0;
  for (let row = 1; row < matrixDoubled.length; row += 2) {
    for (let col = 1; col < matrixDoubled[0].length; col += 2) {
      if (matrixDoubled[row][col].value != BLOCK) sum++;
    }
  }
  return sum;
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

function generatedMatrixDoubled(matrix: Tile[][]): Tile[][] {
  return Array.from({ length: matrix.length * 2 + 1 }, (_, row) => {
    return Array.from({ length: matrix[0].length * 2 + 1 }, (_, col) => {
      if (row % 2 === 1 && col % 2 === 1) {
        return matrix[(row - 1) / 2][(col - 1) / 2];
      }
      return {
        value: ".",
        row,
        col,
        neighbors: [],
      };
    });
  });
}

function getNeighbors(matrix: Tile[][], value: string, row: number, col: number) {
  const neighbors: Coord[] = [];

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
  return neighbors.filter((n) => isInsideMatrix(matrix, n.row, n.col));
}

function getArroundTiles(matrix: Tile[][], tile: Tile): Coord[] {
  const neighbors = [
    { row: tile.row - 1, col: tile.col },
    { row: tile.row, col: tile.col + 1 },
    { row: tile.row + 1, col: tile.col },
    { row: tile.row, col: tile.col - 1 },
  ];
  return neighbors.filter(
    ({ row, col }) => isInsideMatrix(matrix, row, col) && matrix[row][col].value !== BLOCK
  );
}

function isInsideMatrix(matrix: Tile[][], row: number, col: number): boolean {
  return row >= 0 && row < matrix.length && col >= 0 && col < matrix[0].length;
}

function getDestination(matrix: Tile[][], from: Tile, tile: Tile): Tile | null {
  const dest = tile.neighbors.find((n) => n.row !== from.row || n.col !== from.col);
  if (dest === undefined) return null;

  return matrix[dest.row][dest.col];
}

function getStartType(matrix: Tile[][], start: Tile) {
  const top = matrix[start.row - 1][start.col];
  const right = matrix[start.row][start.col + 1];
  const bottom = matrix[start.row + 1][start.col];
  const left = matrix[start.row][start.col - 1];

  let tileTypes = ["|", "-", "L", "J", "7", "F"];

  // Si la tuile de gauche est un '|', 'J', '7', alors elle n'est pas un voisin de start
  // On retire donc toutes les tuiles qui pourraient rejoindre gauche
  if (!top || [".", "-", "L", "J"].includes(top.value)) {
    tileTypes = tileTypes.filter((t) => !["|", "L", "J"].includes(t));
  }
  if (!right || [".", "|", "L", "F"].includes(right.value)) {
    tileTypes = tileTypes.filter((t) => !["-", "L", "F"].includes(t));
  }
  if (!bottom || [".", "-", "7", "F"].includes(bottom.value)) {
    tileTypes = tileTypes.filter((t) => !["|", "7", "F"].includes(t));
  }
  if (!left || [".", "|", "J", "7"].includes(left.value)) {
    tileTypes = tileTypes.filter((t) => !["-", "J", "7"].includes(t));
  }

  if (tileTypes.length !== 1) {
    throw new Error("Start type not found");
  }
  return tileTypes[0];
}

function getPath(matrix: Tile[][], start: Tile) {
  const paths: Tile[] = [start];
  let from: Tile = start;
  let destination: Tile = matrix[start.neighbors[0].row][start.neighbors[0].col];
  let step = 1;
  do {
    const nextDest = getDestination(matrix, from, destination);
    if (!nextDest) break;
    [from, destination] = [destination, nextDest];
    paths.push(from);
  } while (destination && destination !== start);

  return paths;
}

function fillPath(matrixDoubled: Tile[][], path: Tile[]) {
  const pathsSet = new Set(path.map((tile) => `${tile.row * 2 + 1}:${tile.col * 2 + 1}`));

  for (let row = 0; row < matrixDoubled.length; row++) {
    for (let col = 0; col < matrixDoubled[0].length; col++) {
      matrixDoubled[row][col].row = row;
      matrixDoubled[row][col].col = col;
      if (pathsSet.has(`${row}:${col}`)) {
        const neighbors = getNeighbors(matrixDoubled, matrixDoubled[row][col].value, row, col);
        matrixDoubled[row][col].value = BLOCK;
        for (const n of neighbors) matrixDoubled[n.row][n.col].value = BLOCK;
      }
    }
  }
}

function fillOutsidePath(matrixDoubled: Tile[][]) {
  const flowMap = breadthFirstSearch(matrixDoubled, 0, 0);
  for (const tile of flowMap.values()) {
    matrixDoubled[tile.row][tile.col].value = BLOCK;
  }
}

function breadthFirstSearch(matrix: Tile[][], row: number, col: number) {
  const flowMap = new Map();
  const frontier: Coord[] = [];
  frontier.push({ row, col });
  flowMap.set(`${row}:${col}`, { row, col });

  while (frontier.length > 0) {
    const cell = frontier.shift()!;
    const neighbors = getArroundTiles(matrix, matrix[cell.row][cell.col]);
    for (const neighbor of neighbors) {
      if (flowMap.has(`${neighbor.row}:${neighbor.col}`)) continue;
      frontier.push(neighbor);
      flowMap.set(`${neighbor.row}:${neighbor.col}`, neighbor);
    }
  }
  return flowMap;
}
