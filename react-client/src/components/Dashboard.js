import React, { Component } from "react";
import GroupItem from "./Group/GroupItem";

class Dashboard extends Component {
  render() {
    return (
      <div className="projects">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Groups</h1>
              <br />
              <a href="GroupForm.html" className="btn btn-lg btn-info">
                Create a Group
              </a>
              <br />
              <hr />
            </div>
            <GroupItem />
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
