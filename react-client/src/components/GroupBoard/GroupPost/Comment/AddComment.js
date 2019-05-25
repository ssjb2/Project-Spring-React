import React, { Component } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addComment } from "../../../../actions/backlogActions";
class AddComment extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      body: "",
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
    const { gp_id } = this.props.match.params;

    const newComment = {
      body: this.state.body
    };
    this.props.addComment(gp_id, newComment, this.props.history);
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="add-PBI">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to={`/dashboard`} className="btn btn-light">
                Back to Groups
              </Link>
              <h4 className="display-4 text-center">Add Comment</h4>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.body
                    })}
                    name="body"
                    placeholder="Comment... "
                    value={this.state.body}
                    onChange={this.onChange}
                  />
                  {errors.body && (
                    <div className="invalid-feedback">{errors.body}</div>
                  )}
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

AddComment.propTypes = {
  AddComment: PropTypes.func.isRequired,
  errors: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { addComment }
)(AddComment);
