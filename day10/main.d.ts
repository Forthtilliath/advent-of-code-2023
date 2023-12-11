declare global {
  type Tile = {
    value: string;
    row: number;
    col: number;
    neighbors: { row: number; col: number }[];
  };

  type Coord = {
    row: number;
    col: number;
  }
}

export {};
