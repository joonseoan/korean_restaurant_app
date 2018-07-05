import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import { fetchGuesbookLists } from '../../actions/index';

class RecommendationDescriptions extends Component {


    componentDidMount() {

        this.props.fetchGuesbookLists();

    }

    picList() {

        return this.props.theOthers.map(pic => {
    
            return [
                
                <td key = { pic.name }>

                    <p>{pic.name} (${pic.price})</p>

                    <Link key = { pic.id } to = {`/description/${ pic.name }`} >
                        
                        Check Detail
                        <i className="small material-icons" style = {{ verticalAlign : 'middle',
                        marginLeft : '10px' }}>check</i>        
                    
                        <img src = {`../images/${ pic.file }` } alt= {pic.name} width = "200" height = "150"
                            style = {{ border: '1px solid #ddd', borderRadius: '4px', padding: '5px'}}
                            className = 'responsive-image'
                        />
                            
                    </Link>

                </td>  
            
            ];
            
                    
        });             

    }

    isSpicy() {

        const { name, spicy } = this.props.selectedMenu;

        if(spicy) {

            return <img src = { `../images/${spicy}` } alt = { name } width ='100' height = '80'
                style = {{ verticalAlign : 'center', borderRadius: '4px', paddingBottom: '15px'}}
                className = 'responsive-image'
            />
    
        }
    }

    foodGuestbooks(guestbooks) {

        const { name } = this.props.selectedMenu;

        const guestbookList = _.map(guestbooks);

        let countNumber = 1;

        return guestbookList.reverse().map(guestbook => {

            if(guestbook.food === name && guestbook.like && countNumber < 5) {

                return (

                    <li key = { guestbook._id } className = 'card yellow lighten-5 card-content'
                        style = {{ paddingTop : '0px'}}
                    >

                        <h3 className = 'card-title'>{ countNumber++ }. { guestbook.title }</h3>
                        <p>{ guestbook.comments }</p>
                        <p style = {{ textAlign : 'right', fontStyle :'italic' }}>- I was here at { guestbook.visitedAt}</p>                       

                    </li>

                );

            } else {

                return <div key = { guestbook._id }/>;

            }

        });

    }

    render() {

        if(!this.props.guestbooks) return <div>Loading....</div>

        const { guestbooks } = this.props;

        const path = '../images/';

        const { name, description, file, price, spicy, carlorie } = this.props.selectedMenu;

        return (

            <div>
        
                <div className = 'card white darken-1'>

                    <h3 className = 'center z-depth-4 red lighten-2' style = {{ color : 'white',
                                                                                fontStyle : 'italic', 
                                                                                fontFamily : 'monospace' }}
                    >
                                    { name } (${ price })
                    
                    </h3> 
                    
                    <img src = { path + file } alt = { spicy } width = '500' height = '300' 
                        style = {{ border: '1px solid #ddd', borderRadius: '4px', padding: '5px',
                                     position : 'relative', left : '200px' }}/>
            
                    <p style = {{ fontSize : '1.5em', marginTop : '20px', textAlign : 'center'}}>
                    
                        { description } ({ carlorie } cal) { this.isSpicy() }                      

                    </p>

                    <div>

                        <h4 style = {{ textAlign : 'center',  textDecoration : 'underline', color : 'white',
                                    fontStyle : 'italic', fontFamily : 'monospace', width : '500px', 
                                    position : 'relative', left: '200px' }}
                            className = 'center z-depth-4 pink lighten-2'> 
                            
                            CUSTOMER'S REVIEW 
                        
                        </h4>

                        <ul style = {{ width : '700px', position : 'relative', left : '100px'}}>

                            { this.foodGuestbooks(guestbooks) }

                        </ul>

                    </div>
                                
                </div>
                    
                    <div className = 'card white darken-1'>

                        <div>

                            <div>
                                <h3 className = 'center z-depth-4 red lighten-2' style = {{ color : 'white',
                                fontStyle : 'italic', 
                                fontFamily : 'monospace'}}>Other Choices</h3>
                            </div>
                        
                        </div>
                        <table className = 'centered responsive-table'>

                            <tbody>

                                <tr>
                                    { this.picList() }
                                </tr>
                                    
                            </tbody>
                        
                        </table>    
                        
                    </div>

                    <div className = 'left-align'>
            
                        <Link className = "btn red " to = {'/'} >
            
                            Back to the main page
            
                        </Link>
            
                    </div>
        
                </div>

            );

    }

}

function mapStateToProps ({ menu, guestbooks }, ownProps) {

    let selectedMenu;
    let selectedMenuType;
    
    _.each(menu, menuType => {

        _.each(menuType, menuItem => {
            
            if (menuItem.name === ownProps.match.params.id) {
                                
                selectedMenuType = menuType;
                selectedMenu = menuItem;

            }

        });

    });

    const theOthers = selectedMenuType.filter(item => item !== selectedMenu);
    
    return { 
        
        selectedMenu,
        theOthers,
        guestbooks
        
    };

}

export default connect(mapStateToProps, { fetchGuesbookLists })(RecommendationDescriptions);