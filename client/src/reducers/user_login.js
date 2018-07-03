import { USER_LOGIN } from '../actions/fetch_guestbooks';

export default function(state = null, action) {

    switch(action.type) {

        case USER_LOGIN:
        
  		     return action.payload || true;

        default:
    
            return state;
   
    }

    

}