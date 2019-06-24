import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Cookies from "universal-cookie";

import { admin } from "../config/message";
import Products from "./Products";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import Orders from "./Orders";
import RegisterAdmin from "./RegisterAdmin";
import AddPaymentMethod from "./PaymentMethod";
import Users from "./Users";
import Shippers from "./Shippers";
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
    if (pathname === `/manageproducts/addpaymentmethod/${page}`)
      return <AddPaymentMethod />;
    if (pathname === `/manageproducts/shippers/${page}`) return <Shippers />;
    if (pathname === `/manageproducts/orders/${page}`) return <Orders />;
    if (pathname === `/manageproducts/registeradmin/${page}`)
      return <RegisterAdmin />;
    if (pathname === `/manageproducts/users/${page}`) return <Users />;
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
                <li class="list-group-item border border-left-0 border-right-0">
                  <Link to={`/manageproducts/addpaymentmethod/0`}>
                    <i class="mx-2 fas fa-credit-card" />
                    Payment
                  </Link>
                </li>
                <li class="list-group-item border border-left-0 border-right-0">
                  <Link to={`/manageproducts/shippers/0`}>
                    <i class="mx-2 fas fa-truck" />
                    Shipper
                  </Link>
                </li>
              </ul>
              <h4 className="mb-4 mt-5">Manage Users</h4>
              <ul class="list-group list-group-flush">
                <li class="list-group-item border border-left-0 border-right-0">
                  <Link to={`/manageproducts/registeradmin/${Math.random()}`}>
                    <i class="mx-2 fas fa-user-plus" />
                    Register Admin
                  </Link>
                </li>
                <li class="list-group-item border border-top-0 border-left-0 border-right-0">
                  <Link to={`/manageproducts/users/0`}>
                    <i class="mx-2 fas fa-user" />
                    Users
                  </Link>
                </li>
              </ul>
            </div>
            <div
              className={`${
                pathname === `/manageproducts/products/${page}` ||
                  pathname === `/manageproducts/orders/${page}` ||
                  pathname === `/manageproducts/users/${page}`
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
    return <Redirect to="/" />;
  }
}

const mapStateToProps = state => {
  return { role: state.user.role };
};

export default connect(mapStateToProps)(ManageProducts);
