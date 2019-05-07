import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import { admin } from "../config/message";

class ManageUsers extends React.Component {
  render() {
    if (this.props.role === admin) {
      return (
        <div className="manageuser">
          <h1>ini ManageUsers</h1>
        </div>
      );
    }
    return <Redirect to="/home" />;
  }
}

const mapStateToProps = state => {
  return { role: state.auth.role };
};

export default connect(mapStateToProps)(ManageUsers);