import axios from 'axios';
import DarkSkyApi from 'dark-sky-api';

import { FETCH_LOCATION, 
         FETCH_TODAY_WEATHER,
         FETCH_ADDITIONAL_TODAY_WEATHER } from './fetch_weather';

import { FETCH_GUESTBOOKS,
         CREATE_GUESTBOOK,
         MENU_ORDERED,
         FETCH_GUESTBOOK,
         DELETE_GUESTBOOK,
         USER_LOGIN,
         FETCH_LOGIN_GUESTBOOK } from './fetch_guestbooks';


const TodayURL = `https://api.openweathermap.org/data/2.5/weather?appid=${ process.env.REACT_APP_OPEN_WEATHER_KEY }`;
const GoogleURL = 'https://maps.googleapis.com/maps/api/geocode/json?address';

export function location(branch_city) {

    const  URL = `${ GoogleURL }=${branch_city}&key=${ process.env.REACT_APP_GMAP_API_KEY }`;
    const request = axios.get(URL);

    return ({

        type: FETCH_LOCATION,
        payload: request
        
    });

}

export function todayWeatherInfo (lat, lng) {
    
    const position = { 
    
            latitude: lat, 
            longitude: lng
    
    };

    DarkSkyApi.apiKey = process.env.REACT_APP_DARKSKY_WEATHER_KEY;
    const request = DarkSkyApi.loadCurrent(position);
    
    return ({

        type: FETCH_TODAY_WEATHER,
        
        payload: request
        
    });
                        
}

export function additionalTodayWeatherInfo (branch_city) {

    const URL = `${ TodayURL }&q=${ branch_city },ca`;

    const request = axios.get(URL);

    return ({

        type: FETCH_ADDITIONAL_TODAY_WEATHER,
        payload: request 

    });
                        
}

export function fetchGuesbookLists() {

    // const url = 'http://localhost:3000/guests';

    const request = axios.get('/guests');

    return ({

        type: FETCH_GUESTBOOKS,


        payload: request 

    });
                        
}

export function createGuestbook(guestbook, callback) {

    const request = axios.post('/guests', guestbook)
        .then(() => {

            callback();

        });
    
    return ({

        type : CREATE_GUESTBOOK,
        payload: request
            
    });

}

export function storeOrders(orders) {

    return {

        type: MENU_ORDERED,
        payload: orders

    }

}

export function fetchGuestbook(id) {

    
    // const url = `http://localhost:3000/guests/${id}`;

    const request = axios.get(`/guests/${ id }`);

    return ({

        type : FETCH_GUESTBOOK,
        payload: request
            
    });

}

export function userGuestbookLogin(loginInfo, callback) {

    // const url = 'http://localhost:3000/guests/login';

    return ({

        type : USER_LOGIN,
        payload: axios.post('/guests/login', loginInfo).then(() => {

               callback();

         })

    }); 
        
}

export function fetchLoginUserGuestbooks() {

    // const url = 'http://localhost:3000/loginGuestbooks';

    const request = axios.get('/loginGuestbooks');

    return ({

        type: FETCH_LOGIN_GUESTBOOK,
        payload: request 

    });
                        
}

export function deleteLoginUserGuestbook(id, callback) {

    // const url = `/guests/${ id }`;

    axios.delete( `/guests/${ id }`)
        .then(() => {

            callback();

        });

    return {

        type: DELETE_GUESTBOOK,
        payload: id

    }

}
