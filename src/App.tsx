import "./App.css";
import PasteArea from "./components/PasteArea";
import { css } from "@emotion/css";
import { parseRooms } from "./lib/room";
import { useState } from "react";
import RoomsTable from "./components/RoomsTable";

const appClass = css`
  text-align: center;
  background: #fefefe;
  padding: 1em;
  font-family: Roboto, Helvetica, _sans;
  font-size: 16px;
`;
function App() {
  const [rooms, setRooms] = useState([]);

  const onPasteAreaChange = (val: string) => {
    setRooms(parseRooms(val));
  };

  return (
    <div className={appClass}>
      <PasteArea
        placeholder={"Paste Room Dimensions Here"}
        onChange={onPasteAreaChange}
      ></PasteArea>
      <RoomsTable rooms={rooms} />
    </div>
  );
}

export default App;
