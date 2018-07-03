import React from 'react';
import _ from 'lodash';

import RecommendedMenu from './recommended_menu';
import { regexFilter, setWeather } from '../utils/mainWeather';

export default function SetCurrentRecommendation (props) {

        const { inputMenus, temperature, mainWeather } = props;

        const getWeather = regexFilter(mainWeather);

        let feelTemp = _.round((temperature - 32) / 1.8);
        feelTemp = Number(feelTemp);
       
        const indexValue = setWeather(getWeather);
    
        return (
                
            <RecommendedMenu menu = { inputMenus } temp = { feelTemp } value = { indexValue } />
                               
        );

}