import { exec, readFile } from "../utils";

function main() {
  console.clear();
  const input = readFile(1, "input");

  exec("input1", () => input1(input));
  exec("input2", () => input2(input));
}

function input1(input: string[]): number {
  let sum = 0;

  input.forEach((line) => {
    const numbers = line.replace(/\D+/g, "").split("");
    sum += Number(numbers[0] + numbers[numbers.length - 1]);
  });

  return sum;
}

const indexOfAll = (str: string, val: string) =>
  [...str.matchAll(new RegExp(val, "gi"))].map((a) => a.index);

function input2(input: string[]): number {
  const transform = {
    one: "1",
    two: "2",
    three: "3",
    four: "4",
    five: "5",
    six: "6",
    seven: "7",
    eight: "8",
    nine: "9",
  };

  let sum = 0;

  input.forEach((line) => {
    let numbers: string[] = [];

    Object.entries(transform).forEach(([key, value]) => {
      if (line.includes(key)) {
        const indexes = indexOfAll(line, key) as number[];
        indexes.forEach((index) => (numbers[index] = value));
      }
      if (line.includes(value)) {
        const indexes = indexOfAll(line, value) as number[];
        indexes.forEach((index) => (numbers[index] = value));
      }
    });

    numbers = numbers.filter(String);
    sum += Number(numbers[0] + numbers[numbers.length - 1]);
  });

  return sum;
}

main();
