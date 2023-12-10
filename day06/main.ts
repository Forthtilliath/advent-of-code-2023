/// <reference path="main.d.ts"/>

import { multiply } from "../helpers/array";
import "../helpers/extends";

export function input1(input: string[]) {
  const [times, distances] = input.map((n) => n.filterNumbers());
  return input_1and2(times, distances);
}

export function input2(input: string[]) {
  const [times, distances] = input
    .map((n) => n.match(/\d+/g)!.join(""))
    .map(Number);
  return input_1and2([times], [distances]);
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
  return multiply(
    times.map((time, i) => calculateTraveled(time, distances[i]))
  );
}
