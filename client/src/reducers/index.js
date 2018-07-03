import { combineReducers } from 'redux';
import { reducer as guestbookForm } from 'redux-form';

import branchLocation from './branch_location';
import todayWeather from './today_weather';
import additionalTodayWeather from './additional_today_weather';
import menu from './menu';
import guestbooks from './guestbooks';
import orderedMenu from './menu_ordered';
import login from './user_login';
import loginUserGuestbook from './login_user_guestbooks';

const reducers = combineReducers({
    
    branchLocation,
    todayWeather,
    additionalTodayWeather,
    menu,
    guestbooks,
    form: guestbookForm,
    orderedMenu,
    auth : login,
    loginUserGuestbook	

});

export default reducers;