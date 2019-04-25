import React from "react";
import { Link } from "react-router-dom";

class Footer extends React.Component {
  getDate = () => {
    const date = new Date();
    console.log(date.getFullYear());
    return date.getFullYear();
  };
  render() {
    return (
      <div className="footer text-center">
        <div className="footerbrand">
          <i className="fas fa-camera-retro" />
          Brand<b>Name</b>
        </div>
        <div className="footersocial mt-5">
          <Link to="" href="" className="mx-3">
            FACEBOOK
          </Link>
          <Link to="" href="" className="mx-3">
            TWITTER
          </Link>
          <Link to="" href="" className="mx-3">
            INSTAGRAM
          </Link>
        </div>
        <div className="mt-3">
          Copyright <i class="far fa-copyright" />{" "}
          <span>{this.getDate()} </span>
          <Link to="" href="/">
            Brand<b>Name</b>
          </Link>
        </div>
      </div>
    );
  }
}
export default Footer;
