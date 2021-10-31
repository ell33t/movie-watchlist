// NPM MODULES
import React, { Component, Fragment } from 'react';
import Header from "./Header";
import LeftColumn from "./LeftColumn";
import RightColumn from "./RightColumn";

export default class WatchListController extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchValue: "Star wars",
            yearValueRange: [1970, 2015],
            typeOfMovie:"movie",
            selectedMovie: null,
            selectedMovieID: 0,
            results: [],
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
            url = url + '?s=' + sValue.replace(/\s+/g, '+');
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

                fetch(urlCopy + '&apikey=ba891029')
                    .then(response => response.json())
                    // hmmm not sure how to fix this or why this might cause problems
                    // eslint-disable-next-line no-loop-func
                    .then(data => {
                        if(typeof data != "undefined"){
                            if(typeof data.totalResults != "undefined"){
                                //check for pagination
                                //handle pagination
                                if(data.totalResults > 10){
                                    let pageCount = Math.ceil(data.totalResults/10);
                                    for(var j=1; j<=pageCount; j++) {
                                        fetch(urlCopy + '?page='+ 2 + '&apikey=ba891029')
                                            .then(response => response.json())
                                            .then(data => this.setState(prevState => ({ results: [...prevState.results, data.Search]})));
                                    }
                                }
                            }
                        }
                    });

                fetch(urlCopy + '&apikey=ba891029')
                    .then(response => response.json())
                    .then(data => this.setState(prevState => ({ results: [...prevState.results, data.Search]})));
            }
            return;
        }
    }

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
        this.handleSearchGet(this.state.searchValue, values, this.state.typeOfMovie)
        this.setState({
            yearValueRange: values,
        })
    }

    handleMovieSelect(index, movieObject){
        this.setState({
            selectedMovie: movieObject,
            selectedMovieID:index,
        });
    }

    render() {

        //Utility function that checks for duplicated results due to pagination logic
        // const findDuplicates = (arr) => {
        //     let sorted_arr = arr.slice().sort(); // You can define the comparing function here.
        //     // JS by default uses a crappy string compare.
        //     // (we use slice to clone the array so the
        //     // original array won't be modified)
        //     let results = [];
        //     for (let i = 0; i < sorted_arr.length - 1; i++) {
        //         if (sorted_arr[i + 1] == sorted_arr[i]) {
        //             results.push(sorted_arr[i]);
        //         }
        //     }
        //     return results;
        // }
        //
        // let duplicatedArray = this.state.results;
        // console.log(findDuplicates(duplicatedArray).length>0?'uh oh theres an error in the pagination!':'clean results!');

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
                        results={this.state.results}
                        selectedMovieIndex={this.state.selectedMovieID}
                        handleMovieSelect={ this.handleMovieSelect.bind(this) }
                    />
                    <RightColumn
                        selectedMovie={this.state.selectedMovie}
                        selectedMovieIndex={this.state.selectedMovieID}
                    /></div>
                </Fragment>
            );
        } else {
            return(
                <Fragment>
                    <Header searchValue={this.state.searchValue} yearValueRange={this.state.yearValueRange} typeOfMovie={this.state.typeOfMovie} handleSearchChange={ this.handleFormChange.bind(this) } handleRangeChange={ this.handleRangeChange.bind(this)}/>
                    <div className="box">
                        <LeftColumn results={this.state.results} selectedMovieIndex={null} handleMovieSelect={ this.handleMovieSelect }/>
                        <RightColumn selectedMovie={null}/></div>
                </Fragment>
            );
        }

    }
}