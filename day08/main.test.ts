import { describe, expect, it } from "vitest";
import { generateMap, input1, input2 } from "./main";
import { readFile } from "../lib/readFile";

const DAY = "08";

describe("Day " + DAY, () => {
  const input = readFile(DAY, "input", true);
  const sample1 = readFile(DAY, "sample1", true);
  const sample2 = readFile(DAY, "sample2", true);

  describe("generateMap", () => {
    it("should parse the line into a Map", () => {
      expect(generateMap(["AAA = (BBB, CCC)"])).toEqual(
        new Map([["AAA", { L: "BBB", R: "CCC" }]])
      );
      expect(generateMap(["11B = (XXX, 11Z)"])).toEqual(
        new Map([["11B", { L: "XXX", R: "11Z" }]])
      );
      expect(generateMap(["HFF = (HRR, BSG)"])).toEqual(
        new Map([["HFF", { L: "HRR", R: "BSG" }]])
      );
    });
  });

  describe("Part 1", () => {
    it("sample should return the good value", () => {
      expect(input1(sample1)).toBe(2);
    });
    it("input should return the good value", () => {
      expect(input1(input)).toBe(21251);
    });
  });

  describe("Part 2", () => {
    it("sample should return the good value", () => {
      expect(input2(sample2)).toBe(6);
    });
    it("input should return the good value", () => {
      expect(input2(input)).toBe(11678319315857);
    });
  });
});
