import { describe, expect, it } from "vitest";
import { countArrangements, input1, input2 } from "./main";
import { readFile } from "../lib/readFile";

const DAY = "12";

describe("Day " + DAY, () => {
  const input = readFile(DAY, "input", true);
  const sample = readFile(DAY, "sample", true);

  describe("", () => {
    it("should return 1 if all positions are damaged springs", () => {
      const line = ["#", "#", "#", "#"];
      const damagedSprings = [4];
      const result = countArrangements(line, damagedSprings);
      expect(result).toBe(1);
    });

    it("should return 1 if all positions are empty", () => {
      const line = [".", ".", ".", "."];
      const damagedSprings: number[] = [];
      const result = countArrangements(line, damagedSprings);
      expect(result).toBe(1);
    });

    it("should return 1 if all positions are question marks with a damaged spring of 4", () => {
      const line = ["?", "?", "?", "?"];
      const damagedSprings = [4];
      const result = countArrangements(line, damagedSprings);
      expect(result).toBe(1);
    });

    it("should return 4 if all positions are question marks with a damaged spring of 1", () => {
      const line = ["?", "?", "?", "?"];
      const damagedSprings = [1];
      const result = countArrangements(line, damagedSprings);
      expect(result).toBe(4);
    });

    it("should return 1 if they are only one arrangement with a damaged spring of 1,1,3", () => {
      const line = ["?", "?", "?", ".", "#", "#", "#"];
      const damagedSprings = [1, 1, 3];
      const result = countArrangements(line, damagedSprings);
      expect(result).toBe(1);
    });

    it("should return 4 if all positions are question marks with a damaged spring of 1", () => {
      const line = ["?", "?", "?", "?"];
      const damagedSprings = [1];
      const result = countArrangements(line, damagedSprings);
      expect(result).toBe(4);
    });
  });

  describe("Part 1", () => {
    it("sample should return the good value", () => {
      expect(input1(sample)).toBe(21);
    });
    it("input should return the good value", () => {
      expect(input1(input)).toBe(7506);
    });
  });

  describe("Part 2", () => {
    it("sample should return the good value", () => {
      expect(input2(sample)).toBe(525152);
    });
    it("input should return the good value", () => {
      expect(input2(input)).toBe(548241300348335);
    });
  });
});
