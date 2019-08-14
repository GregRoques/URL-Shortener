import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

class Redirector extends Component {
    getHash = () => {
        const apiHost = "http://localhost:2000";
        const { match: { params } } = this.props;

        axios({
            method: "GET",
            url: `${apiHost}/redirect`,
            data: {
                hash: params.hash
            }
        }).then(res => {
            window.location.href(`https:${res.data}`);
        }).catch(err => {
            console.log(err);
        });
    }

    async componentDidMount () {
        await this.getHash();
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
