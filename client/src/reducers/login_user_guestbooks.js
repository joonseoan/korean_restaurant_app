import { FETCH_LOGIN_GUESTBOOK } from '../actions/fetch_guestbooks';

export default function(state = null, action) {

    switch(action.type) {

        case FETCH_LOGIN_GUESTBOOK:

	        return action.payload.data.guestbooks;

        default:
        
            return state;

    }

}