declare global {
  type Tile = {
    value: string;
    row: number;
    col: number;
    neighbors: Coord[];
  };

  type Coord = {
    row: number;
    col: number;
  }
}

export {};
