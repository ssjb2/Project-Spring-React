import React, { Component } from "react";
import GroupPost from "./GroupPost/GroupPost";

class Backlog extends Component {
  render() {
    const { group_posts_prop } = this.props;

    const posts = group_posts_prop.map(group_post => (
      <GroupPost key={group_post.id} group_post={group_post} />
    ));
    let todoItems = [];
    let inProgressItems = [];
    let doneItems = [];

    for (let i = 0; i < posts.length; i++) {
      console.log(posts[i]);

      if (posts[i].props.group_post.status === "ACTIVE") {
        todoItems.push(posts[i]);
      }

      if (posts[i].props.group_post.status === "IN_GAME") {
        inProgressItems.push(posts[i]);
      }

      if (posts[i].props.group_post.status === "CLOSED") {
        doneItems.push(posts[i]);
      }
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className="card-header bg-secondary text-white">
                <h3>ACTIVE</h3>
              </div>
            </div>
            {todoItems}
          </div>
          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className="card-header bg-primary text-white">
                <h3>In Game</h3>
              </div>
            </div>
            {inProgressItems}
          </div>
          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className="card-header bg-success text-white">
                <h3>Closed</h3>
              </div>
            </div>
            {doneItems}
          </div>
        </div>
      </div>
    );
  }
}

export default Backlog;
