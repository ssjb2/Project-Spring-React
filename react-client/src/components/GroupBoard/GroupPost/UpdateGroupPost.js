import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import { getGroupPost, updateGroupPost } from "../../../actions/backlogActions";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
class UpdateGroupPost extends Component {
  constructor() {
    super();

    this.state = {
      id: "",
      title: "",
      groupSequence: "",
      body: "",
      acceptanceCriteria: "",
      status: "",
      dueDate: "",
      groupIdentifier: "",
      create_At: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    const { backlog_id, gp_id } = this.props.match.params;
    this.props.getGroupPost(backlog_id, gp_id, this.props.history);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    const {
      id,
      title,
      groupSequence,
      body,
      acceptanceCriteria,
      status,
      dueDate,
      groupIdentifier,
      create_At
    } = nextProps.group_post;

    this.setState({
      id,
      title,
      groupSequence,
      body,
      acceptanceCriteria,
      status,
      dueDate,
      groupIdentifier,
      create_At
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    this.props.updateGroupPost(
      this.state.groupIdentifier,
      this.state.groupSequence,
      UpdateGroupPost,
      this.props.history
    );
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="add-PBI">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link
                to={`/groupBoard/${this.state.groupIdentifier}`}
                className="btn btn-light"
              >
                Back to Group Board
              </Link>
              <h4 className="display-4 text-center">Update Post</h4>
              <p className="lead text-center">
                Group Name: {this.state.groupIdentifier} | Post ID:{" "}
                {this.state.groupSequence}{" "}
              </p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.body
                    })}
                    name="body"
                    placeholder="Say something"
                    value={this.state.body}
                    onChange={this.onChange}
                  />
                  {errors.body && (
                    <div className="invalid-feedback">{errors.body}</div>
                  )}
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    placeholder="Acceptance Criteria"
                    name="acceptanceCriteria"
                    value={this.state.acceptanceCriteria}
                    onChange={this.onChange}
                  />
                </div>
                <h6>Due Date</h6>
                <div className="form-group">
                  <input
                    type="datetime-local"
                    className="form-control form-control-lg"
                    name="dueDate"
                    value={this.state.dueDate}
                    onChange={this.onChange}
                  />
                </div>

                <div className="form-group">
                  <select
                    className="form-control form-control-lg"
                    name="status"
                    value={this.state.status}
                    onChange={this.onChange}
                  >
                    <option value="">Select Status</option>
                    <option value="TO_DO">ACTIVE</option>
                    <option value="IN_PROGRESS">IN GAME</option>
                    <option value="DONE">CLOSED</option>
                  </select>
                </div>

                <input
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UpdateGroupPost.propTypes = {
  getGroupPost: PropTypes.func.isRequired,
  group_post: PropTypes.object.isRequired,
  updateGroupPost: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  group_post: state.backlog.group_post,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getGroupPost, updateGroupPost }
)(UpdateGroupPost);
