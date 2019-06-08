import { GET_ADDRESS, AUTH_ERROR, SETTIMEOUT } from "./actionTypes";
import axios from "../../config/axios";

//getaddress
export const onGetAddress = user_id => {
  return async dispatch => {
    try {
      const res = await axios.get(`/address/${user_id}`);
      dispatch({
        type: GET_ADDRESS,
        payload: res
      });
      console.log(res.data);
    } catch (e) {
      console.log(e);
    }
  };
};

//editaddress
export const onEditAddress = (address_id, data) => {
  return async dispatch => {
    try {
      const res = await axios.patch(`/edit/address/${address_id}`, data);
      dispatch({
        type: AUTH_ERROR,
        payload: res
      });
      setTimeout(() => {
        dispatch({
          type: SETTIMEOUT
        });
      }, 3000);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };
};

//deleteaddress
export const onDeleteAddress = address_id => {
  return async dispatch => {
    try {
      const res = await axios.delete(`/delete/address/${address_id}`);

      dispatch({
        type: AUTH_ERROR,
        payload: res
      });
      setTimeout(() => {
        dispatch({
          type: SETTIMEOUT
        });
      }, 3000);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };
};

//addaddress
export const onAddAddress = data => {
  return async dispatch => {
    try {
      const res = await axios.post(`/add/address`, data);
      dispatch({
        type: AUTH_ERROR,
        payload: res
      });
      setTimeout(() => {
        dispatch({
          type: SETTIMEOUT
        });
      }, 3000);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };
};
