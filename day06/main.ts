/// <reference path="main.d.ts"/>

import { exec, multiply, readFile } from "../utils";

const DAY = 6;

function main(): void {
  console.clear();
  const input = readFile(DAY, "input");
  if (!input.length) {
    console.error("Invalid input data");
    return;
  }

  exec("input1", () => input1(input));
  exec("input2", () => input2(input));
}

function input1(input: string[]): number {
  const [times, distances] = input.map((n) => n.match(/\d+/g)!.map(Number));

  const ways: number[] = [];

  for (let i in times) {
    const results = Array.from({ length: times[i] }, (_, ms) => {
      return (times[i] - ms) * ms;
    });

    const winnableResults = results.filter((res) => res > distances[i]);
    ways.push(winnableResults.length)
  }
  return multiply(ways);
}

function input2(input: string[]): number {
  return 0;
}

main();
