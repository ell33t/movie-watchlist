// NPM MODULES
import React, { Component, Fragment } from 'react';

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return(
            <Fragment>
                <input value={this.props.searchValue} name="searchValue" onChange={(e) => this.props.handleSearchChange(e) }/>
            </Fragment>
        );
    }
}