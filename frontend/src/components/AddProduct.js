import React from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { connect } from "react-redux";

import { onAddProduct } from "../actions/index";

class AddProduct extends React.Component {
  state = {
    dropdownOpen: false,
    category1: "",
    category2: "",
    files: [],
    imagesPreviewUrls: []
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
    console.log(e.target.innerText);
  };

  btnAddProductOnClick = () => {
    const product_name = this.product_name.value;
    const description = this.description.value;
    const price = this.price.value;
    const qty = this.qty.value;
    const category1 = this.state.category1;
    const category2 = this.state.category2;
    const files = this.state.files;

    this.props.onAddProduct({
      product_name,
      description,
      price,
      qty,
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
          <div className="form-group">
            <p className="loginRegister mb-0">Stock</p>
            <input
              ref={input => {
                this.qty = input;
              }}
              type="number"
              className="form-control"
            />
          </div>
        </form>
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
            <button
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
                      className="close"
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
