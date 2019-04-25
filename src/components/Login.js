import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { onLoginClick } from "../actions";

class Login extends React.Component {
  onLogin = () => {
    const username = this.username.value;
    const password = this.password.value;

    this.props.onLoginClick(username, password);
  };

  onLoginError = () => {
    if (this.props.error !== "") {
      return (
        <div className="alert alert-danger mt-2" role="alert">
          {this.props.error}
        </div>
      );
    } else {
      return null;
    }
  };

  render() {
    console.log(this.props.username);
    console.log(this.props.error);
    if (this.props.username === "") {
      return (
        <div>
          <div className="jumbotron my-3">
            <h3 className="text-white">
              <b>ACCOUNT LOGIN</b>
            </h3>
          </div>
          <div className="row-sd d-md-flex justify-content-between mt-5">
            <div className="col-md-4">
              <h5>NEW CUSTOMER</h5>
              <p className="font-weight-bold mt-4">Register Account</p>
              <p>
                By creating an account you will be able to shop faster, be up to
                date on an order's status, and keep track of the orders you have
                previously made.
              </p>

              <Link to="/register" className="btn btn-outline-secondary">
                CONTINUE
              </Link>
            </div>
            <div className="col-md-4">
              {this.onLoginError()}
              <h5>RETURNING CUSTOMER</h5>
              <p className="font-weight-bold mt-4">I am a returning customer</p>
              <form className="login">
                <div className="form-group">
                  E-Mail Address
                  <input
                    ref={input => {
                      this.username = input;
                    }}
                    type="text"
                    className="form-control"
                    placeholder="E-Mail Address"
                  />
                </div>
                <div className="form-group">
                  Password
                  <input
                    ref={input => {
                      this.password = input;
                    }}
                    type="password"
                    className="form-control"
                    placeholder="Password"
                  />
                </div>
                <a href="">Forgotten Password</a>
              </form>
              <button
                onClick={() => {
                  this.onLogin();
                }}
                className="btn btn-outline-secondary mt-3"
              >
                LOGIN
              </button>
            </div>
            <div className="col-md-3">
              <h5>ACCOUNT</h5>
              <ul className="account">
                <li className="my-3">
                  <Link to="/login">Login</Link>/
                  <Link to="/register">Register</Link>
                </li>
                <li className="my-3">
                  <a href="">Forgotten Password</a>
                </li>
                <li className="my-3">
                  <a href="">My Account</a>
                </li>
                <li className="my-3">
                  <a href="">Wish List</a>
                </li>
                <li className="my-3">
                  <a href="">Order History</a>
                </li>
                <li className="my-3">
                  <a href="">Transactions</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        /* <div className="navbar2 navbar-dark bg-dark pl-3">
<a className="navbar-brand" href="#">
<i className="fas fa-home mr-2" />
<i className="fas fa-chevron-right" />
          </a>
        </div> */
        /* <div className="card p-3">
        <form>
        <div className="m-3 text-light">Sign Up</div>
        <div class="form-group">
        <input
        type="email"
        class="form-control"
        id="exampleFormControlInput1"
        placeholder="Username"
        />
        </div>
        <div class="form-group">
        <input
        type="email"
        class="form-control"
        id="exampleFormControlInput1"
        placeholder="E-mail"
        />
        </div>
        <div class="form-group">
        <input
        type="email"
        class="form-control"
        id="exampleFormControlInput1"
        placeholder="Password"
        />
        </div>
        <div class="form-group">
        <input
        type="email"
        class="form-control"
        id="exampleFormControlInput1"
        placeholder="Confirm Password"
              />
              </div>
              <button type="submit" class="btn btn-success">
              Sign Up
              </button>
              </form>
              </div> */
      );
    } else {
      return <Redirect to="/account" />;
    }
  }
}
const mapStateToProps = state => {
  return {
    username: state.auth.username,
    error: state.auth.error
  };
};

export default connect(
  mapStateToProps,
  { onLoginClick }
)(Login);
