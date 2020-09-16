import React from 'react';
import BaseComponent from '../components/BaseComponent';

import EmailIcon from '@material-ui/icons/Email';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Promise from "bluebird";


class Login extends BaseComponent {
	constructor(props) {
		super(props);

		this.password_login = new React.createRef();
		this.email_login = new React.createRef();
		this.showPassword = new React.createRef();
		this.onClickLogin = this.onClickLogin.bind(this);
		this.onClickRegistro = this.onClickRegistro.bind(this);
		this.handleShowPassword = this.handleShowPassword.bind(this);
		this.state = { showPassword: false }

		this.history = props.history; 
	}

	async onClickRegistro(e) {
		e.preventDefault()
		let username = this.email_login.current.value;
		let pass = this.password_login.current.value;
		this.registrarUsuario(username, pass).then((id) => console.log(id))
	}


	async onClickLogin(e) {
		e.preventDefault()
		let username = this.email_login.current.value;
		let pass = this.password_login.current.value;
		var self = this;

		const response = await this.checkLogin(username, pass);
		if(response !== false) {
			console.log(response);
			//BaseComponent.alertField.current.open("Usuario registrado con éxito", "success");
			self.login("");
			self.redirectTo("/home", "/home");
			this.history.push('/vender')
		}
		//this.addItem();
		//this.loadData();


		/*
		const ipcRenderer = electron.ipcRenderer || false;
		if (ipcRenderer) {

			await fetch(`${ipcRenderer.sendSync('get-base-url')}/hola/login/login`, {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					"username": username,
					"pass": pass
				})
			})
				.then((response) => response.json())
				.then(async function (responseJson) {
					console.log(responseJson);
					if (responseJson[0] !== false) {
						self.email_login.current.value = "";
						self.password_login.current.value = "";
						BaseComponent.alertField.current.open("Usuario registrado con éxito", "success");
						self.login(responseJson[0]);
						self.redirectTo("/home", "/home");
					}
					else {
						BaseComponent.alertField.current.open("Fallo al iniciar sesión", "error");
					}
				})
				.catch((error) => {
					console.error(error);
				});
		}*/

	}

	handleShowPassword(e) {
		this.setState({ showPassword: !this.state.showPassword })
	}

	registrarse(e) {
		console.log('registro')
		this.registrarUsuario('user', 'user')
	}

	forgetPassword(e) {
		console.log('recuperar contraseña')
	}

	render() {
		return (
			<div className="wrapper">
				<span> Login: {`${this.isLogged()}`} </span>
				<div className="container">
					<div className="col-left">
						<div className="login-text">
							<h2>Bienvenido</h2>
							<p>Inicia sesión para empezar <br />a trabajar</p>
						</div>
					</div>
					<div className="col-right">
						<div className="login-form">
							<h2>Entrar</h2>
							<form onSubmit={this.onClickLogin}>
								<p>
									<label>Nombre de usuario<span>*</span></label>
									<input type="text" placeholder="Usuario" required ref={this.email_login} defaultValue={"user"}/>
								</p>
								<p>
									<label>Contraseña<span>*</span></label>
									<input type="password" placeholder="Contraseña" required ref={this.password_login} defaultValue={"user"} />
								</p>
								<p>
									<br />
								</p>
								<p>
									<input type="submit" value="Entrar" />
								</p>
							</form>

							<form onSubmit={this.onClickRegistro}>
							<p>
								<input type="submit" value="Registrarse" />
							</p>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Login;


/*








 <div className="login-root">
							<form onSubmit={this.onClickLogin}>
								<div className="login-input-icon">
									<EmailIcon className={`input-icon`} />
									<input type="text" className="input-login" ref={this.email_login} placeholder="Usuario" />
								</div>
								<div className="login-input-icon">
									{this.state.showPassword ?
										<VisibilityIcon className={`input-icon icon-password`} onClick={this.handleShowPassword} /> :
										<VisibilityOffIcon className={`input-icon icon-password`} onClick={this.handleShowPassword} />
									}
									<input type={this.state.showPassword ? 'text' : 'password'} className="input-login" placeholder="Contraseña" ref={this.password_login} />
								</div>
								<button type="submit" className="btn btn-login"> Ingresar </button>
							</form>
						</div>

*/
