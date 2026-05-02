const { Router } = require("express");

const petController = require("../controllers/petController");
const authMiddleware = require("../middleware/authMiddleware");

const petRoutes = Router();

petRoutes.post("/pets", authMiddleware, petController.createPet);

module.exports = petRoutes;
