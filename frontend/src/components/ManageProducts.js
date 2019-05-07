import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Cookies from "universal-cookie";

import { admin } from "../config/message";
import Products from "./Products";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
// import { onEditProduct } from "../actions/index";

const cookies = new Cookies();

class ManageProducts extends React.Component {
  onSettingClick = () => {
    const { path } = this.props.match.params;
    const { pathname } = this.props.location;
    cookies.set("product_id", path, { path: "/" });
    if (pathname === "/manageproducts/products") return <Products />;
    if (pathname === "/manageproducts/addproduct") return <AddProduct />;
    if (pathname === `/manageproducts/${path}`) return <EditProduct />;
    // if (pathname === `/setting_address/${pages}`) return <AddSet />;
    // if (pathname === "/setting/orders") return <Orders />;
    // if (pathname === "/setting/wishlist") return <Wishlist />;
    // if (pathname === "/setting/payment") return <Payment />;
  };

  render() {
    console.log(this.props);

    const { pathname } = this.props.location;
    if (cookies.get("role") === admin) {
      return (
        <div className="manageproducts">
          {/* <div className="d-flex justify-content-center mproduct">
            <h1>ini ManageProducts</h1>
          </div> */}
          <div className="d-flex">
            <div className="col-md-2">
              <h4 className="mb-4">Manage Products</h4>
              <ul class="list-group list-group-flush">
                <li class="list-group-item border border-top-0 border-left-0 border-right-0">
                  <Link to="/manageproducts/products">Products</Link>
                </li>
                <li class="list-group-item border border-left-0 border-right-0">
                  <Link to="/manageproducts/addproduct">Add Product</Link>
                </li>
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
            <div
              className={`${
                pathname === "/manageproducts/products"
                  ? "col-md-10"
                  : "col-md-7"
              }`}
            >
              {this.onSettingClick()}
            </div>
          </div>
        </div>
      );
    }
    return <Redirect to="/home" />;
  }
}

const mapStateToProps = state => {
  return { role: state.auth.role };
};

export default connect(mapStateToProps)(ManageProducts);
