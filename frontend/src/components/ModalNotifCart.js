import React from "react"
import { Modal, ModalBody } from 'reactstrap';
import { connect } from "react-redux";
import { Link } from "react-router-dom"

class ModalNotifCart extends React.Component {
  state = {
    modal: false
  }
  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }
  fnAddToCart = async () => {
    if (this.props.title === "wishlist") {
      await this.props.addWishlist()
    } else {
      await this.props.addcart()
    }
    this.toggle()
    setTimeout(this.toggle, 5000);
  }
  renderListCart = () => {
    if (this.props.flagModalCart) {
      return this.props.cart.map(obj => {
        if (this.props.flagModalCart === obj.wishcart_id) {
          return (
            <div className="divdetailsorder row">
              <div className="col-3 p-0">
                <img
                  className="imgdetailsorder"
                  src={`http://localhost:2404/show/image/${obj.name_image}`}
                />
              </div>
              <div className="col-6 p-0 text-left">
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
          )
        }
      })
    } else {
      return (
        <div>
          <h5 className="h5modalnotifcart">
            <i class="fas fa-check-circle mr-2 text-success"></i>
            added to your cart
          </h5>
        </div>
      )
    }
  }
  renderListWishlist = () => {
    if (this.props.flagModalCart) {
      return this.props.wishlist.map(obj => {
        if (this.props.flagModalCart === obj.wishcart_id) {
          return (
            <div className="divdetailsorder row">
              <div className="col-3 p-0">
                <img
                  className="imgdetailsorder"
                  src={`http://localhost:2404/show/image/${obj.name_image}`}
                />
              </div>
              <div className="col-6 p-0 text-left">
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
          )
        }
      })
    } else {
      return (
        <div>
          <h5 className="h5modalnotifcart">
            <i class="fas fa-check-circle mr-2 text-success"></i>
            added to your wishlist
          </h5>
        </div>
      )
    }
  }
  render() {
    console.log(this.props.flagModalCart, this.props.wishlist);
    var cart = 0
    this.props.cart.forEach(obj => {
      cart += obj.qty
    });
    return (
      <div>
        <button
          className={this.props.className}
          disabled={!this.props.disabled ? true : false}
          onClick={this.fnAddToCart}
        >
          {this.props.title}
        </button>
        <Modal
          isOpen={this.state.modal}
          // toggle={this.toggle}
          className="modalnotifcart"
        >
          <ModalBody className="modalbodynotifcart text-center">
            {this.props.title === "wishlist" ?
              this.renderListWishlist()
              :
              this.renderListCart()
            }
            {this.props.title !== "wishlist" ?
              <div>
                <Link to="/cart">
                  <button className="btnmodalnotifcart mx-1">view cart ({cart})</button>
                </Link>
                <Link to="/checkout">
                  <button className="btnmodalnotifcart mx-1">checkout</button>
                </Link>
              </div>
              :
              null
            }
          </ModalBody>
        </Modal>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    cart: state.product.cart,
    wishlist: state.product.wishlist,
  };
};
export default connect(mapStateToProps)(ModalNotifCart)