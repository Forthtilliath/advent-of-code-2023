import { sum } from "../utils";

const N_WINNING = 10;

export function input1(input: string[]): number {
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

export function input2(input: string[]): number {
  const instances = input.reduce<number[]>((instances, line, i) => {
    const numbers = line.match(/\d+/g);
    if (!numbers) return instances;

    const matches = countWinningNumbers(
      numbers.slice(1, N_WINNING + 1),
      numbers.slice(N_WINNING + 1)
    );

    return instances.addValuesAtIndex(Array(matches).fill(instances[i]), i + 1);
  }, Array(input.length).fill(1));

  return sum(instances);
}

function countWinningNumbers(
  winningNumbers: string[],
  haveNumbers: string[]
): number {
  return haveNumbers.reduce(
    (sum, n) => sum + Number(winningNumbers.includes(n)),
    0
  );
}
