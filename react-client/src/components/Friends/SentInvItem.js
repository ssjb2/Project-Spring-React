import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { declineFriend, acceptFriend } from "../../actions/friendsActions";
class SentInvItem extends Component {
  render() {
    const { sentInv } = this.props;
    return (
      <div className="card mb-1 bg-light">
        <div className="card-header text-primary">
          <Link to={`/profile/${sentInv.username}`}>{sentInv.username}</Link>{" "}
        </div>
      </div>
    );
  }
}

export default SentInvItem;
