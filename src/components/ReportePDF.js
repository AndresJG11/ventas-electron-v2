import React from 'react'

const formatFecha = (fecha) => {
  const dd = String(fecha.getDate()).padStart(2, '0');
  const mm = String(fecha.getMonth() + 1).padStart(2, '0');
  const yyyy = fecha.getFullYear();
  return (`${dd}-${mm}-${yyyy}`)
}

const getTotal = (productos) => {
  let total = 0;
  productos.map(producto => {
    total += producto["precio"] * producto["added"];
    return (null)
  })
  return total
}


export const ReportePDF = (props) => {

  const { dataReporte, fechaInicio, fechaFinal } = props
  console.log(dataReporte)
  return (
    <div>
      <div className="reporte-header">
        <h1> Reporte de ventas  </h1>
        <span> {formatFecha(fechaInicio)} - {formatFecha(fechaFinal)}  </span>
      </div>

      {dataReporte.map((venta) => (<div className="reporte-venta" key={venta['id']}>
        <div className="reporte-cliente" >
          <span> Nombre: </span> <p> {venta["nombre_comprador"]} </p>
          <span> Teléfono: </span> <p> {venta["telefono_comprador"]} </p>
          <span> Dirección: </span> <p> {venta["direccion_comprador"]} </p>
          <span> Fecha: </span> <p> {formatFecha(venta["fecha"])} </p>
        </div>
        <div>
          <table className="verProductos-tabla">
            <thead>
              <tr>
                <th> Producto </th>
                <th> Cantidad </th>
                <th> Precio </th>
                <th> Código de barras </th>
              </tr>
            </thead>
            <tbody>
              {venta['productos'].map((producto) => <tr key={producto["id"]}>
                <td> {producto["nombre"]} </td>
                <td> {producto["added"]} </td>
                <td> {producto["precio"]}$ </td>
                <td> {producto["barras"]} </td>
              </tr>
              )}
              <tr></tr>
              <tr>
                <td colSpan={2} className="total"> Total </td>
                <td colSpan={3} className="total"> {getTotal(venta['productos'])}$ </td>
              </tr>
            </tbody>
          </table>
        </div>
        <hr />
      </div>
      ))}

    </div>
  );
}

/*
const MyDocument = (
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.section}>
              <Text>Hello World!</Text>
            </View>
            <View style={styles.section}>
              <Text>We're inside a PDF!</Text>
            </View>
          </Page>
        </Document>
      );
*/