interface Room {
  name: string;
  dimensions: RoomDimensions;
}

interface RoomDimensions {
  length: number;
  width: number;
}

export enum RoomUnit {
  IMPERIAL = "ft",
  METRIC = "m",
}

export enum RoomAreaUnit {
  IMPERIAL = "sqft",
  METRIC = "sqm",
}
