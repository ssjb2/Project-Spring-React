import React, { Component } from "react";
import { Link } from "react-router-dom";
import Comment from "./Comment/Comment";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class GroupPost extends Component {
  editPost() {
    const { username } = this.props.group_post.author;
    const { group_post } = this.props;
    //console.log(this.props.security.user.username);
    if (username === this.props.security.user.username) {
      return (
        <Link
          to={`/updateGroupPost/${group_post.groupIdentifier}/${
            group_post.groupSequence
          }`}
          className="btn btn-primary"
        >
          Update
        </Link>
      );
    }
  }
  render() {
    const { group_post } = this.props;
    return (
      <div className="card mb-1 bg-light">
        <div className="card-header text-primary">
          Author:{" "}
          <Link to={`/profile/${group_post.author.username}`}>
            {group_post.author.username}
          </Link>{" "}
          {group_post.created_At}
        </div>

        <div className="card-body bg-light">
          <h5 className="card-title">{group_post.title}</h5>

          <p className="card-title">{group_post.body}</p>
          <p className="card-text text-truncate ">
            <i className="fas fa-check" /> {group_post.acceptanceCriteria}
          </p>
          <p className="card-text text-truncate ">
            time: <i className="fas fa-check" /> {group_post.dueDate}
          </p>
          {this.editPost()}

          <Link to={`/getComments/${group_post.id}`} className="btn btn-dark">
            Comments
          </Link>
        </div>
      </div>
    );
  }
}

GroupPost.propTypes = {
  security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  security: state.security
});
export default connect(
  mapStateToProps,
  {}
)(GroupPost);
