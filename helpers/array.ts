import { add } from "./number";

export function sum(arr: number[]): number {
  return arr.reduce(add, 0);
}
export function multiply(arr: number[]): number {
  return arr.reduce((sum, n) => sum * n, 1);
}
export function substract(arr: number[], altern = false): number {
  return arr.reduce((sum, n) => (altern ? n - sum : sum - n), 0);
}

export function range(start: number, stop: number, step = 1): number[] {
  if (step > 0 && stop < start) [start, stop] = [stop, start];
  
  return Array.from({ length: (stop - start) / step + 1 }, (_, index) => start + index * step);
}
