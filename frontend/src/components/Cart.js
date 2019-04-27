import React from "react";
import { connect } from "react-redux";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from "reactstrap";
import { Redirect } from "react-router-dom";

class Cart extends React.Component {
  render() {
    // if (this.props.username !== "") {
    return (
      <div>
        <div className="jumbotron my-3">
          <h3 className="text-white">
            <b>YOUR CART</b>
          </h3>
        </div>
        <div className="container">
          <div class="row">
            <div class="col-8">
              <div class="cart row">
                <div class="col-4">
                  <img
                    className="cartimg"
                    src="https://c.static-nike.com/a/images/f_auto,b_rgb:f5f5f5,w_880/xiytnf2wr80zqmoryldo/air-jordan-legacy-312-shoe-0lsnP0.jpg"
                  />
                </div>
                <div class="col-8">
                  <div className="row my-3">
                    <div className="col-8">
                      <p>Product Name</p>
                      <p>Product Color</p>
                      <p>Product Qty</p>
                      <button
                        type="button"
                        class="btn btn-outline-warning mr-2"
                      >
                        Remove
                      </button>
                      <button
                        type="button"
                        class="btn btn-outline-secondary mr-2"
                      >
                        Edit
                      </button>
                    </div>
                    <div className="col-4">
                      <p>Rp.2.000.000</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="cart row">
                <div class="col-4">
                  <img
                    className="cartimg"
                    src="https://c.static-nike.com/a/images/f_auto,b_rgb:f5f5f5,w_880/lerifbk0kfytxxdmhmlg/epic-react-flyknit-2-running-shoe-ShRZnm.jpg"
                  />
                </div>
                <div class="col-8">
                  <div className="row my-3">
                    <div className="col-8">
                      <p>Product Name</p>
                      <p>Product Color</p>
                      <p>Product Qty</p>
                      <button
                        type="button"
                        class="btn btn-outline-warning mr-2"
                      >
                        Remove
                      </button>
                      <button
                        type="button"
                        class="btn btn-outline-secondary mr-2"
                      >
                        Edit
                      </button>
                    </div>
                    <div className="col-4">
                      <p>Rp.2579.000</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="cart row">
                <div class="col-4">
                  <img
                    className="cartimg"
                    src="https://c.static-nike.com/a/images/f_auto,b_rgb:f5f5f5,w_880/f0cdxumsmslyedrer7kv/sb-zoom-janoski-mid-rm-se-skate-shoe-gpSHtZ.jpg"
                  />
                </div>
                <div class="col-8">
                  <div className="row my-3">
                    <div className="col-8">
                      <p>Product Name</p>
                      <p>Product Color</p>
                      <p>Product Qty</p>
                      <button
                        type="button"
                        class="btn btn-outline-warning mr-2"
                      >
                        Remove
                      </button>
                      <button
                        type="button"
                        class="btn btn-outline-secondary mr-2"
                      >
                        Edit
                      </button>
                    </div>
                    <div className="col-4">
                      <p>Rp.1.600.000</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-4">
              <div class="cart">
                <div class="card-body">
                  <h5 class="card-title my-3">ORDER SUMMARY</h5>
                  {/* <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6> */}
                  <form>
                    <div className="d-flex my-3">
                      {/* <span src={require("../icon/tag.png")} /> */}
                      {/* <i className="fas fa-tag d-inline" /> */}
                      <input
                        className="form-control"
                        placeholder="HAVE A PROMO CODE?"
                      />
                    </div>
                  </form>
                  <div className="cartitem">
                    <div className="d-flex justify-content-between">
                      <p class="d-inline">SUBTOTAL</p> <span>Rp.6.179.000</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p class="d-inline">ESTIMATED SHIPPING</p>{" "}
                      <span>Rp.50.000</span>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p class="card-text d-inline">TOTAL</p>{" "}
                    <span>Rp.6.229.000</span>
                  </div>
                  <button className="btn btn-black form-control">
                    CHECKOUT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    // } else {
    //   return <Redirect to="login" />;
    // }
  }
}
const mapStateToProps = state => {
  return { username: state.auth.username };
};
export default connect(mapStateToProps)(Cart);
