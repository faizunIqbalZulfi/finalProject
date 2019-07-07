import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
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

import { onGetAllProduct } from "../store/actions/product";
import axios from "../config/axios";

class Products extends React.Component {
  state = {
    products: [],
    dropdownSort: false,
    sortBy: "",
    flagSort: true,
    ascordsc: ""
  }
  async componentDidMount() {
    await this.props.onGetAllProduct();
    await this.setState({ products: this.props.products })
  }
  toggleSort = () => {
    this.setState({ dropdownSort: !this.state.dropdownSort });
  };
  selectedTh = async (e) => {
    if (this.state.sortBy === "" || this.state.sortBy !== e) {
      await this.setState({
        flagSort: true,
        sortBy: document.getElementsByClassName(e)[0].innerText
      })
    }
    if (this.state.sortBy === "product_id") {
      if (this.state.flagSort) {
        this.setState({
          flagSort: !this.state.flagSort,
          products: this.state.products.sort((a, b) => {
            return a.product_id - b.product_id;
          })
        });
      } else {
        this.setState({
          flagSort: !this.state.flagSort,
          products: this.state.products.sort((a, b) => {
            return b.product_id - a.product_id;
          })
        });
      }
    } else if (this.state.sortBy === "qty") {
      if (this.state.flagSort) {
        this.setState({
          flagSort: !this.state.flagSort,
          products: this.state.products.sort((a, b) => {
            return a.qty - b.qty;
          })
        });
      } else {
        this.setState({
          flagSort: !this.state.flagSort,
          products: this.state.products.sort((a, b) => {
            return b.qty - a.qty;
          })
        });
      }
    } else if (this.state.sortBy === "price") {
      if (this.state.flagSort) {
        this.setState({
          flagSort: !this.state.flagSort,
          products: this.state.products.sort((a, b) => {
            return a.price - b.price;
          })
        });
      } else {
        this.setState({
          flagSort: !this.state.flagSort,
          products: this.state.products.sort((a, b) => {
            return b.price - a.price;
          })
        });
      }

    } else if (this.state.sortBy === "product_name") {
      if (this.state.flagSort) {
        this.setState({
          flagSort: !this.state.flagSort,
          products: this.state.products.sort((a, b) => {

            if (a.product_name.toLowerCase() < b.product_name.toLowerCase()) return -1
            if (a.product_name.toLowerCase() > b.product_name.toLowerCase()) return 1
            return 0

          })
        });
      } else {
        this.setState({
          flagSort: !this.state.flagSort,
          products: this.state.products.sort((a, b) => {
            if (a.product_name.toLowerCase() > b.product_name.toLowerCase()) return -1
            if (a.product_name.toLowerCase() < b.product_name.toLowerCase()) return 1
            return 0
          })
        });
      }

    }
  }
  filterProduct = async (e) => {
    var type = e.target.value
    await this.props.onGetAllProduct();
    await this.setState({ products: this.props.products })
    this.setState({
      products: this.state.products.filter(obj => {
        return obj.product_name.toLowerCase().includes(type.toLowerCase())
          || obj.description.toLowerCase().includes(type.toLowerCase())
      })
    })
  }
  deleteProduct = async product_id => {
    const ask = window.confirm("are you sure ?")
    if (ask) {
      await axios.patch(`/delete/product/${product_id}`);
      await this.props.onGetAllProduct();
      await this.setState({ products: this.props.products })
    }
  };

  renderProducts = () => {
    if (this.state.products) {
      return this.state.products.map((product, index) => {
        return (
          <tr className={!product.status ? "text-secondary" : ""} key={index}>
            <td>{index + 1}</td>
            <td>{product.product_id}</td>
            <td>{product.product_name}</td>
            <td>{product.description}</td>
            <td>{`Rp${product.price.toLocaleString("IN")}`}</td>
            <td>{product.qty}</td>
            <td>{`${product.category1} ${product.category2}`}</td>
            <td>{product.created_at}</td>
            <td>
              <div className={!product.status ? "d-none": "d-flex"}>
                <button
                  className="btnEditLink d-inline">
                  <Link
                    className="btnEditLink mr-2"
                    to={`/manageproducts/editproduct/${product.product_id}`}
                  >
                    <i class="fas fa-edit fa-2x"></i>
                  </Link>
                </button>
                <button
                  className="btnDeleteLink d-inline"
                  onClick={() => {
                    this.deleteProduct(product.product_id);
                  }}
                >
                  <i class="fas fa-minus-circle fa-2x"></i>
                </button>
              </div>
            </td>
          </tr>
        );
      });
    }
  };

  render() {
    console.log(this.state.products);

    return (
      <div>
        <div className="d-flex justify-content-between">
          <h4 className="mb-4">All Product</h4>
          {/* filter */}
          <form>
            <input onChange={this.filterProduct} className="inputmanageproduct" type="text" placeholder="search" />
          </form>
        </div>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>no</th>
              <th
                className="product_id"
                onClick={() => { this.selectedTh("product_id") }}
                scope="col">
                product_id
                <div className="d-inline">
                  <i className={`position-absolute fas fa-sort-up m-1 
                  ${!this.state.flagSort && this.state.sortBy === "product_id"
                      ? "text-success"
                      : null}`}>
                  </i>
                  <i className={`position-absolute fas fa-sort-down m-1 
                  ${this.state.flagSort && this.state.sortBy === "product_id"
                      ? "text-success"
                      : null}`}>
                  </i>
                </div>
              </th>
              <th
                className="product_name"
                onClick={() => { this.selectedTh("product_name") }}
                scope="col">
                product_name
                <div className="d-inline">
                  <i className={`position-absolute fas fa-sort-up m-1 
                  ${!this.state.flagSort && this.state.sortBy === "product_name"
                      ? "text-success"
                      : null}`}>
                  </i>
                  <i className={`position-absolute fas fa-sort-down m-1 
                  ${this.state.flagSort && this.state.sortBy === "product_name"
                      ? "text-success"
                      : null}`}>
                  </i>
                </div>
              </th>
              <th
                className="text-center"
                scope="col">
                description
              </th>
              <th
                className="price"
                onClick={() => { this.selectedTh("price") }}
                scope="col">
                price
                <div className="d-inline">
                  <i className={`position-absolute fas fa-sort-up m-1 
                  ${!this.state.flagSort && this.state.sortBy === "price"
                      ? "text-success"
                      : null}`}>
                  </i>
                  <i className={`position-absolute fas fa-sort-down m-1 
                  ${this.state.flagSort && this.state.sortBy === "price"
                      ? "text-success"
                      : null}`}>
                  </i>
                </div>
              </th>
              <th
                className="qty"
                onClick={() => { this.selectedTh("qty") }}
                scope="col">
                qty
                <div className="d-inline">
                  <i className={`position-absolute fas fa-sort-up m-1 
                  ${!this.state.flagSort && this.state.sortBy === "qty"
                      ? "text-success"
                      : null}`}>
                  </i>
                  <i className={`position-absolute fas fa-sort-down m-1 
                  ${this.state.flagSort && this.state.sortBy === "qty"
                      ? "text-success"
                      : null}`}>
                  </i>
                </div>
              </th>
              <th
                className="text-center"
                scope="col">
                category
              </th>
              <th
                className="text-center"
                scope="col">
                date added
              </th>
              <th
                className="text-center"
                scope="col">
                action
              </th>
            </tr>
          </thead>
          <tbody>{this.renderProducts()}</tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { products: state.product.products };
};

export default connect(
  mapStateToProps,
  { onGetAllProduct }
)(Products);
