import React from "react";

const RoomNotFoundMessage = ({ showRoomNotFoundMessage }) => {
  return (
    <div className="room_not_found_container">
      {showRoomNotFoundMessage && (
        <p className="room_not_found_paragraph">
          Room not found. Please, check Room ID and try again!
        </p>
      )}
    </div>
  );
};

export default RoomNotFoundMessage;
