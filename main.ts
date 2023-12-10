/// <reference path="main.d.ts"/>

import { readFile, exec, getArguments } from "./lib";

main();

function main(): void {
  console.clear();

  const args = getArguments();

  part1(args);
  part2(args);
}

function part1(args: AOC.Arguments) {
  const formattedDay = args.day.toString().padStart(2, "0");
  const filename: AOC.FileName = args.separated ? `${args.file}1` : args.file;
  const file = readFile(formattedDay, filename, args.asArray);

  const { input1 } = require(`./day${formattedDay}/main`);

  exec(`Day ${formattedDay} - Part 1: ${filename}`, () => input1(file.slice()));
}

function part2(args: AOC.Arguments) {
  const formattedDay = args.day.toString().padStart(2, "0");
  const filename: AOC.FileName = args.separated ? `${args.file}2` : args.file;
  const file = readFile(formattedDay, filename, args.asArray);

  const { input2 } = require(`./day${formattedDay}/main`);

  exec(`Day ${formattedDay} - Part 2: ${filename}`, () => input2(file.slice()));
}
