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

                </div>
            </Fragment>
        );
    }
}