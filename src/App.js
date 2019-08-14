import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import Redirector from "./components/Redirector";

class App extends Component {
    render () {
        return (
            <Switch>
                <Route exact path="/" component={ Home }/>
                <Route path="/:hash" component={ Redirector }/>
            </Switch>
        );
    }
};

export default App;
