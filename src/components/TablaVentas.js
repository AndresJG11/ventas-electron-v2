import React, { Component } from 'react'
import DeleteIcon from '@material-ui/icons/Delete';

class TablaVentas extends Component {
    constructor(props) {
        super(props)

        this.handleDeleteProduct = this.handleDeleteProduct.bind(this);
    }

    formatDate = (dateNro) => {
        let date = new Date(dateNro);
        return (`${date.getDay()}-${date.getMonth()}-${date.getFullYear()}`)
    }
    handleSort = (e) => {
        const colToSort = e.target.id;
    }

    handleDeleteProduct(productToDelete) {
        let items = [...this.props.productos];
        const indexToDelete = items.indexOf(productToDelete)
        items.splice(indexToDelete, 1)
        this.props.estado.setState({ allProductsSelected: items });
    }

    render() {
        const { productos } = this.props;
        let render;
        if (productos.length > 0) {
            render = <div>
                <table className="verProductos-tabla">
                    <thead>
                        <tr>
                            <th> Producto </th>
                            <th> Cantidad </th>
                            <th> Código de barras </th>
                            <th> Eliminar </th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map((producto) => <tr key={producto["id"]}>
                            <td> {producto["nombre"]} </td>
                            <td> {producto["added"]} </td>
                            <td> {producto["barras"]} </td>
                            <td> <DeleteIcon onClick={(e) => this.handleDeleteProduct(producto)} style={{ cursor: 'pointer' }} id={producto['id']} /> </td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        } else {
            render = <table className="verProductos-tabla">
                <thead>
                    <tr>
                        <th> Producto </th>
                        <th> Cantidad </th>
                        <th> Código de barras </th>
                        <th> Eliminar </th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td colSpan="4" style={{textAlign:'center'}}> Sin Productos </td></tr>
                </tbody>
            </table>
        }
        return (render)
    }
}

export default TablaVentas;
