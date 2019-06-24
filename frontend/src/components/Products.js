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
    ascordsc: ""
  }
  async componentDidMount() {
    await this.props.onGetAllProduct();
    await this.setState({ products: this.props.products })
  }
  toggleSort = () => {
    this.setState({ dropdownSort: !this.state.dropdownSort });
  };
  selectSort = async e => {
    await this.setState({ ascordsc: e.target.innerText });
    console.log(this.state);

    if (this.state.sortBy === "Newest") {
      if (this.state.ascordsc === "Asc") {
        this.setState({
          products: this.state.products.sort((a, b) => {
            return a.product_id - b.product_id;
          })
        });
      } else if (this.state.ascordsc === "Dsc") {
        this.setState({
          products: this.state.products.sort((a, b) => {
            return b.product_id - a.product_id;
          })
        });
      }
    } else if (this.state.sortBy === "Quantity") {
      if (this.state.ascordsc === "Asc") {
        this.setState({
          products: this.state.products.sort((a, b) => {
            return a.qty - b.qty;
          })
        });
      } else if (this.state.ascordsc === "Dsc") {
        this.setState({
          products: this.state.products.sort((a, b) => {
            return b.qty - a.qty;
          })
        });
      }
    }
  };

  deleteProduct = async product_id => {
    console.log("sebelum delete");

    await axios.delete(`/delete/product/${product_id}`);
    console.log("setelah delete");

    await this.props.onGetAllProduct();
    await this.setState({ products: this.props.products })

    console.log("seteleah updata");

  };

  onShowProducts = () => {
    if (this.state.products) {
      console.log(this.state.products[0]);

      return this.state.products.map((product, index) => {
        return (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{product.product_id}</td>
            <td>{product.product_name}</td>
            <td>{product.description}</td>
            <td>{`Rp${product.price.toLocaleString("IN")}`}</td>
            <td>{product.qty}</td>
            <td>{`${product.category1} ${product.category2}`}</td>
            <td>{product.created_at}</td>
            <td>
              <button className="btnEditLink">
                <Link
                  className="btnEditLink mr-2"
                  to={`/manageproducts/editproduct/${product.product_id}`}
                >
                  EDIT
                </Link>
              </button>
              <button
                className="btnDeleteLink"
                onClick={() => {
                  this.deleteProduct(product.product_id);
                }}
              >
                DELETE
              </button>
              {/* <Link to="/">delete</Link> */}
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
        <div className="d-flex">
          <h4 className="mb-4">All Product</h4>
          <form className="d-flex">
            <div className="radio radioAddress col-3 mx-3">
              <label>
                <input
                  onClick={() => { this.setState({ sortBy: "Newest" }) }}
                  type="radio"
                  name="bank"
                  className="inlinebutton"
                />
                <div className="ml-4 optionBank">
                  <div className="cartBody text-uppercase">Newest</div>
                </div>
              </label>
            </div>
            <div className="radio radioAddress col-3 mx-3">
              <label>
                <input
                  onClick={() => { this.setState({ sortBy: "Quantity" }) }}
                  type="radio"
                  name="bank"
                  className="inlinebutton"
                />
                <div className="ml-4 optionBank">
                  <div className="cartBody text-uppercase">Quantity</div>
                </div>
              </label>
            </div>
          </form>
          <Dropdown
            isOpen={this.state.dropdownSort}
            toggle={() => {
              this.toggleSort();
            }}
          >
            <DropdownToggle
              className={`dropdownsort d-flex justify-content-between`}
              color="white"
            >
              SORT BY:
            <i class="fas fa-caret-down" />
            </DropdownToggle>
            <DropdownMenu className="dropCartMenu m-0">
              <DropdownItem
                onClick={this.selectSort}>
                Asc
            </DropdownItem>
              <DropdownItem
                onClick={this.selectSort}>
                Dsc
            </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>no</th>
              <th scope="col">product_id</th>
              <th scope="col">product_name</th>
              <th scope="col">description</th>
              <th scope="col">price</th>
              <th scope="col">qty</th>
              <th scope="col">category</th>
              <th scope="col">date added</th>
              <th scope="col">action</th>
            </tr>
          </thead>
          <tbody>{this.onShowProducts()}</tbody>
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
