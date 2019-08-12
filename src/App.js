import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
// import Redirector from "./Redirector";

const App = () => {
    return (
        <div>
            <Switch>
                <Route path="/" exact component={ Home }/>
                {/* <Route exactpath="/:hash" Component={ Redirector }/> */}
            </Switch>
        </div>
    );
};

export default App;
