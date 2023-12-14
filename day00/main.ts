/// <reference path="main.d.ts"/>

import chalk from "chalk";
import "../helpers/extends";

export function input1(input: string[]): number {
  for (let line of input) {
    console.log(chalk.blue`${line}`);
  }
  return 0;
}

export function input2(input: string[]): number {
  for (let line of input) {
    // console.log(chalk.blue`${line}`);
  }
  return 0;
}
