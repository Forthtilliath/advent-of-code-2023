import { describe, expect, it } from "vitest";
import { generateNextSequence, input1, input2 } from "./main";
import { readFile } from "../lib/readFile";

const DAY = "09";

describe("Day " + DAY, () => {
  const input = readFile(DAY, "input", true);
  const sample = readFile(DAY, "sample", true);

  describe("generateNextSequence", () => {
    it("should return the next sequence", () => {
      expect(generateNextSequence([0, 3, 6, 9, 12, 15])).toEqual([
        3, 3, 3, 3, 3,
      ]);
      expect(generateNextSequence([1, 3, 6, 10, 15, 21])).toEqual([
        2, 3, 4, 5, 6,
      ]);
    });
  });

  describe("Part 1", () => {
    it("sample should return the good value", () => {
      expect(input1(sample)).toBe(114);
    });
    it("input should return the good value", () => {
      expect(input1(input)).toBe(2075724761);
    });
  });

  describe("Part 2", () => {
    it("sample should return the good value", () => {
      expect(input2(sample)).toBe(2);
    });
    it("input should return the good value", () => {
      expect(input2(input)).toBe(1072);
    });
  });
});
