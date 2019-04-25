import { combineReducers } from "redux";

const init = {
  id: "",
  username: "",
  error: "",
  success: ""
};

const authReducer = (state = init, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        id: action.payload.id,
        username: action.payload.username
      };
    case "LOGOUT_SUCCESS":
      return { ...state, ...init };
    case "AUTH_ERROR":
      return { ...state, error: action.payload };
    case "SETTIMEOUT":
      return { ...state, error: "" };

    default:
      return state;
  }
};

export default combineReducers({
  auth: authReducer
});
