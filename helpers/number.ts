/**
 * Calculates the least common multiple (LCM) of two numbers.
 *
 * @param max - The maximum number.
 * @param min - The minimum number.
 * @returns The least common multiple (LCM) of `max` and `min`.
 *
 * @example
 * const max = 12;
 * const min = 8;
 * const result = getPPCM(max, min);
 * console.log(result); // Output: 24
 */
export function getPPCM(max: number, min: number): number {
  if (min > max) {
    [max, min] = [min, max];
  }
  let result = max;

  while (result % min !== 0) {
    result += max;
  }

  return result;
}
