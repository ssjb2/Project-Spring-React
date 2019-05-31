import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getComments } from "../../../../actions/backlogActions";
import CommentItem from "./CommentItem";
import { Link } from "react-router-dom";
class Comment extends Component {
  constructor() {
    super();
    this.state = {
      errro: {}
    };
  }

  componentDidMount() {
    const { gp_id } = this.props.match.params;
    console.log(gp_id);
    this.props.getComments(gp_id);
  }
  render() {
    const comments2 = this.props.comments;
    console.log(this.props.comments);
    const { gp_id } = this.props.match.params;

    return (
      <div className="projects">
        <div className="container">
          <div className="row">
            <button
              onClick={() => this.props.history.goBack()}
              className="btn btn-light"
            >
              Back to Group Board
            </button>
            <div>
              <Link to={`/addComment/${gp_id}`} className="btn btn-danger">
                Add Comment
              </Link>
            </div>
            <div className="col-md-12">
              <h1 className="display-4 text-center">Comments</h1>
              <br />
              {comments2.map(comment => (
                <CommentItem key={comment.id} comment={comment} />
              ))}

              <br />
              <hr />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Comment.propTypes = {
  comments: PropTypes.array.isRequired,
  getComments: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  comments: state.backlog.comments
});
export default connect(
  mapStateToProps,
  { getComments }
)(Comment);
