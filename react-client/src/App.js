import React, { Component } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Layout/Header";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AddGroup from "./components/Group/AddGroup";
import { Provider } from "react-redux";
import store from "./store";
import UpdateGroup from "./components/Group/UpdateGroup";
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />
            <Route exact path="/Dashboard" component={Dashboard} />
            <Route exact path="/addGroup" component={AddGroup} />
            <Route exact path="/updateGroup/:id" component={UpdateGroup} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
