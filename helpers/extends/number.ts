declare global {
  interface Number {
    /**
     * Concatenates the number with the given value and returns the result as a string.
     *
     * @param value - The value to be concatenated with the number.
     * @returns A string that is the concatenation of the number and the value.
     *
     * @example
     * const num = 10;
     * const str = num.concat(" is a number"); // "10 is a number"
     * const bool = num.concat(true); // "10true"
     */
    concat(value: number | string | boolean): string;

    /**
     * Checks if a number is within a specified range.
     *
     * @param min - The minimum value of the range.
     * @param max - The maximum value of the range.
     * @returns true if the number is within the specified range, false otherwise.
     */
    isInRange(min: number, max: number): boolean;
  }
}

/************************************************/
/******************** CONCAT ********************/
/************************************************/
Object.defineProperty(Number.prototype, "concat", {
  value: function (
    this: number,
    value: number | string | boolean
  ) {
    return Number(this).toString() + value.toString();
  },
  writable: false,
  enumerable: false,
  configurable: false,
});

/*****************************************************/
/******************** IS_IN_RANGE ********************/
/*****************************************************/
Object.defineProperty(Number.prototype, "isInRange", {
  value: function (
    this: number,
    min: number,
    max: number
  ) {
    return min <= this && this <= max;
  },
  writable: false,
  enumerable: false,
  configurable: false,
});
