import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setIsRoomHost } from "../store/actions";
import { useLocation } from "react-router-dom";
import JoinRoomTitle from "./JoinRoomTitle";
import JoinRoomContent from "./JoinRoomContent";

import "./JoinRoomPage.css";
import LoadingOverlay from "./LoadingOverlay";

const JoinRoomPage = (props) => {
  // deliver to 'mapDispatchToProps'
  const { setIsRoomHostAction, isRoomHost } = props;

  const search = useLocation().search; // needs react-router-dom

  // 1 - to know if we are room host
  useEffect(() => {
    const isRoomHost = new URLSearchParams(search).get("host");
    if (isRoomHost) {
      // change information about 'isRoomHost' in 'store'
      setIsRoomHostAction(true);
    }
  }, []);

  //
  const [showLoadingOverlay, setShowLoadingOverlay] = useState(false);

  return (
    <div className="join_room_page_container">
      <div className="join_room_page_panel">
        <JoinRoomTitle isRoomHost={isRoomHost} />
        <JoinRoomContent 
          setShowLoadingOverlay={setShowLoadingOverlay}
        />
        {showLoadingOverlay && <LoadingOverlay />}
      </div>
    </div>
  );
};

// more state management

const mapStoreStateToProps = (state) => {
  return {
    ...state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setIsRoomHostAction: (isRoomHost) => dispatch(setIsRoomHost(isRoomHost)),
  };
};

export default connect(mapStoreStateToProps, mapDispatchToProps)(JoinRoomPage);
