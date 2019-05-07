import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { onGetAllProduct } from "../actions/index";

class Products extends React.Component {
  componentDidMount() {
    this.props.onGetAllProduct();
  }

  onShowProducts = () => {
    return this.props.products.map((product, index) => {
      return (
        <tr key={index}>
          <th scope="row">{product.product_id}</th>
          <td>{product.product_name}</td>
          <td>{product.description}</td>
          <td>{product.price}</td>
          <td>{product.qty}</td>
          <td>{`${product.category1} ${product.category2}`}</td>
          <td>{product.updated_at}</td>
          <td>
            <Link className="mr-2" to={`/manageproducts/${index}`}>
              edit
            </Link>
            <Link to="/">delete</Link>
          </td>
        </tr>
      );
    });
  };

  render() {
    console.log(this.props.products);

    return (
      <div>
        <h4 className="mb-4">Add Product</h4>
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">product_id</th>
              <th scope="col">product_name</th>
              <th scope="col">description</th>
              <th scope="col">price</th>
              <th scope="col">qty</th>
              <th scope="col">category</th>
              <th scope="col">update</th>
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
  return { products: state.auth.products };
};

export default connect(
  mapStateToProps,
  { onGetAllProduct }
)(Products);
