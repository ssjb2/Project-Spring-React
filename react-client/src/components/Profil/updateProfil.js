import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import { getProfile, updateProfile } from "../../actions/profileActions";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
class UpdateProfil extends Component {
  constructor() {
    super();

    this.state = {
      logo: "",
      about: "",
      hobbies: "",
      games: "",
      age: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    const { username } = this.props.match.params;
    console.log(username);
    this.props.getProfile(username);
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    const { logo, about, hobbies, games, age } = nextProps.profil.profil;

    this.setState({
      logo,
      about,
      hobbies,
      games,
      age
    });
    console.log("xd");
    console.log(this.state);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const { username } = this.props.match.params;
    const updateProfil = {
      logo: this.state.logo,
      about: this.state.about,
      hobbies: this.state.hobbies,
      games: this.state.games,
      age: this.state.age
    };
    this.props.updateProfile(username, updateProfil, this.props.history);
  }
  render() {
    const { errors } = this.state;
    const { username } = this.props.match.params;
    console.log(this.state);
    console.log(this.props);
    return (
      <div className="add-PBI">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to={`/profile/${username}`} className="btn btn-light">
                Back to Profil
              </Link>
              <h4 className="display-4 text-center">Update Profil</h4>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    name="logo"
                    value={this.state.logo}
                    onChange={this.onChange}
                    placeholder="link to photo"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    name="about"
                    value={this.state.about}
                    onChange={this.onChange}
                    placeholder="about"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    name="hobbies"
                    value={this.state.hobbies}
                    onChange={this.onChange}
                    placeholder="hobby"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    name="games"
                    value={this.state.games}
                    onChange={this.onChange}
                    placeholder="your games"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    name="age"
                    value={this.state.age}
                    onChange={this.onChange}
                    placeholder="age"
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

UpdateProfil.propTypes = {
  getProfile: PropTypes.func.isRequired,
  profil: PropTypes.object.isRequired,
  updateProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profil: state.profil
});

export default connect(
  mapStateToProps,
  { getProfile, updateProfile }
)(UpdateProfil);
