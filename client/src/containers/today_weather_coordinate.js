import React, { Component } from 'react';
import { connect } from 'react-redux';

import { todayWeatherInfo } from '../actions';
import TodayWeather from './today_weather';

let startInterval;

class TodayWeatherCoordinate extends Component  {

    setTodayWeather(weatherInfo) {

        const { lat, lng } = weatherInfo;

        this.props.todayWeatherInfo(lat, lng);

        if (startInterval) clearInterval(startInterval);

            startInterval = setInterval(() => {

            console.log('todayWeatherInfo (lat, lng) input', lat, lng)

            this.props.todayWeatherInfo(lat, lng);
            
        }, 300000); 

    }

    componentDidMount() {

        if(this.props)
        this.setTodayWeather(this.props);

    }
    
    componentWillReceiveProps(nextProps) {

        this.setTodayWeather(nextProps);

    }

    render () {

        if(!this.props)
        return <div>...Loading</div>
       
        return (
            <div>

                <TodayWeather />
                
            </div>
                
        );
      
    }

}
 
export default connect(null, { todayWeatherInfo })(TodayWeatherCoordinate);