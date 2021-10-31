// NPM MODULES
import React, { Component } from 'react';

export default class RightColumn extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        console.log(this.props.selectedMovie);
        return(
            <div className="right-container">
                right
            </div>
        );
    }
}