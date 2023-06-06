import React from "react";
import { GlobalPropTypes } from "../utils/interfaces";

export default function Header({
  clientSocket,
  username,
  currentRoomData,
}: GlobalPropTypes) {
  const handleNewExpedition = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };
  return (
    <div className="border-2 border-blue-500 h-16 flex items-center justify-around">
      <div>Expedition: {currentRoomData && currentRoomData.name}</div>
      <button className="bg-blue-400" onClick={handleNewExpedition}>
        New Expedition
      </button>
    </div>
  );
}
