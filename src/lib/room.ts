import { RoomUnit, RoomAreaUnit } from "../@types/Room.d.ts";

export const measurementPrecision = 2;

export const isImperial = (val: string) =>
  val.toLowerCase().indexOf("ft") !== -1;

export const isMetric = (val: string) => val.toLowerCase().indexOf("m") !== -1;

export const parseMetric = (str: string): number => {
  const cleanStr: string = str.replace(/[a-z ]+/gi, "");

  const num: number = Number(cleanStr);

  if (isNaN(num))
    throw new Error(`"${str}" cannot be converted to a metric value`);

  return num;
};

export const parseImperial = (str: string): number => {
  //11 ft ,11 in
  const reg = /([\d]+) ft ,([\d]+) in/i;
  const match = str.match(reg);

  if (match === null || match.length < 3)
    throw new Error(`${str} is not a valid imperial measurement`);

  const ft: number = Number(match[1]);
  const inches: number = Number(match[2]);

  return Number((ft + inches / 12).toFixed(measurementPrecision));
};

export const imperialToMetric = (imperial: number): number =>
  Number((imperial * 0.306).toFixed(measurementPrecision));

export const metricToImperial = (metric: number): number =>
  Number((metric * 3.28084).toFixed(measurementPrecision));

export const areaMetricToImperial = (metric: number): number =>
  Number((metric * 10.7639).toFixed(measurementPrecision));

export const makeRoomDimensions = (dimsString: string): RoomDimensions => {
  const dimsReg: RegExp = /(.+) x (.+)/;
  const dimsMatch = dimsString.match(dimsReg);
  const dims: RoomDimensions = {
    length: 0,
    width: 0,
  };

  if (dimsMatch === null || dimsMatch.length < 3) {
    throw new Error(`${dimsString} is not a valid dimension string`);
  }

  if (isMetric(dimsMatch[1])) {
    dims.length = parseMetric(dimsMatch[1]);
    dims.width = parseMetric(dimsMatch[2]);
  } else if (isImperial(dimsMatch[1])) {
    dims.length = imperialToMetric(parseImperial(dimsMatch[1]));
    dims.width = imperialToMetric(parseImperial(dimsMatch[2]));
  }
  return dims;
};
export const makeRoom = (name: string = "", dimensions: string): Room => {
  const roomDims: RoomDimensions = makeRoomDimensions(dimensions);

  name = name.replace(/^[ \t]+/, "").replace(/[ \t]+$/, "");

  return {
    name,
    dimensions: roomDims,
  };
};

export const parseRooms = (str: string): Room[] => {
  const rooms: Room[] = [];

  const lines = str.split("\n");

  for (let i = 0; i < lines.length; i += 2) {
    rooms.push(makeRoom(lines[i], lines[i + 1]));
  }

  return rooms;
};

export const calcCombinedArea = (
  rooms: Room[],
  unit: RoomAreaUnit = RoomUnit.METRIC
): number => {
  const metricArea = rooms.reduce((prev, cur) => {
    const { length, width } = cur.dimensions;

    return prev + length * width;
  }, 0);

  return unit === RoomAreaUnit.METRIC
    ? metricArea
    : areaMetricToImperial(metricArea);
};

export const getAreaUnit = (unit: RoomUnit): void => {
  for (let roomUnit in RoomUnit) {
    console.log(roomUnit);
  }
};
export const showCombinedArea = (
  rooms: Room[],
  unit: RoomUnit = RoomUnit.METRIC
): string => `${calcCombinedArea(rooms, unit)} ${getAreaUnit(unit)}`;
