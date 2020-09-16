import React from 'react';
import BaseComponent from '../components/BaseComponent';

import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

class Header extends BaseComponent {

    constructor(props) {
        super(props);
        this.typeField = "Header";
        this.state = { searchInput: "" }
    }
    fromIdButton = 'verVentas';
    handleOnChangeInput = (e) => {
        const readInput = e.target.value;
        this.setState({ ...this.setState, searchInput: readInput });
        this.redirectTo("/login", "/login")
    }

    handleOnSubmit = (e) => {
        e.preventDefault();
        console.log("Buscar: " + this.state.searchInput);
    }



    render() {
        return (
            <header>
                <div className="header-top">
                    <div></div>
                    <form onSubmit={this.handleOnSubmit}>
                        <input placeholder="Busqueda" type="text" className="input-search input-text" onChange={this.handleOnChangeInput} value={this.state.searchInput} />
                    </form>
                </div>
            </header>
        );
    }
}

export default Header;
