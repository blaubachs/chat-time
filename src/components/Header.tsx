import React, { useState } from "react";
import { GlobalPropTypes } from "../utils/interfaces";

export default function Header({
  clientSocket,
  username,
  currentRoomData,
}: GlobalPropTypes) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleNewExpedition = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setModalOpen(true);
  };

  const handleCloseModal = (e: React.FormEvent) => {
    e.preventDefault();
    setModalOpen(false);
  };

  return (
    <>
      <div className="border-2 border-blue-500 h-16 flex items-center justify-around">
        <div>Expedition: {currentRoomData && currentRoomData.name}</div>
        <button className="bg-blue-400" onClick={handleNewExpedition}>
          New Expedition
        </button>
      </div>
      {/* modal for new expedition */}
      <div className="modal" style={{ display: modalOpen ? "block" : "none" }}>
        <div className="modal-content">
          <h2>Create New Expedition</h2>
          <form>
            <label>
              Name:
              <input type="text" name="name" />
            </label>
            <button type="submit" onClick={handleCloseModal}>
              Create
            </button>
          </form>
          <button className="close" onClick={handleCloseModal}>
            &times;
          </button>
        </div>
      </div>
    </>
  );
}
