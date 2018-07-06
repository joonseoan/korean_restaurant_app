import React, { Component } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';

function soup (temp, value, soup) {

    // console.log('soup', soup)

    if (temp > 28) {

       value = value + 0;

    } else if (temp > 25 && temp <= 28) {

        value = value + 1;

    } else if (temp > 23 && temp <= 25) {

        value = value + 2;

    } else if (temp > 20 && temp <= 23) {

        value = value + 3;

    } else {

        value = value + 4;

    }

    if (value <= 9 && value > 7) {

        return soup[3];
    
    } else if (value <= 7 && value > 5) {

        return soup[0];
    
    } else if (value <= 5 && value > 3) {

        return soup[2];

    } else {

        return soup[1];

    }

}

function main(temp, value, main) {

    if (temp > 28) {

        value = value + 0;
 
     } else if (temp > 26 && temp <= 28) {
 
         value = value + 1;
 
     } else if (temp > 23 && temp <= 26) {
 
         value = value + 2;
 
     } else if (temp > 20 && temp <= 23) {
 
         value = value + 3;
 
     } else {
 
         value = value + 4;
 
     }
     
     if (value <= 9 && value > 7) {

        return main[0];
    
    } else if (value <= 7 && value > 5) {

        return main[2];
    
    } else if (value <= 5 && value > 3) {

        return main[1];

    } else {

        return main[3];

    }

}

function side(temp, value, side) {

    if (temp > 28) {

        value = value + 0;
 
     } else if (temp > 24 && temp <= 28) {
 
         value = value + 1;
 
     } else if (temp > 20 && temp <= 24) {
 
         value = value + 2;
 
     } else if (temp > 16 && temp <= 20) {
 
         value = value + 3;
 
     } else {
 
         value = value + 4;
 
     }

    //  console.log('sideValue', value)
    if (value <= 9 && value > 7) {

        return side[3];
    
    } else if (value <= 7 && value > 5) {

        return side[0];
    
    } else if (value <= 5 && value > 3) {

        return side[2];

    } else {

        return side[1];

    }

}

function drink(temp, value, drink) {
 
    if (temp > 22) {

        value = value + 0;
 
     } else if (temp > 15 && temp <= 22) {
 
         value = value + 1;
 
     } else if (temp > 8 && temp <= 15) {
 
         value = value + 2;
 
     } else if (temp > -1 && temp <= 8) {
 
         value = value + 3;
 
     } else {
 
         value = value + 4;
 
     }

    if (value <= 9 && value > 7) {

        return drink[0];
    
    } else if (value <= 7 && value > 5) {

        return drink[1];

    } else {

        return drink[2];

    }

}

function soda(soda) {
    
    return soda[3];

}

export default class RecommendedMenu extends Component {

    constructor (props) {

        super(props);

        this.state = {

            selectedSoup : null,
            selectedMain : null,
            selectedSide : null,
            selectedDrink : null,
            selectedSoda : null

        }

    }
     
    setCurrentMenu (inputData) {

        if (inputData === undefined || !inputData) 
            inputData = this.props;

            const { menu, temp, value } = inputData;
    
            const selectedSoup = soup(temp, value, menu.soup);
            const selectedMain = main(temp, value, menu.main);
            const selectedSide = side(temp, value, menu.side);
            const selectedDrink = drink(temp, value, menu.drink);
            const selectedSoda = soda(menu.drink);

            this.setState({

                selectedSoup,
                selectedMain,
                selectedSide,
                selectedDrink,
                selectedSoda

            });

    }

    componentDidMount() {

        this.setCurrentMenu();
        
    }

    componentWillReceiveProps(nextProps) {

        this.setCurrentMenu(nextProps);

    }

    // should dry out down below!!!!
    makeNameList(names) {
  
        return <td key = { names.id }>{ names.name }</td>;
        
    }

    makeFileList(files) {

        const src = `../images/${ files.file }`;

        return <td key= { files.id }>
            
            <Link to = {`/description/${ files.name }`}>

                <div style = {{ marginBottom : '20px'}}>
                
                    Check Detail
                    <i className="small material-icons" style = {{ verticalAlign : 'middle',
                    marginLeft : '10px' }}>check</i>
                
                </div>

                <img src = { src } className = 'responsive-img' alt = { files.file } 
                    style = {{ width : 150, height : 100, border: '1px solid #ddd', borderRadius: '4px', padding: '5px' }} />

            </Link>
                
        </td>;

    }

    makePriceList(prices) {

        return <td key= { prices.id }>${ prices.price }</td>;

    }

    render () {

        if(!this.state.selectedSoup || !this.state.selectedMain 
            || !this.state.selectedSide || !this.state.selectedDrink)
        return (<tr><td>'Loading...'</td></tr>);

        const selectedMenu = _.map(this.state);
      
        return [ 

            <tr key = '1'>
                { selectedMenu.map(this.makeNameList) }
            </tr>,

            <tr key = '2'>
                { selectedMenu.map(this.makeFileList) }    
            </tr>,

            <tr key = '3'>
                { selectedMenu.map(this.makePriceList) }    
            </tr>        
 
        ];

    }
    
}