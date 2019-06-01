import React, { Component } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Layout/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddGroup from "./components/Group/AddGroup";
import { Provider } from "react-redux";
import store from "./store";
import UpdateGroup from "./components/Group/UpdateGroup";
import Register from "./components/UserManagement/Register";
import Login from "./components/UserManagement/Login";
import jwt_decode from "jwt-decode";
import setJWTToken from "./securityUtils/setJWTToken";
import { SET_CURRENT_USER } from "./actions/types";
import { logout } from "./actions/securityActions";
import SecuredRoute from "./securityUtils/SecureRoute";
import Landing from "./components/Layout/Landing";
import AddGroupPost from "./components/GroupBoard/GroupPost/AddGroupPost";
import GroupBoard from "./components/GroupBoard/GroupBoard";
import UpdateGroupPost from "./components/GroupBoard/GroupPost/UpdateGroupPost";
import AddComment from "./components/GroupBoard/GroupPost/Comment/AddComment";
import Comment from "./components/GroupBoard/GroupPost/Comment/Comment";
import profil from "./components/Profil/profil";
import updateProfil from "./components/Profil/updateProfil";
import Friends from "./components/Friends/Friends";

const jwtToken = localStorage.jwtToken;

if (jwtToken) {
  setJWTToken(jwtToken);
  const decoded_jwtToken = jwt_decode(jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded_jwtToken
  });

  const currentTime = Date.now() / 1000;
  if (decoded_jwtToken.exp < currentTime) {
    store.dispatch(logout());
    window.location.href = "/";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />

            <Switch>
              <SecuredRoute exact path="/Dashboard" component={Dashboard} />
              <SecuredRoute exact path="/addGroup" component={AddGroup} />
              <SecuredRoute
                exact
                path="/updateGroup/:id"
                component={UpdateGroup}
              />
              <SecuredRoute
                exact
                path="/GroupBoard/:id"
                component={GroupBoard}
              />
              <SecuredRoute
                exact
                path="/addGroupPost/:id"
                component={AddGroupPost}
              />
              <Route
                exact
                path="/updateGroupPost/:backlog_id/:gp_id"
                component={UpdateGroupPost}
              />
              <SecuredRoute
                exact
                path="/addComment/:gp_id"
                component={AddComment}
              />
              <SecuredRoute
                exact
                path="/getComments/:gp_id"
                component={Comment}
              />
              <SecuredRoute
                exact
                path="/profile/:username"
                component={profil}
              />
              <SecuredRoute
                exact
                path="/profile/edit/:username"
                component={updateProfil}
              />
              <SecuredRoute exact path="/friends" component={Friends} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
