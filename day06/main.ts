/// <reference path="main.d.ts"/>

import { exec, readFile } from "../utils";

const DAY = 6;

function main(): void {
  console.clear();
  const input = readFile(DAY, "input", false);
  if (!input.length) {
    console.error("Invalid input data");
    return;
  }

  exec("input1", () => input1(input));
  exec("input2", () => input2(input));
}

function input1(input: string): number {
  return 0;
}

function input2(input: string): number {
  return 0;
}

main();
