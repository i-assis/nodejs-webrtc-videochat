import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { store } from "../store/store";
import {
  connect,
  LocalAudioTrack,
  LocalDataTrack,
  LocalVideoTrack,
} from "twilio-video";
import { setShowOverlay } from "../store/actions";

const audioConstraints = {
  video: false,
  audio: true,
};

const videoConstraints = {
  // cost is per minute, does not matter which resolution is being used
  audio: true,
  video: {
    width: 640,
    height: 480,
  },
};

export const getTokenFromTwilio = async (setAccessToken, identity) => {
  const randomId = uuidv4();

  console.log(identity);

  const response = await axios.get(
    `https://zoom-clone-service-7385-dev.twil.io/token-service?identity=${randomId}${identity}`
  );

  const data = response.data;

  if (data.accessToken) {
    setAccessToken(data.accessToken);
  }
};

export const connectToRoom = async (
  accessToken,
  roomId = "test-room",
  setRoom
) => {
  //
  const onlyWithAudio = store.getState().connectOnlyWithAudio;
  const constraints = onlyWithAudio ? audioConstraints : videoConstraints;

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(async (stream) => {
      let tracks; // create data track for messages

      const audioTrack = new LocalAudioTrack(stream.getAudioTracks()[0]);

      let videoTrack;

      if (!onlyWithAudio) {
        videoTrack = new LocalVideoTrack(stream.getVideoTracks()[0]);
        tracks = [audioTrack, videoTrack];
      } else {
        tracks = [audioTrack];
      }

      const room = await connect(accessToken, {
        name: roomId,
        tracks,
      });

      console.log("Successfully connected to a Twilio room! The room is:");
      console.log(room); // check if successfully connected
      setRoom(room);

      // overlay must be hidden after connection to twilio room:
      store.dispatch(setShowOverlay(false));
    })
    .catch((err) => {
      console.log("An error ocurred when trying to access local devices.");
      console.log(err);
    });
};

export const checkIfRoomExists = async (roomId) => {
  const response = await axios.get(
    `https://zoom-clone-service-7385-dev.twil.io/room-exists?roomId=${roomId}`
  );

  return response.data.roomExists;
};
