// NPM MODULES
import React, { Component, Fragment } from 'react';
import Header from "./Header";
import LeftColumn from "./LeftColumn";
import RightColumn from "./RightColumn";

export default class WatchListController extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        // Simple GET request using fetch
        //API key ba891029
        fetch('http://www.omdbapi.com/?s=Star&apikey=ba891029')
            .then(response => response.json())
            .then(data => this.setState({ results: data }));
    }

    render() {
        console.log(this.state.results);
        return(
            <Fragment>
                <Header/>
                <LeftColumn/>
                <RightColumn/>
            </Fragment>
        );
    }
}