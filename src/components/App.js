import React, { Component } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Cookies from "universal-cookie";

import Navigasibar from "./Navigasibar";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Account from "./Account";
import Cart from "./Cart";
import Footer from "./Footer";

// import Header from "./Header";
// import AllProduct from "./AllProduct";
// import ManageProduct from "./ManageProduct";
// import DetailProduct from "./DetailProduct";
import { keepLogin } from "../actions";

const cookies = new Cookies();

class App extends Component {
  componentDidMount() {
    var username = cookies.get("username");
    if (username !== undefined) {
      this.props.keepLogin(username);
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
          <Route path="/account" component={Account} />
          <Route path="/cart" component={Cart} />
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(
  null,
  { keepLogin }
)(App);
