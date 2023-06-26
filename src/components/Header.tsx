import React, { useState } from "react";
import {
  ExpeditionInterface,
  GlobalPropTypes,
  NewExpeditionForm,
} from "../utils/interfaces";
import API from "../utils/API";

export default function Header({
  clientSocket,
  user,
  username,
  currentRoomData,
  setCurrentRoomData,
}: GlobalPropTypes) {
  const [modalOpen, setModalOpen] = useState(false);
  const [showExpeditions, setShowExpeditions] = useState(false);
  const [allExpeditions, setAllExpeditions] = useState<ExpeditionInterface[]>(
    []
  );
  const [newExpeditionForm, setNewExpeditionForm] = useState<NewExpeditionForm>(
    { name: "", owner: user?._id }
  );

  const handleNewExpedition = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setModalOpen(true);
  };

  const handleCloseModal = (e: React.FormEvent) => {
    e.preventDefault();
    setModalOpen(false);
  };

  const handleExpeditionFormChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setNewExpeditionForm({
      ...newExpeditionForm,
      [name]: value,
    });
  };

  const handleFindExpeditions = async () => {
    if (showExpeditions && allExpeditions.length > 0) {
      setShowExpeditions(false);
      return;
    }
    const rooms = await API.getAllRooms();
    if (rooms) {
      setAllExpeditions(rooms);
      setShowExpeditions(true);
    }
  };

  const submitExpeditionForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const resExp = await API.createNewExpedition(newExpeditionForm);
    console.log(resExp);
    console.log(newExpeditionForm);
    if (setCurrentRoomData) {
      setCurrentRoomData(resExp.expedition);
    }
  };

  return (
    <>
      <div className="border-2 border-blue-500 h-16">
        {username !== "" && (
          <div className="h-full flex items-center justify-around">
            <div>Expedition: {currentRoomData && currentRoomData.name}</div>
            <button className="bg-blue-400" onClick={handleNewExpedition}>
              New Expedition
            </button>
            <button
              className="bg-blue-400"
              onClick={() => handleFindExpeditions()}
            >
              Join Expedition
            </button>
          </div>
        )}
      </div>
      {/* modal for new expedition */}
      <div className="modal" style={{ display: modalOpen ? "block" : "none" }}>
        <div className="modal-content">
          <h2>Create New Expedition</h2>
          <form onSubmit={submitExpeditionForm}>
            <label>
              Name:
              <input
                className="text-black"
                type="text"
                name="name"
                value={newExpeditionForm.name}
                onChange={handleExpeditionFormChange}
              />
            </label>
            <button type="submit">Create</button>
          </form>
          <button className="close" onClick={handleCloseModal}>
            &times;
          </button>
        </div>
      </div>
      {/* modal for joining expedition */}
      <div
        className="modal"
        style={{ display: showExpeditions ? "block" : "none" }}
      >
        <div className="modal-content">
          <h2>Join Expedition</h2>
          {/* map over allExpeditions */}
          {allExpeditions.map((expedition) => (
            <button
              className="bg-blue-400 mx-3 py-1 px-3"
              key={expedition._id}
              onClick={() => {
                clientSocket.emit("leave_room", {
                  roomName: currentRoomData?.name,
                  user,
                });

                if (setCurrentRoomData) {
                  setCurrentRoomData(expedition);
                }
                setShowExpeditions(false);
              }}
            >
              {expedition.name}
            </button>
          ))}

          <button className="close" onClick={() => setShowExpeditions(false)}>
            &times;
          </button>
        </div>
      </div>
    </>
  );
}
