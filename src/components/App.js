import React, { Component } from 'react'
import LeftPanel from './LeftPanel'

class App extends Component {
    render() {
        return (
            <div className="page">
                <div className="left-panel-container">
                    <LeftPanel {...this.props} />
                </div>
            </div>
        );
    }
}

export default App