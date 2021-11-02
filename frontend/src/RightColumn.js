// NPM MODULES
import React, { Component } from 'react';

import IconBookmark from './assets/icons8-bookmark.svg';
import SolidIconBookmark from './assets/icons8-bookmark-solid.svg'
import IconSearch from "./assets/icons8-search.svg";

export default class RightColumn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedMovieID:props.selectedMovieID,
            selectedMovie:null,
        }
    }

    componentDidMount() {
        console.log('yep');
        fetch('http://www.omdbapi.com/?i='+ this.props.selectedMovieID + '&apikey=ba891029')
            .then(response => response.json())
            .then(data => this.setState(prevState => ({ selectedMovie: data})));
            // .then(data => {
            //     console.log(data);
            // })
    }

    render() {
        if(this.state.selectedMovieID !== 1 && this.state.selectedMovie != null){
            console.log("Here: ", this.props) ;
            console.log("Here: ", this.state.selectedMovie) ;
            let posterStyle = null;
            // if(typeof this.props.Title !== "undefined") {
            posterStyle =
                {
                    "backgroundImage": 'url(' + this.state.selectedMovie.Poster + ')',
                    "backgroundColor": '#666666',
                    "width": "220px",
                    "height": "340px",
                    "backgroundSize": "cover",
                    "backgroundPosition": "center",
                    "borderRadius": "10px",
                    // "margin": "1.5rem",
                    "order": "0",
                    "flex": "0 1 auto",
                    "alignSelf": "auto",
                }
            // };

            return (
                <div className="right-container" key={this.state.selectedMovieID}>
                    <div className='row'>
                        <div className='column'>
                            <div style={posterStyle}>&nbsp;</div>
                        </div>
                        <div className='column'>
                            <div className='button'>
                                <img src={IconBookmark} className="icon-bookmark" alt="Watch List Icon" height="20px"/>
                                Watch List
                            </div>
                            <h1>{this.state.selectedMovie.Title}</h1>
                            <p>
                                <span className='guideline-rating'>{this.state.selectedMovie.Rated}</span>
                                <span className='movie-subtitle'>{this.state.selectedMovie.Year} ･</span>
                                <span>{this.state.selectedMovie.Genre} ･</span>
                                <span>{this.state.selectedMovie.Runtime}</span>
                            </p>
                            <span>{this.state.selectedMovie.Actors}</span>
                        </div>
                    </div>
                    <div className='middle-row'>
                        {this.state.selectedMovie.Plot}
                    </div>
                    <div className='last-row'>
                        <div className='last-row-column'>
                            <span>{this.state.selectedMovie.Ratings[0].Value}</span><br/>
                            <span>{this.state.selectedMovie.Ratings[0].Source}</span>
                        </div>
                        <div className='last-row-column'>
                            <span>{this.state.selectedMovie.Ratings[1].Value}</span><br/>
                            <span>{this.state.selectedMovie.Ratings[1].Source}</span>
                        </div>
                        <div className='last-row-column'>
                            <span>{this.state.selectedMovie.Ratings[2].Value}</span><br/>
                            <span>{this.state.selectedMovie.Ratings[2].Source}</span>
                        </div>
                    </div>
                </div>
            );
        } else {
            console.log("Here: ", this.props) ;
            return (
                <div className="right-container" key={this.state.selectedMovieID}>
                    &nbsp;
                </div>
            );
        }
    }
}