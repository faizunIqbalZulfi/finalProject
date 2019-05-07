import { combineReducers } from "redux";
import { log } from "util";
import { stat } from "fs";

const init = {
  images: [],
  products: [],
  product: [],
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
    case "GET_PRODUCTS":
      return { ...state, products: action.payload.data };
    case "GET_IMAGE":
      return {
        ...state,
        images: action.payload.data
      };
    case "DELETE_IMAGE":
      return { ...state, images: action.payload.images };
    default:
      return state;
  }
};

export default combineReducers({
  auth: authReducer
});
