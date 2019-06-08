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

// import Header from "./Header";
// import AllProduct from "./AllProduct";
// import ManageProduct from "./ManageProduct";
// import DetailProduct from "./DetailProduct";
import { keepLogin } from "../store/actions/user";
import ManageProducts from "./ManageProducts";
import ManageUsers from "./ManageUsers";
import Testimage from "./Testimage";
import DetailProduct from "./DetailProduct";
import Wishlist from "./Wishlist";
import Shop from "./Shop";

const cookies = new Cookies();

class App extends Component {
  componentDidMount() {
    var user_id = cookies.get("user_id");
    if (user_id !== undefined) {
      this.props.keepLogin(user_id);
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Navigasibar />
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/setting/:path/:page" component={Setting} />
          <Route path="/cart" component={Cart} />
          <Route path="/wishlist" component={Wishlist} />
          <Route path="/shop/:gender/:category" component={Shop} />

          <Route
            path="/manageproducts/:path/:page"
            component={ManageProducts}
          />
          <Route path="/manageusers" component={ManageUsers} />
          <Route path="/image" component={Testimage} />
          <Route path="/detailproduct/:product_id" component={DetailProduct} />
          {/* <Footer /> */}
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(
  null,
  { keepLogin }
)(App);
