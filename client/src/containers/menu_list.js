import React, { Component } from 'react';

import { connect } from 'react-redux';

import _ from 'lodash';

import { Link, Redirect } from 'react-router-dom';

import Bill from '../components/bill/bill';


function removeSpace(name) {

    return name.replace(/\s/g, "");

}

class MenuList extends Component {

    constructor(props) {

        super(props);

        this.state = {

            name_price: [],
            showModal : false,
            newPage : false
            
        };

    }

    // componentDidMount() {

    //    const checkedValue = JSON.parse(window.localStorage.menuChecked);
        
    //    console.log('checkedValue: ', checkedValue);
       
    //    this.setState( { name_price : checkedValue });
       

    //    console.log('this.state.name_price', this.state.name_price)

    //     _.each(checkedValue, ({name}) => {

    //         let readyToOrder = document.querySelector(`input.${removeSpace(name)}`);
            
    //         readyToOrder.checked = true;

    //         const color = !readyToOrder.checked ? '' : '#FAFAD2';

    //         document.querySelectorAll(`td.${removeSpace(name)}`)[0]
    //             .style.backgroundColor = color;

    //         document.querySelectorAll(`td.${removeSpace(name)}`)[1]
    //                 .style.backgroundColor = color;

    //     })

    // }

        // componentWillReceiveProps(nextProps) {

        //     console.log('77777777777777777777777777777777')

        //    //  window.localStorage.setItem('menuChecked', JSON.stringify(this.state.name_price));
        //    // this.setLocalStorage()
            

        //     //window.localStorage.setItem('menuChecked', JSON.stringify(this.state.name_price));

        //     // this.checkedValueControl(); 
            

        // }


    menuOnChange(event) {

        const { name, value, checked } = event.target;

        const label = document.querySelector(`label.${removeSpace(name)}`);

        let number = Number(label.innerHTML); 

        // let current_name_price = this.state.name_price;

        if (!checked) { 

            this.state.name_price.forEach(menu => {

            if (menu.name === name) {

                const index = this.state.name_price.indexOf(menu);

                this.state.name_price.splice(index, 1);

            }

            });

        } else {

            this.setState({  
            
                name_price: [ ...this.state.name_price, { name, value, checked, number }]
    
            });

           // [...this.state.name_price, {name, value, checked, number }];

            // current_name_price = [ ...current_name_price, { name, value, checked, number } ];

            // console.log('current_name_price: ', current_name_price);

        }

        const color = !checked ? '' : '#FAFAD2';

        document.querySelectorAll(`td.${removeSpace(name)}`)[0]
                .style.backgroundColor = color;

        document.querySelectorAll(`td.${removeSpace(name)}`)[1]
                    .style.backgroundColor = color;

        document.querySelector(`div.${removeSpace(name)}`).style.display = `${!checked ? 'none' : 'block'}`;
        
        // console.log('document.querySelector(div.${removeSpace(name)}):  ', document.querySelector(`div.${removeSpace(name)}`));        
    }
    
    numberOnChange (event) {

        const CurrentMenuName = event.target.id;

        let buttonValues = event.target.innerHTML;

        const label = document.querySelector(`label.${CurrentMenuName}`);

        let labelValues = Number(label.innerHTML); 

        const spans = document.querySelectorAll(`span#${CurrentMenuName}`);
        
        const buttons = [1, 2, 3, 4, 5];

        if (buttonValues !== '+') {

            buttonValues = Number(buttonValues);

            const disPlayButtons = buttons.filter( buttonNumber => buttonNumber !== buttonValues);
                
            _.each(disPlayButtons, button => {

                spans[button - 1].style.visibility = 'visible';

            });

            spans[buttonValues - 1].style.visibility = 'hidden';
    
        } else {

            labelValues++;
            
            buttonValues = labelValues;
            
            if(buttonValues > 5) {

                _.each(buttons, button => {

                    spans[button - 1].style.visibility = 'visible';
    
                });

            }

        }
        
        const displayNumber = document.createTextNode(buttonValues);

        if (label.firstChild) label.removeChild(label.firstChild);
        
        label.appendChild(displayNumber);

        _.each(this.state.name_price, find => {

            const alias = removeSpace(find.name);

            if (alias === CurrentMenuName) {
                
                find.number = buttonValues;

            }

        });
        
    }

    allMenuContents() {

        const path = './images/';

        let firstRow = [];
        let secondRow = [];
        let thirdRow = [];
        let forthRow = [];

        _.map(this.props.menu, menuType => {
            
            firstRow.push(menuType[0]);
            secondRow.push(menuType[1]);
            thirdRow.push(menuType[2]);
            forthRow.push(menuType[3]);

        });

        const menuPrices = (item) => {

            const buttonDisplay = () =>{
                
                const buttons = [ 1, 2, 3, 4, 5 ]; // please, test it again.

                const eachButton = buttons.map(button => {
    
                    return <span key = { button } 

                        onClick = { this.numberOnChange.bind(this) } 
                        id = { removeSpace(item.name) } 
                        className = "btn red lighten-2" style = {{width : '30px', height : '30px', marginLeft : 'auto', marginRight:'auto'}}>
                    
                        { button }
                    
                    </span>;
                
                });

                return (
                    
                    <div style = {{ marginLeft : 'auto', marginRight:'auto'}}>
                    
                        { eachButton }

                        <span onClick = { this.numberOnChange.bind(this) } 
                            id = { removeSpace(item.name) } 
                            className = "btn red lighten-2" 
                            style = {{width : '30px', height : '30px'}}>+</span>


                    
                    </div>
                    
                );
                
            }
            
            return (
             
                <td key = { item.name } className = { removeSpace(item.name) } style = {{ verticalAlign : "top", textAlign : "left"}} >

                    <div >
    
                        <div>
                            
                            <label>   
                                <i className="small material-icons" style = {{ verticalAlign : "middle",
                                                                               marginRight :  "10px",
                                                                               color : "red"}}>add_circle_outline</i>    
                                <b>{ item.name }</b> (${ item.price }) : <p>{ item.description }</p> 
                                    
                                <input type = "checkbox" name = { item.name } className = { removeSpace(item.name) }
                                value = { item.price }  onChange = { this.menuOnChange.bind(this)}/>
                      
                                <div><h3>{this.state.order}</h3></div>
                            </label>
    
                        </div>
                                
                        <div className = { removeSpace(item.name) } id = "number-input" style={{ textAlign: 'center'}}>

                            <div>
                                Number of Orders: <label className = { removeSpace(item.name) }>1</label>
                            </div>
                            <div>
                                { buttonDisplay() }
                            </div>
                                
                        </div>
    
                    </div>
                
                </td>
                    
            );
    
        }

        const pictures = (item) => {
               
            return (
    
                <td key = { item.name } className = { removeSpace(item.name) } id = "all-pictures" width = '120' >
                    {/* <Link to = { `/description/${item.name}`} key = { item.id } onClick = { this.setTempStorage.bind(this) }> */}
                    <Link to = { `/description/${item.name}`} key = { item.id }>

                        <div className = 'btn' style = {{ marginBottom : '20px', fontSize: '8pt'}}>

                            Check Detail
                            <i className="small material-icons" style = {{ verticalAlign : 'middle', marginLeft: '8px'}}>
                            check</i>
                    
                        </div>
                            
                        <img src = { path + item.file } alt = { item.name } width = '150' height = '100'
                            style = {{ border: '1px solid #ddd', borderRadius: '4px', padding: '5px'}} 
                                className = 'responsive-image'
                            />
            
                    </Link>
                </td>
                
            );
    
        }
    
        return (
    
            <tbody className = "all-menu">

                <tr>
                    { firstRow.map(menuPrices) }
                </tr>

                <tr>
                    { firstRow.map(pictures) }
                </tr>

                <tr>
                    { secondRow.map(menuPrices) }
                </tr>

                <tr>
                    { secondRow.map(pictures) }
                </tr>

                <tr>
                    { thirdRow.map(menuPrices) }
                </tr>

                <tr>
                    { thirdRow.map(pictures) }
                </tr>

                <tr>
                    { forthRow.map(menuPrices) }
                </tr>

                <tr>
                    { forthRow.map(pictures) }
                </tr>

                <tr>
                    <td colSpan = '4' className = 'right-align'>

                        <div onClick = { this.handleOpenModal.bind(this) } className = "btn right">
                    
                            Click to make an order
                    
                            <i className="small material-icons" style = {{ verticalAlign : 'middle',
                                                                marginLeft : '10px'}}>add_circle</i>
                        </div>
                    
                    </td>
                </tr>

            </tbody>
  
        );
    
    }

    handleOpenModal() {

       this.setState ({ 

            showModal : true,
            newPage : false

        }); 
       
    }

    handleCloseModal() {

        this.setState ({ showModal : false });

    }

    // setTempStorage() {

    //     window.localStorage.setItem('menuChecked', JSON.stringify(this.state.name_price));

    //     // console.log('setWindowLocalStorage: ', window.localStorage);
    // }

    render () {

        if(!this.props) return <div/>;    

        if(this.state.newPage) 

            return <Redirect to = 'thankyouAndGuestbook' menuChecked = { this.state.name_price }/>;     
        
        return (

            <div className = 'card white darken-1'>

                <div className = 'red lighten-2'>

                    <h4 className = 'center z-depth-4' style = {{ color : 'white',
                                                                 fontStyle : 'italic', 
                                                                 fontFamily : 'monospace' }}
                    >
                        Menu & Order
                    
                    </h4>
                
                </div>
            
                <div>
                    
                    <form onSubmit = { this.submitValue }> 

                        <table className = 'responsive-table centered'>

                            <thead>
                                <tr>
                                    <th>
                                        <h5>Soup</h5>
                                    </th>
                                    <th>
                                        <h5>Main</h5>
                                    </th>
                                    <th>
                                        <h5>Side</h5>
                                    </th>
                                    <th>
                                        <h5>Drink</h5>
                                    </th>
                                </tr>
                            </thead>
                            
                                { this.allMenuContents() }
                            
                        </table>

                    </form> 
                    
            </div>
                
                <Bill openStatus = { this.state.showModal } menuChecked = { this.state.name_price } 
                    newPageStatus = {() => { this.setState ({ newPage : true })}}>

                    <div className = 'btn-floating btn-small red' onClick = { this.handleCloseModal.bind(this) } >
                        
                        <i className="small material-icons">arrow_back</i>
                    
                    </div>

                </Bill>  

            </div>       

        );

    }

} 

function mapStateToProps ({ menu }) {

    return { menu };

}

export default connect (mapStateToProps)(MenuList);
