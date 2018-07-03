import React, { Component } from 'react';
import Modal from 'react-modal';
import _ from 'lodash';
import { connect } from 'react-redux';
import { storeOrders } from '../../actions/index'

Modal.setAppElement('#root');

function rounding (number) {

    return _.round(number, 2);

}

class Bill extends Component {

    orderList(order) {

        console.log('order: ', order)

        const { name, value, number } = order;

        const unitPrice = parseFloat(value);

        const subTotal = unitPrice * number;

        let orderNumber = this.props.menuChecked.indexOf(order) + 1;

        return (

            <ul key = { name } style = {{ marginLeft : '50px', marginTop : '70px', marginBottom : '50px'}}>
                
                <h5><b>{orderNumber}. { name }</b></h5>

                <li className = 'right' style = {{ marginRight : '50px'}}>Unit Price : ${ unitPrice }</li><br/>
                <li className = 'right' style = {{ marginRight : '50px'}}>Qty : { number } </li><br/>
                <li className = 'right' style = {{ marginRight : '50px'}}> Sub Total : ${ rounding(subTotal) }</li><br/>
                
            </ul>

        );

    }

    numberOfOrders(){

        let totalOrders = 0;

        _.each(this.props.menuChecked, order => {

            totalOrders += order.number;

        });

        return totalOrders;

    }

    totalAmount(){

        let totalAmount = 0;
        let subTotalAmount = 0;

        _.each(this.props.menuChecked, order => {

            subTotalAmount = order.value * order.number;
            totalAmount += subTotalAmount;

        });

        return totalAmount;

    }

    eventClick() {

        // will send this data to DB later on.
        const menuOrdered = this.props.menuChecked;

        this.props.storeOrders(menuOrdered);

        // From children object
        //this.props.children._self.state.newPage = true;
        this.props.newPageStatus();

        // this.props.children._self.handleCloseModal();

    } 

    render() {

        if(!this.props) return <div>Loading...</div>

        if(this.props.menuChecked.length === 0) {

            return (

                <Modal isOpen = { this.props.openStatus }>

                    <div>
                        <center>
                            <div>
                            
                            <h3>Sorry, customer.</h3>
                            <h3>You have not chosen the menu yet.</h3>
                            
                            </div>

                            <div> 

                                    { this.props.children }

                            </div>
                        </center>

                    </div>

                </Modal>

            );

        }

        return (            
                        
            <Modal isOpen = { this.props.openStatus } style = { { content : { width : '40%',        
                                                        margin : 'auto'}}}>

                <div>
                
                    { this.props.children }
                    
                </div>
               
                <h5 ref = { subtitle => subtitle } style = {{textDecoration : 'underline',
                                                             fontFamily : 'monospace',
                                                             fontStyle : 'italic'}}>
                    
                                                 
                    <center>Your Reciet Anticipated</center>
                
                </h5>

                <div> 
                
                    { this.props.menuChecked.map(this.orderList.bind(this)) }
                
                </div>

                <div className = 'right'>

                    <p>----------------------------------------</p>

                    <p style = {{ fontSize : '1.2em'}}>Total number of Orders : { this.numberOfOrders() }</p>
                    <p style = {{ fontSize : '1.2em'}}>Total price: ${ rounding(this.totalAmount()) }</p>
                    <p style = {{ fontSize : '1.2em'}}>HST: 15%</p>
                    <p style = {{textDecoration : 'underline', color : 'blue', fontSize : '1.3em'}}>Total Payable: ${ rounding(this.totalAmount() * 1.15) }</p>

                </div>

                <button type = 'submit' value = 'Submit Orders' 
                        className = "btn blue right" onClick = { this.eventClick.bind(this)}
                        style = {{ marginTop : '20px'}}        
                
                >

                        Submit Order
                        <i className="small material-icons" style = {{ verticalAlign : 'middle', marginLeft : '10px' }}>check_circle</i>
                
                </button>
                
            </Modal>

        );

    }

}

export default connect (null, { storeOrders })(Bill);