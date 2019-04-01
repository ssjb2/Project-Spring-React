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
    const groups = this.props.group.groups;
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
            {groups.map(group => (
              <GroupItem key={group.id} group={group} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
Dashboard.propTypes = {
  group: PropTypes.object.isRequired,
  getGroups: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  group: state.group
});
export default connect(
  mapStateToProps,
  { getGroups }
)(Dashboard);
