import React, { Component } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Cookies from "universal-cookie";

import Navigasibar from "./Navigasibar";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Setting from "./Setting";
import Cart from "./Cart";
import Footer from "./Footer";
import ManageProducts from "./ManageProducts";
import ManageUsers from "./ManageUsers";
import DetailProduct from "./DetailProduct";
import Wishlist from "./Wishlist";
import Shop from "./Shop";
import Checkout from "./Checkout";

import { keepLogin } from "../store/actions/user";
import { admin, user } from "../config/message";
import ForgotPassword from "./ForgotPassword";

const cookies = new Cookies();

class App extends Component {
  componentDidMount() {
    var user_id = cookies.get("user_id");
    if (user_id !== undefined) {
      this.props.keepLogin(user_id);
    }
  }

  render() {
    console.log(this.props.role);

    return (
      <BrowserRouter>
        <div>
          <Navigasibar />
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/fotgotpassword" component={ForgotPassword} />
          <Route path="/setting/:path/:page" component={Setting} />
          <Route path="/cart" component={Cart} />
          <Route path="/wishlist" component={Wishlist} />
          <Route path="/shop/:gender/:category" component={Shop} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/detailproduct/:product_id" component={DetailProduct} />
          <Route
            path="/manageproducts/:path/:page"
            component={ManageProducts}
          />

          {/* <Route path="/manageusers" component={ManageUsers} /> */}
          {/* <Route path="/image" component={Testimage} /> */}
          {/* <Footer /> */}
        </div>
      </BrowserRouter>
    );
  }
}
const mapStateToProps = state => {
  return {
    role: state.user.role
  };
};
export default connect(
  mapStateToProps,
  { keepLogin }
)(App);
