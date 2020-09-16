import React, { Component } from 'react';
import Tabla from '../components/Tabla';
import BaseComponent from '../components/BaseComponent'

import AddBoxIcon from '@material-ui/icons/AddBox';
import RefreshIcon from '@material-ui/icons/Refresh';
import ClearIcon from '@material-ui/icons/Clear';

import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

/*
const simularProductos = (cantidad = 2) => {
    let productos = [];
    for (let i = 0; i < cantidad; i++) {
        productos.push({
            id: i,
            nombre: 'producto_' + i,
            cantidad: i,
            fecha_edicion: new Date(2020, 9, i + 1),
            barras: i * 1002,
        })
    }
    return ({ productos })
}

const data = simularProductos(10);*/

class VerProductos extends BaseComponent {
    constructor(props) {
		super(props);
		
		console.log("VerProductos")

        this.state = { searchTable: '', isModalOpen: false }

        this.handleAddProduct = this.handleOpenModal.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleDeleteText = this.handleDeleteText.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);

        this.textInput = React.createRef();

        this.modalNombre = React.createRef();
        this.modalCantidad = React.createRef();
        this.modalCodigo = React.createRef();
		  this.formularioAdd = React.createRef();
		  this.getAddProductForm = this.getAddProductForm.bind(this);

		  this.getProducts = this.getProducts.bind(this);

		  this.deleteFunction = this.deleteFunction.bind(this);
		  this.handleRefreshTable = this.handleRefreshTable.bind(this);
    }

    async componentDidMount() {
		 await this.getProducts();
    }

	 async getProducts() {
		const response = await fetch('http://localhost:8888/api/products/get');
		const productsList = await response.json();
		this.setState({
			"productos": productsList
		});
	 }

    handleOpenModal(event) {
        this.setState({ isModalOpen: true })
    }

    async handleRefreshTable() {
	 	await this.getProducts();
    }

    handleOnChange(e) {
        const value = e.target.value;
        this.setState({ searchTable: value });
    }

    handleDeleteText(e) {
        this.setState({ searchTable: '' })
        this.textInput.current.focus();
    }

    handleModalClose() {
       this.setState({ isModalOpen: false })
    }


    async getAddProductForm() {
		 let nombre = this.modalNombre.current.value;
		 let cantidad = this.modalCantidad.current.value;
		 let codigo = this.modalCodigo.current.value;


		 var self = this;
	  	  await fetch('http://localhost:8888/api/products/add', {
	  			method: 'POST',
	  			headers: {
	  				'Accept': 'application/json',
	  				'Content-Type': 'application/json',
	  			},
	  			body: JSON.stringify({
	  				nombre: nombre,
	  				cantidad: cantidad,
					codigo : codigo
	  			})
	  		})
	  		.then((response) => response.json())
	  		.then(async function(responseJson) {
				if(responseJson[0] === true){
					self.setState( {isModalOpen:false});
					BaseComponent.alertField.current.open("Producto creado con éxito", "success");
					await self.getProducts();
				}
				else{
					self.setState( {isModalOpen:false});
					BaseComponent.alertField.current.open("Error al crear el producto", "error");
				}
	  		})
	  		.catch((error) => {
	  			console.error(error);
	  		});
    }

	 async deleteFunction(id) {
		 var self = this;
	  	  await fetch('http://localhost:8888/api/products/delete', {
	  			method: 'POST',
	  			headers: {
	  				'Accept': 'application/json',
	  				'Content-Type': 'application/json',
	  			},
	  			body: JSON.stringify({
	  				id: id,
	  			})
	  		})
	  		.then((response) => response.json())
	  		.then(async function(responseJson) {
				if(responseJson[0] === true){
					self.setState( {isModalOpen:false});
					BaseComponent.alertField.current.open("Producto eliminado con éxito", "success");
					await self.getProducts();
				}
				else{
					self.setState( {isModalOpen:false});
					BaseComponent.alertField.current.open("Error al eliminar el producto", "error");
				}
	  		})
	  		.catch((error) => {
	  			console.error(error);
	  		});
	 }

    render() {

        const { searchTable, isModalOpen } = this.state;

        return (
            <div className="verProductos">

					<Dialog open={isModalOpen} aria-labelledby="form-dialog-title">
					  <DialogTitle id="form-dialog-title">Añadir producto</DialogTitle>
					  <DialogContent>
								 <TextField
									inputRef={this.modalNombre}
									autoFocus
									margin="dense"
									id="name"
									label="Nombre producto"
									type="text"
									fullWidth
									required={true}
									helperText="Por favor ponga un nombre."
								 />
								 <TextField
									inputRef={this.modalCantidad}
									autoFocus
									margin="dense"
									id="cantidad"
									label="Cantidad"
									type="number"
									fullWidth
									required={true}
									helperText="Este valor debe ser numérico."
								 />
								 <TextField
									inputRef={this.modalCodigo}
									autoFocus
									margin="dense"
									id="codigo"
									label="Código de barras"
									type="number"
									fullWidth
									required={true}
									helperText="Este valor debe ser numérico."
								 />
					  </DialogContent>
					  <DialogActions>
						 <Button onClick={this.handleModalClose} color="primary">
							Cancelar
						 </Button>
						 <Button onClick={this.getAddProductForm} color="primary">
							Agregar
						 </Button>
					  </DialogActions>
					</Dialog>


                <button className="btn btn-add ripple" onClick={this.handleOpenModal}>
                    <AddBoxIcon className="btn-image" />
                    <span className="btn-text"> Añadir Producto </span>
                </button>
                <button className="btn btn-refrescar" onClick={this.handleRefreshTable}>
                    <RefreshIcon className="btn-image" />
                    <span className="btn-text"> Refrescar Tabla </span>
                </button>

                <div className="input-icons">
                    <ClearIcon className={`mi icon ${this.state.searchTable.length === 0 && 'invisible'} `} onClick={this.handleDeleteText} />
                    <input type="text" className="input-search" placeholder="Buscar en tabla..." ref={this.textInput} onChange={this.handleOnChange} value={this.state.searchTable} />
                </div>
					 <br />
					 <br />
                <hr className="style-two" />
                {
                    (this.state.productos === undefined || this.state.productos === null) ?
                        <center><h2>Buscando los productos</h2></center>
                        :
                        (this.state.productos.length === 0) ?
                            <center><h2>No hay productos</h2></center>
                            :
                            <Tabla productos={this.state.productos} deleteFunction={this.deleteFunction} />
                }
            </div>
        );
    }
}

export default VerProductos;
