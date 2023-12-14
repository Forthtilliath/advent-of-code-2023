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

/**
 * Adds two numbers together and returns the result.
 * @param a The first number to add.
 * @param b The second number to add.
 * @returns The sum of the two numbers.
 */
export function add(a: number, b: number): number {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new Error("Both arguments must be numbers");
  }
  return a + b;
}

/**
 * Subtracts two numbers and returns the result.
 * @param a {number} The first number to subtract.
 * @param b {number} The second number to subtract.
 * @returns {number} The difference between the two numbers.
 */
export function subtract(a: number, b: number): number {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new Error("Both arguments must be numbers");
  }
  return a - b;
}

/**
 * Multiplies two numbers together and returns the result.
 * @param a The first number to multiply.
 * @param b The second number to multiply.
 * @returns The product of the two numbers.
 */
export function multiply(a: number, b: number): number {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new Error("Both arguments must be numbers");
  }
  return a * b;
}

/**
 * Divides two numbers and returns the result.
 * @param a The dividend.
 * @param b The divisor.
 * @returns The quotient of the division.
 * @throws {Error} If either `a` or `b` is not a number, or if `b` is 0.
 */
export function divide(a: number, b: number): number {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new Error("Both arguments must be numbers");
  }
  if (b === 0) {
    throw new Error("Divisor cannot be 0");
  }
  return a / b;
}
