import React from "react";
import ReactDOM from "react-dom";

import GenerarReporte from './pages/GenerarReporte'
import Vender from './pages/Vender'
import VerProductos from './pages/VerProductos'
import App from "./components/App";

import { BrowserRouter as Router, Route } from 'react-router-dom';

import './public/styles/main.scss'

const destination = document.querySelector("#container");

//  <Route path="/" render={(props) => <ButtonToNavigate {...props} title="Navigate elsewhere" />} />
ReactDOM.render(
    <div>
        <Router >
            <Route exact path="/" children={(props) => <App {...props} />} />
            <Route path='/vender' component={Vender} />
            <Route path='/generarReporte' component={GenerarReporte} />
            <Route path='/verProductos' component={VerProductos} />
        </Router>
    </div>,
    destination
);