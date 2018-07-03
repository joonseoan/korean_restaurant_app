import { MENU_ORDERED } from '../actions/fetch_guestbooks';

export default function (state = [], action) {

    switch (action.type) {

        case MENU_ORDERED:
            
            return action.payload;
        
        default:
            
            return state;
    
    }
  
}