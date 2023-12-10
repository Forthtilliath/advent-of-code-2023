import { describe, expect, it } from "vitest";
import { input1, input2 } from "./main";
import { readFile } from "../lib/readFile";

const DAY = "02"

describe("Day " + DAY, () => {
  const input = readFile(DAY, "input", true);
  const sample = readFile(DAY, "sample", true);
  
  describe("Part 1", () => {
    it("sample should return the good value", () => {
      expect(input1(sample)).toBe(8);
    });
    it("input should return the good value", () => {
      expect(input1(input)).toBe(2239);
    });
  });

  describe("Part 2", () => {
    it("sample should return the good value", () => {
      expect(input2(sample)).toBe(2286);
    });
    it("input should return the good value", () => {
      expect(input2(input)).toBe(83435);
    });
  });
});
