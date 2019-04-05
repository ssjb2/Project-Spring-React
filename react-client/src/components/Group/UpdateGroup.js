import React, { Component } from "react";
import { getGroup } from "../../actions/groupActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
class UpdateGroup extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getGroup(id, this.props.history);
  }
  render() {
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h5 className="display-4 text-center">Update Group form</h5>
              <hr />
              <form>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg "
                    placeholder="Group Name"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Unique Group ID"
                    disabled
                  />
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    placeholder="Group Description"
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
UpdateGroup.propTypes = {
  getGroup: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  group: state.group.group
});

export default connect(
  mapStateToProps,
  { getGroup }
)(UpdateGroup);
