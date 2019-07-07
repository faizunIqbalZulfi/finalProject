import React from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import Cookies from "universal-cookie";

import axios from "../config/axios";
import { getAllWishcart } from "../store/actions/product";
import EditCart from "./EditCart";
import { admin, user } from "../config/message";

const cookies = new Cookies();

class Cart extends React.Component {
  state = {
    recommendedCart: []
  };

  async componentDidMount() {
    await this.props.getAllWishcart(cookies.get("user_id"));
    await this.getRecommendedCart(cookies.get("user_id"))
  }

  addToCart = async wishcart_id => {
    const res = await axios.post(`/add/cart/wishlist/${wishcart_id}`);
    console.log(res);

    await this.props.getAllWishcart(cookies.get("user_id"));
  };

  addToWishlist = async wishcart_id => {
    const res = await axios.post(`/add/wishlist/cart/${wishcart_id}`);
    console.log(res);

    this.props.getAllWishcart(cookies.get("user_id"));
  };

  getRecommendedCart = async (user_id) => {
    if (this.props.cart.length) {
      const res = await axios.get(`/get/recommended/${user_id}`)
      this.setState({ recommendedCart: res.data })
    }
  }

  deleteWishcart = async wishcart_id => {
    console.log(wishcart_id);

    const res = await axios.delete(`/delete/wishlist/${wishcart_id}`);
    this.props.getAllWishcart(cookies.get("user_id"));
  };

  renderWishlist = () => {
    if (this.props.wishlist.length) {
      return this.props.wishlist.map(product => {
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
        } = product;

        return (
          <div className="body py-0">
            <div className="d-flex justify-content-around">
              <div className="col-4 p-0">
                <img src={`http://localhost:2404/show/image/${name_image}`} />
              </div>
              <div className="product col-6 p-0">
                <h3>{product_name}</h3>
                <p>{`${category1}'s ${category2}`}</p>
                <br />
                <h3>{`SIZE: EU ${size}`}</h3>
                <h3>{`QTY: ${qty}`}</h3>
                <div>
                  <button
                    onClick={() => {
                      this.deleteWishcart(wishcart_id);
                    }}
                    className="btnCart btn btn-outline-secondary mr-2"
                  >
                    REMOVE
                  </button>
                  {/* <button className="btnCart btn btn-outline-secondary mr-2">
                    EDIT
                  </button> */}
                  <button
                    onClick={() => {
                      this.addToCart(wishcart_id);
                    }}
                    className="btnCart btn btn-outline-secondary "
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
              <div className="col-2 p-0">
                <h3>{`Rp.${price.toLocaleString("IN")}`}</h3>
              </div>
            </div>
          </div>
        );
      });
    }
  };

  renderCart = () => {
    if (this.props.cart.length) {
      return this.props.cart.map(product => {
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
        } = product;

        return (
          <div className="body py-0">
            <div className="d-flex justify-content-around">
              <div className="col-4 p-0">
                <img src={`http://localhost:2404/show/image/${name_image}`} />
              </div>
              <div className="product col-6 p-0">
                <h3>{product_name}</h3>
                <p>{`${category1}'s ${category2}`}</p>
                <br />
                <h3>{`SIZE: EU ${size}`}</h3>
                <h3>{`QTY: ${qty}`}</h3>
                <div>
                  <button
                    onClick={() => {
                      this.deleteWishcart(wishcart_id);
                    }}
                    className="btnCart btn btn-outline-secondary mr-2"
                  >
                    REMOVE
                  </button>
                  {/* <button className="btnCart btn btn-outline-secondary mr-2">
                    EDIT
                  </button> */}
                  <EditCart product={product} recommendedCart={this.getRecommendedCart} />
                  <button
                    onClick={() => {
                      this.addToWishlist(wishcart_id);
                    }}
                    className="btnCart btn btn-outline-secondary "
                  >
                    SAVE
                  </button>
                </div>
              </div>
              <div className="col-2 p-0">
                <h3>{`Rp.${price.toLocaleString("IN")}`}</h3>
              </div>
            </div>
          </div>
        );
      });
    }
    return (
      <div className="body py-0">
        <p className="mt-3">There are no items in your cart.</p>
      </div>
    );
  };

  renderOrderSummary = () => {
    if (this.props.cart.length) {
      var sumPrice = 0;
      var sumQty = 0;
      this.props.cart.forEach(product => {
        const { qty, price } = product;
        sumQty += qty;
        sumPrice += price * qty;
      });

      return (
        <div class="orderSummary">
          <div className="header">
            <h5 class="card-title my-3">ORDER SUMMARY</h5>
          </div>
          <div className="body">
            <div className="d-flex justify-content-between px-0">
              <p class="mb-0 d-inline">SUBTOTAL</p>
              <p>{`Rp.${sumPrice.toLocaleString("IN")}`}</p>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <Link to="/checkout" products={this.props.cart}>
              <button className="btnCheckout btn btn-warning m-2">
                CHECKOUT
              </button>
            </Link>
          </div>
        </div>
      );
    }
    return (
      <div class="orderSummary">
        <div className="header">
          <h5 class="card-title my-3">ORDER SUMMARY</h5>
        </div>
        {/* <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6> */}
        <div className="body">
          <div className="d-flex justify-content-between px-0">
            <p class="mb-0 d-inline">SUBTOTAL</p>
            <p>{`Rp.${(0).toLocaleString("IN")}`}</p>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <Link to="/checkout">
            <button className="btnCheckout btn btn-warning m-2">
              CHECKOUT
            </button>
          </Link>
        </div>
      </div>
    );
  };

  renderRecommended = () => {
    if (this.state.recommendedCart.length) {
      return this.state.recommendedCart.map(obj => {
        return (
          <div className="cardshop d-inline-block text-left col-3">
            <Link
              className="text-dark"
              to={`/detailproduct/${obj.product_id}`}
            >
              <img
                className="imgshop"
                src={`http://localhost:2404/show/image/${obj.name_image}`}
              />
              <hr />
              <div className="textshop">
                <p>{obj.product_name}</p>
                <p className="font-italic text-secondary">{`${
                  obj.category1
                  }'s ${obj.category2}`}</p>
                <p className="text-secondary">{`Rp${obj.price.toLocaleString(
                  "IN"
                )}`}</p>
              </div>
            </Link>
          </div>
        )
      })
    }
  }

  render() {
    console.log(this.props.cart);

    if (this.props.role === admin) {
      return <Redirect to="/manageproducts/products/:page" />;
    }
    if (cookies.get("user_id")) {
      if (this.props.cart.length) {
        var sumQty = 0;
        this.props.cart.forEach(product => {
          const { qty } = product;
          sumQty += qty;
        });
      }
      return (
        <div>
          <div className="cartContainer">
            <div class="row">
              <div class="col-8 p-0">
                {/* cart */}
                <div className="cart mb-5">
                  <div className="header">
                    YOUR CART ({this.props.cart.length ? sumQty : 0})
                </div>
                  {this.renderCart()}
                </div>
                {/* wishlish */}
                {this.props.wishlist.length ? (
                  <div className="cart mb-5">
                    <div className="header">SAVED TO YOUR WISH LIST</div>
                    {this.renderWishlist()}
                  </div>
                ) : null}
              </div>
              <div class="col-4">{this.renderOrderSummary()}</div>
            </div>
          </div>
          {this.state.recommendedCart.length ?
            <div className="recommended mb-5 text-center">
              <p className="precommended">recommended for you</p>
              <div className="scrollmenu">
                {this.renderRecommended()}
              </div>
            </div> :
            null}
        </div>
      );
    }

    return <Redirect to="login" />;
  }
}
const mapStateToProps = state => {
  return {
    user_id: state.user.user_id,
    cart: state.product.cart,
    wishlist: state.product.wishlist,
    role: state.user.role
  };
};
export default connect(
  mapStateToProps,
  { getAllWishcart }
)(Cart);
