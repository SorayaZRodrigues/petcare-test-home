const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const path = require("path");

const routes = require("./routes");

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, "docs", "swagger.yaml"));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api", routes);

app.get("/", (req, res) => {
  const baseUrl = process.env.BASE_URL || `http://localhost:${process.env.PORT || 3000}`;

  res.status(200).json({
    message: "PetCare API running",
    docs: `${baseUrl}/api-docs`,
  });
});

module.exports = app;
