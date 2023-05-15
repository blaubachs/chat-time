import "./App.css";
import Chat from "./components/Chat";
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
      <p>chat-time</p>
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
      {currentUser !== "" && (
        <Chat clientSocket={clientSocket} username={username} />
      )}
    </div>
  );
}

export default App;
