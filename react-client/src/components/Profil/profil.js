import React, { Component } from "react";
import { connect } from "react-redux";
import { getProfile } from "../../actions/profileActions";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class Profil extends Component {
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
    const { username } = this.props.match.params;
    this.props.getProfile(username);
    const { security } = this.props.security;
  }
  editProfilButton() {
    const { username } = this.props.match.params;
    if (username === this.props.security.user.username) {
      return (
        <div>
          <Link
            to={`/profile/edit/${this.props.security.user.username}`}
            className="btn btn-lg btn-info"
          >
            Edit profil
          </Link>
        </div>
      );
    }
  }

  render() {
    const { profil } = this.props.profil;
    return (
      <div className="container ">
        <div className="row">
          <div className="col-sm-8 text-center">
            <div className="col-sm-12">
              <div className="col-xs-12 col-sm-8 bg-light">
                <div className="col-sm-4 text-center">
                  <img src={profil.logo} className="rounded-circle profil" />
                </div>
                <div className="col-sm-4 text-center">
                  <br />
                  {this.editProfilButton()}
                  <br />
                  <hr />
                </div>
                <h2>{profil.username}</h2>
                <p>
                  <strong>About: </strong>
                  {profil.about}
                </p>
                <p>
                  <strong>Hobbies: </strong> {profil.hobbies}
                </p>
                <p>
                  <strong>Games: </strong> {profil.games}
                </p>
                <p>
                  <strong>Age: </strong> {profil.age}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profil.propTypes = {
  profil: PropTypes.object.isRequired,
  getProfil: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profil: state.profil,
  errors: state.errors,
  security: state.security
});

export default connect(
  mapStateToProps,
  { getProfile }
)(Profil);
