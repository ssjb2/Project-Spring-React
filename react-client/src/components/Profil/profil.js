import React, { Component } from "react";
import { connect } from "react-redux";
import { getProfile } from "../../actions/profileActions";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  inviteFriend,
  getFriends,
  getSentInv,
  getRecInv
} from "../../actions/friendsActions";

class Profil extends Component {
  constructor() {
    super();
    this.state = {
      errors: {}
    };
  }
  onSendInv = id => {
    this.props.inviteFriend(id);
    window.location.reload();
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  componentDidMount() {
    const { username } = this.props.match.params;
    this.props.getProfile(username);
    this.props.getFriends(this.props.security.user.username);
    this.props.getSentInv(this.props.security.user.username);
    this.props.getRecInv(this.props.security.user.username);
  }
  editProfilButton() {
    const { username } = this.props.match.params;
    const { friends } = this.props.friends;
    console.log("1");
    console.log(this.props.friends.sentInvs);
    {
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
      } else if (friends.filter(e => e.username === username).length > 0) {
        return <div className="btn btn-lg btn-success">Your friend</div>;
      } else if (
        friends.filter(e => e.username === username).length === 0 &&
        this.props.friends.sentInvs.filter(e => e.username === username)
          .length > 0
      ) {
        return <div className="btn btn-lg btn-info">Invite was sended</div>;
      } else if (
        friends.filter(e => e.username === username).length === 0 &&
        this.props.friends.recInvs.filter(e => e.username === username).length >
          0
      ) {
        return <div className="btn btn-lg btn-info">You are invited</div>;
      } else if (friends.filter(e => e.username === username).length === 0) {
        return (
          <div>
            <div
              className="btn btn-lg btn-info"
              onClick={this.onSendInv.bind(this, username)}
            >
              Add friend
            </div>
          </div>
        );
      }
    }
  }

  render() {
    const { profil } = this.props.profil;
    return (
      <div className="container col-sm-12 col-md-10 col-lg-8 col-xl-6">
        <div className="row col-sm-12 text-center bg-light">
          <div className="col-sm-4 pd-bot">
            <img src={profil.logo} className="rounded-circle profil pd-bot" />

            <br />
            {this.editProfilButton()}
            <br />
          </div>
          <div className="col-sm-8 text-center pd-top">
            <h2>{profil.username}</h2>
            <br />
            <div className="text-sm-left ">
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
    );
  }
}

Profil.propTypes = {
  profil: PropTypes.object.isRequired,
  getProfil: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired,
  inviteFriend: PropTypes.func.isRequired,
  friends: PropTypes.object.isRequired,
  sentInv: PropTypes.object.isRequired,
  recInv: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profil: state.profil,
  errors: state.errors,
  security: state.security,
  friends: state.friends
});

export default connect(
  mapStateToProps,
  { getProfile, inviteFriend, getFriends, getSentInv, getRecInv }
)(Profil);
