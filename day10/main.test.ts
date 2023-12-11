import { beforeEach, describe, expect, it } from "vitest";
import { readFile } from "../lib/readFile";
import {
  generateMatrix,
  getArroundTiles,
  getDestination,
  getNeighbors,
  getPath,
  getStartType,
  input1,
  input2,
  isInsideMatrix,
} from "./main";

const DAY = "10";

// \{ x: (-?\d+), y: (-?\d+) \}
// "$1:$2"

describe("Day " + DAY, () => {
  const input = readFile(DAY, "input", true);
  const sample1 = readFile(DAY, "sample1", true);
  const sample2 = readFile(DAY, "sample2", true);

  describe("generateMatrix", () => {
    it("should generate matrix and find start tile correctly", () => {
      const input = ["S...", "....", "....", "...."];
      const expectedMatrix = [
        [
          { value: "S", row: 0, col: 0, neighbors: [] },
          { value: ".", row: 0, col: 1, neighbors: [] },
          { value: ".", row: 0, col: 2, neighbors: [] },
          { value: ".", row: 0, col: 3, neighbors: [] },
        ],
        [
          { value: ".", row: 1, col: 0, neighbors: [] },
          { value: ".", row: 1, col: 1, neighbors: [] },
          { value: ".", row: 1, col: 2, neighbors: [] },
          { value: ".", row: 1, col: 3, neighbors: [] },
        ],
        [
          { value: ".", row: 2, col: 0, neighbors: [] },
          { value: ".", row: 2, col: 1, neighbors: [] },
          { value: ".", row: 2, col: 2, neighbors: [] },
          { value: ".", row: 2, col: 3, neighbors: [] },
        ],
        [
          { value: ".", row: 3, col: 0, neighbors: [] },
          { value: ".", row: 3, col: 1, neighbors: [] },
          { value: ".", row: 3, col: 2, neighbors: [] },
          { value: ".", row: 3, col: 3, neighbors: [] },
        ],
      ];
      const expectedStart = { value: "S", row: 0, col: 0, neighbors: [] };

      const { matrix, start } = generateMatrix(input);

      expect(matrix).toEqual(expectedMatrix);
      expect(start).toEqual(expectedStart);
    });

    it("should generate a matrix and set the start tile correctly", () => {
      const input = [".....", ".S-7.", ".|.|.", ".L-J.", "....."];
      // prettier-ignore
      const expectedMatrix = [
        [
          { value: ".", row: 0, col: 0, neighbors: [] },
          { value: ".", row: 0, col: 1, neighbors: [] },
          { value: ".", row: 0, col: 2, neighbors: [] },
          { value: ".", row: 0, col: 3, neighbors: [] },
          { value: ".", row: 0, col: 4, neighbors: [] },
        ],
        [
          { value: ".", row: 1, col: 0, neighbors: [] },
          { value: "S", row: 1, col: 1, neighbors: [] },
          { value: "-", row: 1, col: 2, neighbors: [{ row: 1, col: 1 }, { row: 1, col: 3 }] },
          { value: "7", row: 1, col: 3, neighbors: [{ row: 2, col: 3 }, { row: 1, col: 2 }] },
          { value: ".", row: 1, col: 4, neighbors: [] },
        ],
        [
          { value: ".", row: 2, col: 0, neighbors: [] },
          { value: "|", row: 2, col: 1, neighbors: [{ row: 1, col: 1 }, { row: 3, col: 1 }] },
          { value: ".", row: 2, col: 2, neighbors: [] },
          { value: "|", row: 2, col: 3, neighbors: [{ row: 1, col: 3 }, { row: 3, col: 3 }] },
          { value: ".", row: 2, col: 4, neighbors: [] },
        ],
        [
          { value: ".", row: 3, col: 0, neighbors: [] },
          { value: "L", row: 3, col: 1, neighbors: [{ row: 2, col: 1 }, { row: 3, col: 2 }] },
          { value: "-", row: 3, col: 2, neighbors: [{ row: 3, col: 1 }, { row: 3, col: 3 }] },
          { value: "J", row: 3, col: 3, neighbors: [{ row: 2, col: 3 }, { row: 3, col: 2 }] },
          { value: ".", row: 3, col: 4, neighbors: [] },
        ],
        [
          { value: ".", row: 4, col: 0, neighbors: [] },
          { value: ".", row: 4, col: 1, neighbors: [] },
          { value: ".", row: 4, col: 2, neighbors: [] },
          { value: ".", row: 4, col: 3, neighbors: [] },
          { value: ".", row: 4, col: 4, neighbors: [] },
        ],
      ];
      const expectedStart = { value: "S", row: 1, col: 1, neighbors: [] };

      const result = generateMatrix(input);

      expect(result.matrix).toEqual(expectedMatrix);
      expect(result.start).toEqual(expectedStart);
    });
  });

  describe("getNeighbors", () => {
    const matrix = Array(10).fill(Array(10).fill("."));

    it('should return an empty array for "."', () => {
      const result = getNeighbors(matrix, ".", 1, 2);
      expect(result).toEqual([]);
    });

    it('should return the correct neighbors for "|"', () => {
      const result = getNeighbors(matrix, "|", 1, 2);
      expect(result).toEqual([
        { row: 0, col: 2 },
        { row: 2, col: 2 },
      ]);
    });

    it('should return the correct neighbors for "-"', () => {
      const result = getNeighbors(matrix, "-", 1, 2);
      expect(result).toEqual([
        { row: 1, col: 1 },
        { row: 1, col: 3 },
      ]);
    });

    it('should return the correct neighbors for "L"', () => {
      const result = getNeighbors(matrix, "L", 1, 2);
      expect(result).toEqual([
        { row: 0, col: 2 },
        { row: 1, col: 3 },
      ]);
    });

    it('should return the correct neighbors for "J"', () => {
      const result = getNeighbors(matrix, "J", 1, 2);
      expect(result).toEqual([
        { row: 0, col: 2 },
        { row: 1, col: 1 },
      ]);
    });

    it('should return the correct neighbors for "7"', () => {
      const result = getNeighbors(matrix, "7", 1, 2);
      expect(result).toEqual([
        { row: 2, col: 2 },
        { row: 1, col: 1 },
      ]);
    });

    it('should return the correct neighbors for "F"', () => {
      const result = getNeighbors(matrix, "F", 1, 2);
      expect(result).toEqual([
        { row: 2, col: 2 },
        { row: 1, col: 3 },
      ]);
    });

    it("should filter out neighbors that are outside the matrix", () => {
      const result = getNeighbors(matrix, "|", 0, 1);
      expect(result).toEqual([{ row: 1, col: 1 }]);
    });
  });

  describe("isInsideMatrix", () => {
    const { matrix } = generateMatrix([".....", ".S-7.", ".|.|.", ".L-J.", "....."]);

    it("should return true when row and col are within the bounds of the matrix", () => {
      const result = isInsideMatrix(matrix, 0, 1);
      expect(result).toBe(true);
    });

    it("should return false when row is negative", () => {
      const result = isInsideMatrix(matrix, -1, 1);
      expect(result).toBe(false);
    });

    it("should return false when row is greater than or equal to the number of rows in the matrix", () => {
      const result = isInsideMatrix(matrix, 10, 1);
      expect(result).toBe(false);
    });

    it("should return false when col is negative", () => {
      const result = isInsideMatrix(matrix, 0, -1);
      expect(result).toBe(false);
    });

    it("should return false when col is greater than or equal to the number of columns in the matrix", () => {
      const result = isInsideMatrix(matrix, 1, 10);
      expect(result).toBe(false);
    });
  });

  describe("getDestination", () => {
    let matrix: Tile[][];
    let start: Tile | undefined;

    beforeEach(() => {
      ({ matrix, start } = generateMatrix(["S7.", "|J.", "L--"]));
    });

    it("should return null when there is no destination tile", () => {
      const result = getDestination(matrix, matrix[2][1], matrix[2][2]);
      expect(result).toBeNull();
    });

    it("should return the destination tile", () => {
      const result = getDestination(matrix, matrix[2][0], matrix[2][1]);
      expect(result).toBe(matrix[2][2]);
    });
  });

  describe("getStartType", () => {
    it("should return the correct start type for top left", () => {
      const { matrix, start } = generateMatrix(["S7.", "|L7", "L-J"]);
      if (!start) return;
      const result = getStartType(matrix, start);
      expect(result).toEqual("F");
    });

    it("should return the correct start type for top right", () => {
      const { matrix, start } = generateMatrix(["FS.", "|L7", "L-J"]);
      if (!start) return;
      const result = getStartType(matrix, start);
      expect(result).toEqual("7");
    });

    it("should return the correct start type for top bottom", () => {
      const { matrix, start } = generateMatrix(["F7.", "SL7", "L-J"]);
      if (!start) return;
      const result = getStartType(matrix, start);
      expect(result).toEqual("|");
    });

    it("should return the correct start type for left right", () => {
      const { matrix, start } = generateMatrix(["F7.", "|L7", "LSJ"]);
      if (!start) return;
      const result = getStartType(matrix, start);
      expect(result).toEqual("-");
    });

    it("should return the correct start type for bottom right", () => {
      const { matrix, start } = generateMatrix(["F7.", "|L7", "L-S"]);
      if (!start) return;
      const result = getStartType(matrix, start);
      expect(result).toEqual("J");
    });

    it("should return the correct start type for bottom left", () => {
      const { matrix, start } = generateMatrix(["F7.", "|L7", "S-J"]);
      if (!start) return;
      const result = getStartType(matrix, start);
      expect(result).toEqual("L");
    });
  });

  describe("getPath", () => {
    const { matrix, start } = generateMatrix(["S7", "LJ"]);
    if (!start) return;
    start.value = getStartType(matrix, start);
    start.neighbors = getNeighbors(matrix, start.value, start.row, start.col);

    it("should return a valid path", () => {
      const expected = [start, matrix[1][0], matrix[1][1], matrix[0][1]];
      expect(getPath(matrix, start)).toEqual(expected);
    });
  });

  describe("getArroundTiles", () => {
    // prettier-ignore
    const { matrix } = generateMatrix([
      ".000..",
      "00.0..",
      "0.00..",
      "000...",
      "......" ]);

    it("should return an empty array if there are no valid neighboring tiles", () => {
      const result = getArroundTiles(matrix, matrix[0][0]);
      expect(result).toEqual([]);
    });

    it("should return an array with valid neighboring tiles", () => {
      const result = getArroundTiles(matrix, matrix[3][4]);
      expect(result).toEqual([
        { row: 2, col: 4 },
        { row: 3, col: 5 },
        { row: 4, col: 4 },
        { row: 3, col: 3 },
      ]);
    });

    it("should ignore neighboring tiles outside of the matrix", () => {
      const result = getArroundTiles(matrix, matrix[0][5]);
      expect(result).toEqual([
        { row: 1, col: 5 },
        { row: 0, col: 4 },
      ]);
    });

    it("should ignore neighboring tiles with value BLOCK", () => {
      const result = getArroundTiles(matrix, matrix[3][3]);
      expect(result).toEqual([
        { row: 3, col: 4 },
        { row: 4, col: 3 },
      ]);
    });
  });

  describe("Part 1", () => {
    it("sample 1 should return the good value", () => {
      expect(input1(sample1)).toBe(8);
    });
    it("sample 2 should return the good value", () => {
      expect(input1(sample2)).toBe(70);
    });
    it("input should return the good value", () => {
      expect(input1(input)).toBe(6886);
    });
  });

  describe("Part 2", () => {
    it("sample should return the good value", () => {
      expect(input2(sample1)).toBe(1);
    });
    it("sample should return the good value", () => {
      expect(input2(sample2)).toBe(8);
    });
    it("input should return the good value", () => {
      expect(input2(input)).toBe(371);
    });
  });
});
