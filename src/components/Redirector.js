import React, { Component } from "react";

export default class Redirector extends Component {
    componentDidMount () {
        const UrlHash = window.location.pathname.replace(/[/]/, "");
    }

    render () {

    }
};
