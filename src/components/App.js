import React, { Component } from 'react'
import Login from '../pages/Login';
import LeftPanel from './LeftPanel'
import Header from './Header'

class App extends Component {
    render() {
        const match = this.props.location.pathname;
        console.log('match  ', match)
        return (
            match === '/' ? < Login {...this.props} /> :
            <div className="page">
                <div className="left-panel-container">
                    <LeftPanel {...this.props} />
                </div>
                <div className="page-body">
                    <Header/>
                </div>
            </div>
        );
    }
}

export default App
