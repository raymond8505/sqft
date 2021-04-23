import { RoomAreaUnit } from "../@types/Room.d.ts";
import {
  makeRoom,
  makeRoomDimensions,
  parseMetric,
  parseImperial,
  imperialToMetric,
  parseRooms,
  calcCombinedArea,
} from "./room.ts";

const testRoomsImperial = parseRooms(`	Living room	
21 ft ,3 in x 11 ft ,11 in
Dining room	
21 ft ,3 in x 11 ft ,11 in
Kitchen	
21 ft ,3 in x 11 ft ,11 in
Primary Bedroom	
11 ft ,6 in x 8 ft ,11 in
Bedroom 2	
9 ft ,1 in x 8 ft ,11 in`);

const testRoomsMetric = parseRooms(`	Living room	
6.49 m x 3.65 m
Dining room	
6.49 m x 3.65 m
Kitchen	
6.49 m x 3.65 m
Primary Bedroom	
3.53 m x 2.74 m
Bedroom 2	
2.77 m x 2.74 m`);

describe("Room Utility Functions", () => {
  it("parseMetric", () => {
    expect(parseMetric("6.49 m")).toEqual(6.49);
  });
  it("parseImperial", () => {
    expect(parseImperial("11 ft ,11 in")).toEqual(11.917);
  });
  it("imperialToMetric", () => {
    expect(imperialToMetric(parseImperial("11 ft ,11 in"))).toEqual(3.632);
  });
  it("makeRoomDimensions with metric", () => {
    const dims = makeRoomDimensions("6.49 m x 3.65 m");

    expect(dims.length).toEqual(6.49);
    expect(dims.width).toEqual(3.65);
  });

  it("makeRoom with metric", () => {
    const room = makeRoom("	Living room	", "6.49 m x 3.65 m");

    expect(room.name).toEqual("Living room");
    expect(room.dimensions.length).toEqual(6.49);
    expect(room.dimensions.width).toEqual(3.65);
  });

  it("parseRooms", () => {
    expect(testRoomsImperial.length).toEqual(5);
  });

  it("calcCombinedArea metric", () => {
    const combinedArea = calcCombinedArea(testRoomsMetric);

    expect(combinedArea).toEqual(88.3275);
  });

  it("calcCombinedArea imperial", () => {
    const combinedArea = calcCombinedArea(
      testRoomsImperial,
      RoomAreaUnit.IMPERIAL
    );

    expect(combinedArea).toEqual(950.7483773);
  });
});
