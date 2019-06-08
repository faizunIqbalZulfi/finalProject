import { GET_ADDRESS, AUTH_ERROR, SETTIMEOUT } from "../actions/actionTypes";

const init = {
  addresses: [],
  message: ""
};

const reducer = (state = init, action) => {
  switch (action.type) {
    case AUTH_ERROR:
      return { ...state, message: action.payload.data };
    case SETTIMEOUT:
      return { ...state, message: "" };
    case GET_ADDRESS:
      return { ...state, addresses: action.payload.data };
    default:
      return state;
  }
};

export default reducer;
