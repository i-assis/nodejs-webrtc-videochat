import Actions from "./actions";

const initState = {
  identity: "",
  isRoomHost: false,
  connectOnlyWithAudio: false,
  roomId: null,
  twilioAccessToken: null,
  showOverlay: true,
  participants: [],
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case Actions.SET_IDENTITY: // if this action gets dispatched here
      return {
        ...state,
        identity: action.identity, // get previous 'state', add 'identity'
      };

    case Actions.SET_IS_ROOM_HOST:
      return {
        ...state,
        isRoomHost: action.isRoomHost, //! 'action' instead of 'actions' ?!?
      };

    case Actions.SET_CONNECT_ONLY_WITH_AUDIO:
      return {
        ...state,
        connectOnlyWithAudio: action.onlyWithAudio,
      };

    case Actions.SET_ROOM_ID:
      return {
        ...state,
        roomId: action.roomId,
      };

    case Actions.SET_TWILIO_ACCESS_TOKEN:
      return {
        ...state,
        twilioAccessToken: action.token, // this stuff needs to be the same as actions dispatched from 'actions.js'
      };

    case Actions.SET_SHOW_OVERLAY:
      return {
        ...state,
        showOverlay: action.showOverlay,
      };

    case Actions.SET_PARTICIPANTS:
      return {
        ...state,
        participants: action.participants,
      };

    default:
      return state;
  }
};

export default reducer;
