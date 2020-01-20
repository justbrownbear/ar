
/*var React = require( "react" );
import ReactDOM from "react-dom";*/

import Validator from 'validatorjs';

const rules = 
{
	email: 'required|email',
	password: 'required'
};


class Authentication extends React.Component
{
	
	constructor( props )
	{
		super( props );
		
		this.state = 
		{
			email:		"",
			password:	"",
			isValid:	false,
			errors:		[],
			timer:		null
		};
	}
	
	
	onEmailFieldChange = ( event ) => 
	{
		this.setState( { email: event.target.value } );
		
		this.setValidationTimer();
	};
	
	
	
	onPasswordFieldChange = ( event ) => 
	{
		this.setState( { password: event.target.value } );

		this.setValidationTimer();
	};


	setValidationTimer = () =>
	{
		if( this.state.timer != null )
			clearTimeout( this.state.timer );

		this.setState( { timer: setTimeout( () => { this.validateForm(); }, 500 ) } );
	};
	
	
	validateForm = () =>
	{
		const validator = new Validator( this.state, rules );
		
		validator.passes( this.validationOk );
		validator.fails( () => this.validationError( validator.errors.all() ) );
	};


	validationOk = () =>
	{
		this.setState( { isValid: true } );
	};
	

	validationError = ( errorsArray ) =>
	{
		this.setState( 
		{
			isValid: false,
			errors: errorsArray
		} );
	};

	
	
	onLogon = () =>
	{
		this.validateForm();
		
		alert( "logon" );
	};
	
	
	render()
	{
		return(
			<div>
				<section className="b-form b-form__container br-10">
					<div className="b-inner-container">
						<div className="row">
							<div className="col-md-offset-4 col-md-6">
								<div className="group-block add-top_block">
									<label className="t_indent-for-name_element_form">E-mail <span className="star required">*</span> :</label>
									<div className="element-form">
										<input id="email" name="email" type="text" value={ this.state.email } onChange={ this.onEmailFieldChange } onBlur={ this.validateForm } autoFocus />
									</div>
								</div>
							</div>
							<div className="col-md-6">
								<div className="group-block add-top_block">
									<label className="t_indent-for-name_element_form">Пароль <span className="star required">*</span> :</label>
									<div className="element-form">
										<input id="password" name="password" type="password" value={ this.state.password } onChange={ this.onPasswordFieldChange } onBlur={ this.validateForm } />
											<span className="b-help-block"><a href="/registration">Забыли пароль?</a></span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
				<div className="b-inner-container">
					<div className="row">
						<div className="col-md-offset-6 col-md-a">
							<section className="b-button-form">
								<button className="button" disabled={ !this.state.isValid } onClick={ this.onLogon } type="button">Войти</button>
							</section>
						</div>
					</div>
				</div>
			</div>
		);
	}
};


ReactDOM.render(
	<Authentication />,
	document.getElementById( "authentication" )
);


