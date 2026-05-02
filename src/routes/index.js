const { Router } = require("express");

const authRoutes = require("./authRoutes");
const healthRoutes = require("./healthRoutes");
const petRoutes = require("./petRoutes");

const routes = Router();

routes.use(authRoutes);
routes.use(healthRoutes);
routes.use(petRoutes);

module.exports = routes;
