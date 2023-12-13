import { describe, expect, it } from "vitest";
import { getDifferences, getReflectionLineIndex, input1, input2, transpose } from "./main";
import { readFile } from "../lib/readFile";

const DAY = "13";

describe("Day " + DAY, () => {
  const input = readFile(DAY, "input", true);
  const sample = readFile(DAY, "sample", true);

  describe("getDifferences", () => {
    it("should return 0 when both strings are empty", () => {
      expect(getDifferences("", "")).toBe(0);
    });

    it("should return 0 when both strings are the same", () => {
      expect(getDifferences("abc", "abc")).toBe(0);
    });

    it("should return the correct number of differences when strings have different characters", () => {
      expect(getDifferences("abc", "def")).toBe(3);
      expect(getDifferences("hello", "world")).toBe(4);
      expect(getDifferences("123", "321")).toBe(2);
    });

    it("should throw an error when strings have different lengths", () => {
      expect(() => {
        getDifferences("abc", "abcd");
      }).toThrow("abc and abcd are not the same length");
    });
  });

  describe("transpose", () => {
    it("should transpose a string array", () => {
      // prettier-ignore
      const arr = [
        "#.##.",
        "..#.#",
        "##...",
        "##..."
      ];
      // prettier-ignore
      const expected = [
        "#.##",
        "..##",
        "##..",
        "#...",
        ".#.."
      ];
      expect(transpose(arr)).toEqual(expected);
    });
  });

  describe("getReflectionLineIndex", () => {
    it("should return the correct reflection line index", () => {
      // Testing for rows with no reflection line
      expect(getReflectionLineIndex(["abc", "def", "ghi"])).toBe(-1);
      expect(getReflectionLineIndex(["ghi", "abc", "jkl", "abc"])).toBe(-1);

      // Testing for rows with reflection lines
      expect(getReflectionLineIndex(["abc", "def", "def", "abc", "ghi"])).toBe(2);
      expect(getReflectionLineIndex(["abc", "def", "jkl", "jkl", "def", "abc"])).toBe(3);

      // Testing for rows with reflection lines and maxDiff value
      expect(getReflectionLineIndex(["abc", "def", "abc", "def", "ghi"], 1)).toBe(-1);
      expect(getReflectionLineIndex(["abc", "def", "abc", "def", "ghi"], 2)).toBe(-1);
      const arr = [
        "#..###.#.",
        "...#...##",
        "##...##..",
        "###.###..",
        "##...#.##",
        "...###.##",
        "...#.#.##",
        "##...#.##",
        "###.###..",
        "##...##..",
        "...#...##",
        "#..###.#.",
        "#..###.#.",
      ];
      expect(getReflectionLineIndex(arr, 0)).toBe(12);
      expect(getReflectionLineIndex(arr, 1)).toBe(6);
    });
  });

  describe("Part 1", () => {
    it("sample should return the good value", () => {
      expect(input1(sample)).toBe(405);
    });
    it("input should return the good value", () => {
      expect(input1(input)).toBe(37381);
    });
  });

  describe("Part 2", () => {
    it("sample should return the good value", () => {
      expect(input2(sample)).toBe(400);
    });
    it("input should return the good value", () => {
      expect(input2(input)).toBe(28210);
    });
  });
});
