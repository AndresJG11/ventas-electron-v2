import React, { Component } from 'react'
import DeleteIcon from '@material-ui/icons/Delete';
import BaseComponent from '../components/BaseComponent'

class Tabla extends BaseComponent {
    productos;
    constructor(props) {
        super(props);
		  this.deleteFunction = this.props.deleteFunction;
    }

    formatDate = (dateNro) => {
		 let date = new Date(dateNro);
        return (`${date.getDay()}-${date.getMonth()}-${date.getFullYear()}`)
    }
    handleSort = (e) => {
        const colToSort = e.target.id;

    }

    render() {
		 let productos = this.props.productos;
        return (
            <div>
                <table className="verProductos-tabla">
                    <thead>
                        <tr>
                            <th id="ID" onClick={this.handleSort}> ID </th>
                            <th> Nombre </th>
                            <th> Cantidad </th>
                            <th> Fecha de Edición (dd-mm-aa) </th>
                            <th> Código de barras </th>
                            <th> Operaciones </th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map((producto) => <tr key={producto["id"]}>
                            <td> {producto["id"]} </td>
                            <td> {producto["nombre"]} </td>
                            <td> {producto["cantidad"]} </td>
                            <td> {this.formatDate(producto["fecha_edicion"])} </td>
                            <td> {producto["barras"]} </td>
									 <td>
										 <button className='delete-cart' tabIndex="0">
												<div className='icon'>
													<DeleteIcon />
												</div>
												<div className='text'>
													<span className="first-span">¿Eliminar?</span>
													<span className="second-span" onClick={(e) => {this.deleteFunction(producto["id"])}}>Click para confirmar</span>
												</div>
											</button>
									 </td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Tabla;
