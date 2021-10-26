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
            yearValueRange: [1970, 2015],
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
        this.handleSearchGet(this.state.searchValue, this.state.yearValueRange, this.state.typeOfMovie);
    }

    handleSearchGet(sValue, yValue, tValue){
        // Simple GET request using fetch
        //API key ba891029
        let url = 'http://www.omdbapi.com/';

        //first search term as a type is always included and never null
        if(typeof sValue != "undefined") {
            url = url + '?s=' + sValue;
        }

        if(typeof tValue != "undefined"){  //?t=movie OR ?t=series OR ?t=episode
            if(tValue ==="all"){
                url = url + '?&t=movie&t=series&t=episode'
            } else {
                url = url + '?&t=' + tValue;
            }
        }

        if(typeof yValue != "undefined"){
            //?y=1970
            let urlCopy = url;
            for (var i = yValue[0]; i <= yValue[1]; i++) {
                urlCopy = url + '?&y=' + i;

                console.log(urlCopy);
                fetch(urlCopy + '&apikey=ba891029')
                    .then(response => response.json())
                    // HACK before considering pagnination and ranged results
                    .then(data => this.setState({ results: data }));
            }
            return;
        }

        console.log(url);

        fetch(url + '&apikey=ba891029')
            .then(response => response.json())
            .then(data => this.setState({ results: data }))
        ;
    }

    // checkForPagination(resultsCount){
    //     if(resultsCount > 10){
    //         console.log(resultsCount);
    //         console.log("Pagination required");
    //     }
    // }

    handleFormChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        console.log('Value is:', value);
        // console.log('Name is:', name);
        this.setState({
            [name]: value,
        }, () => {
            this.handleSearchGet(this.state.searchValue, this.state.yearValueRange, this.state.typeOfMovie);
        });
    };

    handleRangeChange(values){
        console.log(values);
        // let data = this.handleSearchGet(this.state.searchValue, values, this.state.typeOfMovie)
        this.setState({
            yearValueRange: values,
            // results: data,
        })
    }

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
                    <Header
                        searchValue={this.state.searchValue}
                        yearValueRange={this.state.yearValueRange}
                        typeOfMovie={this.state.typeOfMovie}
                        handleSearchChange={ this.handleFormChange.bind(this) }
                        handleRangeChange={ this.handleRangeChange.bind(this)}
                    /><div className="box">
                    <LeftColumn
                        results={this.state.data}
                        selectedMovieIndex={this.state.selectedMovieID}
                        handleMovieSelect={ this.handleMovieSelect }
                    />
                    <RightColumn
                        selectedMovie={this.state.data[this.state.selectedMovieID]}
                    /></div>
                </Fragment>
            );
        } else {
            return(
                <Fragment>
                    <Header searchValue={this.state.searchValue} yearValueRange={this.state.yearValueRange} typeOfMovie={this.state.typeOfMovie} handleSearchChange={ this.handleFormChange.bind(this) } handleRangeChange={ this.handleRangeChange.bind(this)}/>
                    <div className="box">
                        <LeftColumn results={[]} selectedMovieIndex={null} handleMovieSelect={ this.handleMovieSelect }/>
                        <RightColumn selectedMovie={null}/></div>
                </Fragment>
            );
        }

    }
}