import axios from "../config/axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

//register
export const onRegister = data => {
  return async dispatch => {
    try {
      const res = await axios.post("/register/user", data);
      dispatch({
        type: "REGISTER",
        payload: res
      });
      setTimeout(() => {
        dispatch({
          type: "SETTIMEOUT"
        });
      }, 3000);
    } catch (e) {
      console.log(e);
    }
  };
};

//login
export const onLogin = data => {
  return async dispatch => {
    try {
      const res = await axios.post("/login/user", data);
      if (res.data.length !== 1) {
        dispatch({
          type: "AUTH_ERROR",
          payload: res
        });
        return setTimeout(() => {
          dispatch({
            type: "SETTIMEOUT"
          });
        }, 3000);
      }

      cookies.set("user_id", res.data[0].user_id, { path: "/" });

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: res.data[0]
      });

      console.log(res.data);
    } catch (e) {
      console.log(e);
    }
  };
};

//keeplogin
export const keepLogin = user_id => {
  return async dispatch => {
    try {
      const res = await axios.get(`/user/${user_id}`);
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: res.data[0]
      });
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };
};

//edituser
export const onEditUser = data => {
  return async dispatch => {
    try {
      const res = await axios.patch(
        `/edit/user/${cookies.get("user_id")}`,
        data
      );
      dispatch({
        type: "EDIT_USER",
        payload: res
      });
      setTimeout(() => {
        dispatch({
          type: "SETTIMEOUT"
        });
      }, 3000);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };
};

//editpassword
export const onEditPassword = data => {
  return async dispatch => {
    try {
      const res = await axios.patch(
        `/edit/password/${cookies.get("user_id")}`,
        data
      );
      dispatch({
        type: "EDIT_USER",
        payload: res
      });
      setTimeout(() => {
        dispatch({
          type: "SETTIMEOUT"
        });
      }, 3000);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };
};

//logout
export const onLogout = () => {
  cookies.remove("user_id", { path: "/" });
  return {
    type: "LOGOUT_SUCCESS"
  };
};
