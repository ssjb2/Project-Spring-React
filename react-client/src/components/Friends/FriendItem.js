import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class FriendItem extends Component {
  render() {
    const { friend } = this.props;
    return (
      <div className="card mb-1 bg-light">
        <div className="card-header text-primary">
          <Link to={`/profile/${friend.username}`}>{friend.username}</Link>{" "}
        </div>
      </div>
    );
  }
}

export default FriendItem;
