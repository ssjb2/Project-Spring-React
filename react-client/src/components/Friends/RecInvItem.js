import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { declineFriend, acceptFriend } from "../../actions/friendsActions";
class RecInvItem extends Component {
  onDeleteClick = id => {
    this.props.declineFriend(id);
    window.location.reload();
  };
  onAcceptClick = id => {
    this.props.acceptFriend(id);
    window.location.reload();
  };
  render() {
    const { recInv } = this.props;
    console.log("1111");
    return (
      <div className="card mb-1 bg-light">
        <div className="card-header text-primary">
          <Link to={`/profile/${recInv.username}`}>{recInv.username}</Link>{" "}
        </div>
        <Link>
          <li
            className="list-group-item bg-danger"
            onClick={this.onDeleteClick.bind(this, recInv.username)}
          >
            <i className="fa fa-user-minus text-warning"> Decline</i>
          </li>
        </Link>
        <Link>
          <li
            className="list-group-item bg-success"
            onClick={this.onAcceptClick.bind(this, recInv.username)}
          >
            <i className="fa fa-user-plus text-dark"> Accept</i>
          </li>
        </Link>
      </div>
    );
  }
}
RecInvItem.propTypes = {
  declineFriend: PropTypes.func.isRequired,
  acceptFriend: PropTypes.func.isRequired
};

export default connect(
  null,
  { acceptFriend, declineFriend }
)(RecInvItem);
