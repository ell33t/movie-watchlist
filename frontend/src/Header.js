// NPM MODULES
import React, { Component, Fragment } from 'react';
import { Range } from 'react-range';

import IconSearch from './assets/icons8-search.svg';


export default class Header extends Component {
    constructor(props) {
        super(props);
        let range = props.yearValueRange;
        this.state = {
            values: range
        }
    }
    // componentDidMount() {
    //     this.setState({
    //         values: this.props.yearValueRange
    //     });
    // }

    handleRangeChange(values){
        this.props.handleRangeChange(values);
        this.setState({
            values
        });
    }

    render() {

        return(
            <Fragment>
                <div className="input-search">
                    <img src={IconSearch} className="Icon-Search" alt="Search Icon" />
                    <input value={this.props.searchValue} name="searchValue" onChange={(e) => this.props.handleSearchChange(e) }/>
                </div>
                <div className="range-search">
                    <Range
                        step={1}
                        min={1950}
                        max={2022}
                        values={this.state.values}
                        // onChange={(values) => this.setState({ values })}
                        onChange={(values) => this.handleRangeChange(values)}
                        renderTrack={({ props, children }) => (
                            <div
                                {...props}
                                style={{
                                    ...props.style,
                                    height: '6px',
                                    width: '100%',
                                    backgroundColor: '#ccc'
                                }}
                            >
                                {children}
                            </div>
                        )}
                        renderThumb={({ props }) => (
                            <div
                                {...props}
                                style={{
                                    ...props.style,
                                    height: '42px',
                                    width: '42px',
                                    backgroundColor: '#999'
                                }}
                            />
                        )}
                    />
                </div>
                <div className="option-search">
                    <form /*onChange={this.props.handleSearchChange}*/>
                        <input type="radio" id="all" name="typeOfMovie" value="all"
                               checked={this.props.typeOfMovie === 'all'}
                               onChange={this.props.handleSearchChange}/>
                        <label htmlFor="all">Any</label>
                        <input type="radio" id="movie" name="typeOfMovie" value="movie"
                               checked={this.props.typeOfMovie === 'movie'}
                               onChange={this.props.handleSearchChange}/>
                        <label htmlFor="movie">Movies</label>
                        <input type="radio" id="series" name="typeOfMovie" value="series"
                               checked={this.props.typeOfMovie === 'series'}
                               onChange={this.props.handleSearchChange}/>
                        <label htmlFor="series">Series</label>
                        <input type="radio" id="episode" name="typeOfMovie" value="episode"
                               checked={this.props.typeOfMovie === 'episode'}
                               onChange={this.props.handleSearchChange}/>
                        <label htmlFor="episode">Episodes</label>
                    </form>
                </div>
            </Fragment>
        );
    }
}