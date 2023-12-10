declare global {
  interface Array<T> {
    /**
     * Splits the array into smaller arrays of the specified length.
     * @param length - The size of each chunk.
     * @returns An array of smaller arrays, each representing a chunk of the original array.
     * @example
     * const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
     * const chunks = arr.chunk(3);
     * console.log(chunks);
     * // Output: [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]]
     */
    chunk(this: T[], length: number): T[][];

    /**
     * Splits an array into smaller arrays of a specified length and applies a mapping function to each chunk.
     * @param length - The size of each chunk.
     * @param mapFn - A mapping function that takes the elements of each chunk as arguments and returns a value.
     * @returns An array of smaller arrays, each representing a chunk of the original array with the mapping function applied to each chunk.
     */
    chunkMap<F extends T[] = T[]>(
      this: T[],
      length: number,
      mapFn: (...el: T[]) => F
    ): F[];

    /**
     * Groups the values in the array by their occurrences.
     * @returns An object that represents the grouping of values by their occurrences in the array.
     * The keys of the object are the unique values from the array, and the values are the number of occurrences of each value.
     * @example
     * const arr = [1, 2, 2, 3, 3, 3];
     * const result = arr.groupBy();
     * console.log(result);
     * // Output: { '1': 1, '2': 2, '3': 3 }
     */
    groupBy<T extends PropertyKey>(this: T[]): Record<T, number>;

    /**
     * Calculates the sum of all the elements in the array.
     *
     * @returns {number} The sum of all the elements in the array.
     *
     * @example
     * const arr = [1, 2, 3, 4, 5];
     * const result = arr.sum();
     * console.log(result);
     * // Output: 15
     */
    sum(this: number[]): number;

    /**
     * Adds values to an array at specific indexes.
     *
     * @param {number[]} valuesToAdd - An array of numbers to add to the original array.
     * @param {number} startIndex - The index at which to start adding the values.
     * @returns {number[]} The original array with the values added at the specified indexes.
     */
    addValuesAtIndex(
      this: T[],
      valuesToAdd: number[],
      startIndex: number
    ): number[];
  }
}

/***********************************************/
/******************** CHUNK ********************/
/***********************************************/
if (!Array.prototype.chunk) {
  Array.prototype.chunk = function <T>(this: T[], length: number) {
    const res: T[][] = [];
    for (let i = 0; i < this.length; i += length) {
      res.push(this.slice(i, i + length));
    }
    return res;
  };
} else {
  throw new Error("chunk already exist!");
}

/***************************************************/
/******************** CHUNK_MAP ********************/
/***************************************************/
if (!Array.prototype.chunkMap) {
  Array.prototype.chunkMap = function <T, F = T[]>(
    this: T[],
    length: number,
    mapFn: (...el: T[]) => F
  ) {
    const res: F[] = [];
    for (let i = 0; i < this.length; i += length) {
      const resFn = mapFn(...this.slice(i, i + length));
      res.push(resFn);
    }
    return res;
  };
} else {
  throw new Error("chunkMap already exist!");
}

/**************************************************/
/******************** GROUP_BY ********************/
/**************************************************/
if (!Array.prototype.groupBy) {
  Array.prototype.groupBy = function <T extends PropertyKey>(
    this: T[]
  ): Record<T, number> {
    return this.reduce((result, item) => {
      return {
        ...result,
        [item]: (result[item] || 0) + 1,
      };
    }, {} as Record<T, number>);
  };
} else {
  throw new Error("groupBy already exist!");
}

/*********************************************/
/******************** SUM ********************/
/*********************************************/
if (!Array.prototype.sum) {
  Array.prototype.sum = function (this: number[]) {
    return this.reduce((sum, n) => sum + n, 0);
  };
} else {
  throw new Error("sum already exist!");
}

/*************************************************************/
/******************** ADD_VALUES_AT_INDEX ********************/
/*************************************************************/
if (!Array.prototype.addValuesAtIndex) {
  Array.prototype.addValuesAtIndex = function (
    this: number[],
    valuesToAdd: number[],
    startIndex: number
  ) {
    for (let i = 0; i < valuesToAdd.length; i++) {
      const index = i + startIndex;
      if (index < this.length) {
        this[index] += valuesToAdd[i];
      } else {
        this.push(valuesToAdd[i]);
      }
    }

    return this;
  };
} else {
  throw new Error("addValuesAtIndex already exist!");
}
