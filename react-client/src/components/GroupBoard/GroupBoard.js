import React, { Component } from "react";
import { Link } from "react-router-dom";
import Backlog from "./Backlog";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getBacklog } from "../../actions/backlogActions";
class GroupBoard extends Component {
  constructor() {
    super();
    this.state = {
      errors: {}
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getBacklog(id);
  }
  render() {
    const { id } = this.props.match.params;
    const { group_posts } = this.props.backlog;
    const { errors } = this.state;

    let BoardContent;

    const boardAlgorithm = (errors, group_posts) => {
      if (group_posts.length < 1) {
        if (errors.groupNotFound) {
          return (
            <div className="alert alert-danger text-center" role="alert">
              {errors.groupNotFound}
            </div>
          );
        } else {
          return (
            <div className="alert alert-info text-center" role="alert">
              No Posts on this board
            </div>
          );
        }
      } else {
        return <Backlog group_posts_prop={group_posts} />;
      }
    };

    BoardContent = boardAlgorithm(errors, group_posts);
    return (
      <div className="container">
        <Link to={`/addGroupPost/${id}`} className="btn btn-primary mb-3">
          <i className="fas fa-plus-circle"> Create Post</i>
        </Link>
        <br />
        <hr />
        {BoardContent}
      </div>
    );
  }
}

GroupBoard.propTypes = {
  backlog: PropTypes.object.isRequired,
  getBacklog: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  backlog: state.backlog,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getBacklog }
)(GroupBoard);
