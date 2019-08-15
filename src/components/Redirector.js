import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

class Redirector extends Component {
    getHash = () => {
        const apiHost = "http://localhost:2000/redirect";
        axios.get(`${apiHost}/:hash`).then(res => {
            window.location.href(`http://${res.data}`);
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
