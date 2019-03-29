import React, { Component } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Layout/Header";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AddGroup from "./components/Group/AddGroup";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Route exact path="/Dashboard" component={Dashboard} />

          <Route exact path="/addGroup" component={AddGroup} />
        </div>
      </Router>
    );
  }
}

export default App;
