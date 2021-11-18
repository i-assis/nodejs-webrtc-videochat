import React from "react";

const LeaveRoomButton = ({ room }) => {
  const handleRoomDisconnection = () => {
    room.disconnect(); // handle disconnection with room
    const siteUrl = window.location.origin;
    window.location.href = siteUrl; // this is how we change state:
  };

  return (
    <div className="video_button_container">
      <button className="video_button_end" onClick={handleRoomDisconnection}>
        Leave Room
      </button>
    </div>
  );
};

export default LeaveRoomButton;
