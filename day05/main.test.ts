import { describe, expect, it } from "vitest";
import { input1, input2 } from "./main";
import { readFile } from "../lib/readFile";

const DAY = "05";

describe("Day " + DAY, () => {
  const input = readFile(DAY, "input", false);
  const sample = readFile(DAY, "sample", false);

  describe("Part 1", () => {
    it("sample should return the good value", () => {
      expect(input1(sample)).toBe(35);
    });
    it("input should return the good value", () => {
      expect(input1(input)).toBe(331445006);
    });
  });

  describe("Part 2", () => {
    it("sample should return the good value", () => {
      expect(input2(sample)).toBe(46);
    });
    it("input should return the good value", () => {
      expect(input2(input)).toBe(6472060);
    });
  });
});
