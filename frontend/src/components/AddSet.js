import React from "react";
import Cookies from "universal-cookie";
import axios from "../config/axios";

const cookies = new Cookies();

class AddSet extends React.Component {
  state = {
    address: []
  };

  componentDidMount() {
    this.getAddress();
  }

  getAddress = async () => {
    try {
      const res = await axios.get(`/edit/address/${cookies.get("address_id")}`);
      this.setState({ address: res.data });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    if (this.state.address.length !== 0) {
      var {
        address_name,
        address1,
        no_telp,
        city,
        pos_code
      } = this.state.address[0];
    }
    console.log(address1);

    return (
      <div>
        <h4 className="mb-4">Address Settings</h4>
        <form className="register2">
          <div className="form-group">
            <p className="loginRegister mb-0">address_name</p>
            <input
              ref={input => {
                this.email = input;
              }}
              type="text"
              className="form-control"
              defaultValue={address_name}
            />
          </div>
          <div className="form-group">
            <p className="loginRegister mb-0">address</p>
            <input
              ref={input => {
                this.address = input;
              }}
              className="form-control"
              id="exampleFormControlTextarea"
              rows="3"
              defaultValue={address1}
            />
          </div>

          <div className="form-group">
            <p className="loginRegister mb-0">City</p>
            <input
              ref={input => {
                this.firstName = input;
              }}
              type="texy"
              className="form-control"
              defaultValue={city}
            />
          </div>
          <div className="form-group">
            <p className="loginRegister mb-0">pos_code</p>
            <input
              ref={input => {
                this.lastName = input;
              }}
              type="text"
              className="form-control"
              defaultValue={pos_code}
            />
          </div>
          <div className="form-group">
            <p className="loginRegister mb-0">phone number</p>
            <input
              ref={input => {
                this.lastName = input;
              }}
              type="text"
              className="form-control"
              defaultValue={no_telp}
            />
          </div>
        </form>
        {/* {this.onEditMessage()} */}
        <div className="bortopbot">
          <div className="row py-3">
            <button
              //   onClick={() => {
              //     console.log(this.state.gender);
              //   }}
              className="btnsavedit btn btn-outline-secondary"
            >
              CANCEL
            </button>
            <button
              //   onClick={() => {
              //     this.onEditBtnClick();
              //   }}
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

export default AddSet;
