import { Switch, Redirect, Route } from 'react-router-dom';
import Home from './Home';
import axios from 'axios';
import baseUrl from './FirebaseUrl';

const App = () => {
    const NoPage = () => {
        return (
            <Redirect push to="/" />);
    };

    const Redirector = () =>{
        const hash = geturlparams.hash
        console.log(hash)
        axios.get(`${baseUrl}.json`)
        .then(req=>{
            console.log(req.originalUrl)
        })
        .catch(err=>{
            console.log(err)
        })

    };

    return(
        <Switch>
            <Route path="/" exact Component={Home}/>
            <Route exact path=":hash" Component={Redirector()}/>
            <Route component={NoPage()}/>
        </Switch>
    );
};

export default App;