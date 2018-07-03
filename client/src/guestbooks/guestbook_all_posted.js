import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import { fetchGuesbookLists } from '../actions/index';

class GuestbookAllPosted extends Component {

    componentDidMount() {

        this.props.fetchGuesbookLists();

    }

    renderGuestBooks() {
 
        let dislikeEvaluation = [];

        let countNumber = 1;

        const guestbooks = _.map(this.props.guestbooks, guestbook => guestbook);

        return ( guestbooks.reverse().map((guestbook) => {
            
            if(guestbook && guestbook.like && countNumber < 11) {

                return (

                    <div key = { guestbook._id } style = {{ marginBottom : '30px'}}>

                        <div> { countNumber++ }. Customer: { guestbook.email.substring(0, 3) }xxx@Owl Korean Restaurant in {guestbook.city}</div>
                        <div><i>{ guestbook.visitedAt }</i></div>

                        <Link to = {`/guestbookPosted/${guestbook._id}`} >    
                        
                            <li className ='list-group-item'> {guestbook.title} </li>

                        </Link>
        
                    </div>
                
                );       
            
            } else {

                dislikeEvaluation.push(guestbook);
                
                return <div key={ guestbook._id } />;
            }
                    
        }));

    }

    render() {

        return(

            <div>

                <div>
                    
                    <h3 className = 'center z-depth-4 red lighten-2' style = {{ color : 'white',
                        fontStyle : 'italic', 
                        fontFamily : 'monospace' }}>
                    
                        <center>Customer's Best Choices</center>
                    
                    </h3>
                    
                    <h5 style = {{ marginBottom : '30px'}}><center>(Please, click on the list)</center></h5>

                </div>

                <div>

                    <ul>
                        { this.renderGuestBooks() }
                    </ul>
                
                </div>

                <div>
                    
                    <Link className = "btn red" to = "/">
                    
                        Back to main page
                    
                    </Link>

                    <Link to = '/emailPasswordInput' className = 'btn pink right' >

                        Delete your post
                        <i className="small material-icons" style = {{verticalAlign : 'middle',
                                                                marginLeft : '10px'}}>
                                    delete
                        </i>

                    </Link>


                </div>

            </div>


        );
    }
    
}

function mapStateToProps({ guestbooks }) {

    console.log('guestbooks: ', guestbooks);

    return ({ guestbooks });

}

export default connect(mapStateToProps, { fetchGuesbookLists })(GuestbookAllPosted);