// NPM MODULES
import React, { Component, Fragment } from 'react';
import MovieCard from "./MovieCard";

export default class LeftColumn extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    generateMovieCards(item){
        return(
            <MovieCard
                Title={item.Title}
                Poster={item.Poster}
                Year={item.Year}
            />
        );
    }

    render() {
        console.log(this.props);
        if(typeof this.props.results != "undefined") {
            return (
                <div className='left-container'>
                    <span className='results-count'> ### Results </span>
                    {this.props.results.map(item => this.generateMovieCards(item))}
                </div>
            );
        } else {
            return(
                <Fragment/>
            )
        }
    }
}