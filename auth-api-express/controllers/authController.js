const users = require("../data/users");

/**
 * Registrar usuario
 */
const register = (req, res) => {

    const { username, password } = req.body;

    if (!username || !password) {

        return res.status(400).json({
            message: "Usuario y contraseña son obligatorios"
        });
    }

    const userExists = users.find(
        user => user.username === username
    );

    if (userExists) {

        return res.status(409).json({
            message: "El usuario ya existe"
        });
    }

    users.push({
        username,
        password
    });

    res.status(201).json({
        message: "Usuario registrado correctamente"
    });
};

/**
 * Iniciar sesión
 */
const login = (req, res) => {

    const { username, password } = req.body;

    const user = users.find(
        user =>
            user.username === username &&
            user.password === password
    );

    if (!user) {

        return res.status(401).json({
            message: "Error en la autenticación"
        });
    }

    res.status(200).json({
        message: "Autenticación satisfactoria"
    });
};

module.exports = {
    register,
    login
};