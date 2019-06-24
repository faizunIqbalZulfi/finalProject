import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import Cookies from "universal-cookie";
import axios from "../config/axios";

const cookies = new Cookies();

class ModalUploadProof extends React.Component {
  state = {
    files: [],
    imagesPreviewUrls: [],
    modal: false,
    dropdown: false,
    paymentmethod_id: "",
    dropdownName: ""
  };
  toggleModal = bank_name => {
    if (bank_name) {
      this.setState(prevState => ({
        modal: !prevState.modal,
        dropdownName: bank_name,
        files: [],
        imagesPreviewUrls: []
      }));
    } else {
      this.setState(prevState => ({
        modal: !prevState.modal,
        files: [],
        imagesPreviewUrls: []
      }));
    }
  };
  chooseImage = e => {
    e.preventDefault();
    let imagesPreviewUrls = URL.createObjectURL(e.target.files[0]);
    this.setState({
      files: e.target.files,
      imagesPreviewUrls: [imagesPreviewUrls]
    });
  };
  uploadProof = async () => {
    if (this.state.files.length) {
      const formData = new FormData();
      await formData.append("paymentconfirm", this.state.files[0]);
      console.log(formData, this.state.files);

      await axios.patch(`/uploadproof/orders/${this.props.order_id}`, formData);
      await this.props.getOrderUser(cookies.get("user_id"));
      this.toggleModal();
    }
  };
  render() {
    return (
      <div>
        <button
          onClick={() => {
            this.toggleModal(this.props.bank_name);
          }}
          className="btnorderuser btn btn-outline-secondary form-control"
        >
          Upload Proof
        </button>
        {/* <button className="btnorderchange p-0">
          <i class="fas fa-edit mr-2" />
          Change Bank Account
        </button> */}
        <Modal
          isOpen={this.state.modal}
          fade={false}
          toggle={this.toggleModal}
          className={this.props.className}
        >
          <h5 className="mt-5 text-center">Upload Proof</h5>
          <ModalBody className="text-center">
            <img
              className="imgmodalproof"
              src={
                this.state.imagesPreviewUrls.length
                  ? this.state.imagesPreviewUrls[0]
                  : require("../images/picture.png")
              }
            />
            <input
              type="file"
              ref={input => (this.inputImage = input)}
              onChange={this.chooseImage}
            />
          </ModalBody>
          <div className="text-center">
            <button
              onClick={() => {
                this.uploadProof();
              }}
              className="btnmodalproof btn btn-outline-secondary mx-1 mb-3"
            >
              save
            </button>
            <button
              onClick={() => {
                this.toggleModal();
              }}
              className="btnmodalproof btn btn-outline-secondary mx-1 mb-3"
            >
              cancel
            </button>
          </div>
        </Modal>
      </div>
    );
  }
}
export default ModalUploadProof;
