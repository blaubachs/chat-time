import React, { useEffect, useState, useRef } from "react";
import Message from "./Message";
import {
  ExpeditionInterface,
  GlobalPropTypes,
  MessageInterface,
} from "../utils/interfaces";
import API from "../utils/API";

export default function Chat({
  clientSocket,
  username,
  user,
  currentRoomData,
  setCurrentRoomData,
}: GlobalPropTypes) {
  const [newMessage, setNewMessage] = useState("");
  const [allMessages, setAllMessages] = useState<MessageInterface[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // load saved messages from room
  useEffect(() => {
    if (!currentRoomData) return;
    if (currentRoomData._id === "") return;
    API.getOneRoom(currentRoomData._id).then((room) => {
      setAllMessages(room.messages);
    });
  }, [currentRoomData]);

  // handle room for user to join
  useEffect(() => {
    if (currentRoomData) {
      if (currentRoomData.name === "") {
        console.log("joining the main room haha");
        clientSocket.emit("join_main_room", user);
      } else {
        console.log("joining room " + currentRoomData.name);
        const { name } = currentRoomData;
        clientSocket.emit("join_room", { roomName: name, user });
      }
    }
    return () => {
      if (currentRoomData && currentRoomData.name !== "") {
        console.log("leaving the room");
        const { name } = currentRoomData;
        clientSocket.emit("leave_room", name);
      }
    };
  }, [currentRoomData, user, clientSocket]);

  // listen for messages from server
  useEffect(() => {
    console.log("listening for messages...");

    clientSocket.on("room_data", (room: ExpeditionInterface) => {
      console.log(room);
      if (setCurrentRoomData) {
        setCurrentRoomData(room);
      }
    });

    clientSocket.on(
      "chat_message",
      (data: { message: MessageInterface; roomId: String }) => {
        console.log("message received: ", data);
        setAllMessages((prevMessages) => [...prevMessages, data.message]);
      }
    );
    return () => {
      clientSocket.off("chat_message");
    };
  }, [clientSocket]);

  // scroll to bottom of chat container when new message is added
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
      { user: username, content: newMessage, inCharacter: false },
    ]);
    // ! need to send user id to backend to create a message.
    if (currentRoomData) {
      clientSocket.emit("chat_message", {
        message: { user: username, content: newMessage, inCharacter: false },
        roomId: currentRoomData._id,
      });
    }
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
              <Message
                user={msg.user}
                content={msg.content}
                inCharacter={false}
              />
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
