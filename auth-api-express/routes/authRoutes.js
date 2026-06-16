const express = require("express");

/**
 * Importa las funciones `register` y `login` desde el controlador de autenticación.
 * Estas funciones se utilizan para manejar el registro y el inicio de sesión de usuarios.
 * 
 * @module authRoutes
 * @requires ../controllers/authController
 */
const {
    register,
    login
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

module.exports = router;