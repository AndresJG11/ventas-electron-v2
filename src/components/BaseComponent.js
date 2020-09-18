import {Component} from 'react';
import React from 'react';

import Promise from "bluebird";

//import { Redirect } from 'react-router-dom';

import history from "./history";

import { Redirect }from 'react-router-dom';


const AppDAO = require('../db/dao').default
const Crud = require('../db/crud').default

class BaseComponent extends Component{
	static alertField = new React.createRef();
	static isLogged = false;
	static dataLogged = {};
	constructor(props){
		super(props);

		//this.db = new DataBaseHandler();
		this.redirectTo = this.redirectTo.bind(this);

		this.logout = this.logout.bind(this);
		this.login = this.login.bind(this);
		this.isLogged = this.isLogged.bind(this);

		this.setDatabase();
        //this.loadData();
	}

	crearTablaUsuarios(){
		return this.db.crearTablaRegistro()
	}

	registrarUsuario(usuario, password){
		return this.db.crearUsuario(Date.now(), usuario, password)
	}

	setDatabase() {
        this.dao = new AppDAO('./database.sqlite');
        this.db = new Crud(this.dao);
        this.db.createTable()
            .then(() => {
                console.log('db is created...')
            })
            .catch((err) => {
                console.log('Error: ')
                console.log(JSON.stringify(err))
			});

        this.db.crearTablaRegistro()
            .then(() => {
                console.log('users table is created...')
            })
            .catch((err) => {
                console.log('Error users table: ')
                console.log(JSON.stringify(err))
			});
    }

    loadData() {
        var getAllData = this.db.getAll();

        Promise.all(getAllData).then((data) => {
            console.log(data);
        })
	}

	addItem(e) {
        if (true) {
            var newItem = {
                text: 'hola',
                key: Date.now()
            };
            this.db.insert(newItem.text, newItem.key);
        }
	}

	async checkLogin(userName, password){
		let response = await this.db.checkLogin(userName, password);
		if(response !== null && response !== undefined && response.userName === userName && password === response.password){
			return response;
		}
		else{
			return false;
		}
	}


	componentDidMount() {
		if(!BaseComponent.isLogged){
			//this.redirectTo("/login", "/login");
		}
	}

	isLogged() {
		return BaseComponent.isLogged;
	}

	login(data) {
		BaseComponent.isLogged = true;
		BaseComponent.dataLogged = data;
	}

	logout(){
		BaseComponent.isLogged = false;
		BaseComponent.dataLogged = {};
		this.redirectTo("/login", "/login");
	}

	redirectTo(to, alias){
		//Router.push(to, alias);
		//const history2 = require("history").createBrowserHistory()
		//history2.push('/vender')
		//return <Redirect to="/ventas" push />
	}
}

export default BaseComponent;
