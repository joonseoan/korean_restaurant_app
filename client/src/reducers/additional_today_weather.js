import { FETCH_ADDITIONAL_TODAY_WEATHER } from '../actions/fetch_weather';

export default function (state = null, action) {


    switch (action.type) {

        case FETCH_ADDITIONAL_TODAY_WEATHER:
        
	        return action.payload.data;

        default:
        
            return state;

    }   

}