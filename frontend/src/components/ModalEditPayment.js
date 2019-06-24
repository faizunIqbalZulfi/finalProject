import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import Cookies from "universal-cookie";
import axios from "../config/axios";

const cookies = new Cookies();

class ModalEditPayment extends React.Component {
  state = {
    modal: false,
    dropdown: false,
    paymentmethod_id: null,
    dropdownName: ""
  };
  toggleModal = bank_name => {
    if (bank_name) {
      this.setState(prevState => ({
        modal: !prevState.modal,
        dropdownName: bank_name
      }));
    } else {
      this.setState(prevState => ({
        modal: !prevState.modal
        // dropdownName: bank_name
      }));
    }
  };
  toggleDropdown = () => {
    this.setState(prevState => ({
      dropdown: !prevState.dropdown
    }));
  };
  editPayment = async (order_id, paymentmethod_id) => {
    await axios.patch(`/update/orderuser/${order_id}`, {
      paymentmethod_id
    });
    await this.props.getOrderUser(cookies.get("user_id"));
    this.toggleModal();
    // console.log(order_id, paymentmethod_id);
  };
  selectBank = e => {
    // console.log(e.target.value);

    this.setState({
      dropdownName: e.target.innerHTML,
      paymentmethod_id: e.target.value
    });
  };
  renderPayment = () => {
    if (this.props.payments.length) {
      return this.props.payments.map(obj => {
        return (
          <div className="radio mt-4 radioAddress col-3 text-left">
            <label>
              <input
                onClick={() => {
                  this.setState({
                    paymentmethod_id: obj.paymentmethod_id
                  });
                }}
                type="radio"
                name="bank"
                className="inlinebutton"
              />
              <div className="ml-4 optionBank">
                <div className="cartBody text-uppercase">{obj.bank_name}</div>
                <div className="cartBody mt-1">no {obj.no_rek}</div>
                <div className="cartBody mt-1 d-inline">an {obj.an_bank}</div>
              </div>
            </label>
          </div>
          // <DropdownItem
          //   value={obj.paymentmethod_id}
          //   onClick={this.selectBank}
          //   className="dropitempaymnet"
          // >
          //   {obj.bank_name.toUpperCase()}
          // </DropdownItem>
        );
      });
    }
  };
  render() {
    return (
      <div className="d-inline mr-3">
        <button
          onClick={() => {
            this.toggleModal(this.props.bank_name);
          }}
          className="btnorderchange p-0"
        >
          <i class="fas fa-edit mr-2" />
          Change Bank Account
        </button>
        <Modal
          isOpen={this.state.modal}
          toggle={() => {
            this.toggleModal();
          }}
          className="modalCart text-center"
        >
          <ModalHeader
            className="modalHeader"
            toggle={() => {
              this.toggleModal();
            }}
          >
            Choose Bank Account
          </ModalHeader>
          <ModalBody className="modalBody">
            <form className="row">{this.renderPayment()}</form>
            {/* <Dropdown
              className="droppayment"
              isOpen={this.state.dropdown}
              toggle={() => {
                this.toggleDropdown();
              }}
            >
              <DropdownToggle
                className={`dropdownCart form-control d-flex justify-content-between`}
                color="white"
              >
                {this.state.dropdownName.toUpperCase()}
                <i class="fas fa-caret-down" />
              </DropdownToggle>
              <DropdownMenu className="dropchangepayment">
                {this.renderPayment()}
              </DropdownMenu>
            </Dropdown> */}
            <button
              onClick={() => {
                this.editPayment(
                  this.props.order_id,
                  this.state.paymentmethod_id
                );
              }}
              className="btnchangepayment btn btn-outline-secondary"
            >
              save
            </button>
            <button className="btnchangepayment btn btn-outline-secondary">
              cancel
            </button>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
export default ModalEditPayment;
