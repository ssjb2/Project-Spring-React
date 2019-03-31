import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createGroup } from "../../actions/groupActions";

class AddGroup extends Component {
  constructor() {
    super();
    this.state = {
      groupName: "",
      groupIdentifier: "",
      description: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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
                    className="form-control form-control-lg "
                    placeholder="Group Name"
                    name="groupName"
                    value={this.state.groupName}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Unique Group ID"
                    name="groupIdentifier"
                    value={this.state.groupIdentifier}
                    onChange={this.onChange}
                  />
                </div>

                <div className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    placeholder="Group Description"
                    name="description"
                    value={this.state.description}
                    onChange={this.onChange}
                  />
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
  createGroup: PropTypes.func.isRequired
};

export default connect(
  null,
  { createGroup }
)(AddGroup);
