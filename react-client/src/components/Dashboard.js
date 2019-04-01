import React, { Component } from "react";
import GroupItem from "./Group/GroupItem";
import CreateGroupButton from "./Group/CreateGroupButton";
import { connect } from "react-redux";
import { getGroups } from "../actions/groupActions";
import PropTypes from "prop-types";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getGroups();
  }

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
Dashboard.propTypes = {
  groups: PropTypes.object.isRequired,
  getGroups: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  group: state.group
});
export default connect(
  mapStateToProps,
  { getGroups }
)(Dashboard);
