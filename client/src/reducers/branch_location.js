import { FETCH_LOCATION } from '../actions/fetch_weather';

export default function (state = null, action) {

        switch (action.type) {

            case FETCH_LOCATION:           
	
	            return action.payload.data;

            default :
                
                return state;
                 
        }

       

}
