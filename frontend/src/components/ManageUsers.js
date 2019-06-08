import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import Cookies from "universal-cookie";

import { admin } from "../config/message";

const cookies = new Cookies();

class ManageUsers extends React.Component {
  render() {
    if (cookies.get("role") === admin) {
      return (
        <div className="manageuser">
          <div className="d-flex">
            <div className="col-md-2">
              <h4 className="mb-4">Manage Users</h4>
              <ul class="list-group list-group-flush">
                <li class="list-group-item border border-top-0 border-left-0 border-right-0">
                  <Link to={`/manageproducts/products/${Math.random()}`}>
                    Users
                  </Link>
                </li>
                <li class="list-group-item border border-left-0 border-right-0">
                  <Link to={`/manageproducts/addproduct/${Math.random()}`}>
                    Register Admin
                  </Link>
                </li>
                {/* <li class="list-group-item border border-left-0 border-right-0">
                  <Link to={`/manageproducts/orders/${Math.random()}`}>
                    Orders
                  </Link>
                </li> */}
                {/* <li class="list-group-item border border-left-0 border-right-0">
              <Link to="/setting/orders">Orders</Link>
            </li>
            <li class="list-group-item border border-left-0 border-right-0">
              <Link to="/setting/wishlist">Wish List</Link>{" "}
            </li>
            <li class="list-group-item border border-left-0 border-right-0">
              <Link to="/setting/payment">Payment Options</Link>
            </li> */}
              </ul>
            </div>
            {/* <div
              className={`${
                pathname === `/manageproducts/products/${page}`
                  ? "col-md-10"
                  : "col-md-7"
              }`}
            >
              {this.onSettingClick()}
            </div> */}
          </div>
        </div>
      );
    }
    return <Redirect to="/home" />;
  }
}

const mapStateToProps = state => {
  return { role: state.user.role };
};

export default connect(mapStateToProps)(ManageUsers);
