import _ from 'lodash';

const weatherCategories = [ 'Storm', 'Blizzard', 'Thunderstorms', 'Hail', 'Shower', 'Dust', 'Whirls', 'Sand', 'Squalls', 'Tornado', 'Windy', 'Hurricane', 'Ash', 'Overcast', 'Sleet', 'windBearing', 'Clear', 'Cloudy','Clouds', 'Drizzle', 'Mist', 'Rain', 'Snow', 'Haze', 'Thunderstorm', 'windBearing', 'Breezy', 'Smoke', 'Fog', 'Humi', 'Humid', 'Humidy'];

export function regexFilter(weather) {

    console.log('weather in main: ', weather)
    
    let result;

    _.each(weatherCategories, data => {

        const patt = new RegExp(`${data}+`, 'i');

        if (weather.match(patt))
            result = weather.match(patt);

    });

    return result[0];

}

export function setWeather (getWeather) {

    let indexValue
    _.each(weatherCategories, weather => {

        if (getWeather === weather) {

            indexValue = weatherCategories.indexOf(getWeather);

        }

    });

    return indexValue;

}