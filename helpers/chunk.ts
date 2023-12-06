export function chunk<T>(arr: T[], length: number): T[][] {
  const res: T[][] = [];
  for (let i = 0; i < arr.length; i += length) {
    res.push(arr.slice(i, i + length));
  }
  return res;
}

export function chunkMap<T>(
  arr: T[],
  length: number,
  mapFn: (...args: any[]) => any
): T[][] {
  const res: T[][] = [];
  for (let i = 0; i < arr.length; i += length) {
    const resFn = mapFn(...arr.slice(i, i + length));
    res.push(resFn);
  }
  return res;
}
