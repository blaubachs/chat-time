import React from "react";
import placeholderImage from "../assets/placnmen.png";
import { MessageInterface } from "../utils/interfaces";

export default function Message({ user, message }: MessageInterface) {
  return (
    <div className="border-black border-2 w-5/12 flex items-center">
      <div className="p-3 w-40">
        <img
          className="rounded-full"
          src={placeholderImage}
          alt="placeholder profile"
        ></img>
      </div>
      <div className=" m-2 flex flex-col items-start">
        <div className=" text-left font-bold">{user}</div>
        <div className=" text-left text-sm">{message}</div>
      </div>
    </div>
  );
}
