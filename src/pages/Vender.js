import React from 'react'

import TablaVentas from '../components/TablaVentas'
import BaseComponent from '../components/BaseComponent'

import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

import AddBoxIcon from '@material-ui/icons/AddBox';

import AlertField from '../components/AlertField';


class Vender extends BaseComponent {

	constructor(props) {
		super(props);

		this.state = { productos: [], allProductsSelected: [], currentSelected: {} }
		//this.state = { productos: simularProductos(3).productos, allProductsSelected: {} }

		this.handleProductChange = this.handleProductChange.bind(this)
		this.handleAgregarProducto = this.handleAgregarProducto.bind(this);

		this.getProducts = this.getProducts.bind(this);

		this.addVenta = this.addVenta.bind(this);

		this.nombreComprador = new React.createRef();
		this.telefonoComprador = new React.createRef();
		this.direccionComprador = new React.createRef();

		this.cantidad = new React.createRef();
	}

	async componentDidMount() {
		await this.getProducts();
	}

	async getProducts() {
		const productsList = await this.obtenerProductos()
		this.setState({
			"productos": productsList
		});
	}

	handleProductChange(e, currentSelected) {
		this.setState({ currentSelected });
	}

	handleAgregarProducto(e) {
		const { currentSelected, allProductsSelected } = this.state
		currentSelected["cantidad"] = parseInt(currentSelected["cantidad"], 10);
		console.log(currentSelected["cantidad"]);
		const cantidad = this.cantidad.current.value;
		console.log("......", cantidad);
		let flagRepetido = false;

		allProductsSelected.map((producto, idx) => {
			if (producto.id === currentSelected.id) {
				if (currentSelected["cantidad"] >= allProductsSelected[idx]["added"] + parseInt(cantidad, 10)) {
					allProductsSelected[idx]["added"] += parseInt(cantidad, 10);
					this.setState({
						allProductsSelected: allProductsSelected
					});
				}
				else {
					BaseComponent.alertField.current.open("Solo quedan " + (currentSelected["cantidad"] - allProductsSelected[idx]["added"]).toString() + " existencias de este producto", "error");
				}
				flagRepetido = true;
			}
			return (null);
		});

		if (!flagRepetido) {
			if (currentSelected["cantidad"] >= parseInt(cantidad, 10)) {
				let newSelected = currentSelected;
				newSelected["added"] = parseInt(cantidad, 10);
				let products = allProductsSelected;
				products.push(newSelected);
				this.setState({
					allProductsSelected: products
				})
			} else {
				BaseComponent.alertField.current.open("Solo poseemos " + currentSelected["cantidad"] + " existencias de este producto", "error");
			}
		}
	}

	async addVenta() {
		if (this.state.allProductsSelected.length > 0) {
			/*let dataVenta = {
				"productos": this.state.allProductsSelected,
				"nombre": this.nombreComprador.current.value,
				"direccion": this.direccionComprador.current.value,
				"telefono": this.telefonoComprador.current.value,
			};*/

			let venta = await this.registrarVenta(Date.now(), this.nombreComprador.current.value, this.direccionComprador.current.value, this.telefonoComprador.current.value);
			let id_venta = venta[0]["id"];
			this.state.allProductsSelected.map((item, index) => {
				console.log(item["id"], id_venta)
				this.registrarVentaProducto(item["id"], id_venta);
				return (null);
			})
			BaseComponent.alertField.current.open("Venta agregada con éxito", "success");

			this.nombreComprador.current.value = ''
			this.telefonoComprador.current.value = ''
			this.direccionComprador.current.value = ''
			this.cantidad.current.value = ''

			this.setState({allProductsSelected: [], currentSelected: {}})



			//this.registrarVenta(new Date().getDate(), )
			/*
			var self = this;
			await fetch('http://localhost:8888/api/ventas/add', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(dataVenta)
			})
				.then((response) => response.json())
				.then(async function (responseJson) {
					console.log(responseJson);
					if (responseJson[0] === true) {
						self.nombreComprador.current.value = "";
						self.direccionComprador.current.value = "";
						self.telefonoComprador.current.value = "";
						await self.getProducts();
						self.setState({ allProductsSelected: [], currentSelected: {} });
						BaseComponent.alertField.current.open("Venta registrada con éxito", "success");
					}
					else {
						BaseComponent.alertField.current.open("Error al registrar la venta", "error");
					}
				})
				.catch((error) => {
					console.error(error);
				});
				*/


		}
		else {
			BaseComponent.alertField.current.open("Por favor agregue al menos un producto", "error");
		}
	}

	render() {
		const { productos, allProductsSelected } = this.state;
		return (
			<div className="page">
				<div className="left-panel-container"> </div>
				<div className="vender-root">
					<h3>Datos de los productos</h3>
					<div className="vender-buscador">
						<Autocomplete
							id="combo-box-demo"
							options={productos}
							onChange={this.handleProductChange}
							className="vender-input"
							clearText="Borrar"
							getOptionLabel={(option) => option.nombre}
							renderInput={(params) => <TextField {...params} label="Buscar producto" className="text-field-custom" variant="outlined" />}
						/>
						<div>
							<TextField
								inputRef={this.cantidad}
								autoFocus
								margin="dense"
								id="nameID"
								label="Cantidad"
								type="bnumber"
								fullWidth
								defaultValue={1}
								required={true}
								className="text-field-custom"
								helperText="Por favor ponga un número."
								InputProps={{
									className: "input",
								}}
							/>
						</div>
						<div>
							<button className="btn btn-add ripple" type="button" onClick={this.handleAgregarProducto}>
								<AddBoxIcon className="btn-image" />
								<span className="btn-text"> Añadir a la lista </span>
							</button>
						</div>
					</div>
					<div>
						<TablaVentas productos={allProductsSelected} estado={this} />
					</div>
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />

					<div>
						<h3>Datos del comprador</h3>
						<TextField
							inputRef={this.nombreComprador}
							autoFocus
							margin="dense"
							id="nameID"
							label="Nombre"
							type="text"
							fullWidth
							required={true}
							className="text-field-custom"
							helperText="Por favor ponga un nombre."
						/>
						<TextField
							inputRef={this.telefonoComprador}
							autoFocus
							margin="dense"
							id="telefonoID"
							label="Teléfono"
							type="number"
							fullWidth
							required={true}
							className="text-field-custom"
							helperText="Por favor ponga un teléfono."
						/>
						<TextField
							inputRef={this.direccionComprador}
							autoFocus
							margin="dense"
							id="direccionID"
							label="Direccion"
							type="text"
							fullWidth
							required={true}
							className="text-field-custom"
							helperText="Por favor ponga una dirección."
						/>
						<button className="btn btn-add ripple" type="button" onClick={this.addVenta}>
							<AddBoxIcon className="btn-image" />
							<span className="btn-text"> Generar venta</span>
						</button>
					</div>
				</div>

				<AlertField ref={BaseComponent.alertField} />
			</div>
		)
	}
}


export default Vender;
