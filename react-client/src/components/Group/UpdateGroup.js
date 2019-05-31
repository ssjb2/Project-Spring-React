import React, { Component } from "react";
import { getGroup, createGroup } from "../../actions/groupActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
class UpdateGroup extends Component {
  constructor() {
    super();

    this.state = {
      id: "",
      groupName: "",
      groupIdentifier: "",
      description: "",
      countUsers: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    const {
      id,
      groupName,
      groupIdentifier,
      description,
      countUsers
    } = nextProps.group;

    this.setState({ id, groupName, groupIdentifier, description, countUsers });
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getGroup(id, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    const updateGroup = {
      id: this.state.id,
      groupName: this.state.groupName,
      groupIdentifier: this.state.groupIdentifier,
      description: this.state.description,
      countUsers: this.state.countUsers
    };

    this.props.createGroup(updateGroup, this.props.history);
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h5 className="display-4 text-center">Update Group form</h5>
              <hr />
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg ", {
                      "is-invalid": errors.groupName
                    })}
                    placeholder="Group Name"
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
                    className="form-control form-control-lg"
                    placeholder="Unique Group ID"
                    name="groupIdentifier"
                    disabled
                    value={this.state.groupIdentifier}
                  />
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
UpdateGroup.propTypes = {
  getGroup: PropTypes.func.isRequired,
  createGroup: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  group: state.group.group,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getGroup, createGroup }
)(UpdateGroup);
