import {
  REGISTER,
  SETTIMEOUT,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  EDIT_USER,
  LOGOUT_SUCCESS,
  DELETE_USER
} from "./actionTypes";
import axios from "../../config/axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

//register
export const onRegister = data => {
  return async dispatch => {
    try {
      const res = await axios.post("/register/user", data);
      dispatch({
        type: REGISTER,
        payload: res
      });
      setTimeout(() => {
        dispatch({
          type: SETTIMEOUT
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
          type: AUTH_ERROR,
          payload: res
        });
        return setTimeout(() => {
          dispatch({
            type: SETTIMEOUT
          });
        }, 3000);
      }

      cookies.set("user_id", res.data[0].user_id, { path: "/" });
      cookies.set("role", res.data[0].role, { path: "/" });

      dispatch({
        type: LOGIN_SUCCESS,
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
        type: LOGIN_SUCCESS,
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
  const formData = new FormData();
  const { email, first_Name, last_Name, gender, avatar } = data;
  formData.append("first_Name", first_Name);
  formData.append("last_Name", last_Name);
  formData.append("gender", gender);
  formData.append("email", email);
  // formData.append("password", password);
  if (avatar.length !== 0) {
    formData.append("avatar", avatar[0]);
  }

  return async dispatch => {
    try {
      const res = await axios.patch(
        `/edit/user/${cookies.get("user_id")}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
      dispatch({
        type: EDIT_USER,
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

//editpassword
export const onEditPassword = data => {
  return async dispatch => {
    try {
      const res = await axios.patch(
        `/edit/password/${cookies.get("user_id")}`,
        data
      );
      dispatch({
        type: EDIT_USER,
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

//logout
export const onLogout = () => {
  cookies.remove("user_id", { path: "/" });
  cookies.remove("address", { path: "/" });
  cookies.remove("role", { path: "/" });
  return {
    type: LOGOUT_SUCCESS
  };
};

//deleteuser
export const onDeleteUser = user_id => {
  return async dispatch => {
    try {
      const res = await axios.delete(`/delete/user/${user_id}`);
      cookies.remove("user_id", { path: "/" });
      cookies.remove("address", { path: "/" });
      cookies.remove("role", { path: "/" });
      dispatch({
        type: DELETE_USER
      });
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };
};
