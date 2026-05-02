const { Router } = require("express");

const authController = require("../controllers/authController");

const authRoutes = Router();

authRoutes.post("/register", authController.register);
authRoutes.post("/auth/login", authController.login);

module.exports = authRoutes;
