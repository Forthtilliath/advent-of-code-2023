import { CATEGORIES } from "./main";

declare global {
  type Convertion = [destination: number, source: number, range: number];
  type Categorie = Convertion[];

  type CategorieName = (typeof CATEGORIES)[number];

  type GardenSeed = { seed: number };
  type GardenSoil = GardenSeed & { soil: number };
  type GardenFertilizer = GardenSoil & { fertilizer: number };
  type GardenWater = GardenFertilizer & { water: number };
  type GardenLight = GardenWater & { light: number };
  type GardenTemperature = GardenLight & { temperature: number };
  type GardenHumidity = GardenTemperature & { humidity: number };
  type GardenLocation = GardenHumidity & { location: number };
  type GardenPart =
    | GardenSeed
    | GardenSoil
    | GardenFertilizer
    | GardenWater
    | GardenLight
    | GardenTemperature
    | GardenHumidity
    | GardenLocation;

  type Garden = Record<PropertyKey, GardenPart>;

  type SeedRange = [min: number, max: number];

  type RangeType =
    | "IS_INCLUDED"
    | "LEFT_OVERFLOW"
    | "RIGHT_OVERFLOW"
    | "INCLUDE"
    | "OUTSIDE_RANGE";
}

export {};
