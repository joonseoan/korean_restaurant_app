import React, { Component } from 'react';

let startInverval;

export default class DateTimeDisplay extends Component {
    
    constructor (props) {

        super(props);

        this.state = {

            date : new Date()

        }

        this.setClock = this.setClock.bind(this);

    }

    setClock( branch_city ) {

        if (branch_city === undefined)
        branch_city = this.props.branch_city;

        startInverval = setInterval (() => {

            const dateTime = new Date();
            const vancouverTime = dateTime.getTime() - 10800000; 

            branch_city !== 'Vancouver' ? this.setState({ date : dateTime }) 
            : this.setState({ date : new Date(vancouverTime) }) ;

        }, 1000);

    }

    componentDidMount () {

        this.setClock();

    }

    componentWillReceiveProps (nextProps) {

        clearInterval(startInverval);

        const { branch_city } = nextProps;
        
        this.setClock(branch_city);

    }

    render () {

        const hours = this.state.date.getHours() > 12 ? this.state.date.getHours()-12 : this.state.date.getHours();
        const minutes = this.state.date.getMinutes() < 10 ? `0${ this.state.date.getMinutes()}` : this.state.date.getMinutes();
        const seconds = this.state.date.getSeconds() < 10 ? `0${ this.state.date.getSeconds()}` : this.state.date.getSeconds();

        return (

            <div> 
                    Date : { this.state.date.toDateString()} 
                    , Time : { hours < 10 ? `0${hours}` : hours } 
                    : { minutes }
                    : { seconds }
            
            </div>

        );


    }

}