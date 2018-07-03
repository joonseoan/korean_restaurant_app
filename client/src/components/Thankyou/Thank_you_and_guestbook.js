import React from 'react';
import { Link } from 'react-router-dom';

const ThankYouAndGuestbook = (props) => {
	
	return(
		<div className = 'card center-align' style = {{ marginTop: '20%'}}> 

			<h3 className = 'red lighten-2 white-text'
				style = {{ fontFamily : 'monospace'}}
			>
			
				Thank you for your order!!!
			
			</h3>

			<h5 style = {{ marginBottom : '20px'}}> Enjoy foods and Have a great time!</h5>

			<Link to = '/guestbookNewCreated'>
			
				<div className = 'btn' style = {{ marginTop : '20px'}}>

					Would you like to join our survey?

				</div>

			</Link>
			<br />
			<Link to = '/'>

				<div className = 'btn red' style = {{ marginTop : '40px'}}> 

		            Skip this survey

		        </div>
	        
	        </Link>

		</div> );

}

export default ThankYouAndGuestbook;
		