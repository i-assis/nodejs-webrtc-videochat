import React from "react";

// inputs to this function (functional component) are grabbed from props
const JoinRoomTitle = ({ isRoomHost }) => {
  const titleText = isRoomHost ? "Host Meeting" : "Join Meeting";
  return <p className="join_room_title">{titleText}</p>;
};

export default JoinRoomTitle;
