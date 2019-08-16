import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

class Redirector extends Component {
    state = {
        isRendered: false
    }

    getHash = () => {
        const apiHost = "http://localhost:2000";
        const hash = this.props.match.params.hash;
        axios.get(`${apiHost}/${hash}`).then(res => {
            window.location.replace(`http://${res.data}`);
        });
        setTimeout(() => {
            this.setState({
                isRendered: true
            });
        }, 2000);
    }

    componentDidMount () {
        this.getHash();
    }

    render () {
        if (this.state.isRendered) {
            return <Redirect to ={{
                pathname: "/",
                state: { message: `Whoops...not a valid redirect. ${"\n"} Create a shortened url below.` }
            }} />;
        } else {
            return (<div></div>);
        }
    };
};

export default Redirector;
