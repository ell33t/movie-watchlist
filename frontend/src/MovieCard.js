// NPM MODULES
import React, {Component, Fragment} from 'react';

export default class MovieCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOnWatchList: false,
        }

        // Retrieve the object from storage
        var watchList = localStorage.getItem("watchList");
        var watchListData = JSON.parse(watchList);

    }

    handleMovieSelect(){
        // console.log(this.props.item.imdbID);
        this.props.handleSelect(this.props.item.imdbID);
    }

    render() {
        let cardClassName = 'movie-card';
        if(this.props.isSelected){
            cardClassName = 'movie-card-selected'
        }
        // console.log(this.props);
        if(typeof this.props.Title !== "undefined") {
            const posterStyle =
                {"backgroundImage":'url(' + this.props.Poster + ')',
                    "width": "80px",
                    "height": "80px",
                    "backgroundSize":"cover",
                    "backgroundPosition":"center",
                    "borderRadius":"10px",
                    "margin": "1.5rem",
                    "order": "0",
                    "flex": "0 1 auto",
                    "alignSelf": "auto",

                };

            //style={{marginRight: spacing + 'em'}}

            return (
                <div
                    className={cardClassName}
                    onClick={e => this.handleMovieSelect()}
                >
                    <div style={posterStyle}>&nbsp;
                    </div>
                    <div className="movie-text">
                        <span className="movie-title">{this.props.Title}</span>
                        <span className="movie-date">{this.props.Year}</span>
                    </div>
                </div>
            );
        } else {
            return(
                <Fragment/>
            );
        }
    }
}