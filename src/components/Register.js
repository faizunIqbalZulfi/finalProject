import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

class Register extends React.Component {
  btnRegisterOnClick = () => {
    console.log(this.first.value);
    console.log(this.last.value);
    console.log(this.email.value);
    console.log(this.phone.value);
    console.log(this.address1.value);
    console.log(this.address2.value);
    console.log(this.city.value);
    console.log(this.postcode.value);
    console.log(this.pass.value);
    console.log(this.confpass.value);
  };

  render() {
    if (this.props.username === "") {
      return (
        <div>
          <div className="jumbotron my-3">
            <h3 className="text-white">
              <b>REGISTER ACCOUNT</b>
            </h3>
          </div>
          <div className="d-md-flex justify-content-between mt-5">
            <div className="col-md-8">
              <form className="register">
                <p>
                  If you already have an account with us, please login at the{" "}
                  <Link to="/login">login page</Link>.
                </p>
                <h6>YOUR PERSONAL DETAILS</h6>
                <div className="form-group">
                  First Name
                  <sup>
                    <i className="fas fa-star-of-life" />
                  </sup>
                  <input
                    ref={input => {
                      this.first = input;
                    }}
                    type="text"
                    className="form-control"
                    placeholder="First name"
                  />
                </div>
                <div className="form-group">
                  Last Name
                  <sup>
                    <i className="fas fa-star-of-life" />
                  </sup>
                  <input
                    ref={input => {
                      this.last = input;
                    }}
                    type="text"
                    className="form-control"
                    placeholder="First name"
                  />
                </div>
                <div className="form-group">
                  E-mail Name
                  <sup>
                    <i className="fas fa-star-of-life" />
                  </sup>
                  <input
                    ref={input => {
                      this.email = input;
                    }}
                    type="text"
                    className="form-control"
                    placeholder="First name"
                  />
                </div>
                <div className="form-group">
                  Telephone
                  <sup>
                    <i className="fas fa-star-of-life" />
                  </sup>
                  <input
                    ref={input => {
                      this.phone = input;
                    }}
                    type="text"
                    className="form-control"
                    placeholder="First name"
                  />
                </div>
                <h6>YOUR ADDRESS</h6>
                <div className="form-group">
                  Address 1
                  <sup>
                    <i className="fas fa-star-of-life" />
                  </sup>
                  <input
                    ref={input => {
                      this.address1 = input;
                    }}
                    type="type"
                    className="form-control"
                    placeholder="Address 1"
                  />
                </div>
                <div className="form-group">
                  Address 2
                  <input
                    ref={input => {
                      this.address2 = input;
                    }}
                    type="type"
                    className="form-control"
                    placeholder="Address 2"
                  />
                </div>
                <div className="form-group">
                  City
                  <sup>
                    <i className="fas fa-star-of-life" />
                  </sup>
                  <input
                    ref={input => {
                      this.city = input;
                    }}
                    type="type"
                    className="form-control"
                    placeholder="City"
                  />
                </div>
                <div className="form-group">
                  Post Code
                  <sup>
                    <i className="fas fa-star-of-life" />
                  </sup>
                  <input
                    ref={input => {
                      this.postcode = input;
                    }}
                    type="type"
                    className="form-control"
                    placeholder="Post Code"
                  />
                </div>
                <h6>YOUR PASSWORD</h6>
                <div className="form-group">
                  Password
                  <sup>
                    <i className="fas fa-star-of-life" />
                  </sup>
                  <input
                    ref={input => {
                      this.pass = input;
                    }}
                    type="type"
                    className="form-control"
                    placeholder="Password"
                  />
                </div>
                <div className="form-group">
                  Confirm Password
                  <sup>
                    <i className="fas fa-star-of-life" />
                  </sup>
                  <input
                    ref={input => {
                      this.confpass = input;
                    }}
                    type="type"
                    className="form-control"
                    placeholder="Confirm Password"
                  />
                </div>
                <a href="">Forgotten Password</a>
              </form>
              <button
                onClick={this.btnRegisterOnClick}
                className="btn btn-outline-secondary mt-3"
              >
                CONTINUE
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
      );
    } else {
      return <Redirect to="/account" />;
    }
  }
}

const mapStateToProps = state => {
  return { username: state.auth.username };
};
export default connect(mapStateToProps)(Register);
