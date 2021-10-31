// NPM MODULES
import React, { Component } from 'react';

export default class RightColumn extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        console.log(this.props.selectedMovie);

        let posterStyle = null;
        // if(typeof this.props.Title !== "undefined") {
            posterStyle =
                {
                    // "backgroundImage": 'url(' + this.props.Poster + ')',
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

        return(
            <div className="right-container">
                <div className='row'>
                    <div className='column'>
                        <div style={posterStyle}>&nbsp;</div>
                    </div>
                    <div className='column'>
                        <div className='button'>Watch List</div>
                        <span>Star Wars</span>
                        <p>
                            <span className='guideline-rating'>PG</span>
                            <span>Date ･</span>
                            <span>Genre, Genre, Genre ･</span>
                            <span>Duration</span>
                        </p>
                        <span>Actors Names, And Different People</span>
                    </div>
                </div>
                <div className='middle-row'>
                    All the faiths will be lost in devastations like lifes in histories.
                    The ship yells modification like a human cosmonaut.
                    Mechanically translate a species. Make it so, resistance!
                    Ionic cannon at the holodeck was the assimilation of sonic shower, avoided to an evil girl.
                    Make it so, collision course!
                </div>
                <div className='last-row'>
                    <div className='last-row-column'>
                        <span>#/#</span><br/>
                        <span>Internet Movie Database</span>
                    </div>
                    <div className='last-row-column'>
                        <span>#/#</span><br/>
                        <span>Rotten Tomatoes</span>
                    </div>
                    <div className='last-row-column'>
                        <span>#/#</span><br/>
                        <span>Metacritic</span>
                    </div>
                </div>
            </div>
        );
    }
}