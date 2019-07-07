import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Cookies from "universal-cookie";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import { deleteSuccess, addAddressSucces } from "../config/message";
import {
  onDeleteAddress,
  onGetAddress,
  onAddAddress
} from "../store/actions/address";
import axios from "../config/axios";

const cookies = new Cookies();

class Addresses extends React.Component {
  state = {
    modal: false
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };
  componentDidMount() {
    this.props.onGetAddress(cookies.get("user_id"));
  }

  onDeleteBtnClick = async (address_id, user_id) => {
    await this.props.onDeleteAddress(address_id, user_id);
    this.props.onGetAddress(user_id);
    console.log(this.props.addresses);
  };

  onAddBtnClick = async user_id => {
    const address_name = this.address_name.value;
    const address1 = this.address1.value;
    const no_telp = this.no_telp.value;
    const pos_code = this.pos_code.value;
    const city = this.city.value;
    const name = this.name.value;
    const province = this.province.value;

    await this.props.onAddAddress({
      user_id,
      address1,
      address_name,
      no_telp,
      pos_code,
      city,
      name,
      province
    });
    this.toggle();
    this.props.onGetAddress(user_id);
  };

  onSelectDefault = async (address_id, user_id) => {
    await axios.patch(`/setdefault/address/${address_id}/${user_id}`);
    this.props.onGetAddress(user_id);
  };

  onMessage = () => {
    console.log(this.props.addresses);
    if (this.props.message !== "") {
      return (
        <div
          className={
            this.props.message === deleteSuccess ||
              this.props.message === addAddressSucces
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

  renderAddress = () => {
    if (this.props.addresses.length) {
      return (
        this.props.addresses.map((address, index) => {
          return (
            <div key={index} class="address">
              <div class="card-body p-0">
                <div className="divaddress d-flex justify-content-between">
                  <h5 className="h5address">
                    {address.address_name} {address.status ? `(${address.status})` : null}
                  </h5>
                  {!address.status ?
                    <button
                      onClick={() => {
                        this.onSelectDefault(
                          address.address_id,
                          address.user_id
                        );
                      }}
                      className="btnaddress">set default
                    </button> :
                    null
                  }
                </div>
                <p className="paddress">{address.address1}</p>
                <p className="paddress">
                  {address.city} <span>{address.pos_code}</span>
                </p>
                <p className="paddress">{address.no_telp}</p>
                <Link
                  to={`/setting/editaddress/${index}`}
                >
                  <button className="btnlinkaddress">Edit</button>
                </Link>
                <button
                  onClick={() => {
                    this.onDeleteBtnClick(
                      address.address_id,
                      address.user_id
                    );
                  }}
                  className="btnlinkaddress"
                >
                  Delete
                  </button>
              </div>
            </div>
          );
        })
      )
    }
  }

  render() {
    console.log(this.props.addresses);
    return (
      <div className="AccountAddress">
        {this.onMessage()}
        <h4 className="mb-4">Address</h4>
        <div className="form-group">
          <p className="loginRegister mb-0">Add Address</p>
          <button
            onClick={() => {
              this.toggle();
            }}
            className="btnaddaddress"
            ata-toggle="modal"
            data-target="#exampleModal"
          >
            Add
          </button>
        </div>
        {this.renderAddress()}
        {/* {this.props.addresses.length !== 0
          ? this.props.addresses.map((address, index) => {
            return (
              <div key={index} class="address">
                <div class="card-body p-0">
                  <h5 class="card-title">
                    {address.status ? (
                      `${address.address_name} (${address.status})`
                    ) : (
                        <button
                          onClick={() => {
                            this.onSelectDefault(
                              address.address_id,
                              address.user_id
                            );
                          }}
                          className="btnsetdefault"
                        >{`${address.address_name} set default`}</button>
                      )}
                  </h5>
                  <p class="card-text">{address.address1}</p>
                  <p class="card-text">
                    {address.city} <span>{address.pos_code}</span>
                  </p>
                  <p className="card-text">{address.no_telp}</p>
                  <Link
                    to={`/setting/editaddress/${index}`}
                    class="card-link"
                  >
                    Edit
                    </Link>
                  <button
                    onClick={() => {
                      this.onDeleteBtnClick(
                        address.address_id,
                        address.user_id
                      );
                    }}
                    className="btnlink card-link"
                  >
                    Delete
                    </button>
                </div>
              </div>
            );
          })
          : null} */}
        <Modal
          isOpen={this.state.modal}
          fade={false}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader className="border-0" toggle={this.toggle} />
          <h5 className="mt-1 text-center">Add Address</h5>

          <ModalBody>
            <div className="form-group">
              <p className="loginRegister mb-0">Address Name</p>
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
              <p className="loginRegister mb-0">Name</p>
              <input
                ref={input => {
                  this.name = input;
                }}
                type="texy"
                className="form-control"
              // defaultValue={city}
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
              <p className="loginRegister mb-0">Province</p>
              <input
                ref={input => {
                  this.province = input;
                }}
                type="texy"
                className="form-control"
              // defaultValue={city}
              />
            </div>
            <div className="form-group">
              <p className="loginRegister mb-0">address</p>
              <textarea
                ref={input => {
                  this.address1 = input;
                }}
                rows="3"
                className="form-control"
              // defaultValue={address1}
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
              onClick={this.toggle}
            >
              Cancel
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { message: state.address.message, addresses: state.address.addresses };
};
export default connect(
  mapStateToProps,
  { onDeleteAddress, onGetAddress, onAddAddress }
)(Addresses);
