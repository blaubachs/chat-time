import React from "react";
import { GlobalPropTypes } from "../utils/interfaces";
import CharacterMenu from "./CharacterMenu";
import Chat from "./Chat";

export default function GameWindow({
  user,
  currentRoomData,
  setCurrentRoomData,
  clientSocket,
}: GlobalPropTypes) {
  if (user)
    return (
      <div className="flex h-5/6 border-2 border-blue-400 m-5 p-3">
        <div className="w-3/6 flex flex-col">
          <p>you are {user.username}</p>
          <div className="h-3/6">
            <CharacterMenu />
          </div>
          <div className="h-3/6">roll menu here</div>
        </div>
        <div id="chat-box" className="w-3/6">
          {user.username !== "" && (
            <Chat
              currentRoomData={currentRoomData}
              setCurrentRoomData={setCurrentRoomData}
              user={user}
              clientSocket={clientSocket}
              username={user.username}
            />
          )}
        </div>
      </div>
    );
  else return <div>You must log in to see the game page.</div>;
}
