import "./App.css";
import Chat from "./components/Chat";
import Header from "./components/Header";
import CharacterMenu from "./components/CharacterMenu";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { UserObject } from "./utils/interfaces";

const clientSocket = io("http://localhost:3001");

function App() {
  // ! these two pieces of state are only for testing and will be removed when users can login
  const [userObject, setUserObject] = useState<UserObject>({
    username: "",
  });
  const [currentUser, setCurrentUser] = useState("");
  const [token, setToken] = useState<String>("");

  useEffect(() => {
    clientSocket.on("connect", () => {
      console.log("Connected to the server");
    });

    clientSocket.on("disconnect", () => {
      console.log("Disconnected from the server");
    });
  }, []);

  return (
    <div className="App bg-gray-900 h-screen text-white">
      <Header />
      {userObject.username !== "" ? (
        <div className="flex h-5/6 border-2 border-blue-400 m-5 p-3">
          <div className="w-3/6 flex flex-col">
            <p>you are {userObject.username}</p>
            <div className="h-3/6">
              <CharacterMenu />
            </div>
            <div className="h-3/6">roll menu here</div>
          </div>
          <div id="chat-box" className="w-3/6">
            {currentUser !== "" && (
              <Chat
                clientSocket={clientSocket}
                username={userObject.username}
              />
            )}
          </div>
        </div>
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
