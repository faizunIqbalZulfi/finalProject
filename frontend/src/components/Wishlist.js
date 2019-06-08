import React from "react";
import { connect } from "react-redux";
import Cookies from "universal-cookie";
import { Redirect } from "react-router-dom";

import axios from "../config/axios";
import { getAllWishcart } from "../store/actions/product";

const cookies = new Cookies();

class Wishlist extends React.Component {
  state = {
    allWishlist: []
  };

  componentDidMount() {
    this.props.getAllWishcart(cookies.get("user_id"));
  }

  addToCart = async wishcart_id => {
    const res = await axios.post(`/add/cart/wishlist/${wishcart_id}`);
    console.log(res);

    this.props.getAllWishcart(cookies.get("user_id"));
  };

  // getAllWishlist = async () => {
  //   const res = await axios.get(`/get/wishlist/${cookies.get("user_id")}`);
  //   this.setState({ allWishlist: res.data });
  // };

  deleteWishcart = async wishcart_id => {
    console.log(wishcart_id);

    const res = await axios.delete(`/delete/wishlist/${wishcart_id}`);
    this.props.getAllWishcart(cookies.get("user_id"));

    console.log(res);
  };

  renderList = () => {
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
          <div className="tbody">
            <div className="row">
              <div className="col-3">
                <img src={`http://localhost:2404/show/image/${name_image}`} />
              </div>
              <div className="detailProduct col-5">
                <h3>{product_name}</h3>
                <p>{`${category1}'s ${category2}`}</p>
                <br />
                <h3>{`SIZE: ${size}`}</h3>
                <h3>{`QTY: ${qty}`}</h3>
                <div>
                  <button
                    onClick={() => {
                      this.deleteWishcart(wishcart_id);
                    }}
                    className="btn btn-outline-secondary btn-group mr-4"
                  >
                    REMOVE
                  </button>
                  <button
                    onClick={() => {
                      this.addToCart(wishcart_id);
                    }}
                    className="btn btn-outline-secondary btn-group "
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
              <div className="col-2">
                <h3>{`Rp.${price.toLocaleString("IN")}`}</h3>
              </div>
              <div className="col-2">
                <h3>{created_at}</h3>
              </div>
            </div>
          </div>
        );
      });
    }
  };
  render() {
    console.log(this.props.wishlist);
    if (cookies.get("user_id")) {
      if (this.props.wishlist.length) {
        var items = 0;
        this.props.wishlist.forEach(product => {
          items += product.qty;
        });
      }

      return (
        <div className="wishlist mb-5">
          <h1 className="mb-4">Wish List</h1>
          <div className="header">{`${items} Items`}</div>
          {!items ? (
            <div className="body">
              <div className="d-flex justify-content-between">
                <img src={require("../images/wishlishDefault.png")} />
                <div className="text">
                  <h3>YOUR WISH LIST IS CURRENTLY EMPTY.</h3>
                  <p>
                    Save your favorite products and Nike By You designs here to
                    revisit later or to share. When you're ready to buy, add
                    products from your Wish List directly to your cart.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="body py-0">
              <div className="thead">
                <div className="row">
                  <div className="col-2 offset-8">
                    <h3>PRICE</h3>
                  </div>
                  <div className="col-2">
                    <h3>DATE ADDED</h3>
                  </div>
                </div>
              </div>
              {this.renderList()}
            </div>
          )}
        </div>
      );
    }
    return <Redirect to="/login" />;
  }
}

const mapStateToProps = state => {
  return {
    user_id: state.user.user_id,
    wishlist: state.product.wishlist
  };
};

export default connect(
  mapStateToProps,
  { getAllWishcart }
)(Wishlist);
