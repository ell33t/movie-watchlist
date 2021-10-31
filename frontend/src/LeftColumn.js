// NPM MODULES
import React, { Component, Fragment } from 'react';
import MovieCard from "./MovieCard";

export default class LeftColumn extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    generatePageOfResults(list){
        if(typeof list != "undefined") {
            return list.map(item => this.generateMovieCards(item));
        }
    }

    generateMovieCards(item){
        if(typeof item != "undefined") {
            return (
                <MovieCard
                    key={item.imdbID}
                    Title={item.Title}
                    Poster={item.Poster}
                    Year={item.Year}
                    isSelected={this.props.selectedMovieIndex === item.imdbID}
                    handleSelect={this.props.handleMovieSelect.bind(this)}
                    imdbID={item.imdbID}
                    // index={this.props.results.findIndex(data => data.imdbID === item.imdbID)}
                    item={item}
                />
            );
        }
    }
    // countResults(total, totalList){
    //     if(typeof totalList != "undefined") {
    //         console.log(total, totalList.length);
    //         total = total + parseInt(totalList.length);
    //         console.log(total);
    //     }
    //
    //     return total;
    // }

    render() {
        // console.log(this.props);
        let total = 0;
        // let resultsTotal = this.props.results.map(list => this.countResults(total, list));
        this.props.results.forEach(list => {
            if(typeof list != "undefined") {
                total = total + parseInt(list.length);
            }
        });

        if(typeof this.props.results != "undefined") {
            return (
                <div className='left-container'>
                    <span className='results-count'> {total} Results </span>
                    {this.props.results.map(list => this.generatePageOfResults(list))}
                </div>
            );
        } else {
            return(
                <Fragment/>
            )
        }
    }
}