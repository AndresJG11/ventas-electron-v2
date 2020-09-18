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
import LeftPanel from "./components/LeftPanel";

const destination = document.querySelector("#container");
const history = createBrowserHistory();

//  <Route path="/" render={(props) => <ButtonToNavigate {...props} title="Navigate elsewhere" />} />
ReactDOM.render(
    <div>
        <Router >
            <Route path="/login" children={(props) => <App {...props} />} />
            <Route path='/vender' component={Vender} />
            <Route path='/generarReporte' component={GenerarReporte} />
            <Route path='/verProductos' component={VerProductos} />
        </Router>
        { /* <Router history={history}>
            <Route history={history} path='/vender' component={Vender} />
              <LeftPanel history={history} />
              <Switch>
                  <Route exact path="/" render={(props) => <Login {...props} />} />
              </Switch>
    </Router>*/}
    </div>,
    destination
);