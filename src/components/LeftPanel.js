import React from 'react';
import BaseComponent from '../components/BaseComponent';

import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

class LeftPanel extends BaseComponent {

    constructor(props) {
        super(props);
        this.typeField = "Header";
        this.state = { searchInput: "" }
        this.handleOnClick = this.handleOnClick.bind(this);
	     this.fromIdButton = 'verVentas';
    }

    handleOnClick = (e) => {
        e.preventDefault();
        this.fromIdButton = e.target.id;
        this.redirectTo(`/${this.fromIdButton}`)
    }


    render() {
        return (
             <div className="left-panel">
				 	<img className="logo" />
                 <button type="button" className={`btn btn-toggle ${this.fromIdButton==='verProductos'&&'toggle-active'}`} id="verProductos" onClick={this.handleOnClick}> Ver Productos </button>
                 <button type="button" className={`btn btn-toggle ${this.fromIdButton==='vender'&&'toggle-active'}`} id="vender" onClick={this.handleOnClick}> Vender </button>
                 <button type="button" className={`btn btn-toggle ${this.fromIdButton==='generarReporte'&&'toggle-active'}`} id="generarReporte" onClick={this.handleOnClick}> Generar Reporte </button>
					  <hr />
                 <button type="button" className='btn btn-toggle' id="generarReporte" onClick={this.logout}> Cerrar sesión </button>
             </div>
        );
    }
}

export default LeftPanel;
