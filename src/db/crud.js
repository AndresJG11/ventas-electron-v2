class Crud {
    constructor(dao) {
        this.dao = dao
    }

    createTable() {
        const sql = `
      CREATE TABLE IF NOT EXISTS ToDos (
        DT INTEGER PRIMARY KEY,
        ToDo TEXT)`
        return this.dao.run(sql);
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

    crearTablaRegistro(){
        const sql = `
      CREATE TABLE IF NOT EXISTS users (
        DT INTEGER PRIMARY KEY,
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
}

export default Crud;