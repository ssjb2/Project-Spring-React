import React, { Component } from "react";
import { Link } from "react-router-dom";

class GroupPost extends Component {
  render() {
    const { group_post } = this.props;
    return (
      <div className="card mb-1 bg-light">
        <div className="card-header text-primary">
          ID: {group_post.groupSequence}
        </div>
        <div className="card-body bg-light">
          <h5 className="card-title">{group_post.title}</h5>

          <h5 className="card-title">{group_post.body}</h5>
          <p className="card-text text-truncate ">
            {group_post.acceptanceCriteria}
          </p>
          <Link
            to={`/updateGroupPost/${group_post.groupIdentifier}/${
              group_post.groupIdentifier
            }`}
            className="btn btn-primary"
          >
            View / Update
          </Link>

          <button className="btn btn-danger ml-4">Delete</button>
        </div>
      </div>
    );
  }
}
export default GroupPost;
