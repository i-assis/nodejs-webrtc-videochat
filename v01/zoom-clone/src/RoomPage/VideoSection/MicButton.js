import React, { useState } from "react";

import MicButtonImg from "../../resources/images/mic.svg";
import MicButtonImgOff from "../../resources/images/micOff.svg";

const MicButton = ({ room }) => {
  const [isMicMuted, setIsMicMuted] = useState(false);

  const handleMicButtonPressed = () => {
    isMicMuted ? unmute() : mute();
    setIsMicMuted(!isMicMuted);
  };

  const mute = () => {
    // mute our microphone so other users don't hear us
  };

  const unmute = () => {
    // turn mic back on
  };

  return (
    <div className="video_button_container">
      <img
        src={isMicMuted ? MicButtonImgOff : MicButtonImg}
        onClick={handleMicButtonPressed}
        className="video_button_image"
        alt='Microphone button.'
      />
    </div>
  );
};

export default MicButton;
