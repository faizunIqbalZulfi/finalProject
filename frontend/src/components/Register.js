import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { onRegister } from "../actions/index";
import Cookies from "universal-cookie";

import { registerSuccess } from "../config/message";

const cookies = new Cookies();

class Register extends React.Component {
  state = {
    gender: ""
  };

  btnRegisterOnClick = () => {
    const first_Name = this.firstName.value;
    const last_Name = this.lastName.value;
    const email = this.email.value;
    const password = this.password.value;
    const gender = this.state.gender;
    this.props.onRegister({ first_Name, last_Name, email, password, gender });
  };

  onRadioBtnClick = gender => {
    this.setState({ gender });
  };

  onRegisterMessage = () => {
    if (this.props.message !== "") {
      return (
        <div
          className={
            this.props.message === registerSuccess
              ? "alert alert-success mt-2 text-center"
              : "alert alert-danger mt-2 text-center"
          }
        >
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
        <div className="register">
          <div className="row-sd d-md-flex justify-content-between mt-5">
            <div className="col-md-4 offset-4 ">
              <div className="text-center mb-4">
                <h3>REGISTER</h3>
                <hr />
              </div>
              <form className="register2">
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
                <div className="form-group">
                  <p className="loginRegister mb-0">First Name</p>
                  <input
                    ref={input => {
                      this.firstName = input;
                    }}
                    type="texy"
                    className="form-control"
                    placeholder="First Name"
                  />
                </div>
                <div className="form-group">
                  <p className="loginRegister mb-0">Last Name</p>
                  <input
                    ref={input => {
                      this.lastName = input;
                    }}
                    type="text"
                    className="form-control"
                    placeholder="Last Name"
                  />
                </div>
              </form>
              <div className="form-group">
                <p className="loginRegister mb-0">Gender</p>
                <div className="btn-group btn-block">
                  <button
                    className={
                      this.state.gender === "M"
                        ? "btn btn-secondary"
                        : "btn btn-outline-secondary"
                    }
                    onClick={() => this.onRadioBtnClick("M")}
                  >
                    Male
                  </button>
                  <button
                    className={
                      this.state.gender === "F"
                        ? "btn btn-secondary"
                        : "btn btn-outline-secondary"
                    }
                    onClick={() => this.onRadioBtnClick("F")}
                  >
                    Female
                  </button>
                </div>
              </div>
              {this.onRegisterMessage()}
              <button
                onClick={() => {
                  this.btnRegisterOnClick();
                }}
                className="btn btn-outline-secondary btn-block mt-4"
              >
                REGISTER
              </button>
              <div className="text-center">
                <p className="loginRegister mt-3">
                  Already a member? <Link to="/login">Sign in.</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <Redirect to="/setting/account" />;
    }
  }
}

const mapStateToProps = state => {
  return { message: state.auth.message };
};
export default connect(
  mapStateToProps,
  { onRegister }
)(Register);
