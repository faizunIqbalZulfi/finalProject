import React from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { connect } from "react-redux";
import Cookies from "universal-cookie";

import {
  onGetAllProduct,
  onGetImageProduct,
  onDeleteImage,
  onEditProduct
} from "../store/actions/product";

const cookies = new Cookies();

class EditProduct extends React.Component {
  state = {
    dropdownOpen: false,
    category1: "",
    category2: "",
    files: [],
    imagesPreviewUrls: []
  };

  componentDidMount() {
    this.props.onGetAllProduct();
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  select = e => {
    this.setState({ category2: e.target.innerText });
  };

  _handleImageChange = e => {
    e.preventDefault();

    let files = Array.from(e.target.files);

    files.forEach((file, i) => {
      let reader = new FileReader();

      reader.onloadend = () => {
        this.setState(prevState => ({
          files: [...prevState.files, file],
          imagesPreviewUrls: [...prevState.imagesPreviewUrls, reader.result]
        }));
      };

      reader.readAsDataURL(file);
    });
  };

  onDeleteSelectImg = i => {
    const { imagesPreviewUrls, files } = this.state;
    Object.keys(imagesPreviewUrls).filter(key => {
      if (parseInt(key) === i) {
        imagesPreviewUrls.splice(i, 1);
        files.splice(i, 1);
      }
    });
    this.setState({
      files,
      imagesPreviewUrls
    });
  };

  onDeleteDefaultImg = async (image_id, product_id) => {
    await this.props.onDeleteImage(image_id);
    this.props.onGetImageProduct(product_id);
  };
  onEditBtnClick = product_id => {
    const product_name = this.product_name.value;
    const description = this.description.value;
    const price = this.price.value;
    const category1 = this.state.category1;
    const category2 = this.state.category2;
    const files = this.state.files;
    const quantity = [
      {
        qty: this.size35half.value,
        size_id: document.getElementsByClassName("size_id")[0].value,
        stock_id: document.getElementsByClassName("stock_id")[0].value
      },
      {
        qty: this.size36.value,
        size_id: document.getElementsByClassName("size_id")[1].value,
        stock_id: document.getElementsByClassName("stock_id")[1].value
      },
      {
        qty: this.size37.value,
        size_id: document.getElementsByClassName("size_id")[2].value,
        stock_id: document.getElementsByClassName("stock_id")[2].value
      },
      {
        qty: this.size37half.value,
        size_id: document.getElementsByClassName("size_id")[3].value,
        stock_id: document.getElementsByClassName("stock_id")[3].value
      },
      {
        qty: this.size38.value,
        size_id: document.getElementsByClassName("size_id")[4].value,
        stock_id: document.getElementsByClassName("stock_id")[4].value
      },
      {
        qty: this.size38half.value,
        size_id: document.getElementsByClassName("size_id")[5].value,
        stock_id: document.getElementsByClassName("stock_id")[5].value
      },
      {
        qty: this.size39.value,
        size_id: document.getElementsByClassName("size_id")[6].value,
        stock_id: document.getElementsByClassName("stock_id")[6].value
      },
      {
        qty: this.size40.value,
        size_id: document.getElementsByClassName("size_id")[7].value,
        stock_id: document.getElementsByClassName("stock_id")[7].value
      },
      {
        qty: this.size41.value,
        size_id: document.getElementsByClassName("size_id")[8].value,
        stock_id: document.getElementsByClassName("stock_id")[8].value
      },
      {
        qty: this.size42.value,
        size_id: document.getElementsByClassName("size_id")[9].value,
        stock_id: document.getElementsByClassName("stock_id")[9].value
      },
      {
        qty: this.size43.value,
        size_id: document.getElementsByClassName("size_id")[10].value,
        stock_id: document.getElementsByClassName("stock_id")[10].value
      },
      {
        qty: this.size44.value,
        size_id: document.getElementsByClassName("size_id")[11].value,
        stock_id: document.getElementsByClassName("stock_id")[11].value
      }
    ];

    this.props.onEditProduct({
      product_name,
      description,
      price,
      quantity,
      category1,
      category2,
      files,
      product_id
    });
  };
  render() {
    console.log(this.props.images);

    if (this.props.products.length !== 0) {
      var {
        product_name,
        description,
        price,
        category1,
        category2,
        product_id
      } = this.props.products[cookies.get("product_id")];
      if (this.state.category1 === "" && this.state.category2 === "") {
        this.setState({ category1, category2 });
        this.props.onGetImageProduct(product_id);
      }
    }
    if (this.props.size.length !== 0) {
      var size = this.props.size.filter(item => {
        return item.product_id === product_id;
      });

      for (let i = 0; i < size.length; i++) {
        const input = document.getElementById(`${size[i].size}`);
        if (input) {
          input.getElementsByClassName("inputStock")[0].defaultValue =
            size[i].qty;

          input.getElementsByClassName("stock_id")[0].value = size[i].stock_id;
        }
      }
      for (let i = 0; i < this.props.size.length; i++) {
        const input = document.getElementById(`${this.props.size[i].size}`);
        if (input) {
          input.getElementsByClassName("size_id")[0].value = this.props.size[
            i
          ].size_id;
        }
      }
    }
    return (
      <div>
        <h4 className="mb-4">Edit Product</h4>
        <form className="register2">
          <div className="form-group">
            <p className="loginRegister mb-0">Name Product</p>
            <input
              ref={input => {
                this.product_name = input;
              }}
              type="text"
              className="form-control"
              defaultValue={product_name}
            />
          </div>

          <div className="form-group">
            <p className="loginRegister mb-0">Description</p>
            <input
              ref={input => {
                this.description = input;
              }}
              rows="3"
              type="text"
              className="form-control"
              defaultValue={description}
            />
          </div>
          <div className="form-group">
            <p className="loginRegister mb-0">Price</p>
            <input
              ref={input => {
                this.price = input;
              }}
              type="number"
              className="form-control"
              defaultValue={price}
            />
          </div>
        </form>
        <div className="form-group ">
          <p className="loginRegister mb-0">Stock</p>
          <div className="d-flex justify-content-between">
            <div id="35.5" className="mr-2 p-0">
              <input
                ref={input => {
                  this.size35half = input;
                }}
                type="number"
                className="form-control inputStock"
              />
              <input
                style={{ display: "none" }}
                className="stock_id"
                defaultValue=""
              />
              <input
                style={{ display: "none" }}
                className="size_id"
                defaultValue=""
              />
              <p className="text-center loginRegister mb-0">EU 35.5</p>
            </div>
            <div id="36" className="mr-2 p-0">
              <input
                ref={input => {
                  this.size36 = input;
                }}
                type="number"
                className="form-control inputStock"
              />
              <input
                style={{ display: "none" }}
                className="stock_id"
                defaultValue=""
              />
              <input
                style={{ display: "none" }}
                className="size_id"
                defaultValue=""
              />
              <p className="text-center loginRegister mb-0">EU 36</p>
            </div>
            <div id="37" className="mr-2 p-0">
              <input
                ref={input => {
                  this.size37 = input;
                }}
                type="number"
                className="form-control inputStock"
              />
              <input
                style={{ display: "none" }}
                className="stock_id"
                defaultValue=""
              />
              <input
                style={{ display: "none" }}
                className="size_id"
                defaultValue=""
              />
              <p className="text-center loginRegister mb-0">EU 37</p>
            </div>
            <div id="37.5" className="mr-2 p-0">
              <input
                ref={input => {
                  this.size37half = input;
                }}
                type="number"
                className="form-control inputStock"
              />
              <input
                style={{ display: "none" }}
                className="stock_id"
                defaultValue=""
              />
              <input
                style={{ display: "none" }}
                className="size_id"
                defaultValue=""
              />
              <p className="text-center loginRegister mb-0">EU 37.5</p>
            </div>
            <div id="38" className="mr-2 p-0">
              <input
                ref={input => {
                  this.size38 = input;
                }}
                type="number"
                className="form-control inputStock"
              />
              <input
                style={{ display: "none" }}
                className="stock_id"
                defaultValue=""
              />
              <input
                style={{ display: "none" }}
                className="size_id"
                defaultValue=""
              />
              <p className="text-center loginRegister mb-0">EU 38</p>
            </div>
            <div id="38.5" className="p-0">
              <input
                ref={input => {
                  this.size38half = input;
                }}
                type="number"
                className="form-control inputStock"
              />
              <input
                style={{ display: "none" }}
                className="stock_id"
                defaultValue=""
              />
              <input
                style={{ display: "none" }}
                className="size_id"
                defaultValue=""
              />
              <p className="text-center loginRegister mb-0">EU 38.5</p>
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <div id="39" className="mr-2 p-0">
              <input
                ref={input => {
                  this.size39 = input;
                }}
                type="number"
                className="form-control inputStock"
              />
              <input
                style={{ display: "none" }}
                className="stock_id"
                defaultValue=""
              />
              <input
                style={{ display: "none" }}
                className="size_id"
                defaultValue=""
              />
              <p className="text-center loginRegister mb-0">EU 39</p>
            </div>
            <div id="40" className="mr-2 p-0">
              <input
                ref={input => {
                  this.size40 = input;
                }}
                type="number"
                className="form-control inputStock"
              />
              <input
                style={{ display: "none" }}
                className="stock_id"
                defaultValue=""
              />
              <input
                style={{ display: "none" }}
                className="size_id"
                defaultValue=""
              />
              <p className="text-center loginRegister mb-0">EU 40</p>
            </div>
            <div id="41" className="mr-2 p-0">
              <input
                ref={input => {
                  this.size41 = input;
                }}
                type="number"
                className="form-control inputStock"
              />
              <input
                style={{ display: "none" }}
                className="stock_id"
                defaultValue=""
              />
              <input
                style={{ display: "none" }}
                className="size_id"
                defaultValue=""
              />
              <p className="text-center loginRegister mb-0">EU 41</p>
            </div>
            <div id="42" className="mr-2 p-0">
              <input
                ref={input => {
                  this.size42 = input;
                }}
                type="number"
                className="form-control inputStock"
              />
              <input
                style={{ display: "none" }}
                className="stock_id"
                defaultValue=""
              />
              <input
                style={{ display: "none" }}
                className="size_id"
                defaultValue=""
              />
              <p className="text-center loginRegister mb-0">EU 42</p>
            </div>
            <div id="43" className="mr-2 p-0">
              <input
                ref={input => {
                  this.size43 = input;
                }}
                type="number"
                className="form-control inputStock"
              />
              <input
                style={{ display: "none" }}
                className="stock_id"
                defaultValue=""
              />
              <input
                style={{ display: "none" }}
                className="size_id"
                defaultValue=""
              />
              <p className="text-center loginRegister mb-0">EU 43</p>
            </div>
            <div id="44" className="p-0">
              <input
                ref={input => {
                  this.size44 = input;
                }}
                type="number"
                className="form-control inputStock"
              />
              <input
                style={{ display: "none" }}
                className="stock_id"
                defaultValue=""
              />
              <input
                style={{ display: "none" }}
                className="size_id"
                defaultValue=""
              />
              <p className="text-center loginRegister mb-0">EU 44</p>
            </div>
          </div>
        </div>
        <div className="form-group">
          <p className="loginRegister mb-0">Category</p>
          <div className="btn-group btn-block">
            <button
              className={`btn
                  ${
                    this.state.category1 === "Men"
                      ? "btn-secondary"
                      : "btn-outline-secondary"
                  }
                `}
              onClick={() => this.setState({ category1: "Men" })}
            >
              MEN
            </button>
            <button
              className={`btn
                  ${
                    this.state.category1 === "Women"
                      ? "btn-secondary"
                      : "btn-outline-secondary"
                  }
                `}
              onClick={() => this.setState({ category1: "Women" })}
            >
              WOMEN
            </button>
          </div>
          <Dropdown
            className="dropcate"
            isOpen={this.state.dropdownOpen}
            toggle={() => {
              this.toggle();
            }}
          >
            <DropdownToggle
              className={`form-control ${
                this.state.category2
                  ? "d-flex justify-content-between"
                  : "text-right"
              } `}
              color="white"
            >
              {this.state.category2}
              <i class="fas fa-caret-down" />
            </DropdownToggle>
            <DropdownMenu className="dropcatemenu">
              <DropdownItem onClick={this.select}>Lifestyle</DropdownItem>
              <DropdownItem onClick={this.select}>Running</DropdownItem>
              <DropdownItem onClick={this.select}>Basketball</DropdownItem>
              <DropdownItem onClick={this.select}>Jordan</DropdownItem>
              <DropdownItem onClick={this.select}>Football</DropdownItem>
              <DropdownItem onClick={this.select}>Gym & Training</DropdownItem>
              <DropdownItem onClick={this.select}>Skateboarding</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className="form-group">
          <p className="loginRegister mb-0">Image</p>
          <div className="row">
            <div className="col-2">
              <input
                style={{ display: "none" }}
                type="file"
                ref={fileInput => (this.fileInput = fileInput)}
                onChange={this._handleImageChange}
                multiple
              />
              <button
                onClick={() => {
                  this.fileInput.click();
                }}
                className="btnImg"
              >
                <i class="fas fa-plus fa-2x" />
              </button>
            </div>
            <div className="col-10">
              {this.state.imagesPreviewUrls.map((imagePreviewUrl, i) => {
                return (
                  <div className="image">
                    <img className="gambar" key={i} src={imagePreviewUrl} />
                    <button
                      className="productClose"
                      onClick={() => {
                        this.onDeleteSelectImg(i);
                      }}
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                );
              })}
              {this.props.images.map((image, i) => {
                return (
                  <div className="image">
                    <img
                      className="gambar"
                      key={i}
                      src={`http://localhost:2404/show/image/${
                        image.name_image
                      }`}
                    />
                    <button
                      className="productClose"
                      onClick={() => {
                        this.onDeleteDefaultImg(
                          image.image_id,
                          image.product_id
                        );
                      }}
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {/* {this.onEditMessage()} */}
        <div className="bortopbot">
          <div className="row py-3">
            <button
              onClick={() => {}}
              className="btnsavedit btn btn-outline-secondary"
            >
              CANCEL
            </button>
            <button
              onClick={() => {
                this.onEditBtnClick(product_id);
              }}
              className="btnsavedit btn btn-outline-secondary"
            >
              SAVE
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.product.products,
    images: state.product.images,
    size: state.product.size
  };
};

export default connect(
  mapStateToProps,
  { onGetAllProduct, onGetImageProduct, onDeleteImage, onEditProduct }
)(EditProduct);
