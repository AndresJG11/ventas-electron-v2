import React, { Component } from 'react'

import TextField from '@material-ui/core/TextField';
import {ReportePDF} from '../components/ReportePDF'
import BaseComponent from '../components/BaseComponent'



class GenerarReporte extends BaseComponent {
    constructor(props) {
        super(props)
        this.state = { fechaInicio: new Date(), fechaFinal: new Date(), dataReporte: [] }
        this.handleDataChange = this.handleDataChange.bind(this);
        this.handleGenerarReporte = this.handleGenerarReporte.bind(this);
        this.simularReporte = this.simularReporte.bind(this);
    }

    getTodayDate() {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        return (`${yyyy}-${mm}-${dd}`)
    }

    handleDataChange(e) {
        const { value, id } = e.target;
        const fecha = new Date(value);
        if (id === 'inicio') {
            this.setState({ fechaInicio: fecha })
        } else {
            this.setState({ fechaFinal: fecha })
        }
    }

    handleGenerarReporte() {
        const { fechaInicio, fechaFinal } = this.state

        if (fechaInicio.getTime() >= fechaFinal.getTime() || fechaInicio.getTime() > (new Date()).getTime()) {
            return (null)
        }

        console.log('se genera el reporte')
    }


    simularProductos = (cantidad = 2) => {
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
        return (productos)
    }

    simularReporte(cantidad = 2) {
        let dataReporte = [];
        for (let i = 0; i < cantidad; i++) {
            dataReporte.push({
                id: i,
                productos: this.simularProductos(5),
                nombre_comprador: `comprador_${i}`,
                direccion_comprador: `carrera ${i} #11-${i}`,
                telefono_comprador: `311 787 8448`,
                fecha: this.state.fechaInicio,
            })
        }
        this.setState( {dataReporte} )
    }

    componentDidMount(){
        this.simularReporte(3)
    }

    render() {
        const { dataReporte } = this.state;
        return (
            <div className="generarReporte-root">
                <form noValidate>
                    <TextField
                        id="inicio"
                        label="Inicio"
                        type="date"
                        onChange={this.handleDataChange}
                        defaultValue={this.getTodayDate()}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        id="final"
                        label="Final"
                        onChange={this.handleDataChange}
                        type="date"
                        defaultValue={this.getTodayDate()}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </form>

                <button className="btn" onClick={this.handleGenerarReporte} > Generar Reporte </button>

                <div className="generarReporte-pdf">
                    {dataReporte.length > 0 && <ReportePDF key={Math.random()} dataReporte={dataReporte} /> }
                </div>
            </div>
        )
    }
}

export default GenerarReporte;
