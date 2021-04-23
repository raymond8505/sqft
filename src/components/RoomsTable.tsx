import React from "react";
import { css } from "@emotion/css";
import { showCombinedArea } from "../lib/room";

interface RoomsTableProps {
  rooms: Room[];
}

const roomsTableCss = css``;
const RoomsTable = ({ rooms }: RoomsTableProps) => {
  return (
    <div className={`RoomsTable ${roomsTableCss}`}>
      <h2 className="RoomsTable__sqft">
        {showCombinedArea(rooms, RoomUnits.METRIC)}
      </h2>
    </div>
  );
};

export default RoomsTable;
