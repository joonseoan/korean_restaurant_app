import _ from 'lodash';

import { FETCH_GUESTBOOKS } from '../actions/fetch_guestbooks';

export default function(state = {}, action) {

    switch(action.type) {

        case FETCH_GUESTBOOKS:
        
            return _.mapKeys(action.payload.data.list, '_id');

        default:
            
            return state;

    }


}