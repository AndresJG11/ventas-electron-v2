import React from 'react'

import { Document, Page, Text, View, StyleSheet, PDFViewer } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
      flexDirection: "row"
    },
    section: {
      flexGrow: 1
    }
  });

const formatFecha = (fecha) => {
    const dd = String(fecha.getDate()).padStart(2, '0');
    const mm = String(fecha.getMonth() + 1).padStart(2, '0');
    const yyyy = fecha.getFullYear();
    return (`${dd}-${mm}-${yyyy}`)
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

export const ReportePDF = (props) => {

    const { dataReporte } = props
    console.log(dataReporte)

    const MyDocument = (
        <Document>
          { dataReporte.map( venta => <Page size="A4" style={styles.page} key={venta['id']} >
              <View style={styles.section}>
                <Text> ID: { venta['id'] } </Text>
                <Text> Fecha de compra: { formatFecha(venta['fecha']) } </Text>
                <Text> Nombre: { venta['nombre_comprador'] } </Text>
                <Text> Teléfono: { venta['telefono_comprador'] } </Text>
                { venta['productos'].map( (producto) => <View> 
                    <Text> {producto['barras']} </Text> 
                    <Text> {producto['nombre']} </Text> 
                    <Text> {producto['cantidad']} </Text> 
                    </View> ) }
              </View>
          </Page> ) }
        </Document>
      );


    return (
        <PDFViewer className="visor-pdf">{MyDocument}</PDFViewer>
    )
}
