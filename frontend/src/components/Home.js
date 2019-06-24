import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import axios from "../config/axios";
import { admin } from "../config/message";

class Home extends React.Component {
  state = {
    productsNewArrival: [],
    productsBestSeller: []
  };

  componentDidMount() {
    this.getProductNewArrival();
    this.getProductBestSeller();
  }

  getProductNewArrival = async () => {
    const res = await axios.get("/gethome/product/newarrival");
    console.log(res);

    this.setState({
      productsNewArrival: res.data
      // images: res.data.images.filter(images => {
      //   return !this.state.productsNewArrival.includes(images.product_id);
      // })
    });
  };
  getProductBestSeller = async () => {
    const res = await axios.get("/gethome/product/bestseller");
    console.log(res);

    this.setState({
      productsBestSeller: res.data
      // images: res.data.images.filter(images => {
      //   return !this.state.productsBestSeller.includes(images.product_id);
      // })
    });
  };

  renderListNew = () => {
    return this.state.productsNewArrival.map(product => {
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
  renderListBest = () => {
    if (this.state.productsBestSeller.length > 5) {
      return this.state.productsBestSeller.map(product => {
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
    } else {
      return null
    }
  };

  render() {
    console.log(this.state.productsBestSeller);
    // console.log(this.state.images);
    if (this.props.role !== admin) {
      return (
        <div className="home">
          <div className="homeCaro bd-example">
            <div
              id="carouselExampleCaptions"
              className="carousel slide"
              data-ride="carousel"
            >
              <ol className="carousel-indicators">
                <li
                  data-target="#carouselExampleCaptions"
                  data-slide-to="0"
                  className="active"
                />
                <li data-target="#carouselExampleCaptions" data-slide-to="1" />
                <li data-target="#carouselExampleCaptions" data-slide-to="2" />
              </ol>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    src={
                      "https://c.static-nike.com/a/images/w_1920,c_limit/q8blogw5w76h26m6rjgn/image.jpg"
                    }
                    className="d-block w-100"
                    alt="..."
                  />
                  <div className="carousel-caption d-none d-md-block">
                    <h1>First slide label</h1>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Qui distinctio quisquam magnam consequuntur officiis ex
                      quod quidem doloribus aperiam sint.
                    </p>
                  </div>
                </div>
                {/* <div className="carousel-item">
              <img
                src={require("../images/photography4.jpg")}
                className="d-block w-100"
                alt="..."
              />
              <div className="carousel-caption d-none d-md-block">
                <h1>Second slide label</h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui
                  distinctio quisquam magnam consequuntur officiis ex quod
                  quidem doloribus aperiam sint.
                </p>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src={require("../images/photography5.jpg")}
                className="d-block w-100"
                alt="..."
              />
              <div className="carousel-caption d-none d-md-block">
                <h1>Third slide label</h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui
                  distinctio quisquam magnam consequuntur officiis ex quod
                  quidem doloribus aperiam sint.
                </p>
              </div>
            </div> */}
              </div>
              <a
                className="carousel-control-prev"
                href="#carouselExampleCaptions"
                role="button"
                data-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                />
                <span className="sr-only">Previous</span>
              </a>
              <a
                className="carousel-control-next"
                href="#carouselExampleCaptions"
                role="button"
                data-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                />
                <span className="sr-only">Next</span>
              </a>
            </div>
          </div>
          {/* <hr /> */}
          <h1 className="titlenewarrival">new arrival</h1>
          <div class="scrollmenu">{this.renderListNew()}</div>
          <div className="homeCate d-flex justify-content-between">
            <Link to="/shop/men/0">
              <div className="men">
                <p>MEN</p>
              </div>
            </Link>
            <Link to="/shop/women/0">
              <div className="women">
                <p>WOMEN</p>
              </div>
            </Link>
          </div>
          <h1 className="titlebestseller">best seller</h1>
          <div class="scrollmenu mb-5">{this.renderListBest()}</div>
        </div>
      );
    }
    return <Redirect to="/manageproducts/products/0" />;
  }
}
const mapStateToProps = state => {
  return {
    role: state.user.role
  };
};
export default connect(mapStateToProps)(Home);
