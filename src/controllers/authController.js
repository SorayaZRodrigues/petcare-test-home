const authService = require("../services/authService");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "name, email and password are required" });
    }

    const result = await authService.register({ name, email, password });
    return res.status(201).json(result);
  } catch (error) {
    if (error.message === "User already exists") {
      return res.status(409).json({ message: error.message });
    }

    return res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "email and password are required" });
    }

    const result = await authService.login({ email, password });
    return res.status(200).json(result);
  } catch (error) {
    if (error.message === authService.INVALID_CREDENTIALS_ERROR) {
      return res.status(401).json({ message: error.message });
    }

    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  register,
  login,
};
