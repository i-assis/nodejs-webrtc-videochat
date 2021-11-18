import React, { useEffect } from "react";
import { connect } from "react-redux";
import { connectToRoom } from "../../utils/twilioUtils";
import RoomLabel from "./RoomLabel";
import TwilioRoom from "./TwilioRoom/TwilioRoom";

// the argument is always whatever we want to retrieve from 'props'
const Videos = ({ room, setRoom, roomId, twilioAccessToken }) => {
  //
  useEffect(() => {
    if (twilioAccessToken) {
      console.log("Connecting to Twilio room!"); // here for debug purposes
      connectToRoom(twilioAccessToken, roomId, setRoom);
    }
  }, [twilioAccessToken]);

  return (
    <div className="videos_container">
      <RoomLabel roomId={roomId} />
      {room && <TwilioRoom room={room} />}
    </div> //room will be set if we connect to it
  );
};

const mapStoreStateToProps = (state) => {
  return {
    ...state,
  };
};

export default connect(mapStoreStateToProps)(Videos);
