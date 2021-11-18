import React from "react";
import ConnectingButton from "./ConnectingButton";
import { useHistory } from 'react-router-dom';

const ConnectingButtons = () => {

    let history = useHistory();

    // join handler
    const pushToJoinRoomPage = () => {
        history.push('/join-room')
    }

    // host handler with a query
    const pushToJoinRoomPageAsHost = () => {
        history.push('/join-room?host=true')
    }



  return (
    <div className="connecting_buttons_container">
      <ConnectingButton buttonText="Join Meeting"
      onClickHandler={pushToJoinRoomPage}
      />
      <ConnectingButton buttonText="Host Meeting"
      createRoomButton //true by default
      onClickHandler={pushToJoinRoomPageAsHost}
      />
    </div>
  );
};

export default ConnectingButtons;
