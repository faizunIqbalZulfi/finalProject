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
  DropdownItem
} from "reactstrap";

import { onLogoutClick } from "../actions";

class Navigasibar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  onLogin = () => {
    if (this.props.username !== "") {
      return (
        <Link to="/login" className="nav-link dropdown">
          <i
            className="fas fa-user mr-2"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span className="ml-2 ">{this.props.username}</span>
          </i>
          <div className="dropdown-menu dropdown-menu-right">
            <button
              onClick={this.props.onLogoutClick}
              className="dropdown-item"
              // href="#"
            >
              Logout
            </button>
          </div>
        </Link>
      );
    } else {
      return (
        <Link to="/login" className="nav-link">
          <i className="fas fa-user mr-2" />
          Account
        </Link>
      );
    }
  };
  render() {
    console.log(this.props.username);

    return (
      <div>
        {/* <Navbar className="navbar-dark bg-dark fixed-top" expand="md">
          <NavbarBrand>
            <Link to="/" className="navbar-brand" href="/">
              <i className="fas fa-camera-retro" />
              Brand<b>Name</b>
            </Link>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink>
                  <i className="fas fa-search" />
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink>Product</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">
                  <i className="fas fa-shopping-cart mr-2">
                    <span className="ml-2">Cart</span>
                    <sup className="badge rounded-circle">5</sup>
                  </i>
                </NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav>
                  <i className="fas fa-user mr-2">
                    <span className="ml-2 ">{this.props.username}</span>
                  </i>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>Option 1</DropdownItem>
                  <DropdownItem>Option 2</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Reset</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar> */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
          <Link to="/" className="navbar-brand" href="/">
            <i className="fas fa-camera-retro" />
            Brand<b>Name</b>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <a className="nav-link" href="#">
                  Home <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Features
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Pricing
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link disabled"
                  href="#"
                  tabIndex="-1"
                  aria-disabled="true"
                >
                  Disabled
                </a>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item mr-2">
                <form className="form-inline">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                    />
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fas fa-search" />
                      </span>
                    </div>
                  </div>
                </form>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <i className="fas fa-shopping-cart mr-2" />
                  Cart
                  <sup className="badge rounded-circle">5</sup>
                </a>
              </li>
              <li className="nav-item">{this.onLogin()}</li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.auth.username
  };
};

export default connect(
  mapStateToProps,
  { onLogoutClick }
)(Navigasibar);
