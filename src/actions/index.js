import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const onLoginClick = (username, password) => {
  return dispatch => {
    axios
      .get("http://localhost:1996/users", {
        params: {
          username,
          password
        }
      })
      .then(res => {
        // const { username } = res.data[0];
        console.log(res.data[0]);

        const { id, username } = res.data[0];

        dispatch({
          type: "LOGIN_SUCCESS",
          payload: { id, username }
        });
        cookies.set("username", username, { path: "/" });
      });
  };
};

export const keepLogin = username => {
  return dispatch => {
    console.log(username);

    axios
      .get("http://localhost:1996/users", {
        params: {
          username
        }
      })
      .then(res => {
        console.log(res.data);
        const { id, username } = res.data[0];
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: { id, username }
        });
        // console.log(payload);
      });
  };
};

export const onLogoutClick = () => {
  cookies.remove("username");
  return {
    type: "LOGOUT_SUCCESS"
  };
};
