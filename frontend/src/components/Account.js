import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "../config/axios";

import {
  onEditUser,
  onEditPassword,
  onDeleteUser
} from "../store/actions/user";
import { editSuccess } from "../config/message";
// import Cookies from "universal-cookie";

const cookies = new Cookies();

class Account extends React.Component {
  state = {
    edit: true,
    gender: "",
    modalPassword: false,
    modalPhoto: false,
    files: [],
    imagesPreviewUrls: [],
    user: [],
    flagAva: true
  };

  componentDidMount() {
    this.getUser(cookies.get("user_id"));
    // this.getAddress(cookies.get("user_id"));
  }

  getUser = async user_id => {
    try {
      const res = await axios.get(`/user/${user_id}`);

      this.setState({
        user: res.data
      });
      if (res.data[0].avatar) {
        console.log(res.data[0].avatar);
        this.setState({
          imagesPreviewUrls: [
            `http://localhost:2404/show/avatar/${res.data[0].avatar}`
          ]
        });
      }
      console.log(this.state.user);
    } catch (e) {
      console.log(e);
    }
  };
  deleteAvatar = async user_id => {
    try {
      await axios.delete(`/delete/avatar/${user_id}`);
      this.setState({
        files: [],
        imagesPreviewUrls: []
      });
    } catch (e) {
      console.log(e);
    }
  };
  _handleImageChange = e => {
    e.preventDefault();
    let imagesPreviewUrls = URL.createObjectURL(e.target.files[0]);
    this.setState({
      files: e.target.files,
      imagesPreviewUrls: [imagesPreviewUrls]
    });
  };
  toggle = () => {
    this.setState(prevState => ({
      modalPassword: !prevState.modalPassword
    }));
  };
  togglePhoto = () => {
    this.setState(prevState => ({
      modalPhoto: !prevState.modalPhoto
    }));
  };
  onRadioBtnClick = gender => {
    this.setState({ gender });
  };
  onEditBtnClick = () => {
    const first_Name = this.firstName.value;
    const last_Name = this.lastName.value;
    const email = this.email.value;
    const gender = this.state.gender;
    const avatar = this.state.files;
    // const urlAvatar = this.state.imagesPreviewUrls;
    this.props.onEditUser({
      email,
      first_Name,
      last_Name,
      gender,
      avatar
      // urlAvatar
    });
    this.setState({ flagAva: !this.state.flagAva })
  };
  onEditPassBtnClick = () => {
    const password = this.oldPass.value;
    const newPass = this.newPass.value;
    const coNewPass = this.coNewPass.value;
    this.props.onEditPassword({ password, newPass, coNewPass });
    this.toggle();
  };
  onEditMessage = () => {
    if (this.props.message !== "") {
      return (
        <div
          className={
            this.props.message === editSuccess
              ? "alert alert-success mt-2 text-center"
              : "alert alert-danger mt-2 text-center"
          }
        >
          {this.props.message}
        </div>
      );
    } else {
      return null;
    }
  };

  render() {
    if (cookies.get("user_id")) {
      if (this.state.gender === "" && this.state.user.length !== 0) {
        var { gender } = this.state.user[0];
        this.setState({ gender });
      }
      if (this.state.user.length !== 0) {
        var { first_name, last_name, email, user_id } = this.state.user[0];
      }
      console.log(document.getElementsByClassName("imgAva")[0]);

      return (
        <div>
          <h4 className="mb-4">Account Settings</h4>

          <div className="photoProfile text-center">
            <input
              style={{ display: "none" }}
              type="file"
              ref={fileInput => (this.fileInput = fileInput)}
              onChange={this._handleImageChange}
            />
            <div className="avatar  m-0">
              <img
                className="imgAva"
                onClick={() => { this.setState({ flagAva: !this.state.flagAva }) }}
                src={
                  this.state.imagesPreviewUrls.length !== 0
                    ? this.state.imagesPreviewUrls[0]
                    : `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png`
                }
              />
              <div hidden={this.state.flagAva} className="btnAccountAva">
                <button
                  onClick={() => {
                    this.fileInput.click();
                  }}
                  className="btnEditAva"
                >
                  edit
                </button>
                <button
                  onClick={() => {
                    this.deleteAvatar(user_id);
                  }}
                  className="btnDeleteAva"
                >
                  delete
                </button>
              </div>
            </div>

            {/* <div hidden={this.state.edit}>
              <input
                style={{ display: "none" }}
                type="file"
                ref={fileInput => (this.fileInput = fileInput)}
                onChange={this._handleImageChange}
              />
              <button
                className="btn btn-outline-secondary mr-3"
                onClick={() => {
                  this.fileInput.click();
                }}
                // className="mt-2 btn btn-outline-secondary"
                // onClick={() => {
                //   this.togglePhoto();
                // }}
                // data-toggle="modal"
                // data-target="#exampleModal"
              >
                Upload Photo
              </button>
              <button
                className="btn btn-outline-danger"
                toggle={this.togglePhoto}
                onClick={() => {
                  this.setState({ files: [], imagesPreviewUrls: [] });
                }}
              >
                Delete
              </button>
            </div> */}
          </div>
          <form className="register2">
            <div className="form-group">
              <p className="pAccount mb-0">E-Mail</p>
              <input
                ref={input => {
                  this.email = input;
                }}
                type="text"
                className="inputAccount form-control"
                defaultValue={email}
              />
            </div>

            <div className="form-group">
              <p className="pAccount mb-0">First Name</p>
              <input
                ref={input => {
                  this.firstName = input;
                }}
                type="texy"
                className="inputAccount form-control"
                defaultValue={first_name}
              />
            </div>
            <div className="form-group">
              <p className="pAccount mb-0">Last Name</p>
              <input
                ref={input => {
                  this.lastName = input;
                }}
                type="text"
                className="inputAccount form-control"
                defaultValue={last_name}
              />
            </div>
          </form>
          <div className="form-group">
            <p className="pAccount mb-0">Gender</p>
            <div className="btn-group btn-block">
              <button
                className={
                  this.state.gender === "M"
                    ? "btn btn-secondary"
                    : "btn btn-outline-secondary"
                }
                onClick={() => this.onRadioBtnClick("M")}
              >
                Male
              </button>
              <button
                className={
                  this.state.gender === "F"
                    ? "btn btn-secondary"
                    : "btn btn-outline-secondary"
                }
                onClick={() => this.onRadioBtnClick("F")}
              >
                Female
              </button>
            </div>
          </div>
          <div className="form-group">
            <p className="pAccount mb-0">Password</p>
            <button
              onClick={() => {
                this.toggle();
              }}
              className="btnAccount btn-block"
              data-toggle="modal"
              data-target="#exampleModal"
            >
              Edit Password
            </button>
          </div>
          {this.onEditMessage()}
          <div className="bortopbot mb-5">
            <div className="row py-3">
              {/* <button
                onClick={() => {
                  console.log(this.state.gender);
                }}
                className="btnsavedit btn btn-outline-secondary"
              >
                CANCEL
              </button> */}
              <button
                onClick={() => {
                  this.onEditBtnClick();
                }}
                className="btnAccount ml-3"
              >
                SAVE
              </button>
              {/* <button
                onClick={() => {
                  this.props.onDeleteUser(this.props.user_id);
                }}
                className="btnsavedit btn btn-outline-danger"
              >
                DELETE
              </button> */}
            </div>
          </div>

          {/* MODAL PASSWORD */}
          <Modal
            isOpen={this.state.modalPassword}
            fade={false}
            toggle={this.toggle}
            className={this.props.className}
          >
            {/* <ModalHeader className="border-0" toggle={this.toggle} /> */}
            <h5 className="mt-5 text-center">Change Password</h5>

            <ModalBody>
              <div className="form-group">
                <p className="pAccount mb-0">Old Password</p>
                <input
                  ref={input => {
                    this.oldPass = input;
                  }}
                  type="password"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <p className="pAccount mb-0">New Password</p>
                <input
                  ref={input => {
                    this.newPass = input;
                  }}
                  type="password"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <p className="pAccount mb-0">Confirm New Password</p>
                <input
                  ref={input => {
                    this.coNewPass = input;
                  }}
                  type="password"
                  className="form-control"
                />
              </div>
            </ModalBody>

            <ModalFooter className="border-0">
              <button
                className="btnsavedit btn btn-outline-secondary"
                onClick={() => {
                  this.onEditPassBtnClick();
                }}
              >
                Save
              </button>
              {/* <Link to={`/`}> */}
              <button
                className="btnsavedit btn btn-outline-secondary"
                onClick={this.toggle}
              >
                Cancel
              </button>
              {/* </Link> */}
            </ModalFooter>
          </Modal>
        </div>
      );
    }
    return <Redirect to="/login" />;
  }
}

const mapStateToProps = state => {
  return { user_id: state.user.user_id, message: state.user.message };
};

export default connect(
  mapStateToProps,
  { onEditUser, onEditPassword, onDeleteUser }
)(Account);
