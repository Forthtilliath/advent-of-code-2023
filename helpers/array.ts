export function sum(arr: number[]): number {
  return arr.reduce((sum, n) => sum + n, 0);
}
export function multiply(arr: number[]): number {
  return arr.reduce((sum, n) => sum * n, 1);
}
export function substract(arr: number[], altern = false): number {
  return arr.reduce((sum, n) => (altern ? n - sum : sum - n), 0);
}
