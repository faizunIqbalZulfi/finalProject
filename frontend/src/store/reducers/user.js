import {
  REGISTER,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  AUTH_ERROR,
  SETTIMEOUT,
  EDIT_USER
} from "../actions/actionTypes";

const init = {
  user_id: "",
  role: "",
  message: ""
};

const reducer = (state = init, action) => {
  switch (action.type) {
    case REGISTER:
      return { ...state, message: action.payload.data };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user_id: action.payload.user_id,
        role: action.payload.role
      };
    case LOGOUT_SUCCESS:
      return { ...state, ...init };
    case AUTH_ERROR:
      return { ...state, message: action.payload.data };
    case EDIT_USER:
      return { ...state, message: action.payload.data };
    case SETTIMEOUT:
      return { ...state, message: "" };
    default:
      return state;
  }
};

export default reducer;
