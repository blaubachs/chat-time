import React, { useState } from "react";
import { GlobalPropTypes, NewExpeditionForm } from "../utils/interfaces";
import API from "../utils/API";

export default function Header({
  clientSocket,
  user,
  username,
  currentRoomData,
  setCurrentRoomData,
}: GlobalPropTypes) {
  const [modalOpen, setModalOpen] = useState(false);
  const [newExpeditionForm, setNewExpeditionForm] = useState<NewExpeditionForm>(
    { name: "", owner: user?._id }
  );
  const [joinRoomName, setJoinRoomName] = useState("");

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

  const handleJoinRoomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJoinRoomName(e.target.value);
  };

  const handleJoinRoomSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clientSocket.emit("join_room", { roomName: joinRoomName, user });
    setJoinRoomName("");
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
      <div className="border-2 border-blue-500 h-16 flex items-center justify-around">
        <div>Expedition: {currentRoomData && currentRoomData.name}</div>
        <button className="bg-blue-400" onClick={handleNewExpedition}>
          New Expedition
        </button>
        <form onSubmit={handleJoinRoomSubmit}>
          <label>
            Join Room:
            <input
              className="text-black"
              type="text"
              name="join_room_name"
              value={joinRoomName}
              onChange={handleJoinRoomChange}
            />
          </label>
          <button className="bg-blue-400" type="submit">
            Join
          </button>
        </form>
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
    </>
  );
}
