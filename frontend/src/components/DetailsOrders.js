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

import { getAllWishcart } from "../store/actions/product";

const cookies = new Cookies();

class DetailsOrders extends React.Component {
  state = {
    modal: false,
    orderDetails: []
  };

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };

  getOrderDetail = async order_id => {
    const res = await axios.get(`/get/orderdetails/${order_id}`);
    await this.setState({ orderDetails: res.data });
    this.toggle();
  };

  renderOrderDetails = () => {
    if (this.state.orderDetails.length) {
      return this.state.orderDetails.map(obj => {
        return (
          <div className="divdetailsorder row">
            <div className="col-3 p-0">
              <img
                className="imgdetailsorder"
                src={`http://localhost:2404/show/image/${obj.name_image}`}
              />
            </div>
            <div className="col-6 p-0 align-middle">
              <h3 className="h3detailsorder">{obj.product_name}</h3>
              <p className="pdetailsorder">{`${obj.category1}'s ${
                obj.category2
              }`}</p>

              <p className="pdetailsorder">{`size: EU ${obj.size}`}</p>
              <p className="pdetailsorder">{`qty: ${obj.qty}`}</p>
            </div>
            <div className="col-3 p-0 text-warning m-0">
              <h3 className="h3detailsorder">{`Rp.${obj.price.toLocaleString(
                "IN"
              )}`}</h3>
            </div>
          </div>
        );
      });
    }
  };

  render() {
    return (
      <div
        className="d-inline"
        // className="detailsOrder mr-2"
      >
        <button
          onClick={() => {
            this.getOrderDetail(this.props.order_id);
          }}
          className={this.props.style}
        >
          {this.props.value}
        </button>
        {/* <button
          onClick={() => {
            this.getOrderDetail(this.props.order_id);
          }}
          className="btnorders btn btn-outline-success btn-block mt-1"
        >
          details
        </button> */}
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className="modal-m"
        >
          <ModalHeader className="headerdetailsorder" toggle={this.toggle}>
            Detail Orders
          </ModalHeader>
          <ModalBody className="bodydetailsorder py-0">
            {this.renderOrderDetails()}
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default connect(
  null,
  { getAllWishcart }
)(DetailsOrders);
