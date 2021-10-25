// NPM MODULES
import React, { Component, Fragment } from 'react';
import Header from "./Header";
import LeftColumn from "./LeftColumn";
import RightColumn from "./RightColumn";

export default class WatchListController extends Component {
    constructor(props) {
        super(props);

        // Simple GET request using fetch
        //API key ba891029
        let data = fetch('http://www.omdbapi.com/?apikey=ba891029')
            .then(response => response.json());

        this.state = {
            searchValue: "Star",
            yearValueRange:
                {
                    low:1970,
                    high:2015
                },
            typeOfMovie:"movie",
            selectedMovieID: '1',
            results: data
            // selectedMovieObject: {
            //     Poster: "https://m.media-amazon.com/images/M/MV5BYmU1NDRjNDgtMzhiMi00NjZmLTg5NGItZDNiZjU5NTU4OTE0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
            //     Title: "Star Wars: Episode V - The Empire Strikes Back",
            //     Type: "movie",
            //     Year: "1980",
            //     imdbID: "tt0080684",
            // }
        }
    }


    componentDidMount() {
        this.handleSearchGet(this.state.searchValue);
    }

    handleSearchGet(sValue, yValue, tValue){
        // Simple GET request using fetch
        //API key ba891029
        let url = 'http://www.omdbapi.com/'
        if(typeof sValue != "undefined") {
            url = url + '?s=' + sValue + '/';
        }

        if(typeof yValue != "undefined"){
            //?y=1970
            url = url + '?y=' + yValue;
        }

        if(typeof tValue != "undefined"){
            //?t=movie
            //?t=series
            //?t=episode
            url = url + '?t=' + tValue;
        }

        return fetch(url + '&apikey=ba891029')
            .then(response => response.json())
            .then(data => this.setState({ results: data }))
            ;
    }

    handleFormChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        console.log('Value is:', value);
        // console.log('Name is:', name);
        let data = this.handleSearchGet(value);
        return this.setState({
            [name]: value,
            results: data
        });
    };

    handleMovieSelect(index){
        this.setState({
            selectedMovieID: index,
        });
    }

    render() {
        console.log(this.state.results);
        if(typeof this.state.data != 'undefined'){
            return(
                <Fragment>
                    <Header searchValue={this.state.searchValue} yearValueRange={this.state.yearValueRange} typeOfMovie={this.state.typeOfMovie} handleSearchChange={ this.handleFormChange.bind(this) }/>
                    <LeftColumn results={this.state.data} selectedMovieIndex={this.state.selectedMovieID} handleMovieSelect={ this.handleMovieSelect }/>
                    <RightColumn selectedMovie={this.state.data[this.state.selectedMovieID]}/>
                </Fragment>
            );
        } else {
            return(
                <Fragment>
                    <Header searchValue={this.state.searchValue} handleSearchChange={ this.handleFormChange.bind(this) }/>
                    <LeftColumn results={[]} selectedMovieIndex={null} handleMovieSelect={ this.handleMovieSelect }/>
                    <RightColumn selectedMovie={null}/>
                </Fragment>
            );
        }

    }
}