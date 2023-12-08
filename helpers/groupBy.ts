export function groupBy<T extends PropertyKey>(array: T[]): Record<T, number> {
  return array.reduce((result, item) => {
    result[item] = (result[item] || 0) + 1;
    return result;
  }, {} as Record<T, number>);
}
