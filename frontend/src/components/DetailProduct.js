import React from "react";
import { connect } from "react-redux";
import Cookies from "universal-cookie";

import axios from "../config/axios";
import { getAllWishcart } from "../store/actions/product";

const cookies = new Cookies();

class DetailProduct extends React.Component {
  state = {
    product: [],
    images: [],
    stock: [],
    sizeNotAvailable: [],
    size: ""
  };

  onRadioBtnClick = size => {
    console.log(size);

    this.setState({ size });
  };

  addWishlist = async () => {
    const { product_id } = this.props.match.params;

    const res = await axios.post(`/add/wishlist`, {
      user_id: this.props.user_id,
      product_id,
      size: this.state.size,
      status: "w"
    });

    console.log(res);
  };

  addcart = async () => {
    const { product_id } = this.props.match.params;

    const res = await axios.post(`/add/cart`, {
      user_id: this.props.user_id,
      product_id,
      size: this.state.size,
      status: "c"
    });
    this.props.getAllWishcart(cookies.get("user_id"));

    console.log(res);
  };

  componentDidMount() {
    this.getProduct();
  }

  getProduct = async () => {
    const { product_id } = this.props.match.params;
    const res = await axios.get(`/detail/product/${product_id}`);

    this.setState({
      product: res.data.product,
      images: res.data.images,
      stock: res.data.stock,
      sizeNotAvailable: res.data.size.map(size => {
        return size.size;
      })
    });
    console.log(this.state);
  };
  renderList = () => {
    return this.state.images.map(image => {
      return (
        <img src={`http://localhost:2404/show/image/${image.name_image}`} />
      );
    });
  };

  render() {
    const { product, images, stock, sizeNotAvailable } = this.state;

    if (product.length !== 0) {
      var {
        product_id,
        product_name,
        description,
        price,
        category1,
        category2
      } = product[0];
    }
    if (stock.length !== 0) {
      console.log(stock);
      // console.log(size[0]);

      for (let i = 0; i < stock.length; i++) {
        Object.keys(sizeNotAvailable).forEach(key => {
          if (sizeNotAvailable[key] == stock[i].size) {
            sizeNotAvailable.splice(key, 1);
            // this.state.size.splice(size, 1);
          }
        });
      }

      for (let i = 0; i < stock.length; i++) {
        const input = document.getElementsByClassName(`${stock[i].size}`);
        if (input) {
          console.log(this.state.sizeNotAvailable);
          console.log(input[0]);
          if (!stock[i].qty) {
            input[0].disabled = true;
          }

          //   input.getElementsByClassName("stock_id")[0].value = size[i].stock_id;
        }
      }
      console.log(sizeNotAvailable);
      for (let i = 0; i < sizeNotAvailable.length; i++) {
        const input = document.getElementsByClassName(`${sizeNotAvailable[i]}`);
        if (input) {
          console.log(this.state.sizeNotAvailable);
          console.log(input[0]);

          input[0].disabled = true;

          //   input.getElementsByClassName("stock_id")[0].value = size[i].stock_id;
        }
      }
    }
    return (
      <div className="detailProduct">
        <div className="row">
          <div className="col-8">
            {this.renderList()}
            {/* <img
              src={`http://localhost:2404/show/image/1558065763315imagedefault.jpg`}
            />
            <img
              src={`http://localhost:2404/show/image/1558065763315imagedefault.jpg`}
            />
            <img
              src={`http://localhost:2404/show/image/1558065763315imagedefault.jpg`}
            />
            <img
              src={`http://localhost:2404/show/image/1558065763315imagedefault.jpg`}
            />
            <img
              src={`http://localhost:2404/show/image/1558065763315imagedefault.jpg`}
            /> */}
          </div>
          <div className="col-4">
            <div className="d-flex justify-content-between">
              <div>
                <h5>{`${category1}'s ${category2}`}</h5>
                <h1>{product_name}</h1>
              </div>
              <div>
                <h5>{price ? `Rp.${price.toLocaleString("IN")}` : null}</h5>
              </div>
            </div>
            <div className="my-2">
              <p>{description}</p>
            </div>
            <h5>Select Size</h5>
            <div id="size" className="row justify-content-between m-0 p-0">
              <button
                className={`35.5 ${
                  this.state.size === "35.5"
                    ? "btnSizeDetail btn btn-secondary"
                    : "btnSizeDetail btn btn-outline-secondary"
                }`}
                onClick={() => this.onRadioBtnClick("35.5")}
                disabled={false}
              >
                EU 35.5
              </button>
              <button
                className={`36 ${
                  this.state.size === "36"
                    ? "btnSizeDetail btn btn-secondary"
                    : "btnSizeDetail btn btn-outline-secondary"
                }`}
                onClick={() => this.onRadioBtnClick("36")}
                disabled={false}
              >
                EU 36
              </button>
              <button
                className={`37 ${
                  this.state.size === "37"
                    ? "btnSizeDetail btn btn-secondary"
                    : "btnSizeDetail btn btn-outline-secondary"
                }`}
                onClick={() => this.onRadioBtnClick("37")}
                disabled={false}
              >
                EU 37
              </button>
              <button
                className={`37.5 ${
                  this.state.size === "37.5"
                    ? "btnSizeDetail btn btn-secondary"
                    : "btnSizeDetail btn btn-outline-secondary"
                }`}
                onClick={() => this.onRadioBtnClick("37.5")}
                disabled={false}
              >
                EU 37.5
              </button>
              <button
                className={`38 ${
                  this.state.size === "38"
                    ? "btnSizeDetail btn btn-secondary"
                    : "btnSizeDetail btn btn-outline-secondary"
                }`}
                onClick={() => this.onRadioBtnClick("38")}
                disabled={false}
              >
                EU 38
              </button>
              <button
                className={`38.5 ${
                  this.state.size === "38.5"
                    ? "btnSizeDetail btn btn-secondary"
                    : "btnSizeDetail btn btn-outline-secondary"
                }`}
                onClick={() => this.onRadioBtnClick("38.5")}
                disabled={false}
              >
                EU 38.5
              </button>
              <button
                className={`39 ${
                  this.state.size === "39"
                    ? "btnSizeDetail btn btn-secondary"
                    : "btnSizeDetail btn btn-outline-secondary"
                }`}
                onClick={() => this.onRadioBtnClick("39")}
                disabled={false}
              >
                EU 39
              </button>
              <button
                className={`40 ${
                  this.state.size === "40"
                    ? "btnSizeDetail btn btn-secondary"
                    : "btnSizeDetail btn btn-outline-secondary"
                }`}
                onClick={() => this.onRadioBtnClick("40")}
                disabled={false}
              >
                EU40
              </button>
              <button
                className={`41 ${
                  this.state.size === "41"
                    ? "btnSizeDetail btn btn-secondary"
                    : "btnSizeDetail btn btn-outline-secondary"
                }`}
                onClick={() => this.onRadioBtnClick("41")}
                disabled={false}
              >
                EU 41
              </button>
              <button
                className={`42 ${
                  this.state.size === "42"
                    ? "btnSizeDetail btn btn-secondary"
                    : "btnSizeDetail btn btn-outline-secondary"
                }`}
                onClick={() => this.onRadioBtnClick("42")}
                disabled={false}
              >
                EU 42
              </button>
              <button
                className={`43 ${
                  this.state.size === "43"
                    ? "btnSizeDetail btn btn-secondary"
                    : "btnSizeDetail btn btn-outline-secondary"
                }`}
                onClick={() => this.onRadioBtnClick("43")}
                disabled={false}
              >
                EU 43
              </button>
              <button
                className={`44 ${
                  this.state.size === "44"
                    ? "btnSizeDetail btn btn-secondary"
                    : "btnSizeDetail btn btn-outline-secondary"
                }`}
                onClick={() => this.onRadioBtnClick("44")}
                disabled={false}
              >
                EU 44
              </button>
            </div>
            <div className="my-2">
              <button
                onClick={this.addcart}
                className="btn btn-outline-warning btn-block"
              >
                Add to Cart
              </button>
              <button
                onClick={this.addWishlist}
                className="btn btn-outline-secondary btn-block"
              >
                Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { user_id: state.user.user_id };
};

export default connect(
  mapStateToProps,
  { getAllWishcart }
)(DetailProduct);
