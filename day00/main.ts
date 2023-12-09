/// <reference path="main.d.ts"/>

import { exec, readFile } from "../utils";

const DAY = 6;

function main(): void {
  console.clear();
  const input = readFile(DAY, "sample", true);
  if (!input.length) {
    console.error("Invalid input data");
    return;
  }

  exec("input1", () => input1(input.slice()));
  exec("input2", () => input2(input.slice()));
}

function input1(input: string[]): number {
  for (let line of input) {
    console.log(line);
  }
  return 0;
}

function input2(input: string[]): number {
  for (let line of input) {
    console.log(line);
  }
  return 0;
}

main();
