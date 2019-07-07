import React from "react"
import { Link } from "react-router-dom"
import axios from "../config/axios";

class ForgotPassword extends React.Component {
  state = {
    message: "",
    email: "",
    cssMessage: ""
  }
  onClickReset = async () => {
    const email = this.email.value
    if (email) {
      const res = await axios.get(`/send/email/${email}`)
      if (res.data === "success") {
        this.setState({
          message: "please check your email",
          cssMessage: "pforgotpass3"
        })
        setTimeout(
          this.resetMessage, 2000);

      } else {
        this.setState({
          message: res.data,
          cssMessage: "pforgotpass2"
        })
        setTimeout(
          this.resetMessage, 2000);
      }

    } else {
      this.setState({
        message: "please enter tou email",
        cssMessage: "pforgotpass2"
      })
      setTimeout(
        this.resetMessage, 2000);
    }
  }
  resetMessage = () => {
    this.setState({
      message: "",
      cssMessage: ""
    })
  }
  render() {
    console.log(this.state.message);

    return (
      <div className="forgotpass">
        <div className="divforgotpass">
          <form className="formforgotpass">
            <h5 className="h5forgotpass">reset password</h5>
            <p className="pforgotpass">Enter your email to receive instructions on how to reset your password.</p>
            <input
              className="inputforgotpass"
              type="email"
              ref={input => this.email = input}
              placeholder="email" />
          </form>
          <button
            className="btnforgotpass"
            onClick={this.onClickReset}
          >reset</button>
          <p className={`${this.state.cssMessage}`} hidden={!this.state.message}>{this.state.message}</p>
          <p className="pforgotpass">Or return to <Link className="linkforgotpass" to="/login">Log In.</Link></p>
        </div>
      </div>)
  }
}
export default ForgotPassword