import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody
} from "reactstrap";

import axios from "../config/axios";

class AddPaymentMethod extends React.Component {
  state = {
    paymentMethods: [],
    paymentmethod: [],
    modal: false,
    paymentmethod_id: null
  };
  componentDidMount() {
    this.getPaymentMethod();
  }
  toggle = (i) => {
    if (i) {
      this.setState({
        modal: !this.state.modal,
        paymentmethod: this.state.paymentMethods.filter(obj => {
          return obj.paymentmethod_id === this.state.paymentmethod_id
        })
      })
    }
    var ele = document.getElementsByTagName("input");
    for (var i = 0; i < ele.length; i++) ele[i].checked = false;
    this.setState({ modal: !this.state.modal, paymentmethod_id: null })
  }
  getPaymentMethod = async () => {
    const res = await axios.get(`/payments`);
    this.setState({
      paymentMethods: res.data
    });
  };
  addPaymentMethod = async () => {
    const bank_name = this.bank_name.value;
    const no_rek = this.no_rek.value;
    const an_bank = this.an_bank.value;

    if (bank_name && no_rek && an_bank) {
      console.log("in");

      const res = await axios.post("/add/paymentmethod", {
        bank_name,
        no_rek,
        an_bank
      });
      this.getPaymentMethod();
      console.log(res);

    }
  };
  removePaymentMethod = async () => {
    await axios.delete(`/delete/paymentmethod/${this.state.paymentmethod_id}`)
    var ele = document.getElementsByTagName("input");
    for (var i = 0; i < ele.length; i++) ele[i].checked = false;
    this.setState({ paymentmethod_id: null })
    this.getPaymentMethod()

  }
  editPaymentMethod = async () => {
    const bank_name = this.bank_nameEdit.value;
    const no_rek = this.no_rekEdit.value;
    const an_bank = this.an_bankEdit.value;

    await axios.patch(`/edit/paymentmethod/${this.state.paymentmethod_id}`, { bank_name, no_rek, an_bank })
    await this.getPaymentMethod()
    this.toggle()

  }
  renderPaymentMethod = () => {
    return this.state.paymentMethods.map(obj => {
      return (
        <div className="radio mt-4 radioAddress col-3">
          <label>
            <input
              onClick={() => {
                this.setState({ paymentmethod_id: obj.paymentmethod_id });
              }}
              type="radio"
              name="bank"
              className="inlinebutton"
            />
            <div className="ml-4 optionBank">
              <div className="cartBody text-uppercase">{obj.bank_name}</div>
              <div className="cartBody mt-1">{obj.no_rek}</div>
              <div className="cartBody mt-1 d-inline">{obj.an_bank}</div>
            </div>
          </label>
        </div>
      );
    });
  };
  render() {
    console.log(this.state.paymentMethods);


    return (
      <div className="mb-5">
        <h4 className="mb-4">Payment Method</h4>
        <div>
          <h3 className="titleCheck">manage payment method</h3>
          <form className="row">{this.renderPaymentMethod()}</form>
          <div className="text-right">
            <button
              disabled={!this.state.paymentmethod_id}
              onClick={this.toggle}
              className="btnCheck text-uppercase mr-2"
            >
              edit
            </button>
            <button
              disabled={!this.state.paymentmethod_id}
              onClick={this.removePaymentMethod}
              className="btnCheck text-uppercase"
            >
              remove
            </button>
          </div>
        </div>
        <div>
          <h3 className="titleCheck">add payment method</h3>
          <form className="formpayment">
            bank name
            <input
              className="addpaymnet form-control"
              type="text"
              ref={input => (this.bank_name = input)}
            />
            no account
            <input
              className="addpaymnet form-control"
              type="number"
              ref={input => (this.no_rek = input)}
            />
            bank owner
            <input
              className="addpaymnet form-control"
              type="text"
              ref={input => (this.an_bank = input)}
            />
          </form>
          <div className="text-right">
            <button

              onClick={this.addPaymentMethod}
              className="btnCheck text-uppercase"
            >
              save
            </button>
          </div>
        </div>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className="modal-m"
        >
          <ModalHeader className="headerdetailsorder" toggle={this.toggle}>
            Edit Payment Method
          </ModalHeader>
          <ModalBody className="bodydetailsorder py-0">
            <div className="my-2">
              <form className="formpayment">
                bank name
                <input
                  className="addpaymnet form-control"
                  type="text"
                  defaultValue={this.state.paymentmethod.length ? this.state.paymentmethod[0].bank_name : null}
                  ref={input => (this.bank_nameEdit = input)}
                />
                no account
                <input
                  className="addpaymnet form-control"
                  type="number"
                  defaultValue={this.state.paymentmethod.length ? this.state.paymentmethod[0].no_rek : null}
                  ref={input => (this.no_rekEdit = input)}
                />
                bank owner
                <input
                  className="addpaymnet form-control"
                  type="text"
                  defaultValue={this.state.paymentmethod.length ? this.state.paymentmethod[0].an_bank : null}
                  ref={input => (this.an_bankEdit = input)}
                />
              </form>
              <div className="text-right">
                <button
                  onClick={this.editPaymentMethod}
                  className="btnCheck text-uppercase mr-2"
                >
                  save
                </button>
                <button
                  onClick={() => { this.toggle() }}
                  className="btnCheck text-uppercase"
                >
                  cancel
                </button>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
export default AddPaymentMethod;
