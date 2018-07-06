# Real-Time Menu Recommendation Order Based on Weather Change built by React, Node, and MongoDB

## Front : React (ReduxForm, GoogleMAP, DarkSky, OpenWeather and etc.)
## Back : Node (Express, Mocha, and etc.)

## Main Concept :
#### Weather is one of the most powerful element that impacts on a menu choice in a restaurant. As enclosing this real-time weather information, the applicat makes customers intuitively choose and order their favorit foods in a bit.

## App Structure :
#### Restaurant Branches, Real-Time Weather based on Locations, Recommendation Menus based on preset weather info, Food Details, Menu Order, Guesbooks(containing Customer's Food Evaluation and Recommendation), Guestbook Management, and Login & Logout

### 1. Main Page : Restaurant Location, Real-Time Weather Info, Menu Recommendation, Food Details, and Menu Order
#### 1.1 Restaurant Location and Weather Information
####      - displaying Local weather information 
####      - updating weather information every 5 minutes 
####      - and utilizing OpenWeatherMap, DarkSky, and GoogleMap modules
##### [Toronto Restaurant]
##### ![Main Page1](weather_t.PNG)
##### [Vancouver Restaurant]
##### ![Main_Page2](weather_v.PNG)
#### 1.2 Recommendatiion Menus  
####      - implementing weather information in the background
####      - updating new recommendation menus every 5 minutes
####      - and using a customized recommendation engine
##### ![Recommendation_Menu](menu_recommendation.PNG)
#### 1.3 Menu & Order  
####      - rendering checkbox button, "+" in circles for customers to choose menus
####      - dipalying simple and intuitive buttons for customers to finalize a number of orders
####      - linking to detail food description pages which also shows the customers the previous customer's recommendation
##### ![Menu_Order](menu_order.PNG)
