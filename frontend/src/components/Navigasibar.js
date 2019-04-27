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

import { onLogout } from "../actions/index";
import { user } from "../config/message";

const cookies = new Cookies();

class Navigasibar extends React.Component {
  state = {
    isOpen: false
  };
  // constructor(props) {
  //   super(props);

  //   this.toggle = this.toggle.bind(this);
  // }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    console.log(this.props.user_id);

    return (
      <div>
        <Navbar className="navbar navbar-light bg-light fixed-top" expand="md">
          <NavbarBrand>
            <Link to="/" className="navbar-brand">
              <i className="fas fa-camera-retro" />
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
              {this.props.user_id !== "" ? (
                <UncontrolledDropdown className="mx-2" nav inNavbar>
                  <DropdownToggle className="navtext" nav>
                    <i className="fas fa-user" />
                    <span className="ml-2 ">My Account</span>
                  </DropdownToggle>
                  {this.props.role === user ? (
                    <DropdownMenu className="navacount" right>
                      <Link className="dropdown-item" to="">
                        Orders
                      </Link>
                      <Link className="dropdown-item" to="">
                        Wish list
                      </Link>
                      <Link className="dropdown-item" to="/setting/account">
                        Account Setting
                      </Link>
                      <Button
                        className="dropdown-item"
                        onClick={() => {
                          this.props.onLogout();
                        }}
                      >
                        Log Out
                      </Button>
                    </DropdownMenu>
                  ) : (
                    <DropdownMenu className="navacount" right>
                      <Link className="dropdown-item" to="">
                        Manage Products
                      </Link>
                      <Link className="dropdown-item" to="">
                        Manage Users
                      </Link>
                      {/* <Link className="dropdown-item" to="/setting/account">
                        Account Setting
                      </Link> */}
                      <Button
                        className="dropdown-item"
                        onClick={() => {
                          this.props.onLogout();
                        }}
                      >
                        Log Out
                      </Button>
                    </DropdownMenu>
                  )}
                </UncontrolledDropdown>
              ) : (
                <NavItem>
                  <NavLink className="navtext">
                    <Link to="/login">Join / Log In To Account</Link>
                  </NavLink>
                </NavItem>
              )}

              <NavItem className="mx-2">
                <NavLink className="navtext" href="/cart">
                  <i className="fas fa-shopping-cart" />
                  <span className="ml-1">(5)</span>
                  {/* <sup className="badge rounded-circle">5</sup> */}
                </NavLink>
              </NavItem>
            </Nav>
            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown className="mx-2" nav inNavbar>
                <DropdownToggle className="navtext" nav>
                  <i className="fas fa-search" />
                  <span className="ml-2 ">Search</span>
                </DropdownToggle>
                <DropdownMenu className="navsearch" right>
                  <input
                    className="text-center"
                    type="text"
                    placeholder="search here"
                  />
                </DropdownMenu>
              </UncontrolledDropdown>
              <NavItem className="mx-2">
                <NavLink className="navtext" href="/cart">
                  {/* <p>CAT</p> */}
                  {/* <i className="">CAT</i> */}
                  <span className="ml-1 font-weight-bold">CAT</span>
                </NavLink>
              </NavItem>
              <NavItem className="mx-2">
                <NavLink className="navtext" href="/cart">
                  {/* <p>CAT</p> */}
                  {/* <i className="">CAT</i> */}
                  <span className="ml-1 font-weight-bold">CAT</span>
                </NavLink>
              </NavItem>
              <NavItem className="mx-2">
                <NavLink className="navtext" href="/cart">
                  {/* <p>CAT</p> */}
                  {/* <i className="">CAT</i> */}
                  <span className="ml-1 font-weight-bold">CAT</span>
                </NavLink>
              </NavItem>
              <NavItem className="mx-2">
                <NavLink className="navtext" href="/cart">
                  {/* <p>CAT</p> */}
                  {/* <i className="">CAT</i> */}
                  <span className="ml-1 font-weight-bold">CAT</span>
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user_id: state.auth.user_id,
    role: state.auth.role
  };
};

export default connect(
  mapStateToProps,
  { onLogout }
)(Navigasibar);
