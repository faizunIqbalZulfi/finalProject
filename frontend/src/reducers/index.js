import { combineReducers } from "redux";
import { log } from "util";

const init = {
  addresses: [],
  user_id: "",
  role: "",
  message: ""
};

const authReducer = (state = init, action) => {
  switch (action.type) {
    case "REGISTER":
      return { ...state, message: action.payload.data };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user_id: action.payload.user_id,
        role: action.payload.role
      };
    case "LOGOUT_SUCCESS":
      return { ...state, ...init };
    case "AUTH_ERROR":
      return { ...state, message: action.payload.data };
    case "SETTIMEOUT":
      return { ...state, message: "" };
    case "EDIT_USER":
      return { ...state, message: action.payload.data };
    case "GET_ADDRESS":
      return { ...state, addresses: action.payload.data };
    case "DELETE_USER":
      return { ...state, ...init };
    default:
      return state;
  }
};

export default combineReducers({
  auth: authReducer
});
