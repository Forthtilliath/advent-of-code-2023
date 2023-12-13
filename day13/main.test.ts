import { describe, expect, it } from "vitest";
import { input1, input2 } from "./main";
import { readFile } from "../lib/readFile";

const DAY = "13";

describe("Day " + DAY, () => {
  const input = readFile(DAY, "input", true);
  const sample = readFile(DAY, "sample", true);

  describe("Part 1", () => {
    it("sample should return the good value", () => {
      expect(input1(sample)).toBe(405);
    });
    it("input should return the good value", () => {
      expect(input1(input)).toBe(37381);
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
