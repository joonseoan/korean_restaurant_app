import React, { Component } from 'react';
import { connect } from 'react-redux';

import TodayWeatherCoordinate from './today_weather_coordinate';

class LocationCoordinate extends Component {
    
    render() {
        
        console.log('this.props at loca_coordi : ', this.props);


        if(!this.props.branchLocation)
        return <div>Loading...</div>;

        const { lat, lng } = this.props.branchLocation.results[0].geometry.location;
        
        return(

            <div>

                <div>

                    <TodayWeatherCoordinate
                    
                        lat = { lat }
                        lng = { lng }
                    />
                
                </div>

            </div>
        );

    }

}

function mapsPropsToState({ branchLocation }) {

    return { branchLocation };
}

export default connect(mapsPropsToState)(LocationCoordinate);