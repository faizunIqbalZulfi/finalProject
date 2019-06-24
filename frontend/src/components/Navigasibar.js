import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button
} from "reactstrap";
import Cookies from "universal-cookie";

import { onLogout } from "../store/actions/user";
import { getAllWishcart } from "../store/actions/product";
import { user, admin } from "../config/message";
import axios from "../config/axios";

const cookies = new Cookies();

class Navigasibar extends React.Component {
  isUpdate = true;
  state = {
    isOpen: false,
    allCart: []
  };

  componentDidUpdate() {
    this.isUpdate = true;
    console.log("did");
  }
  async componentWillUpdate() {
    if (this.isUpdate) {
      await this.props.getAllWishcart(cookies.get("user_id"));
      console.log("new");
    }
    console.log("will");
    this.isUpdate = false;
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    console.log("render");
    var sumCart = 0;
    if (this.props.cart.length) {
      this.props.cart.forEach(product => {
        sumCart += product.qty;
      });
    }

    return (
      <div>
        <Navbar className="navbar navbar-light bg-light fixed-top" expand="md">
          <NavbarBrand>
            <Link to="/" className="navbar-brand">
              <i class="mx-1 fas fa-shoe-prints" />
              Brand<b>Name</b>
            </Link>
          </NavbarBrand>
          <NavbarToggler
            onClick={() => {
              this.toggle();
            }}
          />
          <Collapse className="flex-column" isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown className="mx-2" nav inNavbar>
                {/* <DropdownToggle className="navtext" nav>
                  <i className="fas fa-search" />
                  <span className="ml-2 ">Search</span>
                </DropdownToggle> */}
                <DropdownMenu className="navsearch" right>
                  <input
                    className="text-center"
                    type="text"
                    placeholder="search here"
                  />
                </DropdownMenu>
              </UncontrolledDropdown>
              {this.props.user_id !== "" ? (
                <UncontrolledDropdown className="mx-2" nav inNavbar>
                  <DropdownToggle className="navtext myaccount" nav>
                    <i className="fas fa-user" />
                    <span className="ml-2 ">
                      {this.props.role === admin ? "Admin" : "My Account"}
                    </span>
                  </DropdownToggle>
                  {/* {this.props.role === user ? ( */}
                  <DropdownMenu className="navaccount" right>
                    {this.props.role === user ? (
                      <div>
                        <Link className="dropdown-item" to="/wishlist">
                          <DropdownItem className="namedropnav">
                            Wish list
                          </DropdownItem>
                        </Link>
                        <Link className="dropdown-item" to="/setting/account/0">
                          <DropdownItem className="namedropnav">
                            Account Setting
                          </DropdownItem>
                        </Link>
                      </div>
                    ) : null}
                    <Button
                      className="dropdown-item"
                      onClick={() => {
                        this.props.onLogout();
                      }}
                    >
                      <DropdownItem className="namedropnav">
                        Log Out
                      </DropdownItem>
                    </Button>
                  </DropdownMenu>
                  {/* ) : ( */}
                  {/* <DropdownMenu className="navaccount" right>
                    <Button
                      className="dropdown-item"
                      onClick={() => {
                        this.props.onLogout();
                      }}
                    >
                      <DropdownItem className="namedropnav">
                        Log Out
                      </DropdownItem>
                    </Button>
                  </DropdownMenu>
                  )} */}
                </UncontrolledDropdown>
              ) : (
                  <NavItem>
                    <NavLink className="navtext">
                      <Link className="joinlogin" to="/login">
                        Join / Log In To Account
                    </Link>
                    </NavLink>
                  </NavItem>
                )}
              {this.props.role === admin ? null : (
                <NavItem className="mx-2">
                  <NavLink className="navtext">
                    <Link to="/cart">
                      <i className="fas fa-shopping-cart" />
                      <span className="ml-1">
                        {this.props.role === user ? `(${sumCart})` : "(0)"}
                      </span>
                    </Link>
                    {/* <sup className="badge rounded-circle">5</sup> */}
                  </NavLink>
                </NavItem>
              )}
            </Nav>
            {this.props.role === admin ? null : (
              <Nav className="fontcategory ml-auto" navbar>
                <NavItem className="mx-2">
                  <NavLink className="navtext">
                    <Link to={`/shop/men/0`}>
                      {/* <p>CAT</p> */}
                      {/* <i className="">CAT</i> */}
                      <span className="ml-1">MEN</span>
                    </Link>
                  </NavLink>
                </NavItem>
                <NavItem className="mx-2">
                  <NavLink className="navtext">
                    <Link to={`/shop/women/0`}>
                      {/* <p>CAT</p> */}
                      {/* <i className="">CAT</i> */}
                      <span className="ml-1">WOMEN</span>
                    </Link>
                  </NavLink>
                </NavItem>
              </Nav>
            )}
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user_id: state.user.user_id,
    role: state.user.role,
    cart: state.product.cart
  };
};

export default connect(
  mapStateToProps,
  { onLogout, getAllWishcart }
)(Navigasibar);
