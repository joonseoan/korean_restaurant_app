import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import GoogleMap from '../components/google_map';
import { regexFilter } from  '../utils/mainWeather';


function roundData (weather) {
   
    return (_.round(weather));

}

function weatherImage(mainWeather) {

    const image = regexFilter (mainWeather);

    const src = `../images/${ image }.PNG`;
    
    return <img src = { src } className = 'responsive-img' alt = { image } 
                                style = {{ width : 70 } } />

}

function TodayWeather (props) {

    if (!props.todayWeather || !props.additionalTodayWeather)
        return (<div>Loading...</div>);

        const weather = props.todayWeather;
        const additionalWeather = props.additionalTodayWeather;
        const { lat, lng } = props.branchLocation.results[0].geometry.location; 

        return(
        
            <div className = 'card darken-1'>

            <div className = 'red lighten-2'>
                <h4 className = 'center z-depth-4' style = {{ color : 'white',
                                                            fontStyle : 'italic', 
                                                            fontFamily : 'monospace' }}
                > 
                    Real-Time Weather Info
                </h4>
           </div>
           

                <table className='centered responsive-table' border= "1">
                    <thead>
                        <tr>
                            <th>
                                Location
                            </th>          
                            <th>
                                Summary
                            </th>
                            <th style = {{ width : 70 } }>
                                <i className="small material-icons">arrow_drop_down</i>
                            </th>
                            <th style = {{ width : 70 } }>
                                <i className="small material-icons">arrow_drop_up</i>
                            </th>
                            <th>
                                Present Weather
                            </th>
                            <th>
                                Description
                            </th>
                            <th style = {{ width : 70 } }>
                                Present
                            </th>
                            <th style = {{ width : 70 } }>
                                Apparent
                            </th>

                            <th>
                                Wind Speed
                            </th>

                        </tr>
                    </thead>
                    
                    <tbody>
                    
                        <tr>
                            
                            <td>
                                <GoogleMap lat = { lat } lng = { lng } />
                            </td>
                            <td>
                                { weatherImage(weather.summary) }
                            </td>
                            <td>
                                { roundData((additionalWeather.main.temp_max) - 273) } &#8451;
                            </td>
                            <td>
                                { roundData((additionalWeather.main.temp_min) - 273) } &#8451;
                            </td>
                            <td>
                                { weatherImage(additionalWeather.weather[0].main) }
                            </td>
                            <td>
                                { additionalWeather.weather[0].description }
                            </td>
                            <td>
                                { roundData((weather.temperature -32) / 1.8) } &#8451;
                            </td>
                            <td>
                                { roundData((weather.apparentTemperature -32) / 1.8) } &#8451;
                            </td>
                            <td>
                                { roundData(weather.windSpeed * 1.61) } Km/h
                            </td>

                        </tr>

                    </tbody>

                </table>

            </div>);

}

function mapStateToProps ({ todayWeather, additionalTodayWeather, branchLocation }) {

    return({ todayWeather, additionalTodayWeather, branchLocation });

}

export default connect(mapStateToProps)(TodayWeather);