class Crud {
    constructor(dao) {
        this.dao = dao
    }

    insert(todo, dt) {
        return this.dao.run(
            'INSERT INTO ToDos (DT, ToDo) VALUES (?,?)',
            [dt, todo]);
    }

    delete(dt) {
        return this.dao.run(
            `DELETE FROM ToDos WHERE DT = ?`,
            [dt]
        );
    }

    getAll() {
        return this.dao.all(`SELECT * FROM users`);
    }

    crearTablaUsuarios(){
        const sql = `
      CREATE TABLE IF NOT EXISTS users (
        DT INTEGER PRIMARY KEY,
        nombre TEXT,
        apellido TEXT,
        puede_login,
        last_login,
        userName TEXT,
        password TEXT)`
        return this.dao.run(sql);
    }

    crearUsuario(dt, userName, password){
        return this.dao.run(
            `INSERT INTO users (DT, userName, password) VALUES (?,?,?)`,
            [dt, userName, password]);
    }

    checkLogin(userName, password){
        return this.dao.get(`SELECT * FROM users WHERE userName='${userName}' AND password='${password}' `)
    }

    crearTablaProductos(){
        const sql = `
        CREATE TABLE IF NOT EXISTS productos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT,
            cantidad INTEGER,
            fecha_edicion INTEGER,
            barras INTEGER,
            eliminado INTEGER DEFAULT 0,
            precio INTEGER DEFAULT 0)`
        return this.dao.run(sql);
    }

    crearProducto(nombre, cantidad, barras, precio){
        return this.dao.run(
            `INSERT INTO productos (nombre, cantidad, barras, precio) VALUES (?,?,?,?)`,
            [nombre, cantidad, barras, precio]);
    }

    getAllProductos() {
        return this.dao.all(`SELECT * FROM productos`);
    }

    deleteProducto(id) {
        return this.dao.run(
            `DELETE FROM productos WHERE id = ?`,
            [id]
        );
    }

    crearTablaVentas(){
        const sql = `
        CREATE TABLE IF NOT EXISTS ventas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            fecha INTEGER,
            nombre_comprador TEXT,
            direccion_comprador INTEGER,
            telefono_comprador INTEGER)`
        return this.dao.run(sql);
    }

    crearTablaVentasProductos(){
        const sql = `
        CREATE TABLE IF NOT EXISTS venta_productos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            id_venta INTEGER,
            id_producto INTEGER)`
        return this.dao.run(sql);
    }

    crearVenta(fecha, nombre_comprador, direccion_comprador, telefono_comprador){
        this.dao.run(
            `INSERT INTO ventas (fecha, nombre_comprador, direccion_comprador, telefono_comprador) VALUES (?,?,?,?)`,
            [fecha, nombre_comprador, direccion_comprador, telefono_comprador]);
       return this.dao.all(`SELECT * FROM ventas ORDER BY id DESC limit 1`);
    }

	 crearVentaProducto(id_producto, id_venta){
        this.dao.run(
            `INSERT INTO venta_productos (id_venta, id_producto) VALUES (?,?)`,
            [id_venta, id_producto]);
	 }

    getAllVentas(){
        return this.dao.all(`SELECT * FROM ventas`);
    }

}

export default Crud;
