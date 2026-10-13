const usuarioModelo = require("../modelo/usuario");
const loginServicio = require("../servicio/login");

async function registro(req, res) {
  const { nombre, email, password } = req.body;
  const passwordhash = await loginServicio.encriptarPassword(password);

  usuarioModelo.crearUsuario(nombre, email, passwordhash, (err, result) => {
    if (err) {
      res.status(500).json({ error: "Error al registrar el usuario" });
      return;
    }
    res.status(201).json({ message: "Usuario registrado correctamente" });
  });
}

function login(req, res) {
  const { correo, contrasena } = req.body;

  usuarioModelo.buscarPorCorreo(correo, async (error, resultados) => {
    if (error) {
      return res.status(500).json({ error: "Error del servidor" });
    }
    if (resultados.length === 0) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }
    const usuario = resultados[0];
    //Hashear
    let passwordValido;
    if (usuario.contrasena.startsWith("$2")) {
      passwordValido = await loginServicio.compararPassword(contrasena, usuario.contrasena); 
    } else {
      //si hay coincidencia en los valores se hashea y se guarda
      passwordValido = contrasena === usuario.contrasena;
      if (passwordValido) {
        const hash = await loginServicio.encriptarPassword(contrasena);
        usuarioModelo.actualizarPassword(usuario.correo, hash, () => {});
      }
    }
    if (!passwordValido) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }
    const token = loginServicio.generarToken(usuario);
    res.json({ token: token, nombre: usuario.nombre, rol: usuario.rol });
  });
}

module.exports = { registro, login };
