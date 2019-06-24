import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import axios from "../config/axios";
import Cookies from "universal-cookie";
import { connect } from "react-redux";

const cookies = new Cookies();

class ModalAddress extends React.Component {
  state = {
    modal: false
  };

  toggleAdd = () => {
    this.setState({ modal: !this.state.modal });
  };

  render() {
    return (
      <div className="d-inline mr-2">
        <button
          onClick={this.toggleAdd}
          className="btn btn-outline-success mx-2"
        >
          alamat baru
        </button>
        <Modal
          isOpen={this.state.modal}
          fade={false}
          toggle={this.toggleAdd}
          className={this.props.className}
        >
          <ModalHeader className="border-0" toggle={this.toggleAdd} />
          <h5 className="mt-1 text-center">Add Address</h5>

          <ModalBody>
            <div className="form-group">
              <p className="loginRegister mb-0">address_name</p>
              <input
                ref={input => {
                  this.address_name = input;
                }}
                type="text"
                className="form-control"
                // defaultValue={address_name}
              />
            </div>
            <div className="form-group">
              <p className="loginRegister mb-0">address</p>
              <input
                ref={input => {
                  this.address1 = input;
                }}
                className="form-control"
                id="exampleFormControlTextarea"
                rows="3"
                // defaultValue={address1}
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
                // defaultValue={city}
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
                // defaultValue={pos_code}
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
                // defaultValue={no_telp}
              />
            </div>
          </ModalBody>

          <ModalFooter className="border-0">
            <button
              className="btnsavedit btn btn-outline-secondary"
              onClick={() => {
                this.onAddBtnClick(cookies.get("user_id"));
              }}
            >
              Save
            </button>{" "}
            <button
              className="btnsavedit btn btn-outline-secondary"
              onClick={this.toggleAdd}
            >
              Cancel
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalAddress;
