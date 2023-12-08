// export function toSorted<T>(
//   arr: T[],
//   compareFn?: ((a: T, b: T) => number) | undefined
// ): T[] {
//   return [...arr].sort(compareFn);
// }

export function toSorted<T>(
  arr: T[],
  compareFn?: ((a: T, b: T) => number) | undefined
): T[] {
  return [...arr].sort(compareFn);
}

export function toSortedMap<K, V>(
  arr: Map<K, V>,
  compareFn?: ((a: [K, V], b: [K, V]) => number) | undefined
): [K, V][] {
  return [...arr].sort(compareFn);
}
