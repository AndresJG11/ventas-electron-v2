import React from "react";
import ReactDOM from "react-dom";

import Login from './pages/Login'
import GenerarReporte from './pages/GenerarReporte'
import Vender from './pages/Vender'
import VerProductos from './pages/VerProductos'

import { BrowserRouter as Router, Route, Redirect, Switch, Link } from 'react-router-dom';
import { createBrowserHistory } from 'history'


import './public/styles/main.scss'

const destination = document.querySelector("#container");
const history = createBrowserHistory();

//  <Route path="/" render={(props) => <ButtonToNavigate {...props} title="Navigate elsewhere" />} />


ReactDOM.render(
    <div>
        <Router>
            <ul style={{ backgroundColor: "white" }}>
                <li> <Link to="/verproductos"> Ver Productos  </Link></li>
                <li> <Link to="/"> Login  </Link></li>
                <li> <Link to="/generar-reporte"> Generar Reporte  </Link></li>
                <li> <Link to="/vender"> Vender  </Link></li>
            </ul>
            <Switch>
                <Route path="/" render={(props) => <Login {...props} />} />
                <Route exact history={history} path='/verproductos' component={VerProductos} />
                <Route exact history={history} path='/generar-reporte' component={GenerarReporte} />
                <Route history={history} path='/vender' component={Vender} />
            </Switch>
        </Router>
    </div>,
    destination
);