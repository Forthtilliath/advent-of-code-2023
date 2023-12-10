import chalk from "chalk";

export function exec<R>(label: string, cb: () => R): R {
  const title = label.includes("sample")
    ? chalk.bgBlueBright.bold
    : chalk.bgHex("#ED7F10").bold;

  console.group(title`!${" ".repeat(10)}${label}${" ".repeat(10)}!`);
  const start = performance.now();
  const res = cb();
  const end = performance.now();
  console.groupEnd();

  console.log(
    chalk.blueBright`Execution time: ${(end - start).toFixed(2)} ms, Result:`,
    res
  );
  console.log();

  return res;
}
