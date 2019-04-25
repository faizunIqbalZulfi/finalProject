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
  render() {
    console.log(this.props.username);

    return (
      <div>
        <Navbar className="navbar navbar-light bg-light fixed-top" expand="md">
          <NavbarBrand>
            <Link to="/" className="navbar-brand">
              <i className="fas fa-camera-retro" />
              Brand<b>Name</b>
            </Link>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle className="navtext" nav>
                  <i className="fas fa-search" />
                </DropdownToggle>
                <DropdownMenu className="navsearch" right>
                  <input
                    className="text-center"
                    type="text"
                    placeholder="search here"
                  />
                </DropdownMenu>
              </UncontrolledDropdown>

              <NavItem>
                <NavLink className="navtext">Product</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="navtext" href="/cart">
                  <i className="fas fa-shopping-cart">
                    <span className="ml-2">Cart</span>
                    <sup className="badge rounded-circle">5</sup>
                  </i>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="navtext" href="/login">
                  <i className="fas fa-user">
                    <span className="ml-2 ">Account</span>
                  </i>
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
    username: state.auth.username
  };
};

export default connect(mapStateToProps)(Navigasibar);
