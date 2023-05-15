import React, { useEffect, useState } from "react";
import { GlobalPropTypes } from "../utils/interfaces";

interface Message {
  user: string;
  message: string;
}

export default function Chat({ clientSocket, username }: GlobalPropTypes) {
  const [newMessage, setNewMessage] = useState("");
  const [allMessages, setAllMessages] = useState<Message[]>([]);

  useEffect(() => {
    console.log("listening for messages...");

    clientSocket.on("chat_message", (data: Message) => {
      setAllMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      clientSocket.off("chat_message");
    };
  }, [clientSocket]);

  const handleMessageChange = (e: any) => {
    setNewMessage(e.target.value);
  };

  const sendMessage = (e: any) => {
    e.preventDefault();
    setAllMessages((prevMessages) => [
      ...prevMessages,
      { user: username, message: newMessage },
    ]);
    clientSocket.emit("chat_message", { user: username, message: newMessage });
    setNewMessage("");
  };
  return (
    <div className="h-2/3 border-2 border-black mx-40 overflow-y-auto">
      You are {username}
      <div>
        {allMessages.map((msg) => {
          return (
            <div>
              Username: {msg.user} Message: {msg.message}
            </div>
          );
        })}
      </div>
      <form onSubmit={sendMessage} autoComplete="off">
        <input
          className="text-black"
          name="message"
          value={newMessage}
          onChange={handleMessageChange}
          placeholder="message"
        ></input>
        <button className="bg-blue-400 text-black" type="submit">
          Send Message
        </button>
      </form>
    </div>
  );
}
