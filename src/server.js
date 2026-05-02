require("dotenv").config();

const app = require("./app");
const connectDatabase = require("./config/database");

const PORT = process.env.PORT || 3000;

const bootstrap = async () => {
  await connectDatabase();

  app.listen(PORT, () => {
    // Keep this log simple for local/dev visibility.
    console.log(`Server running on port ${PORT}`);
  });
};

bootstrap().catch((error) => {
  console.error("Failed to bootstrap server:", error.message);
  process.exit(1);
});
