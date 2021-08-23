import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Button } from "@material-ui/core";
import Header from "./components/Header/Header";
import Homepage from "./components/Homepage/Homepage";
import Landing from "./components/Landing/Landing";
import ContactForm from "./components/contact-form/contact";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={Homepage}></Route>
          <Route path="/landing" component={Landing}></Route>
          <Route path="/contact" component={ContactForm}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
