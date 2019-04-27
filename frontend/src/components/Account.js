import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { connect } from "react-redux";

import { onEditUser, onEditPassword } from "../actions/index";
import { editUserSuccess } from "../config/message";

class Account extends React.Component {
  state = {
    gender: "",
    modal: false
  };

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
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

    this.props.onEditUser({ email, first_Name, last_Name, gender });
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
            this.props.message === editUserSuccess
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
    if (this.state.gender === "" && this.props.user.length !== 0) {
      var { gender } = this.props.user[0];
      this.setState({ gender });
    }
    if (this.props.user.length !== 0) {
      var { first_name, last_name, email } = this.props.user[0];
    }
    console.log(this.props.message);

    return (
      <div>
        <h4 className="mb-4">Account Settings</h4>

        <form className="register2">
          <div className="form-group">
            <p className="loginRegister mb-0">E-Mail</p>
            <input
              ref={input => {
                this.email = input;
              }}
              type="text"
              className="form-control"
              defaultValue={email}
            />
          </div>

          <div className="form-group">
            <p className="loginRegister mb-0">First Name</p>
            <input
              ref={input => {
                this.firstName = input;
              }}
              type="texy"
              className="form-control"
              defaultValue={first_name}
            />
          </div>
          <div className="form-group">
            <p className="loginRegister mb-0">Last Name</p>
            <input
              ref={input => {
                this.lastName = input;
              }}
              type="text"
              className="form-control"
              defaultValue={last_name}
            />
          </div>
        </form>
        <div className="form-group">
          <p className="loginRegister mb-0">Gender</p>
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
          <p className="loginRegister mb-0">Password</p>
          <button
            onClick={() => {
              this.toggle();
            }}
            className="btn btn-outline-secondary btn-block"
            ata-toggle="modal"
            data-target="#exampleModal"
          >
            Edit Password
          </button>
        </div>
        {this.onEditMessage()}
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
                this.onEditBtnClick();
              }}
              className="btnsavedit btn btn-outline-secondary"
            >
              SAVE
            </button>
          </div>
          <button
            // onClick={() => {
            //   console.log(this.state.gender);
            // }}
            className="btnsavedit btn btn-outline-secondary mt-3"
          >
            DELETE
          </button>
        </div>
        <Modal
          isOpen={this.state.modal}
          fade={false}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader className="border-0" toggle={this.toggle} />
          <h5 className="mt-1 text-center">Change Password</h5>

          <ModalBody>
            <div className="form-group">
              <p className="loginRegister mb-0">Old Password</p>
              <input
                ref={input => {
                  this.oldPass = input;
                }}
                type="password"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <p className="loginRegister mb-0">New Password</p>
              <input
                ref={input => {
                  this.newPass = input;
                }}
                type="password"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <p className="loginRegister mb-0">Confirm New Password</p>
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
            </button>{" "}
            <button
              className="btnsavedit btn btn-outline-secondary"
              onClick={this.toggle}
            >
              Cancel
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { user_id: state.auth.user_id, message: state.auth.message };
};

export default connect(
  mapStateToProps,
  { onEditUser, onEditPassword }
)(Account);
