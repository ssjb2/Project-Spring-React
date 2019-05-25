import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
class CommentItem extends Component {
  render() {
    const { comment } = this.props;
    return (
      <div className="container">
        <div className="card card-body bg-light mb-3">
          <div className="row">
            <div className="col-lg-6 col-md-4 col-8">
              <p>
                Author: {comment.author.username} {comment.created_At}
              </p>
              <p>{comment.body}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CommentItem;
