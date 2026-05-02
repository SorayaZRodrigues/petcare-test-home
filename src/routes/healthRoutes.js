const { Router } = require("express");

const healthController = require("../controllers/healthController");
const authMiddleware = require("../middleware/authMiddleware");

const healthRoutes = Router();

healthRoutes.get("/health", healthController.healthCheck);
healthRoutes.get("/protected", authMiddleware, healthController.protectedCheck);

module.exports = healthRoutes;
