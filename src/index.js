import React from "react";
import ReactDOM from "react-dom";

import Login from './pages/Login'
import GenerarReporte from './pages/GenerarReporte'
import Vender from './pages/Vender'
import VerProductos from './pages/VerProductos'
import App from "./components/App";

import { HashRouter as Router, Route, Redirect, Switch, Link } from 'react-router-dom';
import { createBrowserHistory } from 'history'


import './public/styles/main.scss'

const destination = document.querySelector("#container");
const history = createBrowserHistory();

//  <Route path="/" render={(props) => <ButtonToNavigate {...props} title="Navigate elsewhere" />} />
ReactDOM.render(
    <div>
        <Router>
            <Switch>

            <Route exact path="/" component={App} />
            <Route path="/login" component={Login} />
            </Switch>
        </Router>
        { /* <Router history={history}>
            <Route history={history} path='/vender' component={Vender} />
              <LeftPanel history={history} />
              <Switch>
                  <Route exact path="/" render={(props) => <Login {...props} />} />
                  <Route history={history} path='/verProductos' component={VerProductos} />
                  <Route history={history} path='/generarReporte' component={GenerarReporte} />
                  <Route history={history} path='/vender' component={Vender} />
              </Switch>
    </Router>*/}
    </div>,
    destination
);