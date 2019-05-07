import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import Cookies from "universal-cookie";

// import { onLogoutClick } from "../actions";
import axios from "../config/axios";
import Account from "./Account";
import Addresses from "./Addresses";
import Orders from "./Orders";
import Wishlist from "./Wishlist";
import Payment from "./Payment";
import AddSet from "./AddSet";
import { user } from "../config/message";

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
    const { pages, path } = this.props.match.params;
    cookies.set("address", path, { path: "/" });
    console.log(this.props);
    if (pathname === "/setting/account")
      return <Account user={this.state.user} />;
    if (pathname === "/setting/addresses") return <Addresses />;
    if (pathname === `/setting/${path}`) return <AddSet />;
    if (pathname === "/setting/orders") return <Orders />;
    if (pathname === "/setting/wishlist") return <Wishlist />;
    if (pathname === "/setting/payment") return <Payment />;
  };

  render() {
    console.log(this.props);

    if (this.state.user.length !== 0) {
      var { first_name, last_name } = this.state.user[0];
    }
    if (cookies.get("role") === user) {
      return (
        <div className="account">
          <div className="d-flex justify-content-center name">
            <div className="">
              <h2>{`${first_name} ${last_name}`}</h2>
            </div>
          </div>
          <div className="d-flex">
            <div className="col-md-3">
              <h4 className="mb-4">Settings</h4>
              <ul class="list-group list-group-flush">
                <li class="list-group-item border border-top-0 border-left-0 border-right-0">
                  <Link to="/setting/account">Account</Link>
                </li>
                <li class="list-group-item border border-left-0 border-right-0">
                  <Link to="/setting/addresses">Addresses</Link>
                </li>
                <li class="list-group-item border border-left-0 border-right-0">
                  <Link to="/setting/orders">Orders</Link>
                </li>
                <li class="list-group-item border border-left-0 border-right-0">
                  <Link to="/setting/wishlist">Wish List</Link>{" "}
                </li>
                <li class="list-group-item border border-left-0 border-right-0">
                  <Link to="/setting/payment">Payment Options</Link>
                </li>
              </ul>
            </div>
            <div className="col-md-7 ">{this.onSettingClick()}</div>
          </div>
        </div>
      );
    } else {
      return <Redirect to="/login" />;
    }
  }
}
const mapStateToProps = state => {
  return { user_id: state.auth.user_id, role: state.auth.role };
};
export default connect(mapStateToProps)(Setting);