import React from "react";

import axios from "../config/axios";

class Users extends React.Component {
  state = {
    users: []
  };

  componentDidMount() {
    this.getAlluser();
  }
  getAlluser = async () => {
    const res = await axios.get("/get/alluser");
    console.log(res);
    this.setState({ users: res.data });
  };
  activeBanned = async (status, user_id) => {
    const ask = window.confirm("are you sure ?")
    if (ask) {
      await axios.patch(`/edit/status/${status}/${user_id}`)
      this.getAlluser()
    }
  }
  renderUsers = () => {
    return this.state.users.map(obj => {
      return (
        <tr>
          {/* <th className="px-0">No</th> */}
          <td className="px-0 align-middle" scope="col">
            {obj.user_id}
          </td>
          <td className="px-0 align-middle" scope="col">
            {obj.username}
          </td>
          <td className="px-0 align-middle" scope="col">
            {obj.email}
          </td>
          <td className="px-0 align-middle" scope="col">
            {obj.first_name}
          </td>
          <td className="px-0 align-middle" scope="col">
            {obj.last_name}
          </td>
          <td className="px-0 align-middle" scope="col">
            {obj.avatar ? (
              <img
                className="imgordersadmin"
                src={`http://localhost:2404/show/avatar/${obj.avatar}`}
              />
            ) : null}
          </td>
          <td className={`px-0 align-middle ${obj.status ? "bg-success" : "bg-danger"}`} scope="col">
            {obj.status ? "active" : "banned"}
          </td>
          <td className="px-0 align-middle" scope="col">
            {obj.role}
          </td>
          <td className="px-0 align-middle" scope="col">
            {obj.status ? <button onClick={() => { this.activeBanned(false, obj.user_id) }} className="btnorders btn btn-danger">banned</button> : <button onClick={() => { this.activeBanned(true, obj.user_id) }} className="btnorders btn btn-success">active</button>}
          </td>
        </tr>
      );
    });
  };
  render() {
    return (
      <div>
        <h4 className="mb-4">Users</h4>
        <table class="table table-striped">
          <thead className="theadorders text-center">
            <tr>
              {/* <th className="px-0">No</th> */}
              <th className="px-0" scope="col">
                id
              </th>
              <th className="px-0" scope="col">
                username
              </th>
              <th className="px-0" scope="col">
                email
              </th>
              <th className="px-0" scope="col">
                first name
              </th>
              <th className="px-0" scope="col">
                last name
              </th>
              <th className="px-0" scope="col">
                avatar
              </th>
              <th className="px-0" scope="col">
                status
              </th>
              <th className="px-0" scope="col">
                role
              </th>
              <th className="px-0" scope="col">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="tbodyorders text-center">
            {this.renderUsers()}
          </tbody>
        </table>
      </div>
    );
  }
}
export default Users;
