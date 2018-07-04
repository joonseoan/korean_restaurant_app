import React, { Component } from 'react';

import BranchList from '../containers/branch_list';
import RecommendationMenu from '../containers/recommendation_menu';
import MenuList from '../containers/menu_list';

class App extends Component {

    render () {

        return (
        
        <div>
            
            <div>  
                <BranchList />
            </div>

            <div>
                <RecommendationMenu />
            </div>
            <div>
                <MenuList />
            </div>

        </div>
        
        );

    }

}

export default App;