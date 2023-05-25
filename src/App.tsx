import "./App.css";
import Chat from "./components/Chat";
import Header from "./components/Header";
import CharacterMenu from "./components/CharacterMenu";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const clientSocket = io("http://localhost:3001");

function App() {
  // ! these two pieces of state are only for testing and will be removed when users can login
  const [username, setUsername] = useState("");
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    clientSocket.on("connect", () => {
      console.log("Connected to the server");
    });

    clientSocket.on("disconnect", () => {
      console.log("Disconnected from the server");
    });
  }, []);

  const handleUserNameChange = (e: any) => {
    setUsername(e.target.value);
  };

  return (
    <div className="App bg-gray-900 h-screen text-white">
      <Header />
      {currentUser === "" && (
        <div>
          <input
            type="text"
            onChange={handleUserNameChange}
            value={username}
            className="text-white bg-slate-700"
          ></input>
          <button
            className="bg-blue-400 text-black"
            onClick={() => setCurrentUser(username)}
          >
            set user
          </button>
        </div>
      )}
      <div className="flex h-5/6 border-2 border-blue-400 m-5 p-3">
        <div className="w-3/6 flex flex-col">
          {/* There will be 2 items in this area */}
          <CharacterMenu />
        </div>
        <div id="chat-box" className="w-3/6">
          {currentUser !== "" && (
            <Chat clientSocket={clientSocket} username={username} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
