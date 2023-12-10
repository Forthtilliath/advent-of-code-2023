/// <reference path="main.d.ts"/>

import "../helpers/extends";

export const CATEGORIES = [
  "seed",
  "soil",
  "fertilizer",
  "water",
  "light",
  "temperature",
  "humidity",
  "location",
] as const;

export function input1(input: string): number {
  const groups = input.split("\r\n\r\n");
  const seeds: number[] = groups.shift()!.match(/\d+/g)!.map(Number);
  const categories: Categorie[] = groups.map(getConvertion);

  let convertedSeeds: number[] = seeds.map((seed) => {
    let updatedSeed = seed;
    for (const categorie of categories) {
      updatedSeed = convert(updatedSeed, categorie);
    }
    return updatedSeed;
  });
  return Math.min(...convertedSeeds);
}

export function input2(input: string): number {
  const groups = input.split("\r\n\r\n");
  const seeds = groups.shift()!.match(/\d+/g)!.map(Number);
  const seedsBy2 = seeds.chunkMap(2, getSeedRange);
  const categories: Categorie[] = groups.map(getConvertion);

  const updatedSeeds = categories.reduce((res, categorie) => {
    return res.map((seed) => convertAll(seed, categorie)) as [number, number][];
  }, seedsBy2);

  return Math.min(...updatedSeeds.flat(100));
}

function getConvertion(line: string) {
  return line
    .split("\r\n")
    .slice(1)
    .map((row) => row.split(" ").map(Number) as Convertion);
}

function isInRange([, src, range]: Convertion, min: number, max = min) {
  return min <= src + range - 1 && src <= max;
}

function convert(source: number, categorie: Categorie) {
  const convertion = categorie.find((conv) => isInRange(conv, source));
  if (!convertion) return source;

  return source - convertion[1] + convertion[0];
}

function getSeedRange(
  source: number,
  range: number
): [start: number, end: number] {
  return [source, source + range - 1];
}

function getRangeType(
  [sMin, sMax]: SeedRange,
  [src, range]: [Convertion[1], Convertion[2]]
): RangeType {
  if (src <= sMin && src + range >= sMax) {
    return "IS_INCLUDED";
  }

  if (src > sMin && src + range < sMax) {
    return "INCLUDE";
  }

  if (src <= sMin && src + range >= sMin && src + range <= sMax) {
    return "LEFT_OVERFLOW";
  }

  if (src > sMin && src + range >= sMax && src <= sMax) {
    return "RIGHT_OVERFLOW";
  }

  return "OUTSIDE_RANGE";
}

function convert_part2(
  [sMin, sMax]: [number, number],
  categorie: Categorie
): number[][][] {
  let convertions = categorie.filter((conv) => isInRange(conv, sMin, sMax));

  let res: number[][][] = [];
  let leftover: number[][] = [[sMin, sMax]];

  convertions.forEach(([dest, src, range]) => {
    let newLeftover: number[][] = [];

    leftover.forEach(([sMin, sMax]) => {
      switch (getRangeType([sMin, sMax], [src, range])) {
        case "IS_INCLUDED": {
          res.push([[dest + (sMin - src), dest + (sMax - src)]]);
          break;
        }
        case "INCLUDE": {
          newLeftover.push([sMin, src - 1], [src + range + 1, sMax]);
          res.push([[dest, dest + range]]);
          break;
        }
        case "LEFT_OVERFLOW": {
          res.push([[dest + (sMin - src), dest + range - 1]]);
          newLeftover.push([src + range, sMax]);
          break;
        }
        case "RIGHT_OVERFLOW": {
          newLeftover.push([sMin, src - 1]);
          res.push([[dest, dest + (sMax - src)]]);
          break;
        }
        case "OUTSIDE_RANGE": {
          newLeftover.push([sMin, sMax]);
          break;
        }
      }
    });

    leftover = newLeftover;
  });

  return [...res, leftover];
}

function convertAll(
  seedRange: [number, number],
  categorie: Categorie
): number[];
function convertAll(
  seedRange: [number, number][],
  categorie: Categorie
): number[][];
function convertAll(
  seedRange: [number, number] | [number, number][],
  categorie: Categorie
): number[] | number[][] {
  if (isArray(seedRange)) {
    return seedRange.map((range) => convertAll(range, categorie));
  }

  return convert_part2(seedRange, categorie).flat();
}

function isArray<T extends A[], A extends unknown>(arr: T | T[]): arr is T[] {
  return arr.some(Array.isArray);
}
