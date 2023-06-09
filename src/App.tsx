import "./App.css";
import Chat from "./components/Chat";
import Header from "./components/Header";
import CharacterMenu from "./components/CharacterMenu";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { ExpeditionInterface, UserObject } from "./utils/interfaces";
import GameWindow from "./components/GameWindow";

const clientSocket = io("http://localhost:3001");

function App() {
  // ! these two pieces of state are only for testing and will be removed when users can login
  const [userObject, setUserObject] = useState<UserObject>({
    username: "",
  });
  const [token, setToken] = useState<String>("");
  const [currentRoomData, setCurrentRoomData] = useState<ExpeditionInterface>({
    _id: "",
    name: "",
    options: {},
    characters: [],
    messages: [],
  });

  useEffect(() => {
    clientSocket.on("connect", () => {
      console.log("Connected to the server");
    });

    clientSocket.on("disconnect", () => {
      console.log("Disconnected from the server");
    });
  }, []);

  // ! need to update this so page state can determine what to render instead of react router
  return (
    <div className="App bg-gray-900 h-screen text-white">
      <Header
        clientSocket={clientSocket}
        username={userObject.username}
        user={userObject}
        currentRoomData={currentRoomData}
        setCurrentRoomData={setCurrentRoomData}
      />
      {userObject.username !== "" ? (
        <GameWindow
          user={userObject}
          currentRoomData={currentRoomData}
          setCurrentRoomData={setCurrentRoomData}
          clientSocket={clientSocket}
          username={userObject.username}
        />
      ) : (
        <div className="flex h-5/6 border-2 border-blue-400 m-5 p-3 justify-around">
          <Login setToken={setToken} setUserObject={setUserObject} />
          <Signup setToken={setToken} setUserObject={setUserObject} />
        </div>
      )}
    </div>
  );
}

export default App;
