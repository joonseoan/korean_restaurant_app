import { FETCH_TODAY_WEATHER } from '../actions/fetch_weather';

export default function (state = null, action) {

    switch (action.type) {

        case FETCH_TODAY_WEATHER:

            return action.payload;
        
        default:
            
            return state;  
    
    }

   

}

