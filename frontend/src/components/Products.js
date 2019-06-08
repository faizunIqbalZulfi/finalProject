import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { onGetAllProduct } from "../store/actions/product";
import axios from "../config/axios";

class Products extends React.Component {
  componentDidMount() {
    this.props.onGetAllProduct();
  }

  deleteProduct = async product_id => {
    await axios.delete(`/delete/product/${product_id}`);
    this.props.onGetAllProduct();
  };

  onShowProducts = () => {
    if (this.props.products) {
      console.log(this.props.products[0]);

      return this.props.products.map((product, index) => {
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
                  to={`/manageproducts/editproduct/${index}`}
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
    console.log(this.props.products);

    return (
      <div>
        <h4 className="mb-4">All Product</h4>
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
