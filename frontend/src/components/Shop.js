import React from "react";
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

import axios from "../config/axios";

class Shop extends React.Component {
  isUpdate = true;
  state = {
    gender: "",
    category: "",
    sort: "",
    dropdownSort: false,
    products: []
  };

  async componentDidMount() {
    await this.setState({
      gender: this.props.match.params.gender,
      category: this.props.match.params.category
    });
  }
  // componentWillMount() {
  // }

  // async componentDidUpdate(prevProps, prevState) {
  //   // only update chart if the data has changed
  //   // if (prevProps.data !== this.props.data) {
  //   //   this.chart = c3.load({
  //   //     data: this.props.data
  //   //   });
  //   // }

  // }
  async componentWillUpdate(prevProps, prevState) {
    if (
      this.state.gender !== prevProps.match.params.gender ||
      this.state.category !== prevProps.match.params.category
    ) {
      console.log(this.state.gender);
      console.log(prevProps.match.params.gender);
      await this.setState({
        gender: prevProps.match.params.gender,
        category: prevProps.match.params.category
      });
      await this.getProduct();
    }
    // console.log(prevProps);
    // if (this.isUpdate) {
    //   await this.getProduct();
    //   console.log("new");
    // }
    // this.isUpdate = false;
  }

  toggleSort = () => {
    this.setState({ dropdownSort: !this.state.dropdownSort });
  };

  getProduct = async () => {
    const { category, gender } = this.props.match.params;
    // console.log(this.props);

    const res = await axios.get(`/get/products/shop/${gender}`, {
      params: { category }
    });

    this.setState({ products: res.data });
  };

  selectSort = async e => {
    await this.setState({ sort: e.target.innerText });

    if (this.state.sort === "Newest") {
      this.setState({
        products: this.state.products.sort((a, b) => {
          return (
            parseInt(
              b.created_at
                .substring(0, 10)
                .split("-")
                .join("")
            ) -
            parseInt(
              a.created_at
                .substring(0, 10)
                .split("-")
                .join("")
            )
          );
        })
      });
    } else if (this.state.sort === "Price High-Low") {
      this.setState({
        products: this.state.products.sort((a, b) => {
          return a.price - b.price;
        })
      });
    } else if (this.state.sort === "Price Low-High") {
      this.setState({
        products: this.state.products.sort((a, b) => {
          return b.price - a.price;
        })
      });
    }
    // cars.sort(function(a, b) {
    //   return b.year - a.year;
    // });
    console.log(this.state.products);
  };

  cancelBtn = () => {
    var ele = document.getElementsByTagName("input");
    for (var i = 0; i < ele.length; i++) ele[i].checked = false;
  };

  renderList = () => {
    // console.log(this.state.products);

    return this.state.products.map(product => {
      return (
        <div className="cardshop d-inline-block col-3">
          <Link
            className="text-dark"
            to={`/detailproduct/${product.product_id}`}
          >
            <img
              className="imgshop"
              src={`http://localhost:2404/show/image/${product.name_image}`}
            />
            <hr />
            <div className="textshop">
              <p>{product.product_name}</p>
              <p className="font-italic text-secondary">{`${
                product.category1
              }'s ${product.category2}`}</p>
              <p className="text-secondary">{`Rp${product.price.toLocaleString(
                "IN"
              )}`}</p>
            </div>
          </Link>
        </div>
      );
    });
  };

  render() {
    console.log(this.state.sort);
    const { category, gender } = this.props.match.params;

    return (
      <div className="shop">
        <div className="row">
          <div className="col-2">
            <div className="mb-5">
              <h4 className="mb-4 pb-3 border-bottom text-uppercase">
                {this.props.match.params.gender}
              </h4>
              <ul class="list-group list-group-flush">
                <Link to={`/shop/${gender}/0`}>
                  <li class="list-group-item border-0 p-0">All</li>
                </Link>
                <Link to={`/shop/${gender}/lifestyle`}>
                  <li class="list-group-item border-0 p-0">Lifestyle</li>
                </Link>
                <Link to={`/shop/${gender}/running`}>
                  <li class="list-group-item border-0 p-0 ">Running</li>
                </Link>
                <Link to={`/shop/${gender}/basketball`}>
                  <li class="list-group-item border-0 p-0 ">Basketball</li>
                </Link>
                <Link to={`/shop/${gender}/jordan`}>
                  <li class="list-group-item border-0 p-0">Jordan</li>
                </Link>
                <Link to={`/shop/${gender}/football`}>
                  <li class="list-group-item border-0 p-0 ">Football</li>
                </Link>
                <Link to={`/shop/${gender}/Gym&Training`}>
                  <li class="list-group-item border-0 p-0 ">Gym & Training</li>
                </Link>
                <Link to={`/shop/${gender}/skateboarding`}>
                  <li class="list-group-item border-0 p-0 ">Skateboarding</li>
                </Link>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 border-bottom">FILTER</h4>
              <ul class="list-group list-group-flush">
                <li class="list-group-item border-0 p-0">
                  <h5>Price</h5>
                  <form>
                    <div class="radio">
                      <label>
                        <input type="radio" name="priceradio" value={1500000} />
                        {`Under Rp${(1500000).toLocaleString("IN")}`}
                      </label>
                    </div>
                    <div class="radio">
                      <label>
                        <input type="radio" name="priceradio" value={2000000} />
                        {`Rp${(1500000).toLocaleString(
                          "IN"
                        )} - Rp${(1750000).toLocaleString("IN")}`}
                      </label>
                    </div>
                    <div class="radio">
                      <label>
                        <input type="radio" name="priceradio" value={2500000} />
                        {`Rp${(1750000).toLocaleString(
                          "IN"
                        )} - Rp${(2000000).toLocaleString("IN")}`}
                      </label>
                    </div>
                    <div class="radio">
                      <label>
                        <input type="radio" name="priceradio" value={3000000} />
                        {`Over Rp${(2000000).toLocaleString("IN")}`}
                      </label>
                    </div>
                  </form>
                </li>

                <li class="list-group-item border-0 p-0 ">
                  <h5>Size</h5>
                  <form>
                    <div class="radio d-flex justify-content-around">
                      <label className="col-6 p-0">
                        <input
                          className="radiosize"
                          type="radio"
                          name="sizeradio"
                          value={35.5}
                        />
                        EU 35.5
                      </label>
                      <label className="col-6 p-0">
                        <input
                          className="radiosize"
                          type="radio"
                          name="sizeradio"
                          value={36}
                        />
                        EU 36
                      </label>
                    </div>
                    <div class="radio d-flex justify-content-around">
                      <label className="col-6 p-0">
                        <input
                          className="radiosize"
                          type="radio"
                          name="sizeradio"
                          value={37}
                        />
                        EU 37
                      </label>
                      <label className="col-6 p-0">
                        <input
                          className="radiosize"
                          type="radio"
                          name="sizeradio"
                          value={37.5}
                        />
                        EU 37.5
                      </label>
                    </div>
                    <div class="radio d-flex justify-content-around">
                      <label className="col-6 p-0">
                        <input
                          className="radiosize"
                          type="radio"
                          name="sizeradio"
                          value={38}
                        />
                        EU 38
                      </label>
                      <label className="col-6 p-0">
                        <input
                          className="radiosize"
                          type="radio"
                          name="sizeradio"
                          value={38.5}
                        />
                        EU 38.5
                      </label>
                    </div>
                    <div class="radio d-flex justify-content-around">
                      <label className="col-6 p-0">
                        <input
                          className="radiosize"
                          type="radio"
                          name="sizeradio"
                          value={39}
                        />
                        EU 39
                      </label>
                      <label className="col-6 p-0">
                        <input
                          className="radiosize"
                          type="radio"
                          name="sizeradio"
                          value={40}
                        />
                        EU 40
                      </label>
                    </div>
                    <div class="radio d-flex justify-content-around">
                      <label className="col-6 p-0">
                        <input
                          className="radiosize"
                          type="radio"
                          name="sizeradio"
                          value={41}
                        />
                        EU 41
                      </label>
                      <label className="col-6 p-0">
                        <input
                          className="radiosize"
                          type="radio"
                          name="sizeradio"
                          value={42}
                        />
                        EU 42
                      </label>
                    </div>
                    <div class="radio d-flex justify-content-around">
                      <label className="col-6 p-0">
                        <input
                          className="radiosize"
                          type="radio"
                          name="sizeradio"
                          value={43}
                        />
                        EU 43
                      </label>
                      <label className="col-6 p-0">
                        <input
                          className="radiosize"
                          type="radio"
                          name="sizeradio"
                          value={44}
                        />
                        EU 44
                      </label>
                    </div>
                  </form>
                </li>
              </ul>
            </div>
            <div className="groupbtnfilter d-flex justify-content-between">
              <button className="btnfilter btn btn-outline-secondary">
                FILTER
              </button>
              <button
                onClick={this.cancelBtn}
                className="btnfilter btn btn-outline-secondary"
              >
                CANCEL
              </button>
            </div>
          </div>
          <div className="col-10">
            <div className="col-2 mb-4">
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
                  <DropdownItem onClick={this.selectSort}>Newest</DropdownItem>
                  {/* <DropdownItem onClick={this.selectSort}>
                    Highest Rated
                  </DropdownItem> */}
                  <DropdownItem onClick={this.selectSort}>
                    Price High-Low
                  </DropdownItem>
                  <DropdownItem onClick={this.selectSort}>
                    Price Low-High
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
            {this.renderList()}
          </div>
        </div>
      </div>
    );
  }
}

export default Shop;
