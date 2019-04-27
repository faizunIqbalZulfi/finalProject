import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Cookies from "universal-cookie";

import axios from "../config/axios";

const cookies = new Cookies();

class Addresses extends React.Component {
  render() {
    // console.log(this.props.addresses);
    console.log(this.props.user_id);

    return (
      <div>
        <h4 className="mb-4">Address</h4>
        {this.props.addresses.length !== 0
          ? this.props.addresses.map((address, index) => {
              return (
                <div key={index} class="address">
                  <div class="card-body p-0">
                    <h5 class="card-title">{address.address_name}</h5>
                    <p class="card-text">{address.address1}</p>
                    <p class="card-text">
                      {address.city} <span>{address.pos_code}</span>
                    </p>
                    <p className="card-text">{address.no_telp}</p>
                    <Link
                      to={`/setting/${address.address_id}`}
                      class="card-link"
                    >
                      Edit
                    </Link>
                    <a href="#" class="card-link">
                      Delete
                    </a>
                  </div>
                </div>
              );
            })
          : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { user_id: state.auth.user_id };
};
export default connect(mapStateToProps)(Addresses);
