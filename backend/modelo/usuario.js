const conexion = require("../config/database");

function crearUsuario(nombre, email, passwordhash, callback) {
  const sql = "INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)";
  conexion.query(sql, [nombre, email, passwordhash], callback);
}

function buscarPorCorreo(correo, callback) {
  const sql = "SELECT * FROM usuarios WHERE correo = ?";
  conexion.query(sql, [correo], callback);
}

function actualizarPassword(correo, passwordhash, callback) {
  const sql = "UPDATE usuarios SET contrasena = ? WHERE correo = ?";
  conexion.query(sql, [passwordhash, correo], callback);
}

module.exports = { crearUsuario, buscarPorCorreo, actualizarPassword };
