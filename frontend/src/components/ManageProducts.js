import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Cookies from "universal-cookie";

import { admin } from "../config/message";
import Products from "./Products";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import Orders from "./Orders";
// import { onEditProduct } from "../actions/index";

const cookies = new Cookies();

class ManageProducts extends React.Component {
  onSettingClick = () => {
    const { path, page } = this.props.match.params;
    const { pathname } = this.props.location;
    cookies.set("product_id", page, { page: "/" });
    if (pathname === `/manageproducts/products/${page}`) return <Products />;
    if (pathname === `/manageproducts/addproduct/${page}`)
      return <AddProduct />;
    if (pathname === `/manageproducts/editproduct/${page}`)
      return <EditProduct />;
    if (pathname === `/manageproducts/orders/${page}`) return <Orders />;
    // if (pathname === `/setting_address/${pages}`) return <AddSet />;
    // if (pathname === "/setting/wishlist") return <Wishlist />;
    // if (pathname === "/setting/payment") return <Payment />;
  };

  render() {
    console.log(this.props);
    const { path, page } = this.props.match.params;

    const { pathname } = this.props.location;
    if (cookies.get("role") === admin) {
      return (
        <div className="manageproducts">
          <div className="d-flex">
            <div className="col-md-2">
              <h4 className="mb-4">Manage Products</h4>
              <ul class="list-group list-group-flush">
                <li class="list-group-item border border-top-0 border-left-0 border-right-0">
                  <Link to={`/manageproducts/products/0`}>
                    <i class="mx-2 fas fa-store" />
                    Products
                  </Link>
                </li>
                <li class="list-group-item border border-left-0 border-right-0">
                  <Link to={`/manageproducts/addproduct/0`}>
                    <i class="mx-2 fas fa-plus-square" />
                    Add Product
                  </Link>
                </li>
                <li class="list-group-item border border-left-0 border-right-0">
                  <Link to={`/manageproducts/orders/0`}>
                    <i class="mx-2 fas fa-box-open" />
                    Orders
                  </Link>
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
                pathname === `/manageproducts/products/${page}`
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
  return { role: state.user.role };
};

export default connect(mapStateToProps)(ManageProducts);
