import fs from "node:fs";
import path from "node:path";
import chalk from "chalk";

export const FILE = Object.freeze({
  sample: "./sample.txt",
  sample1: "./sample1.txt",
  sample2: "./sample2.txt",
  input: "./input.txt",
});

/**
 * The function `generatePath` takes a day number and a file key, and returns a path string by joining
 * the day number with a padded zero and the corresponding file value from the `FILE` object.
 * @param {number} day - The `day` parameter is a number that represents a specific day. It is used to
 * generate a path for a file based on the day.
 * @param fileKey - The `fileKey` parameter is a keyof typeof FILE, which means it can only accept keys
 * that exist in the `FILE` object.
 * @returns a string.
 */
function generatePath(day: number, fileKey: keyof typeof FILE): string {
  return path.join("day" + day.toString().padStart(2, "0"), FILE[fileKey]);
}

type DataType = string;
export function readFile<T extends DataType = string>(
  day: number,
  fileKey: keyof typeof FILE
): T[];
export function readFile<T extends DataType = string>(
  day: number,
  fileKey: keyof typeof FILE,
  asArray: true
): T[];
export function readFile<T extends DataType = string>(
  day: number,
  fileKey: keyof typeof FILE,
  asArray: false
): T;
/**
 * The function `readFile` reads a file specified by the `day` and `fileKey` parameters, and returns
 * the file data as an array or a string depending on the value of the `asArray` parameter.
 * @param {number} day - The `day` parameter is a number that represents the day of the month. It is
 * used to generate the path to the file that needs to be read.
 * @param fileKey - The `fileKey` parameter is a keyof typeof FILE, which means it should be a valid
 * key of the `FILE` object. The `FILE` object likely contains keys that represent different file names
 * or file types.
 * @param [asArray=true] - The `asArray` parameter is a boolean flag that determines whether the data
 * should be returned as an array or as a single string. If `asArray` is set to `true`, the data will
 * be split by the newline character (`\r\n`) and returned as an array of strings.
 * @returns If `asArray` is `true`, the function will return the data split into an array using the
 * newline character (`\r\n`). Otherwise, it will return the data as is.
 */
export function readFile(
  day: number,
  fileKey: keyof typeof FILE,
  asArray = true
) {
  const path = generatePath(day, fileKey);
  let data: string;
  try {
    data = fs.readFileSync(path, "utf8");
  } catch (e) {
    console.log(chalk.bold.red(`Error: ${path} not found`));
    return asArray ? [] : "";
  }
  if (asArray) return data.split("\r\n");
  return data;
}

/**
 * The `exec` function executes a callback function and logs the execution time and result.
 * @param {string} label - A string that represents the label or name of the code block being executed.
 * This is used to group and identify the code block in the console output.
 * @param cb - The `cb` parameter is a callback function that takes no arguments and returns a value of
 * type `R`. It represents the code that you want to execute and measure the execution time for.
 * @returns The function `exec` returns the result of the callback function `cb`.
 */
export function exec<R>(label: string, cb: () => R): R {
  console.group(`===== ${label} =====`);
  const start = performance.now();
  const res = cb();
  const end = performance.now();
  console.groupEnd();

  console.log(`Execution time: ${(end - start).toFixed(2)} ms, Result:`, res);
  console.log();

  return res;
}

/**
 * The function "sum" takes an array of numbers as input and returns the sum of all the numbers in the
 * array.
 * @param {number[]} arr - The parameter "arr" is an array of numbers.
 * @returns the sum of all the numbers in the given array.
 */
export function sum(arr: number[]): number {
  return arr.reduce((sum, n) => sum + n, 0);
}
export function multiply(arr: number[]): number {
  return arr.reduce((sum, n) => sum * n, 1);
}
