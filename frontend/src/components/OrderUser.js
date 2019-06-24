import React from "react";
import axios from "../config/axios";
import Cookies from "universal-cookie";
import ModalEditPayment from "./ModalEditPayment";
import ModalUploadProof from "./ModalUploadProof";
import DetailsOrders from "./DetailsOrders";

const cookies = new Cookies();

class Orders extends React.Component {
  state = {
    order: [],
    imageConfirm: [],
    payments: [],
    flag: false,
    modal: false,
    dropdown: false,
    dropdownName: ""
  };
  async componentDidMount() {
    await this.getOrderUser(cookies.get("user_id"));
    await this.getPayment();
  }
  getPayment = async () => {
    const res = await axios.get(`/payments`);
    this.setState({
      payments: res.data
    });
  };
  getOrderUser = async user_id => {
    const res = await axios.get(`/get/order/${user_id}`);
    this.setState({ order: res.data });
    console.log(res, cookies.get("user_id"));
  };
  chooseImage = async e => {
    await this.setState({ imageConfirm: e.target.files });
    if (this.state.imageConfirm.length) {
      this.setState({ flag: !this.state.flag });
    }
  };
  // invoiceClick = async order_id => {
  //   const res = await axios.get(`/get/orderdetails/invoice/${order_id}`);
  //   console.log(res);
  // };
  cancelTransaction = async order_id => {
    const res = await axios.delete(`/delete/orderuser/${order_id}`);
    console.log(res);

    this.getOrderUser(cookies.get("user_id"));
  };
  renderOrderUser = () => {
    if (this.state.order.length) {
      return this.state.order.map(obj => {
        if (obj.status !== "delivered") {
          return (
            <div class="orderuserpayment mb-2">
              <div className="d-flex justify-content-between">
                <div className="col-9 p-0 m-0">
                  <p className="text-success">{obj.status}</p>
                  <p className="totalorderuser mb-5">
                    TOTAL Rp.{obj.pricetotal.toLocaleString("IN")}
                    {/* <span> Purchase Date18 Jun 2019</span> */}
                  </p>
                  <p className="pmorderuser">
                    Payment Method : Transfer Manual
                  </p>
                  <p className="bankorderuser">Bank : {obj.bank_name}</p>
                  <p className="accountorderuser">
                    Account : {obj.no_rek} a.n. {obj.an_bank}
                  </p>
                  <ModalEditPayment
                    payments={this.state.payments}
                    bank_name={obj.bank_name}
                    order_id={obj.order_id}
                    getOrderUser={this.getOrderUser}
                  />
                  <DetailsOrders
                    order_id={obj.order_id}
                    style="btnorderchange"
                    value="Detail Orders"
                  />
                </div>
                <div className="col-3 text-center">
                  <button
                    onClick={() => {
                      this.cancelTransaction(obj.order_id);
                    }}
                    className="btnorderusercancel"
                  >
                    Cancel Transaction
                  </button>
                  {obj.paymentconfirm ? (
                    <img
                      className="imgorderuser"
                      src={`http://localhost:2404/show/paymentconfirm/${
                        obj.paymentconfirm
                        }`}
                    />
                  ) : (
                      <i className=" d-block fas fa-upload fa-5x my-2 text-secondary" />
                    )}
                  <ModalUploadProof
                    order_id={obj.order_id}
                    getOrderUser={this.getOrderUser}
                  />
                </div>
              </div>
            </div>
          );
        }
      });
    }
  };
  renderTransactionList = () => {
    if (this.state.order.length) {
      return this.state.order.map(obj => {
        console.log(obj.invoice);

        if (obj.status === "delivered") {
          return (
            <div class="orderuserpayment mb-2">
              <div className="d-flex justify-content-between">
                <div className="col-9 p-0 m-0">
                  <p className="text-success">{obj.status}</p>
                  <p className="totalorderuser mb-5">
                    TOTAL Rp.{obj.pricetotal.toLocaleString("IN")}
                  </p>
                  <p className="pmorderuser">
                    Payment Method : Transfer Manual
                  </p>
                  <p className="bankorderuser">Bank : {obj.bank_name}</p>
                  <p className="accountorderuser">
                    Account : {obj.no_rek} a.n. {obj.an_bank}
                  </p>
                  <a
                    href={`http://localhost:2404/show/invoice/${obj.invoice}`}
                    target="_blank"
                    // onClick={() => {
                    //   this.invoiceClick(obj.order_id);
                    // }}
                    className="btnorderuserinv"
                  >
                    <i class="fas fa-file-invoice mr-2" />
                    Invoice
                  </a>
                </div>
              </div>
            </div>
          );
        }
      });
    }
  };

  render() {
    console.log(this.state.order);
    return (
      <div>
        <h4 className="mb-4">Orders</h4>
        <div className="orderuser mb-3">
          <h5>Awaiting Payment</h5>
          {this.renderOrderUser()}
        </div>
        <div className="orderuser mb-3">
          <h5>Transaction List</h5>
          {this.renderTransactionList()}
        </div>
      </div>
    );
  }
}

export default Orders;
