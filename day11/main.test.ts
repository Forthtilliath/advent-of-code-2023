import { describe, expect, it } from "vitest";
import { getDistance, getEmptyRowsAndCols, input1, input2 } from "./main";
import { readFile } from "../lib/readFile";

const DAY = "11";

describe("Day " + DAY, () => {
  const input = readFile(DAY, "input", true);
  const sample = readFile(DAY, "sample", true);

  describe("getEmptyRowsAndCols", () => {
    it("should return empty rows and columns", () => {
      const matrix: D11.Tile[][] = ["...#", "....", "#..."].toMatrix();
      const galaxies: D11.Coord[] = [
        { row: 0, col: 3 },
        { row: 2, col: 0 },
      ];

      const expected: [number[], number[]] = [[1], [1, 2]];
      const result = getEmptyRowsAndCols(matrix, galaxies);
      expect(result).toEqual(expected);
    });

    it("should return empty rows and columns when there are no galaxies", () => {
      const matrix: D11.Tile[][] = ["....", "....", "...."].toMatrix();
      const galaxies: D11.Coord[] = [];

      const expected: [number[], number[]] = [
        [0, 1, 2],
        [0, 1, 2, 3],
      ];

      const result = getEmptyRowsAndCols(matrix, galaxies);
      expect(result).toEqual(expected);
    });
  });

  describe("getDistance", () => {
    it("should calculate the distance correctly when all rows and columns are empty", () => {
      const from = { row: 1, col: 1 };
      const to = { row: 3, col: 3 };
      const emptyRows = [2];
      const emptyCols = [2];
      const expansion = 2;
      const distance = getDistance(from, to, emptyRows, emptyCols, expansion);
      expect(distance).toBe(6);
    });

    it("should calculate the distance correctly when some rows and columns are empty", () => {
      const from = { row: 1, col: 1 };
      const to = { row: 3, col: 3 };
      const emptyRows = [2, 3];
      const emptyCols = [2, 3];
      const expansion = 2;
      const distance = getDistance(from, to, emptyRows, emptyCols, expansion);
      expect(distance).toBe(8);
    });

    it("should calculate the distance correctly when no rows and columns are empty", () => {
      const from = { row: 1, col: 1 };
      const to = { row: 3, col: 3 };
      const emptyRows: number[] = [];
      const emptyCols: number[] = [];
      const expansion = 2;
      const distance = getDistance(from, to, emptyRows, emptyCols, expansion);
      expect(distance).toBe(4);
    });
  });

  describe("Part 1", () => {
    it("sample should return the good value", () => {
      expect(input1(sample)).toBe(374);
    });
    it("input should return the good value", () => {
      expect(input1(input)).toBe(9795148);
    });
  });

  describe("Part 2", () => {
    it("sample should return the good value", () => {
      expect(input2(sample)).toBe(82000210);
    });
    it("input should return the good value", () => {
      expect(input2(input)).toBe(650672493820);
    });
  });
});
