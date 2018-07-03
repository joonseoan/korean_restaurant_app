import _ from 'lodash';

const weatherCategories = [ 'Clear', 'Cloud', 'Drizzle', 'Mist', 'Rain', 'Snow', 'Haze', 'Thunderstorm', 'windBearing' ];

export function regexFilter(weather) {
    
    let result;
    _.each(weatherCategories, data => {


        console.log(weather, data)
        const patt = new RegExp(`${data}+`, 'i');

        if (weather.match(patt))
            result = weather.match(patt);

    });

    return result[0];

}

export function setWeather (getWeather) {

    console.log(getWeather)

    let indexValue
    _.each(weatherCategories, weather => {

        if (getWeather === weather) {

            indexValue = weatherCategories.indexOf(getWeather);

        }

    });

    return indexValue;

}