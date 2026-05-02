const { Router } = require("express");

const petController = require("../controllers/petController");
const authMiddleware = require("../middleware/authMiddleware");

const petRoutes = Router();

petRoutes.get("/pets/:petId", authMiddleware, petController.getPetById);

module.exports = petRoutes;
