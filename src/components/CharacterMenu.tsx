import React from "react";
import Stats from "./Stats";

export default function CharacterMenu() {
  return (
    <div className="border-2 border-blue-400 rounded-md h-full">
      <p>Name</p>
      <div className="flex justify-around">
        {/* Use a new reusable components for char stats */}
        <div>
          <p>Stats</p>
          <div>
            <Stats />
          </div>
        </div>
        <div>image</div>
      </div>
    </div>
  );
}
