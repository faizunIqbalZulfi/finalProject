import React from "react";
import { Link, Redirect } from "react-router-dom";
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
import Cookies from "universal-cookie";
import { connect } from "react-redux";

import {
  onGetAddress,
  onEditAddress,
  onAddAddress
} from "../store/actions/address";
import { getAllWishcart } from "../store/actions/product";
import axios from "../config/axios";

const cookies = new Cookies();

class Checkout extends React.Component {
  state = {
    modalAdd: false,
    modalChange: false,
    edit: null,
    address: [],
    shippers: [],
    payments: [],
    shipper: [],
    showExpedisi: [],
    expedisi: "",
    paymentmethod_id: null
  };
  async componentDidMount() {
    await this.props.onGetAddress(cookies.get("user_id"));
    const resShipment = await axios.get(`/shipers`);
    const resPayment = await axios.get(`/payments`);
    this.setState({
      payments: resPayment.data,
      shippers: resShipment.data,
      showExpedisi: resShipment.data.filter(obj => {
        if (!this.state.showExpedisi.includes(obj.company_name)) {
          return this.state.showExpedisi.push(obj.company_name);
        }
      }),
      address: this.props.address.filter(obj => {
        return obj.status;
      })
    });
  }
  toggleAdd = edit => {
    this.setState({ modalAdd: !this.state.modalAdd, edit });
  };
  toggleChange = i => {
    if (i * 2 || i === 0) {
      console.log(i);
      this.setState({
        modalChange: !this.state.modalChange,
        address: [this.props.address[i]]
      });
    }
    this.setState({
      modalChange: !this.state.modalChange
    });
  };
  selectedShipper = shipper_id => {
    this.setState({
      shipper: this.state.shippers.filter(obj => {
        return obj.shipper_id === shipper_id;
      })
    });
  };
  onEditBtnClick = async address_id => {
    const address_name = this.address_name.value;
    const address1 = this.address1.value;
    const no_telp = this.no_telp.value;
    const pos_code = this.pos_code.value;
    const city = this.city.value;
    const name = this.name.value;
    const province = this.province.value;

    await this.props.onEditAddress(address_id, {
      address1,
      address_name,
      no_telp,
      pos_code,
      city,
      name,
      province
    });
    await this.toggleAdd();
    await this.props.onGetAddress(cookies.get("user_id"));
    this.setState({
      address: this.props.address.filter(obj => {
        return obj.address_id === address_id;
      })
    });
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
    await this.toggleAdd();
    await this.props.onGetAddress(user_id);
    this.setState({
      address: this.props.address.filter((obj, i) => {
        return this.props.address.length - 1 === i;
      })
    });
  };
  onPayBtnClick = async () => {
    if (this.state.paymentmethod_id && this.state.shipper.length) {
      let price = 0;
      this.props.cart.forEach(obj => {
        price += obj.price * obj.qty;
      });
      const user_id = this.props.user_id;
      const address_id = this.state.address[0].address_id;
      const paymentmethod_id = this.state.paymentmethod_id;
      const shipper_id = this.state.shipper[0].shipper_id;
      const wishcart = this.props.cart;
      const pricetotal = price;
      const res = await axios.post(`/addorders`, {
        user_id,
        address_id,
        paymentmethod_id,
        shipper_id,
        wishcart,
        pricetotal
      });

      // console.log({
      //   user_id,
      //   address_id,
      //   paymentmethod_id,
      //   shipper_id,
      //   wishcart,
      //   pricetotal
      // });
      await this.props.getAllWishcart(this.props.user_id);
    } else {
      console.log("please choose payment method");
    }
  };
  renderProduct = () => {
    if (this.props.cart.length) {
      return this.props.cart.map(obj => {
        return (
          <div className="productCheckout d-flex">
            <div className="col-4 p-0">
              <img src={`http://localhost:2404/show/image/${obj.name_image}`} />
            </div>
            <div className="product col-8 m-0 p-0">
              <p>{obj.product_name}</p>
              <p>{`${obj.category1}'s ${obj.category2}`}</p>
              <p>{`SIZE: EU ${obj.size}`}</p>
              <p>{`QTY: ${obj.qty}`}</p>
              <p className="mt-2 text-warning">{`Rp.${(
                obj.price * obj.qty
              ).toLocaleString("IN")}`}</p>
            </div>
          </div>
        );
      });
    }
    return <p>There are no items in your cart.</p>;
  };
  renderPayment = () => {
    if (this.state.payments.length) {
      return this.state.payments.map(obj => {
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
    }
  };
  renderAddress = () => {
    if (this.props.address.length) {
      return this.props.address.map((obj, i) => {
        return (
          <button
            onClick={() => {
              this.toggleChange(i);
            }}
            className="btnaddress"
          >
            <div class="address">
              <div class="card-body p-0">
                <h5 class="card-title">{obj.address_name}</h5>
                <p class="card-text">{obj.address1}</p>
                <p class="card-text">
                  {obj.city} <span>{obj.pos_code}</span>
                </p>
                <p className="card-text">{obj.no_telp}</p>
              </div>
            </div>
          </button>
        );
      });
    }
  };
  renderExpedisi = () => {
    if (this.state.showExpedisi.length) {
      return this.state.showExpedisi.map(obj => {
        return (
          <div className="radio mt-4 radioAddress">
            <label>
              <input
                onClick={() => {
                  this.setState({ expedisi: obj.company_name });
                }}
                type="radio"
                name="bank"
                className="inlinebutton"
              />
              <div className="ml-4 optionBank">
                <div className="cartBody text-uppercase">
                  {obj.company_name}
                </div>
                <form>
                  {this.state.expedisi === obj.company_name
                    ? this.state.shippers.map(obj => {
                        if (this.state.expedisi === obj.company_name) {
                          return (
                            <div className="radio mt-4 radioAddress">
                              <label>
                                <input
                                  onClick={() => {
                                    this.selectedShipper(obj.shipper_id);
                                  }}
                                  type="radio"
                                  name="bank"
                                  className="inlinebutton"
                                />
                                <div className="ml-4 optionBank">
                                  <div className="cartBody text-uppercase">
                                    {obj.category}
                                  </div>
                                  <div className="cartBody mt-1">
                                    {obj.estimasi}
                                  </div>
                                  <div className="cartBody mt-1 d-inline">
                                    Rp{obj.price.toLocaleString("IN")}
                                  </div>
                                </div>
                              </label>
                            </div>
                          );
                        }
                      })
                    : null}
                </form>
              </div>
            </label>
          </div>
        );
      });
    }
  };

  render() {
    console.log(this.state);
    if (this.props.cart.length) {
      var sumPrice = 0;
      var sumQty = 0;
      this.props.cart.forEach(product => {
        const { qty, price } = product;
        sumQty += qty;
        sumPrice += price * qty;
      });
    }
    if (this.state.address.length) {
      var {
        address_name,
        address1,
        city,
        pos_code,
        no_telp,
        name,
        province,
        address_id
      } = this.state.address[0];
    }

    if (parseInt(cookies.get("cart"))) {
      return (
        <div className="checkout">
          <div class="row">
            <div class="col-8 p-0">
              <div className="address">
                <h3 className="titleCheck">address</h3>
                {this.state.address.length ? (
                  <div>
                    <div className="bodyCheck p-0">
                      <h5 className="itemCheck">{address_name}</h5>
                      <p className="itemCheck">{address1}</p>
                      <p className="itemCheck">
                        {city} <span>{pos_code}</span>
                      </p>
                      <p className="itemCheck">{no_telp}</p>
                      <div className="d-flex justify-content-between">
                        <button
                          onClick={() => {
                            this.toggleAdd(true);
                          }}
                          className="btnCheck"
                        >
                          edit address
                        </button>
                        <div>
                          <button
                            onClick={() => {
                              this.toggleChange();
                            }}
                            className="btnCheck"
                          >
                            ganti alamat
                          </button>
                          <button
                            onClick={() => {
                              this.toggleAdd(false);
                            }}
                            className="btnCheck ml-4"
                          >
                            alamat baru
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="itemCheck my-4">empty</p>
                    <button
                      onClick={() => {
                        this.toggleAdd(false);
                      }}
                      className="btnCheck"
                    >
                      alamat baru
                    </button>
                  </div>
                )}
              </div>
              <br />
              <div>
                <h3 className="titleCheck">payment</h3>
                <form className="row">{this.renderPayment()}</form>
              </div>
              <br />
              <div>
                <h3 className="titleCheck">shipment</h3>
                <form>{this.renderExpedisi()}</form>
              </div>
              <div className="text-right">
                <button
                  onClick={this.onPayBtnClick}
                  className="btnCheck text-uppercase"
                >
                  proceed order
                </button>
              </div>
            </div>
            <div class="col-4">
              <div className="cartCheckout mb-3">
                <div className="header">your cart ({sumQty ? sumQty : 0})</div>
                <div className="body py-0">{this.renderProduct()}</div>
              </div>
              <div class="orderSummaryCheckout">
                <div className="header">order summary</div>
                <div className="body">
                  <div className="d-flex justify-content-between px-0">
                    <p class="mb-0 d-inline">subtotal</p>
                    <p>{`Rp.${(sumPrice ? sumPrice : 0).toLocaleString(
                      "IN"
                    )}`}</p>
                  </div>
                  <div className="d-flex justify-content-between px-0 pt-0">
                    <p class="mb-0 d-inline">estimated shipping</p>
                    <p>{`Rp.${(this.state.shipper.length
                      ? this.state.shipper[0].price.toLocaleString("IN")
                      : 0
                    ).toLocaleString("IN")}`}</p>
                  </div>
                  <div className="total d-flex justify-content-between px-0">
                    <p class="mb-0 d-inline">total</p>
                    <p className="text-warning">{`Rp.${(sumPrice &&
                    this.state.shipper.length
                      ? sumPrice + this.state.shipper[0].price
                      : 0
                    ).toLocaleString("IN")}`}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Modal
            isOpen={this.state.modalAdd}
            fade={false}
            toggle={this.toggleAdd}
            size="lg"
          >
            <ModalHeader className="border-0" toggle={this.toggleAdd} />
            <h5 className="mt-1 text-center">
              {this.state.edit ? "Edit Address" : "Add Address"}
            </h5>

            <ModalBody>
              <div className="form-group">
                <p className="loginRegister mb-0">Address Name</p>
                <input
                  ref={input => {
                    this.address_name = input;
                  }}
                  type="text"
                  className="form-control"
                  defaultValue={this.state.edit ? address_name : null}
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
                  defaultValue={this.state.edit ? name : null}
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
                  defaultValue={this.state.edit ? city : null}
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
                  defaultValue={this.state.edit ? province : null}
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
                  defaultValue={this.state.edit ? address1 : null}
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
                  defaultValue={this.state.edit ? pos_code : null}
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
                  defaultValue={this.state.edit ? no_telp : null}
                />
              </div>
            </ModalBody>

            <ModalFooter className="border-0">
              <button
                className="btnsavedit btn btn-outline-secondary"
                onClick={() => {
                  this.state.edit
                    ? this.onEditBtnClick(address_id)
                    : this.onAddBtnClick(cookies.get("user_id"));
                }}
              >
                Save
              </button>
              <button
                className="btnsavedit btn btn-outline-secondary"
                onClick={this.toggleAdd}
              >
                Cancel
              </button>
            </ModalFooter>
          </Modal>
          <Modal
            isOpen={this.state.modalChange}
            fade={false}
            toggle={this.toggleChange}
            size="lg"
          >
            <ModalHeader className="border-0" toggle={this.toggleChange} />
            <h5 className="mt-1 text-center">choose address</h5>
            <ModalBody>
              <div className="form-group">{this.renderAddress()}</div>
            </ModalBody>
          </Modal>
        </div>
      );
    }
    return <Redirect to="/setting/orders/0" />;
  }
}
const mapStateToProps = state => {
  return {
    user_id: state.user.user_id,
    cart: state.product.cart,
    address: state.address.addresses
  };
};
export default connect(
  mapStateToProps,
  { onGetAddress, onEditAddress, onAddAddress, getAllWishcart }
)(Checkout);
