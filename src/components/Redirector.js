import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

class Redirector extends Component {
    getHash = () => {
        const apiHost = "http://localhost:2000";
        const hash = this.props.match.params.hash;
        axios.get(`${apiHost}/${hash}`).then(res => {
            window.location.replace(`http://${res.data}`);
        }).catch(err => {
            console.log(err);
        });
    }

    componentDidMount () {
        this.getHash();
    }

    render () {
        return (
            < Redirect to ={{
                pathname: "/",
                state: { message: `Whoops...not a valid redirect. ${"\n"} Create a shortened url below.` }
            }}/>
        );
    };
};

export default Redirector;
