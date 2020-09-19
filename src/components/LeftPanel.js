import React from 'react';
import BaseComponent from '../components/BaseComponent';

//import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
//import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

class LeftPanel extends BaseComponent {

    constructor(props) {
        super(props);
        this.typeField = "Header";
        this.state = { searchInput: "", fromIdButton: "vender" }
        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleOnClick = (e) => {
        e.preventDefault();
        const fromIdButton = e.target.id;
        //this.redirectTo(`/${this.fromIdButton}`)
        console.log(this.props)
        this.props.history.push(`/${fromIdButton}`)
        this.setState({fromIdButton: fromIdButton})
    }


    render() {
        return (
             <div className="left-panel">
				 	<img className="logo" alt="logo" />
                 <button type="button" className={`btn btn-toggle ${this.state.fromIdButton==='verProductos'&&'toggle-active'}`} id="verProductos" onClick={this.handleOnClick}> Ver Productos </button>
                 <button type="button" className={`btn btn-toggle ${this.state.fromIdButton==='vender'&&'toggle-active'}`} id="vender" onClick={this.handleOnClick}> Vender </button>
                 <button type="button" className={`btn btn-toggle ${this.state.fromIdButton==='generarReporte'&&'toggle-active'}`} id="generarReporte" onClick={this.handleOnClick}> Generar Reporte </button>
					  <hr />
                 <button type="button" className='btn btn-toggle' id="" onClick={this.handleOnClick}> Cerrar sesión </button>
             </div>
        );
    }
}

export default LeftPanel;
