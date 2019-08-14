import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

const apiHost = "http://localhost:2000";

class Redirector extends Component {
    componentDidMount () {
        const { match: { params } } = this.props;
        axios({
            methods: "POST",
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
