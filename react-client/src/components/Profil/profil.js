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
      <div className="container col-sm-12 col-md-10 col-lg-8 col-xl-6">
        <div class="row col-sm-12 text-center bg-light">
          <div className="col-sm-4 pd-bot">
            <img src={profil.logo} className="rounded-circle profil pd-bot" />

            <br />
            {this.editProfilButton()}
            <br />
          </div>
          <div className="col-sm-8 text-center pd-top">
            <h2>{profil.username}</h2>
            <br />
            <p class="text-sm-left ">
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
            </p>
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
