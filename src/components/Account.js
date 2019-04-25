import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import { onLogoutClick } from "../actions";

class Account extends React.Component {
  render() {
    if (this.props.username !== "") {
      return (
        <div>
          <div className="jumbotron">
            <h3 className="text-white">
              <b>ACCOUNT</b>
            </h3>
          </div>
          <div className="d-flex justify-content-between mt-5">
            {/* <div className="col-md-4 mx-2">
            <h5>NEW CUSTOMER</h5>
            <p className="font-weight-bold mt-4">Register Account</p>
            <p>
              By creating an account you will be able to shop faster, be up to
              date on an order's status, and keep track of the orders you have
              previously made.
            </p>
            <button className="btn btn-outline-secondary">CONTINUE</button>
          </div> */}
            <div className="col-md-8">
              {/* <form className="register"> */}
              {/* <p>
                  If you already have an account with us, please login at the{" "}
                  <Link to="/login">login page</Link>.
                </p> */}
              <h6>PERSONAL DETAILS</h6>
              {/* <div className="form-group">
                  First Name
                  <input
                    type="text"
                    class="form-control"
                    placeholder="First name"
                  />
                </div>
                <div className="form-group">
                  Last Name
                  <input
                    type="text"
                    class="form-control"
                    placeholder="First name"
                  />
                </div>
                <div className="form-group">
                  E-mail Name
                  <input
                    type="text"
                    class="form-control"
                    placeholder="First name"
                  />
                </div>
                <div className="form-group">
                  Telephone
                  <input
                    type="text"
                    class="form-control"
                    placeholder="First name"
                  />
                </div> */}
              <h6>YOUR ADDRESS</h6>
              {/* <div className="form-group">
                  Address 1
                  <input
                    type="type"
                    class="form-control"
                    placeholder="Address 1"
                  />
                </div>
                <div className="form-group">
                  Address 2
                  <input
                    type="type"
                    class="form-control"
                    placeholder="Address 2"
                  />
                </div>
                <div className="form-group">
                  City
                  <input type="type" class="form-control" placeholder="City" />
                </div>
                <div className="form-group">
                  Post Code
                  <input
                    type="type"
                    class="form-control"
                    placeholder="Post Code"
                  />
                </div> */}
              <h6>YOUR PASSWORD</h6>
              {/* <div className="form-group">
                  Password
                  <input
                    type="type"
                    class="form-control"
                    placeholder="Password"
                  />
                </div>
                <div className="form-group">
                  Confirm Password
                  <input
                    type="type"
                    class="form-control"
                    placeholder="Confirm Password"
                  />
                </div>
                <a href="">Forgotten Password</a> */}
              {/* </form> */}
              {/* <button className="btn btn-outline-secondary mt-3">
                CONTINUE
              </button> */}
            </div>
            <div className="col-md-3">
              <h5>ACCOUNT</h5>
              <ul className="account">
                <li className="my-3">
                  <Link to="/login">Lorem</Link>/
                  <Link to="/register">Lorem</Link>
                </li>
                <li className="my-3">
                  <a href="">Lorem</a>
                </li>
                <li className="my-3">
                  <a href="">Lorem</a>
                </li>
                <li className="my-3">
                  <a href="">Lorem</a>
                </li>
                <li className="my-3">
                  <a href="">Lorem</a>
                </li>
                <li className="my-3">
                  <a href="" onClick={this.props.onLogoutClick}>
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      );
    } else {
      return <Redirect to="/login" />;
    }
  }
}
const mapStateToProps = state => {
  return { username: state.auth.username };
};
export default connect(
  mapStateToProps,
  { onLogoutClick }
)(Account);
