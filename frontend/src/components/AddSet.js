import React from "react";
import Cookies from "universal-cookie";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { onEditAddress, onGetAddress } from "../store/actions/address";
import { editSuccess } from "../config/message";

const cookies = new Cookies();

class AddSet extends React.Component {
  componentDidMount() {
    this.props.onGetAddress(cookies.get("user_id"));
  }

  onEditBtnClick = address_id => {
    const address_name = this.address_name.value;
    const address1 = this.address1.value;
    const no_telp = this.no_telp.value;
    const pos_code = this.pos_code.value;
    const city = this.city.value;
    const name = this.name.value;
    const province = this.province.value;

    this.props.onEditAddress(address_id, {
      address_name,
      address1,
      no_telp,
      city,
      pos_code,
      name,
      province
    });
  };

  onEditMessage = () => {
    if (this.props.message !== "") {
      return (
        <div
          className={
            this.props.message === editSuccess
              ? "alert alert-success mt-2 text-center"
              : "alert alert-danger mt-2 text-center"
          }
        >
          {this.props.message}
        </div>
      );
    } else {
      return null;
    }
  };

  render() {
    if (this.props.addresses.length !== 0) {
      var {
        address_name,
        address1,
        no_telp,
        city,
        pos_code,
        address_id,
        province,
        name
      } = this.props.addresses[cookies.get("address")];
    }
    console.log(this.props.addresses);

    return (
      <div>
        <h4 className="mb-4">Address Settings</h4>
        <form className="register2">
          <div className="form-group">
            <p className="loginRegister mb-0">Address Name</p>
            <input
              ref={input => {
                this.address_name = input;
              }}
              type="text"
              className="form-control"
              defaultValue={address_name}
            />
          </div>
          <div className="form-group">
            <p className="loginRegister mb-0">Name</p>
            <input
              ref={input => {
                this.name = input;
              }}
              type="texy"
              className="form-control"
              defaultValue={name}
            />
          </div>
          <div className="form-group">
            <p className="loginRegister mb-0">City</p>
            <input
              ref={input => {
                this.city = input;
              }}
              type="texy"
              className="form-control"
              defaultValue={city}
            />
          </div>
          <div className="form-group">
            <p className="loginRegister mb-0">Province</p>
            <input
              ref={input => {
                this.province = input;
              }}
              type="texy"
              className="form-control"
              defaultValue={province}
            />
          </div>
          <div className="form-group">
            <p className="loginRegister mb-0">address</p>
            <input
              ref={input => {
                this.address1 = input;
              }}
              type="text"
              className="form-control"
              defaultValue={address1}
            />
          </div>
          <div className="form-group">
            <p className="loginRegister mb-0">pos_code</p>
            <input
              ref={input => {
                this.pos_code = input;
              }}
              type="text"
              className="form-control"
              defaultValue={pos_code}
            />
          </div>
          <div className="form-group">
            <p className="loginRegister mb-0">phone number</p>
            <input
              ref={input => {
                this.no_telp = input;
              }}
              type="text"
              className="form-control"
              defaultValue={no_telp}
            />
          </div>
        </form>
        {this.onEditMessage()}
        <div className="bortopbot">
          <div className="row py-3">
            <Link
              to="/setting/addresses"
              className="btnsavedit btn btn-outline-secondary"
            >
              CANCEL
            </Link>
            <button
              onClick={() => {
                this.onEditBtnClick(address_id);
              }}
              className="btnsavedit btn btn-outline-secondary"
            >
              SAVE
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { message: state.address.message, addresses: state.address.addresses };
};

export default connect(
  mapStateToProps,
  { onEditAddress, onGetAddress }
)(AddSet);
