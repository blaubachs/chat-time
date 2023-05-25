import React, { useEffect, useState, useRef } from "react";
import Message from "./Message";
import { GlobalPropTypes, MessageInterface } from "../utils/interfaces";

export default function Chat({ clientSocket, username }: GlobalPropTypes) {
  const [newMessage, setNewMessage] = useState("");
  const [allMessages, setAllMessages] = useState<MessageInterface[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("listening for messages...");

    clientSocket.on("chat_message", (data: MessageInterface) => {
      setAllMessages((prevMessages) => [...prevMessages, data]);
    });
    return () => {
      clientSocket.off("chat_message");
    };
  }, [clientSocket]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [allMessages]);

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
    <div
      className="h-5/6 border-2 border-black mx-40 overflow-y-auto"
      ref={chatContainerRef}
    >
      You are {username}
      <div className="flex flex-col">
        {allMessages.map((msg) => {
          return (
            <div
              className={`flex ${
                msg.user === username ? `justify-end` : `justify-start`
              }`}
            >
              <Message user={msg.user} message={msg.message} />
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
