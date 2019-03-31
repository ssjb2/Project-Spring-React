import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createGroup } from "../../actions/groupActions";
import classnames from "classnames";
class AddGroup extends Component {
  constructor() {
    super();
    this.state = {
      groupName: "",
      groupIdentifier: "",
      description: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  //life cycle hooks
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
    const newGroup = {
      groupName: this.state.groupName,
      groupIdentifier: this.state.groupIdentifier,
      description: this.state.description
    };
    this.props.createGroup(newGroup, this.props.history);
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h5 className="display-4 text-center">Create Group form</h5>
              <hr />
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg ", {
                      "is-invalid": errors.groupName
                    })}
                    name="groupName"
                    value={this.state.groupName}
                    onChange={this.onChange}
                  />
                  {errors.groupName && (
                    <div className="invalid-feedback">{errors.groupName}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg ", {
                      "is-invalid": errors.groupIdentifier
                    })}
                    placeholder="Unique Group ID"
                    name="groupIdentifier"
                    value={this.state.groupIdentifier}
                    onChange={this.onChange}
                  />
                  {errors.groupIdentifier && (
                    <div className="invalid-feedback">
                      {errors.groupIdentifier}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <textarea
                    className={classnames("form-control form-control-lg ", {
                      "is-invalid": errors.description
                    })}
                    placeholder="Group Description"
                    name="description"
                    value={this.state.description}
                    onChange={this.onChange}
                  />
                  {errors.description && (
                    <div className="invalid-feedback">{errors.description}</div>
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
AddGroup.propTypes = {
  createGroup: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { createGroup }
)(AddGroup);
