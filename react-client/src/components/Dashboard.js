import React, { Component } from "react";
import GroupItem from "./Group/GroupItem";
import CreateGroupButton from "./Group/CreateGroupButton";

class Dashboard extends Component {
  render() {
    return (
      <div className="projects">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Groups</h1>
              <br />
              <CreateGroupButton />
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
