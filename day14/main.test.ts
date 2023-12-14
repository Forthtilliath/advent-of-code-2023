import { describe, expect, it } from "vitest";
import { generateInitialMap, getNearestRock, input1, input2 } from "./main";
import { readFile } from "../lib/readFile";

const DAY = "14";

describe("Day " + DAY, () => {
  const input = readFile(DAY, "input", true);
  const sample = readFile(DAY, "sample", true);

  describe("generateInitialMap", () => {
    it("should return an empty map when length is 0", () => {
      const length = 0;
      const result = generateInitialMap(length);
      expect(result.size).toBe(0);
    });

    it("should return a map with the specified length and default values", () => {
      const length = 5;
      const result = generateInitialMap(length);
      expect(result.size).toBe(length);
      for (let i = 0; i < length; i++) {
        expect(result.get(i)).toEqual({ "-1": 0 });
      }
    });
  });

  describe("getNearestRock", () => {
    it('should return ["-1", undefined] when there are no rocks', () => {
      const rocks = {};
      const row = 2;
      const expected = ["-1", undefined];
      const result = getNearestRock(rocks, row);
      expect(result).toEqual(expected);
    });

    it('should return ["-1", undefined] when all rocks are at a higher row', () => {
      const rocks = { "3": 5, "4": 10, "5": 15 };
      const row = 2;
      const expected = ["-1", undefined];
      const result = getNearestRock(rocks, row);
      expect(result).toEqual(expected);
    });

    it("should return the nearest rock index and value", () => {
      const rocks = { "0": 5, "1": 10, "3": 20 };
      const row = 2;
      const expected = ["1", 10];
      const result = getNearestRock(rocks, row);
      expect(result).toEqual(expected);
    });

    it("should return the nearest rock index and value when there are multiple rocks at the same distance", () => {
      const rocks = { "0": 5, "1": 10, "2": 15, "3": 15, "4": 20 };
      const row = 2;
      const expected = ["2", 15];
      const result = getNearestRock(rocks, row);
      expect(result).toEqual(expected);
    });
  });

  describe("Part 1", () => {
    it("sample should return the good value", () => {
      expect(input1(sample)).toBe(136);
    });
    it("input should return the good value", () => {
      expect(input1(input)).toBe(110407);
    });
  });

  // describe("Part 2", () => {
  //   it("sample should return the good value", () => {
  //     expect(input2(sample)).toBe(0);
  //   });
  //   it("input should return the good value", () => {
  //     expect(input2(input)).toBe(0);
  //   });
  // });
});
