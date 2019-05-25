import React, { Component } from "react";
import { Link } from "react-router-dom";
import Comment from "./Comment/Comment";

class GroupPost extends Component {
  render() {
    const { group_post } = this.props;
    return (
      <div className="card mb-1 bg-light">
        <div className="card-header text-primary">
          Author: {group_post.author.username} {group_post.created_At}
        </div>

        <div className="card-body bg-light">
          <h5 className="card-title">{group_post.title}</h5>

          <p className="card-title">{group_post.body}</p>
          <p className="card-text text-truncate ">
            <i className="fas fa-check" /> {group_post.acceptanceCriteria}
          </p>
          <Link
            to={`/updateGroupPost/${group_post.groupIdentifier}/${
              group_post.groupSequence
            }`}
            className="btn btn-primary"
          >
            Update
          </Link>
          <Link to={`/addComment/${group_post.id}`} className="btn btn-danger">
            Comment
          </Link>
          <Link to={`/getComments/${group_post.id}`} className="btn btn-dark">
            Comments
          </Link>
        </div>
      </div>
    );
  }
}
export default GroupPost;
