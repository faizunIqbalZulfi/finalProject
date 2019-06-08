import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Cookies from "universal-cookie";

import { onLogin } from "../store/actions/user";

const cookies = new Cookies();

class Login extends React.Component {
  onLoginClick = () => {
    const email = this.email.value;
    const password = this.password.value;

    this.props.onLogin({ email, password });
  };

  onLoginError = () => {
    if (this.props.message !== "") {
      return (
        <div className="alert alert-danger mt-2 text-center" role="alert">
          {this.props.message}
        </div>
      );
    } else {
      return null;
    }
  };

  render() {
    if (cookies.get("user_id") === undefined) {
      return (
        <div className="login">
          <div className="row-sd d-md-flex justify-content-between mt-5">
            <div className="col-md-4 offset-4 ">
              <div className="text-center mb-4">
                <h3>LOGIN</h3>
                <hr />
              </div>
              <form className="login2">
                <div className="form-group">
                  <p className="loginRegister mb-0">E-Mail</p>
                  <input
                    ref={input => {
                      this.email = input;
                    }}
                    type="text"
                    className="form-control"
                    placeholder="E-Mail Address"
                  />
                </div>
                <div className="form-group">
                  <p className="loginRegister mb-0">Password</p>
                  <input
                    ref={input => {
                      this.password = input;
                    }}
                    type="password"
                    className="form-control"
                    placeholder="Password"
                  />
                </div>
                <a className="loginRegister" href="">
                  Forgotten your password?
                </a>
              </form>
              {this.onLoginError()}
              <button
                onClick={() => {
                  this.onLoginClick();
                }}
                className="btn btn-outline-secondary btn-block mt-3"
              >
                LOGIN
              </button>
              <div className="text-center mt-3">
                <p className="loginRegister">
                  Not a member?
                  <Link className="" to="/register">
                    Join now
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <Redirect to="/home" />;
    }
  }
}
const mapStateToProps = state => {
  return {
    user_id: state.user.user_id,
    message: state.user.message
  };
};

export default connect(
  mapStateToProps,
  { onLogin }
)(Login);
