import React from 'react';
import BaseComponent from '../components/BaseComponent';

/*import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';*/

class Header extends BaseComponent {

    constructor(props) {
        super(props);
        this.typeField = "Header";
        this.busqueda = React.createRef();
        //this.state = {productos: []}
    }
    handleOnChangeInput = (e) => {
        const readInput = e.target.value;
        if(readInput.length >= 3 && this.props.location.pathname!=='/verProductos' ) {
			const filterArray = this.productsList.filter( (producto) => (producto["nombre"]+producto["barras"]).includes(readInput) )
            this.props.history.push('/verProductos', {busquedaProductos: filterArray})
		} else{
			//this.setState( {"productos": this.productsList } )
        }
    }

    handleOnSubmit = (e) => {
        e.preventDefault();
    }

    async componentDidMount(){
        this.productsList = await this.obtenerProductos();
    }



    render() {
        return (
            <header>
                <div className="header-top">
                    <div></div>
                    <form onSubmit={this.handleOnSubmit}>
                        <input placeholder="Busqueda" type="text" ref={this.busqueda} className="input-search input-text" onChange={this.handleOnChangeInput} />
                    </form>
                </div>
            </header>
        );
    }
}

export default Header;
