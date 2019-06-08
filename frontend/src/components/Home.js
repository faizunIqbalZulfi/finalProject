import React from "react";
import { Link } from "react-router-dom";

import axios from "../config/axios";

class Home extends React.Component {
  state = {
    products: []
    // images: []
  };

  componentDidMount() {
    this.getProduct();
  }
  getProduct = async () => {
    const res = await axios.get("/gethome/product");
    console.log(res);

    this.setState({
      products: res.data
      // images: res.data.images.filter(images => {
      //   return !this.state.products.includes(images.product_id);
      // })
    });
  };

  renderList = () => {
    return this.state.products.map(product => {
      return (
        <div className="img1 col-3 p-2 text-center">
          <Link to={`/detailproduct/${product.product_id}`}>
            <img
              src={`http://localhost:2404/show/image/${product.name_image}`}
            />
            <p>{product.product_name}</p>
            <p>{`${product.category1}'s ${product.category2}`}</p>
            <p>{`Rp.${product.price.toLocaleString("IN")}`}</p>
          </Link>
          {/* <button on className="btn btn-outline-secondary btn-block mt-2">
            add to cart
          </button> */}
        </div>
      );
    });
  };

  render() {
    console.log(this.state.products);
    // console.log(this.state.images);
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
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui
                    distinctio quisquam magnam consequuntur officiis ex quod
                    quidem doloribus aperiam sint.
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
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="carousel-control-next"
              href="#carouselExampleCaptions"
              role="button"
              data-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>
        {/* <hr /> */}
        <div class="scrollmenu">
          {this.renderList()}
          {/* <div className="img1 col-3 p-0">
            <img src="https://c.static-nike.com/a/images/f_auto/q_auto/t_PDP_864_v1/wm3e8dz55pacjrdjgudl/react-element-55-shoe-BXvj0k.jpg" />
            <p>Name Product</p>
            <p>Category</p>
            <p>Price</p>
          </div>
          <div className="img1 col-3 p-0">
            <img src="https://c.static-nike.com/a/images/f_auto/q_auto/t_PDP_864_v1/wm3e8dz55pacjrdjgudl/react-element-55-shoe-BXvj0k.jpg" />
            <p>Name Product</p>
            <p>Category</p>
            <p>Price</p>
          </div>
          <div className="img1 col-3 p-0">
            <img src="https://c.static-nike.com/a/images/f_auto/q_auto/t_PDP_864_v1/wm3e8dz55pacjrdjgudl/react-element-55-shoe-BXvj0k.jpg" />
            <p>Name Product</p>
            <p>Category</p>
            <p>Price</p>
          </div>
          <div className="img1 col-3 p-0">
            <img src="https://c.static-nike.com/a/images/f_auto/q_auto/t_PDP_864_v1/wm3e8dz55pacjrdjgudl/react-element-55-shoe-BXvj0k.jpg" />
            <p>Name Product</p>
            <p>Category</p>
            <p>Price</p>
          </div>
          <div className="img1 col-3 p-0">
            <img src="https://c.static-nike.com/a/images/f_auto/q_auto/t_PDP_864_v1/wm3e8dz55pacjrdjgudl/react-element-55-shoe-BXvj0k.jpg" />
            <p>Name Product</p>
            <p>Category</p>
            <p>Price</p>
          </div>
          <div className="img1 col-3 p-0">
            <img src="https://c.static-nike.com/a/images/f_auto/q_auto/t_PDP_864_v1/wm3e8dz55pacjrdjgudl/react-element-55-shoe-BXvj0k.jpg" />
            <p>Name Product</p>
            <p>Category</p>
            <p>Price</p>
          </div> */}
        </div>
        <div className="homeCate d-flex justify-content-between">
          <div className="men">
            <p>MEN</p>
          </div>
          <div className="women">
            <p>WOMEN</p>
          </div>
        </div>
        <div class="scrollmenu">
          <div className="img1 col-3 p-0">
            <img src="https://c.static-nike.com/a/images/f_auto/q_auto/t_PDP_864_v1/wm3e8dz55pacjrdjgudl/react-element-55-shoe-BXvj0k.jpg" />
            <p>Name Product</p>
            <p>Category</p>
            <p>Price</p>
          </div>
          <div className="img1 col-3 p-0">
            <img src="https://c.static-nike.com/a/images/f_auto/q_auto/t_PDP_864_v1/wm3e8dz55pacjrdjgudl/react-element-55-shoe-BXvj0k.jpg" />
            <p>Name Product</p>
            <p>Category</p>
            <p>Price</p>
          </div>
          <div className="img1 col-3 p-0">
            <img src="https://c.static-nike.com/a/images/f_auto/q_auto/t_PDP_864_v1/wm3e8dz55pacjrdjgudl/react-element-55-shoe-BXvj0k.jpg" />
            <p>Name Product</p>
            <p>Category</p>
            <p>Price</p>
          </div>
          <div className="img1 col-3 p-0">
            <img src="https://c.static-nike.com/a/images/f_auto/q_auto/t_PDP_864_v1/wm3e8dz55pacjrdjgudl/react-element-55-shoe-BXvj0k.jpg" />
            <p>Name Product</p>
            <p>Category</p>
            <p>Price</p>
          </div>
          <div className="img1 col-3 p-0">
            <img src="https://c.static-nike.com/a/images/f_auto/q_auto/t_PDP_864_v1/wm3e8dz55pacjrdjgudl/react-element-55-shoe-BXvj0k.jpg" />
            <p>Name Product</p>
            <p>Category</p>
            <p>Price</p>
          </div>
          <div className="img1 col-3 p-0">
            <img src="https://c.static-nike.com/a/images/f_auto/q_auto/t_PDP_864_v1/wm3e8dz55pacjrdjgudl/react-element-55-shoe-BXvj0k.jpg" />
            <p>Name Product</p>
            <p>Category</p>
            <p>Price</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
