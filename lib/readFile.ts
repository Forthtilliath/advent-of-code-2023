import fs from "node:fs";
import path from "node:path";
import chalk from "chalk";

type DataType = string;
export function readFile<T extends DataType = string>(
  day: string,
  filename: AOC.FileName,
  asArray: true
): T[];
export function readFile<T extends DataType = string>(
  day: string,
  filename: AOC.FileName,
  asArray: false
): T;
export function readFile<T extends DataType = string, B extends boolean = true>(
  day: string,
  filename: AOC.FileName,
  asArray: B
): T | T[];
export function readFile(
  dayNumber: string,
  filename: AOC.FileName,
  asArray = true
) {
  let data: string;
  const inputPath = path.join(`day${dayNumber}`, `${filename}.txt`);

  try {
    data = fs.readFileSync(inputPath, "utf8");
  } catch (e) {
    console.log(chalk.bold.red`Error: ${inputPath} not found`);
    return asArray ? [] : "";
  }
  if (asArray) return data.split("\r\n");
  return data;
}
