import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import { fetchGuesbookLists, userGuestbookLogin, fetchLoginUserGuestbooks } from '../actions/index';


class EmailPasswordInput extends Component {

	constructor(props) {

		super(props);

		this.state = {

			message: null,
			loginsucess: null

		}

	}

	componentDidMount() {

		this.props.fetchGuesbookLists();
		this.props.fetchLoginUserGuestbooks();

	}

	componentWillReceiveProps(nextProps) {

		const { auth } = nextProps;

		if (auth && auth !== true) {

			const strAuth = auth.toString();
	        const patt = /400/ig;

	        const verification = strAuth.match(patt);

	        if (verification) this.setState({ message : 'You enterned a wrong password.'});

		}

    }

	renderInputField(fields) {

        const { meta : { touched, error }} = fields;

        const className = `form-group ${ touched && error ? 'has-danger' : ''}`;

        return (

            <div className = { className }>

				<input type = { fields.input.name === 'email' ? 'email' : 'password' }

						className = 'form-control'
				
						{ ...fields.input } // each property only

				/>

                <div className = 'text-help'>

                    { touched ? error : '' }

                </div>

            </div>

        );

	}

	userGuestbookPosted(userGuestbooks) {
		
		let countNumber = 1;

		if(!userGuestbooks || userGuestbooks.length === 0) {

			return (

				<div>
				
					<h1><center>All of your postings are deleted.</center></h1>
					<h2><center>Thank you for joining survey</center></h2>

				</div>

			);

		}

		if(userGuestbooks) {
			
			let sortedGuestbooks;

			_.each(userGuestbooks, time => {

				time.visitedAt = time.visitedAt.slice(7,35).replace(', Time:', '');

				sortedGuestbooks = userGuestbooks.sort((a, b) => {

					const preDate = new Date(a.visitedAt).getTime();
					const postDate = new Date(b.visitedAt).getTime();

					return postDate - preDate;

				});
				
			});

			return sortedGuestbooks.map(post => {

				return (

					<div key = { post._id } style = {{ marginBottom : '30px'}}>

						<div> { countNumber++ }. Customer: { post.email.substring(0, 3) }xxx@Owl Korean Restaurant at { post.visitedAt }</div>

						<Link to = {{ pathname : `/guestbookPosted/${post._id}`, state : this.props.history.location.pathname }} >

							<li className ='list-group-item'>

								{ post.title }

							</li>

						</Link>

					</div>
						
				);

			});

		}

	}

	onSubmit(values) {

		let emailVerification = false;

		const guestbooks = _.map(this.props.guestbooks, guestbook => guestbook);

		_.each(guestbooks, guestbook => {

			if (guestbook.email === values.email) {

				emailVerification = true;

			}

		});

		if(emailVerification) {

			this.props.userGuestbookLogin(values, () => {

				this.setState({ 

					message: 'You successfully logged in!!!',
					loginsucess: true

				});
				
			}).then(() => {

				this.props.fetchLoginUserGuestbooks();

			});

		} else {

			this.setState({ message: this.props.errMsg });

		} 

	}

	render() {

		const { handleSubmit, loginUserGuestbook } = this.props;
		const { state } = this.props.history.location;

		if ((this.state.loginsucess && this.state.message !== this.props.errMsg) || state === 'false') {

			return (

				<div>

					<div>

						<center>

							<h3 className = 'center z-depth-4 red lighten-2' style = {{ color : 'white',
							fontStyle : 'italic', 
							fontFamily : 'monospace' }}>Your Posts</h3>
						
						</center>

					</div>

					<div>

						<ul>{ this.userGuestbookPosted(loginUserGuestbook) }</ul>		
						
					</div>

					<Link to = '/' className = 'btn red'>Logout</Link>
					<Link to = '/guestbookAllPosted' className = 'btn blue right'>
					
						Guestbook Lists
					
						<i className="small material-icons" style = {{verticalAlign : 'middle', marginLeft : '10px'}}>
                                    format_list_bulleted
                        </i>
					</Link>

				</div>
			);

		}

		return (

			<div className = 'card center-align'>

				<div>

					<h3 style = {{ marginBottom : '30px', fontFamily : 'monospace', fontStyle : 'italic', color : 'fuchsia' }}> Find Your Posts </h3>

					<h5> Enter Your email and password </h5>
				
				</div>

				<br />
				<br />

				<form onSubmit = { handleSubmit(this.onSubmit.bind(this)) }>

					<div>

						<label style = {{fontSize : '1.2em'}}>

							Your email:

							<Field

								name = 'email'
								component  = { this.renderInputField }
							/>

						</label>

					</div>

					<div>

						<label style = {{fontSize : '1.2em'}}>

							Your password:

							<Field

								name = 'password'
								component  = { this.renderInputField }
	
							/>

						</label>

					</div>

					<div> { this.state.message } </div>
	
                    <Link to = '/' className = 'btn red' style = {{ marginBottom : '20px' }}>Cancel</Link>
				
					<Field
						style = {{ marginLeft : '50px', marginBottom : '20px'}}
						name = 'submit'
						component = 'button'
						type = 'submit'
						className = 'btn'
					>
					
						Submit

						<i className="small material-icons" style = {{verticalAlign : 'middle',
                                                                marginLeft : '10px'}}>
                                    filter_list
                        </i>
					
					</Field>
				
				</form>

			</div>

		);
	}

}

function validate(values) {

	let err = {};

    if(!values.email) {

        err.email = 'Please enter your email. It must be an email format.'

    } else {

        const emailPattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
    
        if(!emailPattern.test(values.email)) {

            err.email = 'You enterned a wrong email. Please, enter again.';
        
        }

    }

    if(!values.password) {

        err.password = 'Please enter your password. It must be more than 8 letters.'

    } else {

        if(values.password.length < 8) {

            err.password = 'Your password must be more than 8 letters.'
     
        }

    }

    return err;

}

function mapStateToProps({ guestbooks, auth, loginUserGuestbook }) {

	return { 

		guestbooks,
		auth,
		loginUserGuestbook,
		errMsg : 'You enterd a wrong email or your post is not availalbe..'

	};

}

export default reduxForm({

    form: 'emailPasswordGuestbook',
	validate
	// destroyOnUnmount : false

})(
    
    connect(mapStateToProps, { fetchGuesbookLists, userGuestbookLogin, fetchLoginUserGuestbooks })(EmailPasswordInput)

);