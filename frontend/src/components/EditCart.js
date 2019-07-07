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

class EditCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      dropdownSize: false,
      dropdownQty: false,
      size: this.props.product.size,
      qty: this.props.product.qty,
      stock: [],
      arrQty: 0
    };

    this.toggle = this.toggle.bind(this);
  }

  async componentDidMount() {
    console.log(this.props.product.product_id);
    await this.getSizeProduct();

    const con = this.state.stock.filter(stock => {
      return this.state.size === stock.size;
    });

    this.setState({ arrQty: con[0].qty });
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal,
      size: this.props.product.size,
      qty: this.props.product.qty
    }));
  }

  toggleSize() {
    this.setState({
      dropdownSize: !this.state.dropdownSize
    });
  }

  toggleQty() {
    this.setState({
      dropdownQty: !this.state.dropdownQty
    });
  }

  selectSize = async e => {
    const con = this.state.stock.filter(stock => {
      return e.target.innerText === stock.size;
    });

    this.setState({ size: e.target.innerText, arrQty: con[0].qty });
  };

  selectQty = e => {
    this.setState({ qty: e.target.innerText });
  };

  getSizeProduct = async () => {
    const res = await axios.get(
      `/get/size/product/${this.props.product.product_id}`
    );
    this.setState({ stock: res.data });
  };

  editCart = async product => {
    const res = await axios.patch(`/edit/cart`, {
      product_id: product.product_id,
      user_id: product.user_id,
      wishcart_id: product.wishcart_id,
      size: this.state.size,
      qty: parseInt(this.state.qty)
    });

    await this.props.getAllWishcart(cookies.get("user_id"));
    await this.props.recommendedCart(cookies.get("user_id"))
    this.toggle();
  };

  renderListSize = () => {
    return this.state.stock.map(stock => {
      if (stock.qty && stock.size)
        return (
          <DropdownItem className="px-2" onClick={this.selectSize}>{stock.size}</DropdownItem>
        );
    });
  };
  renderListQty = () => {
    const arrData = [];
    // const qty = 0
    if (this.state.arrQty < 5) {
      for (let i = 1; i <= this.state.arrQty; i++) {
        arrData.push(<DropdownItem className="px-2" onClick={this.selectQty}>{i}</DropdownItem>);
      }
    } else {
      for (let i = 1; i <= 5; i++) {
        arrData.push(<DropdownItem className="px-2" onClick={this.selectQty}>{i}</DropdownItem>);
      }
    }
    return arrData;
  };

  render() {
    console.log(this.state.stock);
    const {
      wishcart_id,
      user_id,
      product_id,
      size_id,
      qty,
      created_at,
      product_name,
      description,
      price,
      category1,
      category2,
      size,
      name_image
    } = this.props.product;

    return (
      <div className="d-inline mr-2">
        <button
          className="btnCart btn btn-outline-secondary"
          onClick={this.toggle}
        >
          Edit
        </button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className="modalCart"
        >
          <ModalHeader className="modalHeader" toggle={this.toggle} />
          <ModalBody className="modalBody">
            <div className="d-flex justify-content-around">
              <div className="col-7">
                <img src={`http://localhost:2404/show/image/${name_image}`} />
              </div>
              <div className="col-5">
                <h3>{product_name}</h3>
                <p>{`${category1}'s ${category2}`}</p>
                <br />
                <h3 className="priceEditCart">{`Rp.${price.toLocaleString(
                  "IN"
                )}`}</h3>
                <br />
                <div className="d-flex justify-content-between">
                  <div className="dropEditCart col-6">
                    <p className="pEDitCart mb-0">SIZE</p>
                    <Dropdown
                      isOpen={this.state.dropdownSize}
                      toggle={() => {
                        this.toggleSize();
                      }}
                    >
                      <DropdownToggle
                        className={`dropdownCart form-control d-flex justify-content-between`}
                        color="white"
                      >
                        {`EU ${this.state.size}`}
                        <i class="fas fa-caret-down" />
                      </DropdownToggle>
                      <DropdownMenu className="dropCartMenu">
                        <DropdownItem className="dropdownHeader" header>
                          Size
                        </DropdownItem>
                        {this.renderListSize()}
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                  <div className="dropEditCart col-6">
                    <p className="pEDitCart mb-0">QTY</p>
                    <Dropdown
                      isOpen={this.state.dropdownQty}
                      toggle={() => {
                        this.toggleQty();
                      }}
                    >
                      <DropdownToggle
                        className={`dropdownCart form-control d-flex justify-content-between`}
                        color="white"
                      >
                        {this.state.qty}
                        <i class="fas fa-caret-down" />
                      </DropdownToggle>
                      <DropdownMenu className="dropCartMenu">
                        <DropdownItem className="dropdownHeader" header>
                          Qty
                        </DropdownItem>
                        {this.renderListQty()}
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </div>
                <div className="text-center">
                  <button
                    onClick={() => {
                      this.editCart({ product_id, user_id, wishcart_id });
                    }}
                    className="btnEditCart btn btn-outline-secondary btn-block"
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default connect(
  null,
  { getAllWishcart }
)(EditCart);
