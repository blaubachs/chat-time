import "./App.css";
import { useEffect } from "react";
import { io } from "socket.io-client";

const clientSocket = io("http://localhost:3001");

function App() {
  useEffect(() => {
    clientSocket.on("connect", () => {
      console.log("Connected to the server");
    });

    clientSocket.on("disconnect", () => {
      console.log("Disconnected from the server");
    });
  });
  return (
    <div className="App">
      <p>chat-time</p>
    </div>
  );
}

export default App;
