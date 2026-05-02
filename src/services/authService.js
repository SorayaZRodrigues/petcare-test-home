const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const generateToken = (userId) => {
  const jwtSecret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES_IN || "1d";

  if (!jwtSecret) {
    throw new Error("JWT_SECRET is not configured in environment variables");
  }

  return jwt.sign({ sub: userId }, jwtSecret, { expiresIn });
};

const register = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    token: generateToken(user.id),
  };
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const passwordMatches = await bcrypt.compare(password, user.password);

  if (!passwordMatches) {
    throw new Error("Invalid credentials");
  }

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    token: generateToken(user.id),
  };
};

module.exports = {
  register,
  login,
};
