import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteGroup, joinGroup } from "../../actions/groupActions";
class GroupItem extends Component {
  onDeleteClick = id => {
    this.props.deleteGroup(id);
  };
  onJoinClick = id => {
    this.props.joinGroup(id);
    window.location.reload();
  };

  userInGroup() {
    let x = 0;
    const { group } = this.props;
    console.log(group);
    console.log(group.usersInGroup);
    if (group.countUsers === 0) {
      return (
        <li
          className="list-group-item join"
          onClick={this.onJoinClick.bind(this, group.groupIdentifier)}
        >
          <i className="fa fa-plus pr-1"> Join group</i>
        </li>
      );
    }
    for (const prop in group.usersInGroup) {
      console.log(this.props.security.user.username + "js");
      console.log(group.usersInGroup);
      console.log(group.countUsers + "sd");
      console.log(group);
      if (
        group.usersInGroup[prop].username === this.props.security.user.username
      )
        x = 1;
    }
    if (x === 0) {
      return (
        <li
          className="list-group-item join"
          onClick={this.onJoinClick.bind(this, group.groupIdentifier)}
        >
          <i className="fa fa-plus pr-1"> Join group</i>
        </li>
      );
    } else {
      return (
        <li className="list-group-item bg-light">
          <i className="fas fa-user-check text-info"> You are a member</i>
        </li>
      );
    }
  }
  render() {
    const { group } = this.props;
    return (
      <div className="container">
        <div className="card card-body bg-light mb-3">
          <div className="row">
            <div className="col-2">
              <span className="mx-auto">{group.groupIdentifier}</span>
            </div>
            <div className="col-lg-6 col-md-4 col-8">
              <h3>{group.groupName}</h3>
              <p>{group.description}</p>
              <p>Members: {group.countUsers}</p>
            </div>

            <div className="col-md-4 d-none d-lg-block">
              <ul className="list-group">
                <Link to={`/GroupBoard/${group.groupIdentifier}`}>
                  <li className="list-group-item board">
                    <i className="fa fa-flag-checkered pr-1"> Group Board </i>
                  </li>
                </Link>
                {/*<Link to={`/updateGroup/${group.groupIdentifier}`}>
                  <li className="list-group-item update">
                    <i className="fa fa-edit pr-1"> Update Group Info</i>
                  </li>
    </Link>*/}
                {/* 
                <li
                  className="list-group-item delete"
                  onClick={this.onDeleteClick.bind(this, group.groupIdentifier)}
                >
                  <i className="fa fa-minus-circle pr-1"> Delete Group</i>
</li>
*/}

                <div>{this.userInGroup()}</div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

GroupItem.propTypes = {
  deleteGroup: PropTypes.func.isRequired,
  security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  security: state.security
});
export default connect(
  mapStateToProps,
  { deleteGroup, joinGroup }
)(GroupItem);
