import React, { Component } from "react";
import {
  getFriends,
  getRecInv,
  getSentInv,
  acceptFriend,
  inviteFriend,
  declineFriend
} from "../../actions/friendsActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import FriendItem from "./FriendItem";
import RecInvItem from "./RecInvItem";
import SentInvItem from "./SentInvItem";
class Friends extends Component {
  componentDidMount() {
    this.props.getFriends();
    this.props.getSentInv();
    this.props.getRecInv();
  }
  sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if (new Date().getTime() - start > milliseconds) {
        break;
      }
    }
  }
  checkFriends() {
    const friends = this.props.friends.friends;
    {
      if (friends) {
        {
          return friends.map(friend => (
            <FriendItem key={friend.id} friend={friend} />
          ));
        }
      }
    }
  }
  checkSentInv() {
    const sentInvs = this.props.friends.sentInvs;
    {
      if (sentInvs) {
        {
          return sentInvs.map(sentInv => (
            <SentInvItem key={sentInv.id} sentInv={sentInv} />
          ));
        }
      }
    }
  }
  checkRecInv() {
    const recInvs = this.props.friends.recInvs;
    {
      if (recInvs) {
        {
          return recInvs.map(recInv => (
            <RecInvItem key={recInv.id} recInv={recInv} />
          ));
        }
      }
    }
  }
  render() {
    const friends = this.props.friends.friends;
    const recInvs = this.props.friends.recInvs;
    const sentInvs = this.props.friends.sentInvs;
    console.log("fr");
    console.log(friends);
    console.log("fr2");
    console.log(recInvs);
    console.log("fr3");
    console.log(sentInvs);
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className="card-header bg-secondary text-white">
                <h3>Friends</h3>
              </div>
            </div>{" "}
            {this.checkFriends()}
          </div>
          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className="card-header bg-primary text-white">
                <h3>Received invites</h3>
              </div>
            </div>
            {this.checkRecInv()}
          </div>
          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className="card-header bg-success text-white">
                <h3>Sended invites</h3>
              </div>
            </div>
            {this.checkSentInv()}
          </div>
        </div>
      </div>
    );
  }
}
Friends.propTypes = {
  friends: PropTypes.object.isRequired,
  sentInv: PropTypes.object.isRequired,
  recInv: PropTypes.object.isRequired,
  acceptFriend: PropTypes.func.isRequired,
  declineFriend: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  friends: state.friends,
  sentInv: state.sentInvs,
  recInv: state.recInvs
});
export default connect(
  mapStateToProps,
  {
    inviteFriend,
    declineFriend,
    acceptFriend,
    getFriends,
    getRecInv,
    getSentInv
  }
)(Friends);
