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
    chunkMap<F extends T[] = T[]>(this: T[], length: number, mapFn: (...el: T[]) => F): F[];

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
    addValuesAtIndex(this: T[], valuesToAdd: number[], startIndex: number): number[];

    /**
     * Generates a 2D matrix by applying a mapping function to each element of a 2D array.
     *
     * @template T - The type of elements in the input array.
     * @template U - The type of elements in the output matrix. Defaults to T.
     * @param {ArrayLike<T>[]} this - The input array.
     * @param {(v: T, k: number) => U} mapfn - The mapping function to apply to each element.
     * @return {U[][]} - The generated 2D matrix.
     */
    // toMatrix<T, U>(this: ArrayLike<T>[], mapfn: (v: T, k: number) => U): U[][];
    // toMatrix<T>(this: ArrayLike<T>[]): T[][];
    toMatrix<T, U>(
      this: ArrayLike<T>[],
      mapfn?: (v: T, k: [row: number, col: number], matrix: U[][]) => U
    ): U[][];

    /**
     * Generates a new matrix by applying a mapping function to each element of the input array of arrays.
     *
     * @template T - The type of the elements in the input array.
     * @template U - The type of the elements in the output matrix.
     * @param {ArrayLike<T>[]} this - The input array of arrays.
     * @param {function(T, number): V} [mapfn=(v: T, k: number) => v] - The mapping function to apply to each element.
     * @return {U[][]} - The resulting matrix after applying the mapping function.
     */
    printMatrix<T, U>(this: T[][], mapfn?: (v: T, k: number) => U): void;
  }
}

/***********************************************/
/******************** CHUNK ********************/
/***********************************************/
Object.defineProperty(Array.prototype, "chunk", {
  value: function <T>(this: T[], length: number) {
    const res: T[][] = [];
    for (let i = 0; i < this.length; i += length) {
      res.push(this.slice(i, i + length));
    }
    return res;
  },
  writable: false,
  enumerable: false,
  configurable: false,
});

/***************************************************/
/******************** CHUNK_MAP ********************/
/***************************************************/
Object.defineProperty(Array.prototype, "chunkMap", {
  value: function <T, F = T[]>(this: T[], length: number, mapFn: (...el: T[]) => F) {
    const res: F[] = [];
    for (let i = 0; i < this.length; i += length) {
      const resFn = mapFn(...this.slice(i, i + length));
      res.push(resFn);
    }
    return res;
  },
  writable: false,
  enumerable: false,
  configurable: false,
});

/**************************************************/
/******************** GROUP_BY ********************/
/**************************************************/
Object.defineProperty(Array.prototype, "groupBy", {
  value: function <T extends PropertyKey>(this: T[]): Record<T, number> {
    return this.reduce((result, item) => {
      return {
        ...result,
        [item]: (result[item] || 0) + 1,
      };
    }, {} as Record<T, number>);
  },
  writable: false,
  enumerable: false,
  configurable: false,
});

/*********************************************/
/******************** SUM ********************/
/*********************************************/
Object.defineProperty(Array.prototype, "sum", {
  value: function (this: number[]) {
    return this.reduce((sum, n) => sum + n, 0);
  },
  writable: false,
  enumerable: false,
  configurable: false,
});

/*************************************************************/
/******************** ADD_VALUES_AT_INDEX ********************/
/*************************************************************/
Object.defineProperty(Array.prototype, "addValuesAtIndex", {
  value: function (this: number[], valuesToAdd: number[], startIndex: number) {
    for (let i = 0; i < valuesToAdd.length; i++) {
      const index = i + startIndex;
      if (index < this.length) {
        this[index] += valuesToAdd[i];
      } else {
        this.push(valuesToAdd[i]);
      }
    }

    return this;
  },
  writable: false,
  enumerable: false,
  configurable: false,
});

/***************************************************/
/******************** TO_MATRIX ********************/
/***************************************************/
Object.defineProperty(Array.prototype, "toMatrix", {
  value: function <T, U>(
    this: ArrayLike<T>[],
    mapfn = (v: T, k: [row: number, col: number], matrix: U[][]) => v
  ): U[][] {
    const rows: number = this.length;
    const cols: number = this[0].length;
    const matrix: U[][] = Array.from({ length: rows }, () => new Array<U>(cols));
    for (let row: number = 0; row < rows; row++) {
      for (let col: number = 0; col < cols; col++) {
        matrix[row][col] = mapfn(this[row][col], [row, col], matrix) as unknown as U;
      }
    }
    return matrix;
  },
  writable: false,
  enumerable: false,
  configurable: false,
});

/******************************************************/
/******************** PRINT_MATRIX ********************/
/******************************************************/
Object.defineProperty(Array.prototype, "printMatrix", {
  value: function <T, U>(this: T[][], mapfn = (v: T, k: number) => v) {
    for (let row of this) {
      console.log(row.map(mapfn).join(""));
    }
  },
  writable: false,
  enumerable: false,
  configurable: false,
});
