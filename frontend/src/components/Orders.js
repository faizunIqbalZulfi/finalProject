import React from "react";
import axios from "../config/axios";
import DetailsOrders from "./DetailsOrders";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

class Orders extends React.Component {
  state = {
    orders: [],
    dropdown: false,
    selected: null,
    status: "",
    statusFilter: ""
  };
  componentDidMount() {
    this.getOrderadmin();
  }
  toggleDropdown = () => {
    this.setState(prevState => ({
      dropdown: !prevState.dropdown
    }));
  };
  getOrderadmin = async () => {
    const res = await axios.get("/get/order");
    this.setState({ orders: res.data });
  };
  selectStatus = e => {
    this.setState({
      status: e.target.innerHTML
    });
  };
  statusProcess = i => {
    this.setState({
      selected: i
    });
  };
  cancelBtn = () => {
    this.setState({
      selected: null
    });
  }
  saveProcess = async order_id => {
    const res = await axios.patch(`/update/status/order/${order_id}`, {
      status: this.state.status
    });
    await this.getOrderadmin();
    this.setState({
      selected: null,
      status: ""
    });
    console.log(res);
  };
  btnFilter = async () => {
    await this.getOrderadmin()
    if (this.state.statusFilter) {
      this.setState({
        orders: this.state.orders.filter(obj => {
          return obj.status.toLowerCase() === this.state.statusFilter.toLowerCase()
        })
      })
    }
  }
  renderOrderAdmin = () => {
    return this.state.orders.map((obj, i) => {
      return (
        <tr>
          {/* <td className="align-middle">{i + 1}</td> */}
          <td className="align-middle" scope="col">
            {obj.order_id}
          </td>
          <td className="align-middle" scope="col">
            {obj.username}
          </td>
          <td className="align-middle" scope="col">
            {obj.address}
          </td>
          <td className="align-middle" scope="col">
            Rp{(obj.pricetotal + obj.price).toLocaleString("IN")}
          </td>
          <td className="align-middle" scope="col">
            {obj.bank_name.toUpperCase()}
          </td>
          <td className="align-middle" scope="col">{`${obj.company_name} ${
            obj.category
            }`}</td>
          <td className="align-middle" scope="col">
            {obj.created_at.substring(0, 10)}
          </td>
          <td className="align-middle" scope="col">
            {obj.updated_at.substring(0, 10)}
          </td>
          {/* {obj.status} */}
          {this.state.selected !== i ? (
            <td className="align-middle" scope="col">
              {obj.status}
            </td>
          ) : (
              <td className="align-middle" scope="col">
                <Dropdown
                  isOpen={this.state.dropdown}
                  toggle={() => {
                    this.toggleDropdown();
                  }}
                >
                  <DropdownToggle
                    className="dropdownstatusorder form-control d-flex justify-content-between"
                    color="white"
                  >
                    {this.state.status ? this.state.status : obj.status}
                    <i class="fas fa-caret-down" />
                  </DropdownToggle>
                  <DropdownMenu className="dropmenustatusorder">
                    <DropdownItem
                      // value={obj.paymentmethod_id}
                      onClick={this.selectStatus}
                      className="dropitemstatusorder"
                    >
                      waiting payment
                  </DropdownItem>
                    <DropdownItem
                      // value={obj.paymentmethod_id}
                      onClick={this.selectStatus}
                      className="dropitemstatusorder"
                    >
                      paid
                  </DropdownItem>
                    <DropdownItem
                      // value={obj.paymentmethod_id}
                      onClick={this.selectStatus}
                      className="dropitemstatusorder"
                    >
                      delivered
                  </DropdownItem>
                    <DropdownItem
                      // value={obj.paymentmethod_id}
                      onClick={this.selectStatus}
                      className="dropitemstatusorder"
                    >
                      rejected
                  </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </td>
            )}
          <td className="align-middle" scope="col">
            <a
              href={`http://localhost:2404/show/paymentconfirm/${
                obj.paymentconfirm
                }`}
              target="_blank"
            >
              <img
                className="imgordersadmin"
                src={
                  obj.paymentconfirm
                    ? `http://localhost:2404/show/paymentconfirm/${
                    obj.paymentconfirm
                    }`
                    : null
                }
              />
            </a>
          </td>
          {this.state.selected !== i ? (
            <td className="align-middle" scope="col">
              <button
                onClick={() => {
                  this.statusProcess(i);
                }}
                className="btnorders btn btn-outline-primary btn-block"
              >
                process
              </button>
              <DetailsOrders
                order_id={obj.order_id}
                style="btnorders btn btn-outline-success btn-block mt-1"
                value="detail"
              />
            </td>
          ) : (this.state.status) ? (
            <td className="align-middle" scope="col">
              <button
                onClick={() => {
                  this.saveProcess(obj.order_id);
                }}
                className="btnorders btn btn-outline-primary btn-block mt-1"
              >
                save
              </button>
              <button
                onClick={() => {
                  this.cancelBtn();
                }}
                className="btnorders btn btn-outline-warning btn-block mt-1"
              >
                cancel
          </button>
            </td>

          ) :
              (
                <td className="align-middle" scope="col">
                  <button
                    onClick={() => {
                      this.cancelBtn();
                    }}
                    className="btnorders btn btn-outline-warning btn-block mt-1"
                  >
                    cancel
          </button>
                </td>
              )}
        </tr>
      );
    });
  };

  render() {
    return (
      <div>
        <div className="d-flex">
          <h4 className="mb-4">Orders</h4>
          <form className="d-flex">
            <div className="radio radioAddress mx-3">
              <label>
                <input
                  onClick={() => { this.setState({ statusFilter: "" }) }}
                  type="radio"
                  name="bank"
                  className="inlinebutton"
                />
                <div className="ml-4 optionBank">
                  <div className="valueordersradio">all</div>
                </div>
              </label>
            </div>
            <div className="radio radioAddress mx-3">
              <label>
                <input
                  onClick={() => { this.setState({ statusFilter: "waiting payment" }) }}
                  type="radio"
                  name="bank"
                  className="inlinebutton"
                />
                <div className="ml-4 optionBank">
                  <div className="valueordersradio">waiting payment</div>
                </div>
              </label>
            </div>
            <div className="radio radioAddress mx-3">
              <label>
                <input
                  onClick={() => { this.setState({ statusFilter: "rejected" }) }}
                  type="radio"
                  name="bank"
                  className="inlinebutton"
                />
                <div className="ml-4 optionBank">
                  <div className="valueordersradio">rejected</div>
                </div>
              </label>
            </div>
            <div className="radio radioAddress mx-3">
              <label>
                <input
                  onClick={() => { this.setState({ statusFilter: "paid" }) }}
                  type="radio"
                  name="bank"
                  className="inlinebutton"
                />
                <div className="ml-4 optionBank">
                  <div className="valueordersradio">paid</div>
                </div>
              </label>
            </div>
            <div className="radio radioAddress mx-3">
              <label>
                <input
                  onClick={() => { this.setState({ statusFilter: "delivered" }) }}
                  type="radio"
                  name="bank"
                  className="inlinebutton"
                />
                <div className="ml-4 optionBank">
                  <div className="valueordersradio">delivered</div>
                </div>
              </label>
            </div>
          </form>
          <div className="ml-auto">
            <button onClick={this.btnFilter} className="btnfilterorders">filter</button>
          </div>
        </div>
        <table class="table table-striped">
          <thead className="theadorders text-center">
            <tr>
              {/* <th className="px-0">No</th> */}
              <th className="px-0" scope="col">
                Id
              </th>
              <th className="px-0" scope="col">
                Username
              </th>
              <th className="px-0" scope="col">
                Address
              </th>
              <th className="px-0" scope="col">
                Price
              </th>
              <th className="px-0" scope="col">
                Payment Method
              </th>
              <th className="px-0" scope="col">
                Courier
              </th>
              <th className="px-0" scope="col">
                Purchase Date
              </th>
              <th className="px-0" scope="col">
                Confirm Date
              </th>
              <th className="px-0" scope="col">
                Status
              </th>
              <th className="px-0" scope="col">
                confirm payment
              </th>
              <th className="px-0" scope="col">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="tbodyorders text-center">
            {this.renderOrderAdmin()}
          </tbody>
        </table>
      </div>
    );
  }
}
export default Orders;
