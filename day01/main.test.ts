import { describe, expect, it } from "vitest";
import { readFile } from "../lib/readFile";
import { concatFirstAndLast, convert, input1, input2 } from "./main";

const DAY = "01";

describe("Day " + DAY, () => {
  const input = readFile(DAY, "input", true);
  const sample1 = readFile(DAY, "sample1", true);
  const sample2 = readFile(DAY, "sample2", true);

  describe("Part 1", () => {
    it("shound concat the first element with the last element", () => {
      expect(concatFirstAndLast(["4", "9", "8", "7", "2"])).toBe(42);
      expect(concatFirstAndLast(["1", "8", "2", "3", "4"])).toBe(14);
      expect(concatFirstAndLast(["2", "7", "9", "8", "3"])).toBe(23);
    });
    it("sample1 should return the good value", () => {
      expect(input1(sample1)).toBe(142);
    });
    it("input should return the good value", () => {
      expect(input1(input)).toBe(55386);
    });
  });

  describe("Part 2", () => {
    it("shound convert the line", () => {
      expect(convert("4nineeightseven2")).toEqual(["4", "9", "8", "7", "2"]);
      expect(convert("zoneight234")).toEqual(["1", "8", "2", "3", "4"]);
      expect(convert("2sevenineight3")).toEqual(["2", "7", "9", "8", "3"]);
    });
    it("sample2 should return the good value", () => {
      expect(input2(sample2)).toBe(281);
    });
    it("input should return the good value", () => {
      expect(input2(input)).toBe(54824);
    });
  });
});
