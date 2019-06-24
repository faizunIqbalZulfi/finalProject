import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody
} from "reactstrap";

import axios from "../config/axios";

class Shippers extends React.Component {
  state = {
    shippers: [],
    shipper: [],
    shipper_id: null
  };
  componentDidMount() {
    this.getShippers();
  }
  toggle = (i) => {
    if (i) {
      this.setState({
        modal: !this.state.modal,
        shipper: this.state.shippers.filter(obj => {
          return obj.shipper_id === this.state.shipper_id
        })
      })
    }
    var ele = document.getElementsByTagName("input");
    for (var i = 0; i < ele.length; i++) ele[i].checked = false;
    this.setState({
      modal: !this.state.modal,
      shipper_id: null
    })
  }
  getShippers = async () => {
    const res = await axios.get("/shipers");
    this.setState({
      shippers: res.data
    });
    console.log(res);
  };
  addShippers = async () => {
    const company_name = this.company_name.value;
    const category = this.category.value;
    const estimasi = this.estimasi.value;
    const price = this.price.value;
    const phone = this.phone.value

    if (company_name && category && estimasi && price && phone) {
      await axios.post(`/add/shippers`, {
        company_name, category, estimasi, price, phone
      })
      var ele = document.getElementsByTagName("input");
      for (var i = 0; i < ele.length; i++) ele[i].value = "";
      this.getShippers()
    }
  }
  deleteShipper = async () => {
    await axios.delete(`/delete/shippers/${this.state.shipper_id}`)
    var ele = document.getElementsByTagName("input");
    for (var i = 0; i < ele.length; i++) ele[i].checked = false;
    this.setState({ shipper_id: null })
    this.getShippers()
  }
  editShippers = async () => {
    const company_name = this.company_nameEdit.value;
    const category = this.categoryEdit.value;
    const estimasi = this.estimasiEdit.value;
    const price = this.priceEdit.value;
    const phone = this.phoneEdit.value

    await axios.patch(`/edit/shippers/${this.state.shipper_id}`, {
      company_name, category, estimasi, price, phone
    })
    await this.getShippers()
    this.toggle()
  }
  renderShippers = () => {
    return this.state.shippers.map(obj => {
      return (
        <div className="radio mt-4 radioAddress col-3">
          <label>
            <input
              onClick={() => {
                this.setState({ shipper_id: obj.shipper_id })
              }}
              type="radio"
              name="bank"
              className="inlinebutton"
            />
            <div className="ml-4 optionBank">
              <div className="cartBody text-uppercase">{obj.company_name}</div>
              <div className="cartBody mt-1">{obj.category}</div>
              <div className="cartBody mt-1">{obj.estimasi}</div>
              <div className="cartBody mt-1 d-inline">
                Rp{obj.price.toLocaleString("IN")}
              </div>
            </div>
          </label>
        </div>
      );
    });
  };
  render() {
    return (
      <div className="mb-5">
        <h4 className="mb-4">Shippers</h4>
        <div>
          <h3 className="titleCheck">manage shipment</h3>
          <form className="row">{this.renderShippers()}</form>
          <div className="text-right">
            <button
              disabled={!this.state.shipper_id}
              onClick={() => { this.toggle(this.state.shipper_id) }}
              className="btnCheck text-uppercase mr-2"
            >
              edit
            </button>
            <button
              disabled={!this.state.shipper_id}
              onClick={this.deleteShipper}
              className="btnCheck text-uppercase"
            >
              remove
            </button>
          </div>
        </div>
        <div>
          <h3 className="titleCheck">add shipment method</h3>
          <form className="formpayment">
            courier name
            <input
              className="addpaymnet form-control"
              type="text"
              ref={input => (this.company_name = input)}
            />
            category
            <input
              className="addpaymnet form-control"
              type="text"
              ref={input => (this.category = input)}
            />
            estimasi
            <input
              className="addpaymnet form-control"
              type="text"
              ref={input => (this.estimasi = input)}
            />
            price
            <input
              className="addpaymnet form-control"
              type="number"
              ref={input => (this.price = input)}
            />
            phone
            <input
              className="addpaymnet form-control"
              type="number"
              ref={input => (this.phone = input)}
            />
          </form>
          <div className="text-right">
            <button
              onClick={this.addShippers}
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
                courier name
                <input
                  className="addpaymnet form-control"
                  type="text"
                  defaultValue={this.state.shipper.length ? this.state.shipper[0].company_name : null}
                  ref={input => (this.company_nameEdit = input)}
                />
                category
                <input
                  className="addpaymnet form-control"
                  type="text"
                  defaultValue={this.state.shipper.length ? this.state.shipper[0].category : null}
                  ref={input => (this.categoryEdit = input)}
                />
                estimasi
                <input
                  className="addpaymnet form-control"
                  type="text"
                  defaultValue={this.state.shipper.length ? this.state.shipper[0].estimasi : null}
                  ref={input => (this.estimasiEdit = input)}
                />
                price
                <input
                  className="addpaymnet form-control"
                  type="number"
                  defaultValue={this.state.shipper.length ? this.state.shipper[0].price : null}
                  ref={input => (this.priceEdit = input)}
                />
                phone
                <input
                  className="addpaymnet form-control"
                  type="number"
                  defaultValue={this.state.shipper.length ? this.state.shipper[0].phone : null}
                  ref={input => (this.phoneEdit = input)}
                />
              </form>
              <div className="text-right">
                <button
                  onClick={this.editShippers}
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
export default Shippers;
