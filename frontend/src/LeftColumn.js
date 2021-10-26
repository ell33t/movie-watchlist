// NPM MODULES
import React, { Component } from 'react';

export default class LeftColumn extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return(
            <div className='left-container'>
                <span className='results-count'> ### Results </span>
                <div className='movie-card'>
                    <img src="" alt='something'/>
                    <span className="movie-title">Movie Title</span>
                    <span className="movie-date">Movie date</span>
                </div>
            </div>
        );
    }
}