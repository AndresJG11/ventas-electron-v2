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

	registrarUsuario(usuario, password){
		return this.db.crearUsuario(Date.now(), usuario, password)
	}

	registrarProducto(nombre, cantidad, barras, precio){
		return this.db.crearProducto(nombre, cantidad, barras, precio)
	}

	registrarVenta(fecha, nombre_comprador, direccion_comprador, telefono_comprador){
		return this.db.crearVenta(fecha, nombre_comprador, direccion_comprador, telefono_comprador)
	}

	registrarVentaProducto(id_producto, id_venta){
		return this.db.crearVentaProducto(id_producto, id_venta)
	}

	obtenerProductos(){
		return this.db.getAllProductos()
	}

	obtenerVentas(){
		return this.db.getAllVentas()
	}

	borrarProducto(id){
		return this.db.deleteProducto(id)
	}

	setDatabase() {
        this.dao = new AppDAO('./database.sqlite');
        this.db = new Crud(this.dao);

        this.db.crearTablaUsuarios().catch((err) => {
                console.log('Error users table: ')
                console.log(JSON.stringify(err))
			});

        this.db.crearTablaProductos().catch((err) => {
                console.log('Error productos table: ')
                console.log(JSON.stringify(err))
			});

        this.db.crearTablaVentas().catch((err) => {
                console.log('Error ventas table: ')
                console.log(JSON.stringify(err))
			});

        this.db.crearTablaVentasProductos().catch((err) => {
                console.log('Error ventas table: ')
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
