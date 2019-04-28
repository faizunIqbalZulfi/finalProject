import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { admin } from "../config/message";

class ManageProducts extends React.Component {
  render() {
    if (this.props.role === admin) {
      return (
        <div className="mt-5">
          <h1>ini ManageProducts</h1>
        </div>
      );
    }
    return <Redirect to="/home" />;
  }
}

const mapStateToProps = state => {
  return { role: state.auth.role };
};

export default connect(mapStateToProps)(ManageProducts);
