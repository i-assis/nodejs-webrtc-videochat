import React, { useState } from "react";
import CameraButtonImg from "../../resources/images/camera.svg";
import CameraButtonImgOff from "../../resources/images/cameraOff.svg";

const CameraButton = ({ room }) => {
  const [isLocalVideoTrackDisabled, setIsLocalVideoTrackDisabled] =
    useState(false);

  const handleCameraButtonPressed = () => {

    // gotta define before using LOL boohoo thought this was real js
    const startVideo = () => {
      // restart sending camera stream to other users
    };

    const stopVideo = () => {
      // stop sending camera stream to other users
    };

    isLocalVideoTrackDisabled ? startVideo() : stopVideo();

    setIsLocalVideoTrackDisabled(!isLocalVideoTrackDisabled);
  };
  return (
    <div className="video_button_container">
      <img
        src={isLocalVideoTrackDisabled ? CameraButtonImgOff : CameraButtonImg}
        className="video_button_image"
        onClick={handleCameraButtonPressed}
        alt="Turn camera either ON or OFF."
      />
    </div>
  );
};

export default CameraButton;
