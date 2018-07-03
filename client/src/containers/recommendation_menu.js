import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import SetCurrentRecommendation from '../components/set_current_recommendation';

function RecommendationMenu (props) {

    if (!props.menu || !props.todayWeather || !props.additionalTodayWeather)
        return <div>Loading....</div>

        const { main } = props.additionalTodayWeather.weather[0];
        const { apparentTemperature } = props.todayWeather;

        return (

            <div className = "card darken-1">

                <div className = 'red lighten-2'>
                    <h4 className = 'center z-depth-4' style = {{ color : 'white',
                                                                 fontStyle : 'italic', 
                                                                 fontFamily : 'monospace' }}
                    >
                        Special For you Based on Weather
                    
                    </h4>
                
                </div>

                <div>
                    <table border = "1" className = 'responsive-table centered'>

                        <thead>

                            <tr>
                                <th>
                                    Soup
                                </th>
                                <th>
                                    Main
                                </th>
                                <th>
                                    Side Dish
                                </th>
                                <th>
                                    Liquor
                                </th>
                                <th>
                                    Soda
                                </th>
                            </tr>

                        </thead>

                        <tbody>

                            <SetCurrentRecommendation
                                
                                inputMenus = { props.menu }
                                mainWeather = { main }
                                temperature = { apparentTemperature }
                                
                            />
                            <tr>

                                <td colSpan = '5'>
                                
                                    <Link to = '/guestbookAllPosted' 
                                        className = 'btn waves-effect waves-light right'
                            
                                    >
    
                                        REVIEW CUSTOMER's BEST CHOICE
    
                                        <i className='small material-icons' style = {{ verticalAlign : 'middle',
                                                                                        marginLeft : '10px' }}>
                                            rate_review
                                        
                                        </i>
    
                                    </Link> 

                                </td>

                            </tr>
                            
                        </tbody>
                                  
                    </table>

                </div>
        
            </div>

        );
}

function mapsPropsToState ({ menu, todayWeather, additionalTodayWeather,  }) {

    return ({ menu, todayWeather, additionalTodayWeather,  });

}

export default connect (mapsPropsToState)(RecommendationMenu);

