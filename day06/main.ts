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

  const [times1, distances1] = input.map((n) => n.match(/\d+/g)!.map(Number));
  exec("input1", () => input_1and2(times1, distances1));
  const [times2, distances2] = input
    .map((n) => n.match(/\d+/g)!.join(""))
    .map(Number);

  exec("input2", () => input_1and2([times2], [distances2]));
}

function calculateTraveled(time: number, distance: number) {
  let ways: number = 0;
  for (let ms = 0; ms < time; ms++) {
    const traveled = (time - ms) * ms;
    if (traveled > distance) ways++;
  }
  return ways;
}

function input_1and2(times: number[], distances: number[]): number {
  return multiply(times.map((time,i) => calculateTraveled(time, distances[i])));
}

main();
