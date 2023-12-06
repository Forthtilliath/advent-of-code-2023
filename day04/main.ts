import { exec, readFile, sum } from "../utils";

// const N_WINNING = 5;
const N_WINNING = 10;

function main() {
  console.clear();
  const input = readFile(4, "input");
  if (!input.length) return;

  exec("input1", () => input1(input));
  exec("input2", () => input2(input));
}

function input1(input: string[]): number {
  const points = input.map((line) => {
    const numbers = line.match(/\d+/g);
    if (!numbers) return 0;

    const n = countWinningNumbers(
      numbers.slice(1, N_WINNING + 1),
      numbers.slice(N_WINNING + 1)
    );

    return n ? 1 << (n - 1) : 0;
  });

  return sum(points);
}

function input2(input: string[]): number {
  const instances = input.reduce((instances, line, i) => {
    const numbers = line.match(/\d+/g);
    if (!numbers) return instances;

    const matches = countWinningNumbers(
      numbers.slice(1, N_WINNING + 1),
      numbers.slice(N_WINNING + 1)
    );

    return addValuesAtIndex(
      instances,
      Array(matches).fill(instances[i]),
      i + 1
    );
  }, Array(input.length).fill(1));

  return sum(instances);
}

main();

function countWinningNumbers(
  winningNumbers: string[],
  haveNumbers: string[]
): number {
  return haveNumbers.reduce(
    (sum, n) => sum + Number(winningNumbers.includes(n)),
    0
  );
}

function addValuesAtIndex(
  initialArr: number[],
  valuesToAdd: number[],
  startIndex: number
): number[] {
  const result: number[] = [...initialArr];

  for (let i = 0; i < valuesToAdd.length; i++) {
    const index = i + startIndex;
    if (index < result.length) {
      result[index] += valuesToAdd[i];
    } else {
      result.push(valuesToAdd[i]);
    }
  }

  return result;
}
