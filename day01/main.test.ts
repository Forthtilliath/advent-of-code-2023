import { describe, expect, it } from "vitest";
import { input1, input2 } from "./main";
import { readFile } from "../lib/readFile";

const DAY = "01";

describe("Day " + DAY, () => {
  const input = readFile(DAY, "input", true);
  const sample1 = readFile(DAY, "sample1", true);
  const sample2 = readFile(DAY, "sample2", true);

  describe("Part 1", () => {
    it("sample1 should return the good value", () => {
      expect(input1(sample1)).toBe(142);
    });
    it("input should return the good value", () => {
      expect(input1(input)).toBe(55386);
    });
  });

  describe("Part 2", () => {
    it("sample2 should return the good value", () => {
      expect(input2(sample2)).toBe(281);
    });
    it("input should return the good value", () => {
      expect(input2(input)).toBe(54824);
    });
  });
});
