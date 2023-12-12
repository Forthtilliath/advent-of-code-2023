declare global {
  interface String {
    /**
     * Finds all the indexes of a given substring within a string.
     * @param searchString - The substring to search for within the string.
     * @param position - The starting position for the search. If not provided, the search starts from the beginning of the string.
     * @returns An array of numbers representing the indexes of the substring within the string. If no matches are found, an empty array is returned.
     */
    allIndexOf(searchString: string, position?: number): number[];

    /**
     * Adds a new method called `matchAllAsArray` to the `String` prototype in TypeScript.
     *
     * @param regex - The regular expression pattern to match against the string.
     * @returns An array containing all the matches of the regular expression pattern in the string.
     *
     * @example
     * const str = "Hello World";
     * const regex = /[a-z]/g;
     * const result = str.matchAllAsArray(regex);
     * console.log(result); // ['e', 'l', 'l', 'o', 'o', 'r', 'l', 'd']
     */
    matchAllAsArray<T = unknown>(regex: RegExp): T[];

    /**
     * Filters out all the numbers from a string and returns them as an array.
     * @returns An array of numbers representing the filtered numbers from the string.
     */
    filterNumbers(): number[];

    /**
     * Concatenates the string with itself `count` number of times, separated by the `separator`.
     *
     * @param {number} count - The number of times the string should be concatenated with itself.
     * @param {string} separator - The string used to separate each concatenation.
     * @return {string} - The resulting string after concatenation.
     */
    repeatWithSep(this: string, count: number, separator: string): string;
  }
}

/******************************************************/
/******************** ALL_INDEX_OF ********************/
/******************************************************/
Object.defineProperty(String.prototype, "allIndexOf", {
  value: function (this: string, searchString: string, position?: number) {
    const matches = Array.from(this.matchAll(new RegExp(searchString, "gi")));
    if (matches.length === 0) return [];

    const indexes = matches.filter((m) => m.index !== undefined).map((a) => a.index!);

    if (!position) return indexes;

    return indexes.filter((i) => i > position);
  },
  writable: false,
  enumerable: false,
  configurable: false,
});

/************************************************************/
/******************** MATCH_ALL_AS_ARRAY ********************/
/************************************************************/
Object.defineProperty(String.prototype, "matchAllAsArray", {
  value: function <T = unknown>(this: string, regex: RegExp): T[] {
    return Array.from(this.matchAll(regex)) as T[];
  },
  writable: false,
  enumerable: false,
  configurable: false,
});

/********************************************************/
/******************** FILTER_NUMBERS ********************/
/********************************************************/
Object.defineProperty(String.prototype, "filterNumbers", {
  value: function (this: string): number[] {
    const regex = /\d+/g;
    const matches = this.match(regex) || [];
    return matches.map(Number);
  },
  writable: false,
  enumerable: false,
  configurable: false,
});

/***************************************************************/
/******************** REPEAT_WITH_SEPARATOR ********************/
/***************************************************************/
Object.defineProperty(String.prototype, "repeatWithSep", {
  value: function (this: string, count: number, separator: string): string {
    return Array(count).fill(this).join(separator);
  },
  writable: false,
  enumerable: false,
  configurable: false,
});
