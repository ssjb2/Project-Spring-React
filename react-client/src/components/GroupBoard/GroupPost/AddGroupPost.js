import React, { Component } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addGroupPost } from "../../../actions/backlogActions";
class AddGroupPost extends Component {
  constructor(props) {
    super(props);
    const { id } = this.props.match.params;

    this.state = {
      title: "",
      body: "",
      acceptanceCriteria: "",
      status: "",
      dueDate: "",
      groupIdentifier: id,
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newPost = {
      title: this.state.title,
      body: this.state.body,
      acceptanceCriteria: this.state.acceptanceCriteria,
      status: this.state.status,
      dueDate: this.state.dueDate
    };
    this.props.addGroupPost(
      this.state.groupIdentifier,
      newPost,
      this.props.history
    );
  }
  render() {
    const { id } = this.props.match.params;
    const { errors } = this.state;
    return (
      <div className="add-PBI">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to={`/groupBoard/${id}`} className="btn btn-light">
                Back to Group Board
              </Link>
              <h4 className="display-4 text-center">Add Post</h4>
              <p className="lead text-center">Group Name + Group Code</p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.title
                    })}
                    name="title"
                    placeholder="title "
                    value={this.state.title}
                    onChange={this.onChange}
                  />
                  {errors.title && (
                    <div className="invalid-feedback">{errors.title}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.body
                    })}
                    name="body"
                    placeholder="Post "
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
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="IN_GAME">IN GAME</option>
                    <option value="CLOSED">CLOSED</option>
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

AddGroupPost.propTypes = {
  AddGroupPost: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { addGroupPost }
)(AddGroupPost);
