import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import Cookies from "universal-cookie";

// import { onLogoutClick } from "../actions";
import axios from "../config/axios";
import Account from "./Account";
import Addresses from "./Addresses";
import Orders from "./OrderUser";
import Wishlist from "./Wishlist";
import Payment from "./Payment";
import AddSet from "./AddSet";
import { user, admin } from "../config/message";

const cookies = new Cookies();

class Setting extends React.Component {
  state = {
    user: []
  };

  componentDidMount() {
    this.getUser(cookies.get("user_id"));
    // this.getAddress(cookies.get("user_id"));
  }
  getUser = async user_id => {
    try {
      const res = await axios.get(`/user/${user_id}`);
      this.setState({ user: res.data });
    } catch (e) {
      console.log(e);
    }
  };

  onSettingClick = () => {
    const { pathname } = this.props.location;
    const { page, path } = this.props.match.params;
    cookies.set("address", page, { page: "/" });
    console.log(this.props);
    if (pathname === `/setting/account/${page}`)
      return <Account user={this.state.user} />;
    if (pathname === `/setting/addresses/${page}`) return <Addresses />;
    if (pathname === `/setting/editaddress/${page}`) return <AddSet />;
    if (pathname === `/setting/orders/${page}`) return <Orders />;
    // if (pathname === `/setting/wishlist/${page}`) return <Wishlist />;
    // if (pathname === `/setting/payment/${page}`) return <Payment />;
  };

  render() {
    if (this.state.user.length !== 0) {
      var { first_name, last_name, username } = this.state.user[0];
    }
    if (this.props.role === admin) {
      return <Redirect to="/manageproducts/products/0" />;
    }
    if (cookies.get("user_id") === undefined) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="account">
        <div className="d-flex justify-content-center name">
          <div className="">
            <h2>{username}</h2>
          </div>
        </div>
        <div className="d-flex">
          <div className="col-md-2">
            <h4 className="mb-4">Settings</h4>
            <ul class="list-group list-group-flush">
              <li class="list-group-item border border-top-0 border-left-0 border-right-0">
                <Link to={`/setting/account/${Math.random()}`}>
                  <i class="mx-2 fas fa-user-circle fa-1x" />
                  Account
                </Link>
              </li>
              <li class="list-group-item border border-left-0 border-right-0">
                <Link to={`/setting/addresses/${Math.random()}`}>
                  <i class="mx-2 fas fa-home" />
                  Addresses
                </Link>
              </li>
              <li class="list-group-item border border-left-0 border-right-0">
                <Link to={`/setting/orders/${Math.random()}`}>
                  <i class="mx-2 fas fa-history" /> Orders
                </Link>
              </li>
              {/* <li class="list-group-item border border-left-0 border-right-0">
                  <Link to={`/setting/wishlist/${Math.random()}`}>
                    <i class="mx-2 fas fa-th-list" />
                    Wish List
                  </Link>{" "}
                </li>
                <li class="list-group-item border border-left-0 border-right-0">
                  <Link to={`/setting/payment/${Math.random()}`}>
                    <i class="mx-2 fas fa-credit-card" />
                    Payment Options
                  </Link>
                </li> */}
            </ul>
          </div>
          <div className="col-md-8 ">{this.onSettingClick()}</div>
        </div>
      </div>
    );
    // } else {
    //   return <Redirect to="/login" />;
    // }
  }
}
const mapStateToProps = state => {
  return { user_id: state.user.user_id, role: state.user.role };
};
export default connect(mapStateToProps)(Setting);
