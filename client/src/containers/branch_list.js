import React, { Component } from 'react';
import { connect } from 'react-redux';

import Select from 'react-select-me';
import 'react-select-me/lib/ReactSelectMe.css';

import { location, additionalTodayWeatherInfo } from '../actions';
import DateTimeDisplay from '../components/date_time_display';
import LocationCoordinate from './location_coordinate';


const options = [ 
    
    { value: 'Toronto', label: 'Toronto (Main)' },
    { value: 'Vancouver', label: 'Vancouver' },
    { value: 'Ottawa', label: 'Ottawa' }

];


let startInterval;

let branch_city;

class BranchList extends Component {

    constructor(props) {

        super(props);

        this.state = { 
            
            value: ''
        
        };

        this.onInputChange = this.onInputChange.bind(this); 
        
    }
    
    setTodayWeatherInfo(branch_city) {

        this.setState({ value : branch_city});

        this.props.location(branch_city);
        
        this.props.additionalTodayWeatherInfo(branch_city);

        if(startInterval) clearInterval(startInterval);

        startInterval = setInterval(() => {

            this.props.additionalTodayWeatherInfo(branch_city);

        }, 300000);

    }

    
    componentDidMount() {

        if (!branch_city) {

            branch_city = options[0].value;

            window.localStorage.setItem('branch_city', branch_city);

        }

        branch_city = window.localStorage.branch_city

        this.setTodayWeatherInfo(branch_city);

    }

    onInputChange (value) {
        
        window.localStorage.setItem('branch_city', value.value);

        branch_city = window.localStorage.branch_city;
        
        this.setTodayWeatherInfo(branch_city);

    }

    render() {

        if(!this.state.value)
        return (<div>Loading...</div>);

        return (

            <div>

                <div>
                    
                    <Select

                        options = { options }
                        value = { this.state.value }
                        onChange = { this.onInputChange }
                        
                    />

                </div>

                <div style = {{ marginTop :  '50px', marginBottom : '50px'}}>
                            
                    <h4 style = {{ fontFamily : 'monospace', fontStyle : 'italic'}}><center>Welcome to Korean Restaurant in {`${this.state.value}`}</center></h4>

                </div>

                <div>

                    <LocationCoordinate />
              
                </div>

                <div>
                
                    < DateTimeDisplay branch_city = { this.state.value } />

                </div>

            </div>
        
        );

    }

}

export default connect (null, { location, additionalTodayWeatherInfo } )(BranchList);