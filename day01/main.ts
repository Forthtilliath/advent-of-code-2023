import "../helpers/extends";

export function input1(input: string[]): number {
  let sum = 0;

  for (let line of input) {
    const numbers = line.replace(/\D+/g, "").split("");
    sum += concatFirstAndLast(numbers);
  }

  return sum;
}

export function input2(input: string[]): number {
  let sum = 0;

  for (let line of input) {
    let numbers: string[] = convert(line);
    sum += concatFirstAndLast(numbers);
  }

  return sum;
}

export function concatFirstAndLast(arr: string[]): number {
  return Number(arr[0] + arr[arr.length - 1]);
}

export function convert(line: string): string[] {
  const transforms = {
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

  let numbers: string[] = [];

  for (const [key, value] of Object.entries(transforms)) {
    if (line.includes(key)) {
      const indexes = line.allIndexOf(key);
      indexes.forEach((index) => (numbers[index] = value));
    }
    if (line.includes(value)) {
      const indexes = line.allIndexOf(value);
      indexes.forEach((index) => (numbers[index] = value));
    }
  }

  return numbers.filter(String);
}
