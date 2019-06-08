import React from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { connect } from "react-redux";

import { onAddProduct } from "../store/actions/product";

class AddProduct extends React.Component {
  state = {
    dropdownOpen: false,
    category1: "",
    category2: "",
    files: [],
    imagesPreviewUrls: [],
    size35half: "",
    size36: "",
    size37: "",
    size37half: "",
    size38: "",
    size38half: "",
    size39: "",
    size40: "",
    size41: "",
    size42: "",
    size43: "",
    size44: ""
  };

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  _handleImageChange = e => {
    e.preventDefault();
    console.log(e.target.files);

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

  select = e => {
    this.setState({ category2: e.target.innerText });
    // console.log(e.target.innerText);
  };

  btnAddProductOnClick = () => {
    const product_name = this.product_name.value;
    const description = this.description.value;
    const price = this.price.value;
    const category1 = this.state.category1;
    const category2 = this.state.category2;
    const files = this.state.files;
    const quantity = [
      { qty: this.size35half.value, size: this.state.size35half },
      { qty: this.size36.value, size: this.state.size36 },
      { qty: this.size37.value, size: this.state.size37 },
      { qty: this.size37half.value, size: this.state.size37half },
      { qty: this.size38.value, size: this.state.size38 },
      { qty: this.size38half.value, size: this.state.size38half },
      { qty: this.size39.value, size: this.state.size39 },
      { qty: this.size40.value, size: this.state.size40 },
      { qty: this.size41.value, size: this.state.size41 },
      { qty: this.size42.value, size: this.state.size42 },
      { qty: this.size43.value, size: this.state.size43 },
      { qty: this.size44.value, size: this.state.size44 }
    ];

    this.props.onAddProduct({
      product_name,
      description,
      price,
      quantity,
      category1,
      category2,
      files
    });
  };

  render() {
    console.log(this.state.files);

    return (
      <div>
        <h4 className="mb-4">Add Product</h4>
        <form className="register2">
          <div className="form-group">
            <p className="loginRegister mb-0">Name Product</p>
            <input
              ref={input => {
                this.product_name = input;
              }}
              type="text"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <p className="loginRegister mb-0">Description</p>
            <textarea
              ref={input => {
                this.description = input;
              }}
              rows="3"
              type="text"
              className="form-control"
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
            />
          </div>
        </form>
        <div className="form-group ">
          <p className="loginRegister mb-0">Size & Stock</p>
          <div className="d-flex justify-content-between">
            <div className="mr-2 p-0">
              <div className="pb-2 btn-group btn-block">
                <button
                  className={`btn
                ${
                  !this.state.size35half
                    ? "btn-outline-secondary"
                    : "btn-secondary"
                } 
              `}
                  onClick={async () => {
                    if (this.state.size35half) {
                      this.size35half.value = "";
                      return this.setState({ size35half: "" });
                    }
                    await this.setState({ size35half: "35.5" });
                    console.log(this.state.size35half);
                  }}
                >
                  EU 35.5
                </button>
              </div>
              {/* <p className="loginRegister mb-0">Stock</p> */}
              <input
                disabled={!this.state.size35half}
                ref={input => {
                  this.size35half = input;
                }}
                type="number"
                className="form-control inputStock"
                defaultValue=""
                min="0"
              />
            </div>
            <div className="mr-2 p-0">
              {/* <p className="loginRegister mb-0">Size</p> */}
              <div className="pb-2 btn-group btn-block">
                <button
                  className={`btn
                ${
                  !this.state.size36 ? "btn-outline-secondary" : "btn-secondary"
                } 
              `}
                  onClick={async () => {
                    if (this.state.size36) {
                      this.size36.value = "";
                      return this.setState({ size36: "" });
                    }
                    await this.setState({ size36: "36" });
                  }}
                >
                  EU 36
                </button>
              </div>
              {/* <p className="loginRegister mb-0">Stock</p> */}
              <input
                disabled={!this.state.size36}
                ref={input => {
                  this.size36 = input;
                }}
                type="number"
                className="form-control inputStock"
                defaultValue=""
                min="0"
              />
            </div>
            <div className="mr-2 p-0">
              {/* <p className="loginRegister mb-0">Size</p> */}
              <div className="pb-2 btn-group btn-block">
                <button
                  className={`btn
                ${
                  !this.state.size37 ? "btn-outline-secondary" : "btn-secondary"
                } 
              `}
                  onClick={async () => {
                    if (this.state.size37) {
                      this.size37.value = "";
                      return this.setState({ size37: "" });
                    }
                    await this.setState({ size37: "37" });
                  }}
                >
                  EU 37
                </button>
              </div>
              {/* <p className="loginRegister mb-0">Stock</p> */}
              <input
                disabled={!this.state.size37}
                ref={input => {
                  this.size37 = input;
                }}
                type="number"
                className="form-control inputStock"
                defaultValue=""
                min="0"
              />
            </div>
            <div className="mr-2 p-0">
              {/* <p className="loginRegister mb-0">Size</p> */}
              <div className="pb-2 btn-group btn-block">
                <button
                  className={`btn
                ${
                  !this.state.size37half
                    ? "btn-outline-secondary"
                    : "btn-secondary"
                } 
              `}
                  onClick={async () => {
                    if (this.state.size37half) {
                      this.size37half.value = "";
                      return this.setState({ size37half: "" });
                    }
                    await this.setState({ size37half: "37.5" });
                  }}
                >
                  EU 37.5
                </button>
              </div>
              {/* <p className="loginRegister mb-0">Stock</p> */}
              <input
                disabled={!this.state.size37half}
                ref={input => {
                  this.size37half = input;
                }}
                type="number"
                className="form-control inputStock"
                defaultValue=""
                min="0"
              />
            </div>
            <div className="mr-2 p-0">
              <div className="pb-2 btn-group btn-block">
                <button
                  className={`btn
                ${
                  !this.state.size38 ? "btn-outline-secondary" : "btn-secondary"
                } 
              `}
                  onClick={async () => {
                    if (this.state.size38) {
                      this.size38.value = "";
                      return this.setState({ size38: "" });
                    }
                    await this.setState({ size38: "38" });
                    console.log(this.state.size38);
                  }}
                >
                  EU 38
                </button>
              </div>
              {/* <p className="loginRegister mb-0">Stock</p> */}
              <input
                disabled={!this.state.size38}
                ref={input => {
                  this.size38 = input;
                }}
                type="number"
                className="form-control inputStock"
                defaultValue=""
                min="0"
              />
            </div>
            <div className="p-0">
              {/* <p className="loginRegister mb-0">Size</p> */}
              <div className="pb-2 btn-group btn-block">
                <button
                  className={`btn
                ${
                  !this.state.size38half
                    ? "btn-outline-secondary"
                    : "btn-secondary"
                } 
              `}
                  onClick={async () => {
                    if (this.state.size38half) {
                      this.size38half.value = "";
                      return this.setState({ size38half: "" });
                    }
                    await this.setState({ size38half: "38.5" });
                  }}
                >
                  EU 38.5
                </button>
              </div>
              {/* <p className="loginRegister mb-0">Stock</p> */}
              <input
                disabled={!this.state.size38half}
                ref={input => {
                  this.size38half = input;
                }}
                type="number"
                className="form-control inputStock"
                defaultValue=""
                min="0"
              />
            </div>
          </div>
          <div className="d-flex justify-content-between mt-2">
            <div className="mr-2 p-0">
              {/* <p className="loginRegister mb-0">Size</p> */}
              <div className="pb-2 btn-group btn-block">
                <button
                  className={`btn
                ${
                  !this.state.size39 ? "btn-outline-secondary" : "btn-secondary"
                } 
              `}
                  onClick={async () => {
                    if (this.state.size39) {
                      this.size39.value = "";
                      return this.setState({ size39: "" });
                    }
                    await this.setState({ size39: "39" });
                  }}
                >
                  EU 39
                </button>
              </div>
              {/* <p className="loginRegister mb-0">Stock</p> */}
              <input
                disabled={!this.state.size39}
                ref={input => {
                  this.size39 = input;
                }}
                type="number"
                className="form-control inputStock"
                defaultValue=""
                min="0"
              />
            </div>
            <div className="mr-2 p-0">
              {/* <p className="loginRegister mb-0">Size</p> */}
              <div className="pb-2 btn-group btn-block">
                <button
                  className={`btn
                ${
                  !this.state.size40 ? "btn-outline-secondary" : "btn-secondary"
                } 
              `}
                  onClick={async () => {
                    if (this.state.size40) {
                      this.size40.value = "";
                      return this.setState({ size40: "" });
                    }
                    await this.setState({ size40: "40" });
                  }}
                >
                  EU 40
                </button>
              </div>
              {/* <p className="loginRegister mb-0">Stock</p> */}
              <input
                disabled={!this.state.size40}
                ref={input => {
                  this.size40 = input;
                }}
                type="number"
                className="form-control inputStock"
                defaultValue=""
                min="0"
              />
            </div>
            <div className="mr-2 p-0">
              {/* <p className="loginRegister mb-0">Size</p> */}
              <div className="pb-2 btn-group btn-block">
                <button
                  className={`btn
                ${
                  !this.state.size41 ? "btn-outline-secondary" : "btn-secondary"
                } 
              `}
                  onClick={async () => {
                    if (this.state.size41) {
                      this.size41.value = "";
                      return this.setState({ size41: "" });
                    }
                    await this.setState({ size41: "41" });
                  }}
                >
                  EU 41
                </button>
              </div>
              {/* <p className="loginRegister mb-0">Stock</p> */}
              <input
                disabled={!this.state.size41}
                ref={input => {
                  this.size41 = input;
                }}
                type="number"
                className="form-control inputStock"
                defaultValue=""
                min="0"
              />
            </div>
            <div className="mr-2 p-0">
              {/* <p className="loginRegister mb-0">Size</p> */}
              <div className="pb-2 btn-group btn-block">
                <button
                  className={`btn
                ${
                  !this.state.size42 ? "btn-outline-secondary" : "btn-secondary"
                } 
              `}
                  onClick={async () => {
                    if (this.state.size42) {
                      this.size42.value = "";
                      return this.setState({ size42: "" });
                    }
                    await this.setState({ size42: "42" });
                  }}
                >
                  EU 42
                </button>
              </div>
              {/* <p className="loginRegister mb-0">Stock</p> */}
              <input
                disabled={!this.state.size42}
                ref={input => {
                  this.size42 = input;
                }}
                type="number"
                className="form-control inputStock"
                defaultValue=""
                min="0"
              />
            </div>
            <div className="mr-2 p-0">
              {/* <p className="loginRegister mb-0">Size</p> */}
              <div className="pb-2 btn-group btn-block">
                <button
                  className={`btn
                ${
                  !this.state.size43 ? "btn-outline-secondary" : "btn-secondary"
                } 
              `}
                  onClick={async () => {
                    if (this.state.size43) {
                      this.size43.value = "";
                      return this.setState({ size43: "" });
                    }
                    await this.setState({ size43: "43" });
                  }}
                >
                  EU 43
                </button>
              </div>
              {/* <p className="loginRegister mb-0">Stock</p> */}
              <input
                disabled={!this.state.size43}
                ref={input => {
                  this.size43 = input;
                }}
                type="number"
                className="form-control inputStock"
                defaultValue=""
                min="0"
              />
            </div>
            <div className="p-0">
              {/* <p className="loginRegister mb-0">Size</p> */}
              <div className="pb-2 btn-group btn-block">
                <button
                  className={`btn
                ${
                  !this.state.size44 ? "btn-outline-secondary" : "btn-secondary"
                } 
              `}
                  onClick={async () => {
                    if (this.state.size44) {
                      this.size44.value = "";
                      return this.setState({ size44: "" });
                    }
                    await this.setState({ size44: "44" });
                  }}
                >
                  EU 44
                </button>
              </div>
              {/* <p className="loginRegister mb-0">Stock</p> */}
              <input
                disabled={!this.state.size44}
                ref={input => {
                  this.size44 = input;
                }}
                type="number"
                className="form-control inputStock"
                defaultValue=""
                min="0"
              />
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
            {/* <button
              className={`btn
                ${
                  this.state.category1 === "Boys"
                    ? "btn-secondary"
                    : "btn-outline-secondary"
                } 
              `}
              onClick={() => this.setState({ category1: "Boys" })}
            >
              BOYS
            </button>
            <button
              className={`btn
                ${
                  this.state.category1 === "Girls"
                    ? "btn-secondary"
                    : "btn-outline-secondary"
                } 
              `}
              onClick={() => this.setState({ category1: "Girls" })}
            >
              GIRLS
            </button> */}
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
            </div>
          </div>
        </div>
        {/* {this.onEditMessage()} */}
        <div className="bortopbot">
          <div className="row py-3">
            <button
              onClick={() => {
                console.log(this.state.gender);
              }}
              className="btnsavedit btn btn-outline-secondary"
            >
              CANCEL
            </button>
            <button
              onClick={() => {
                this.btnAddProductOnClick();
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

export default connect(
  null,
  { onAddProduct }
)(AddProduct);
