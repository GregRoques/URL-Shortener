import { Switch, Redirect, Route } from "react-router-dom";
import Home from "./Home";

const App = () => {
    const NoPage = () => {
        return (
            <Redirect push to="/" />);
    };

    const Redirector = () => {

    };

    return (
        <Switch>
            <Route path="/" exact Component={Home}/>
            <Route exact path=":hash" Component={Redirector()}/>
            <Route component={NoPage()}/>
        </Switch>
    );
};

export default App;
