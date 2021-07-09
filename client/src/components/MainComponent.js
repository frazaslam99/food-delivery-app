import React from "react";
import Dashboard from "./Dashboard/index";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import store from '../store/store'

class MainComponent extends React.Component {
  render() {
    return (
      <Router>
        <Route path="/" component={Dashboard} />
      </Router>
    );
  }
}
export default MainComponent;
