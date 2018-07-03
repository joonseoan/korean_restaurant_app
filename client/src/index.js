import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ReduxPromise from 'redux-promise';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'materialize-css/dist/css/materialize.min.css';

import App from './components/App';
import GuestbookAllPosted from './guestbooks/guestbook_all_posted';
import GuestbookNewCreated from './guestbooks/guestbook_new_created';
import RecommendationDescriptions from './components/current_recommendations/recommendation_descriptions';
import ThankYouAndGuestbook from './components/Thankyou/Thank_you_and_guestbook';
import GuestbookPosted from './guestbooks/guestbook_posted';
import EmailPasswordInput from './guestbooks/email_password_input';

import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
    
    <Provider store = { createStoreWithMiddleware(reducers)} >

        <BrowserRouter>

            <div className = 'container'>
                <Switch>

                    <Route exact path = '/thankyouAndGuestbook' component = { ThankYouAndGuestbook }/>
                    <Route exact path = '/description/:id' component = { RecommendationDescriptions } />
                    <Route exact path = '/guestbookAllPosted' component = { GuestbookAllPosted } />
                    <Route exact path = '/guestbookNewCreated' component = { GuestbookNewCreated } />
                    <Route exact path = '/guestbookPosted/:id' component = { GuestbookPosted } />
                    <Route exact path = '/emailPasswordInput' component = { EmailPasswordInput } />
                    <Route path = '/' component = { App } />
                   
                </Switch>
            </div>
        
        </BrowserRouter>
       
    </ Provider>

, document.getElementById('root'));
